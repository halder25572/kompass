"use client";

import { useState, useRef, forwardRef } from 'react';
import { Stage, Layer, Line } from 'react-konva';
import { useBookStore } from '@/store/useBookStore';
import Konva from 'konva';
import ImageNode from './elements/ImageNode';
import ShapeNode from './elements/ShapeNode';
import TextNode from './elements/TextNode';

interface CanvasPageProps {
  pageId: number;
  width: number;
  height: number;
  stageRef?: (node: Konva.Stage | null) => void;
}

const CanvasPage = forwardRef<HTMLDivElement, CanvasPageProps>(
  ({ pageId, width, height, stageRef }, ref) => {
    const [currentLine, setCurrentLine] = useState<number[] | null>(null);
    const isDrawing = useRef(false);

    const pages = useBookStore((state) => state.pages);
    const activeTool = useBookStore((state) => state.activeTool);
    const strokeColor = useBookStore((state) => state.strokeColor);
    const strokeWidth = useBookStore((state) => state.strokeWidth);
    const selectedElementId = useBookStore((state) => state.selectedElementId);
    const addElement = useBookStore((state) => state.addElement);
    const updateElement = useBookStore((state) => state.updateElement);
    const setSelectedElement = useBookStore((state) => state.setSelectedElement);

    const page = pages.find((p) => p.id === pageId);
    const isSelectMode = activeTool === 'select';

    const handleMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
      const clickedOnEmpty = e.target === e.target.getStage();
      if (clickedOnEmpty) {
        setSelectedElement(null);
      }

      if (activeTool === 'pen' || activeTool === 'eraser') {
        isDrawing.current = true;
        const pos = e.target.getStage()?.getPointerPosition();
        if (pos) {
          setCurrentLine([pos.x, pos.y]);
        }
      }
    };

    const handleMouseMove = (e: Konva.KonvaEventObject<MouseEvent>) => {
      if (!isDrawing.current || !currentLine) return;
      const pos = e.target.getStage()?.getPointerPosition();
      if (pos) {
        setCurrentLine([...currentLine, pos.x, pos.y]);
      }
    };

    const handleMouseUp = () => {
      if (!isDrawing.current || !currentLine) return;
      isDrawing.current = false;

      addElement(pageId, {
        id: `line-${Date.now()}-${Math.random()}`,
        type: 'line',
        x: 0,
        y: 0,
        points: currentLine,
        stroke: activeTool === 'eraser' ? '#ffffff' : strokeColor,
        strokeWidth: activeTool === 'eraser' ? strokeWidth * 3 : strokeWidth,
        zIndex: page?.elements.length || 0,
      });

      setCurrentLine(null);
    };

    return (
      <div ref={ref} className="bg-white h-full w-full relative">
        <Stage
          ref={stageRef}
          width={width}
          height={height}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleMouseDown as any}
          onTouchMove={handleMouseMove as any}
          onTouchEnd={handleMouseUp}
        >
          <Layer>
            {page?.elements.map((element) => {
              if (element.type === 'line') {
                return (
                  <Line
                    key={element.id}
                    points={element.points || []}
                    stroke={element.stroke}
                    strokeWidth={element.strokeWidth}
                    tension={0.5}
                    lineCap="round"
                    lineJoin="round"
                  />
                );
              }

              if (element.type === 'image') {
                return (
                  <ImageNode
                    key={element.id}
                    id={element.id}
                    src={element.src || ''}
                    x={element.x}
                    y={element.y}
                    width={element.width || 100}
                    height={element.height || 100}
                    rotation={element.rotation}
                    isSelected={element.id === selectedElementId}
                    isSelectMode={isSelectMode}
                    onSelect={() => setSelectedElement(element.id)}
                    onChange={(updates) => updateElement(pageId, element.id, updates)}
                  />
                );
              }

              if (element.type === 'shape') {
                return (
                  <ShapeNode
                    key={element.id}
                    id={element.id}
                    shapeType={element.shapeType || 'rect'}
                    x={element.x}
                    y={element.y}
                    width={element.width}
                    height={element.height}
                    radius={element.radius}
                    fill={element.fill}
                    stroke={element.stroke}
                    rotation={element.rotation}
                    isSelected={element.id === selectedElementId}
                    isSelectMode={isSelectMode}
                    onSelect={() => setSelectedElement(element.id)}
                    onChange={(updates) => updateElement(pageId, element.id, updates)}
                  />
                );
              }

              if (element.type === 'text') {
                return (
                  <TextNode
                    key={element.id}
                    id={element.id}
                    text={element.text || ''}
                    x={element.x}
                    y={element.y}
                    fontSize={element.fontSize}
                    fontFamily={element.fontFamily}
                    fontStyle={element.fontStyle}
                    textDecoration={element.textDecoration}
                    textAlign={element.textAlign}
                    fill={element.fill}
                    width={element.width}
                    rotation={element.rotation}
                    opacity={element.opacity}
                    lineHeight={element.lineHeight}
                    letterSpacing={element.letterSpacing}
                    listType={element.listType}
                    textTransform={element.textTransform}
                    isSelected={element.id === selectedElementId}
                    isSelectMode={isSelectMode}
                    onSelect={() => setSelectedElement(element.id)}
                    onChange={(updates) => updateElement(pageId, element.id, updates)}
                  />
                );
              }

              return null;
            })}

            {currentLine && (
              <Line
                points={currentLine}
                stroke={activeTool === 'eraser' ? '#ffffff' : strokeColor}
                strokeWidth={activeTool === 'eraser' ? strokeWidth * 3 : strokeWidth}
                tension={0.5}
                lineCap="round"
                lineJoin="round"
              />
            )}
          </Layer>
        </Stage>
      </div>
    );
  }
);

CanvasPage.displayName = 'CanvasPage';

export default CanvasPage;
