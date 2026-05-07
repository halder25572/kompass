// /* eslint-disable react-hooks/purity */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { useState, useRef, forwardRef } from 'react';
// import { Stage, Layer, Line } from 'react-konva';
// import { useBookStore } from '@/store/useBookStore';
// import Konva from 'konva';
// import ImageNode from './elements/ImageNode';
// import ShapeNode from './elements/ShapeNode';
// import TextNode from './elements/TextNode';

// interface CanvasPageProps {
//   pageId: number;
//   width: number;
//   height: number;
//   stageRef?: (node: Konva.Stage | null) => void;
// }

// const CanvasPage = forwardRef<HTMLDivElement, CanvasPageProps>(
//   ({ pageId, width, height, stageRef }, ref) => {
//     const [currentLine, setCurrentLine] = useState<number[] | null>(null);
//     const isDrawing = useRef(false);

//     const pages = useBookStore((state) => state.pages);
//     const activeTool = useBookStore((state) => state.activeTool);
//     const strokeColor = useBookStore((state) => state.strokeColor);
//     const strokeWidth = useBookStore((state) => state.strokeWidth);
//     const selectedElementId = useBookStore((state) => state.selectedElementId);
//     const addElement = useBookStore((state) => state.addElement);
//     const updateElement = useBookStore((state) => state.updateElement);
//     const setSelectedElement = useBookStore((state) => state.setSelectedElement);

//     const page = pages.find((p) => p.id === pageId);
//     const isSelectMode = activeTool === 'select';

//     const handleMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
//       const clickedOnEmpty = e.target === e.target.getStage();
//       if (clickedOnEmpty) {
//         setSelectedElement(null);
//       }

//       if (activeTool === 'pen' || activeTool === 'eraser') {
//         isDrawing.current = true;
//         const pos = e.target.getStage()?.getPointerPosition();
//         if (pos) {
//           setCurrentLine([pos.x, pos.y]);
//         }
//       }
//     };

//     const handleMouseMove = (e: Konva.KonvaEventObject<MouseEvent>) => {
//       if (!isDrawing.current || !currentLine) return;
//       const pos = e.target.getStage()?.getPointerPosition();
//       if (pos) {
//         setCurrentLine([...currentLine, pos.x, pos.y]);
//       }
//     };

//     const handleMouseUp = () => {
//       if (!isDrawing.current || !currentLine) return;
//       isDrawing.current = false;

//       addElement(pageId, {
//         id: `line-${Date.now()}-${Math.random()}`,
//         type: 'line',
//         x: 0,
//         y: 0,
//         points: currentLine,
//         stroke: activeTool === 'eraser' ? '#ffffff' : strokeColor,
//         strokeWidth: activeTool === 'eraser' ? strokeWidth * 3 : strokeWidth,
//         zIndex: page?.elements.length || 0,
//       });

//       setCurrentLine(null);
//     };

//     return (
//       <div ref={ref} className="bg-white h-full w-full relative">
//         <Stage
//           ref={stageRef}
//           width={width}
//           height={height}
//           onMouseDown={handleMouseDown}
//           onMouseMove={handleMouseMove}
//           onMouseUp={handleMouseUp}
//           onTouchStart={handleMouseDown as any}
//           onTouchMove={handleMouseMove as any}
//           onTouchEnd={handleMouseUp}
//         >
//           <Layer>
//             {page?.elements.map((element) => {
//               if (element.type === 'line') {
//                 return (
//                   <Line
//                     key={element.id}
//                     points={element.points || []}
//                     stroke={element.stroke}
//                     strokeWidth={element.strokeWidth}
//                     tension={0.5}
//                     lineCap="round"
//                     lineJoin="round"
//                   />
//                 );
//               }

//               if (element.type === 'image') {
//                 return (
//                   <ImageNode
//                     key={element.id}
//                     id={element.id}
//                     src={element.src || ''}
//                     x={element.x}
//                     y={element.y}
//                     width={element.width || 100}
//                     height={element.height || 100}
//                     rotation={element.rotation}
//                     isSelected={element.id === selectedElementId}
//                     isSelectMode={isSelectMode}
//                     onSelect={() => setSelectedElement(element.id)}
//                     onChange={(updates) => updateElement(pageId, element.id, updates)}
//                   />
//                 );
//               }

//               if (element.type === 'shape') {
//                 return (
//                   <ShapeNode
//                     key={element.id}
//                     id={element.id}
//                     shapeType={element.shapeType || 'rect'}
//                     x={element.x}
//                     y={element.y}
//                     width={element.width}
//                     height={element.height}
//                     radius={element.radius}
//                     fill={element.fill}
//                     stroke={element.stroke}
//                     rotation={element.rotation}
//                     isSelected={element.id === selectedElementId}
//                     isSelectMode={isSelectMode}
//                     onSelect={() => setSelectedElement(element.id)}
//                     onChange={(updates) => updateElement(pageId, element.id, updates)}
//                   />
//                 );
//               }

//               if (element.type === 'text') {
//                 return (
//                   <TextNode
//                     key={element.id}
//                     id={element.id}
//                     text={element.text || ''}
//                     x={element.x}
//                     y={element.y}
//                     fontSize={element.fontSize}
//                     fontFamily={element.fontFamily}
//                     fontStyle={element.fontStyle}
//                     textDecoration={element.textDecoration}
//                     textAlign={element.textAlign}
//                     fill={element.fill}
//                     width={element.width}
//                     rotation={element.rotation}
//                     opacity={element.opacity}
//                     lineHeight={element.lineHeight}
//                     letterSpacing={element.letterSpacing}
//                     listType={element.listType}
//                     textTransform={element.textTransform}
//                     isSelected={element.id === selectedElementId}
//                     isSelectMode={isSelectMode}
//                     onSelect={() => setSelectedElement(element.id)}
//                     onChange={(updates) => updateElement(pageId, element.id, updates)}
//                   />
//                 );
//               }

//               return null;
//             })}

//             {currentLine && (
//               <Line
//                 points={currentLine}
//                 stroke={activeTool === 'eraser' ? '#ffffff' : strokeColor}
//                 strokeWidth={activeTool === 'eraser' ? strokeWidth * 3 : strokeWidth}
//                 tension={0.5}
//                 lineCap="round"
//                 lineJoin="round"
//               />
//             )}
//           </Layer>
//         </Stage>
//       </div>
//     );
//   }
// );

// CanvasPage.displayName = 'CanvasPage';

// export default CanvasPage;



/* eslint-disable react-hooks/purity */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useRef, forwardRef } from "react";
import { Stage, Layer, Line, Rect, Ellipse, Line as KLine } from "react-konva";
import { useBookStore } from "@/store/useBookStore";
import Konva from "konva";
import ImageNode from "./elements/ImageNode";
import ShapeNode from "./elements/ShapeNode";
import TextNode from "./elements/TextNode";

interface CanvasPageProps {
  pageId: number;
  width: number;
  height: number;
  stageRef?: (node: Konva.Stage | null) => void;
}

interface DrawingShape {
  type: "rect" | "circle" | "line";
  x: number;
  y: number;
  x2: number;
  y2: number;
}

const CanvasPage = forwardRef<HTMLDivElement, CanvasPageProps>(
  ({ pageId, width, height, stageRef }, ref) => {
    const [currentLine, setCurrentLine] = useState<number[] | null>(null);
    const [drawingShape, setDrawingShape] = useState<DrawingShape | null>(null);
    const isDrawing = useRef(false);
    const startPos = useRef<{ x: number; y: number } | null>(null);

    const pages = useBookStore((s) => s.pages);
    const activeTool = useBookStore((s) => s.activeTool);
    const strokeColor = useBookStore((s) => s.strokeColor);
    const strokeWidth = useBookStore((s) => s.strokeWidth);
    const selectedElementId = useBookStore((s) => s.selectedElementId);
    const addElement = useBookStore((s) => s.addElement);
    const updateElement = useBookStore((s) => s.updateElement);
    const setSelectedElement = useBookStore((s) => s.setSelectedElement);

    const page = pages.find((p) => p.id === pageId);
    const isSelectMode = activeTool === "select";

    const getPos = (e: Konva.KonvaEventObject<MouseEvent | TouchEvent>) =>
      e.target.getStage()?.getPointerPosition() ?? null;

    const handleMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
      if (e.target === e.target.getStage()) setSelectedElement(null);

      const pos = getPos(e);
      if (!pos) return;

      if (activeTool === "pen" || activeTool === "eraser") {
        isDrawing.current = true;
        setCurrentLine([pos.x, pos.y]);
      }

      if (activeTool === "rect" || activeTool === "circle" || activeTool === "line") {
        isDrawing.current = true;
        startPos.current = pos;
        setDrawingShape({ type: activeTool, x: pos.x, y: pos.y, x2: pos.x, y2: pos.y });
      }
    };

    const handleMouseMove = (e: Konva.KonvaEventObject<MouseEvent>) => {
      if (!isDrawing.current) return;
      const pos = getPos(e);
      if (!pos) return;

      if (activeTool === "pen" || activeTool === "eraser") {
        setCurrentLine((prev) => (prev ? [...prev, pos.x, pos.y] : [pos.x, pos.y]));
      }

      if (drawingShape) {
        setDrawingShape((prev) => prev ? { ...prev, x2: pos.x, y2: pos.y } : prev);
      }
    };

    const handleMouseUp = () => {
      if (!isDrawing.current) return;
      isDrawing.current = false;

      // commit freehand line
      if ((activeTool === "pen" || activeTool === "eraser") && currentLine && currentLine.length > 2) {
        addElement(pageId, {
          id: `line-${Date.now()}-${Math.random()}`,
          type: "line",
          x: 0,
          y: 0,
          points: currentLine,
          stroke: activeTool === "eraser" ? (page?.background ?? "#ffffff") : strokeColor,
          strokeWidth: activeTool === "eraser" ? strokeWidth * 3 : strokeWidth,
          zIndex: page?.elements.length || 0,
        });
        setCurrentLine(null);
      }

      // commit shape
      if (drawingShape && startPos.current) {
        const { type, x, y, x2, y2 } = drawingShape;
        const minW = Math.abs(x2 - x);
        const minH = Math.abs(y2 - y);
        if (minW > 4 || minH > 4) {
          if (type === "rect") {
            addElement(pageId, {
              id: `shape-${Date.now()}`,
              type: "shape",
              shapeType: "rect",
              x: Math.min(x, x2),
              y: Math.min(y, y2),
              width: minW,
              height: minH,
              fill: "transparent",
              stroke: strokeColor,
              strokeWidth,
              zIndex: page?.elements.length || 0,
            });
          } else if (type === "circle") {
            addElement(pageId, {
              id: `shape-${Date.now()}`,
              type: "shape",
              shapeType: "circle",
              x: Math.min(x, x2) + minW / 2,
              y: Math.min(y, y2) + minH / 2,
              width: minW,
              height: minH,
              radius: Math.max(minW, minH) / 2,
              fill: "transparent",
              stroke: strokeColor,
              strokeWidth,
              zIndex: page?.elements.length || 0,
            });
          } else if (type === "line") {
            addElement(pageId, {
              id: `line-${Date.now()}`,
              type: "line",
              x: 0,
              y: 0,
              points: [x, y, x2, y2],
              stroke: strokeColor,
              strokeWidth,
              zIndex: page?.elements.length || 0,
            });
          }
        }
        setDrawingShape(null);
        startPos.current = null;
      }
    };

    const sortedElements = page
      ? [...page.elements].sort((a, b) => a.zIndex - b.zIndex)
      : [];

    return (
      <div ref={ref} className="h-full w-full relative" style={{ background: page?.background ?? "#ffffff" }}>
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
          style={{ cursor: activeTool === "select" ? "default" : "crosshair" }}
        >
          <Layer>
            {sortedElements.map((element) => {
              if (element.type === "line") {
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

              if (element.type === "image") {
                return (
                  <ImageNode
                    key={element.id}
                    id={element.id}
                    src={element.src || ""}
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

              if (element.type === "shape") {
                return (
                  <ShapeNode
                    key={element.id}
                    id={element.id}
                    shapeType={element.shapeType === "circle" ? "circle" : "rect"}
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

              if (element.type === "text") {
                return (
                  <TextNode
                    key={element.id}
                    id={element.id}
                    text={element.text || ""}
                    x={element.x}
                    y={element.y}
                    fontSize={element.fontSize}
                    fontFamily={element.fontFamily}
                    fontStyle={element.fontStyle}
                    textDecoration={element.textDecoration}
                    textAlign={element.textAlign as "left" | "center" | "right" | undefined}
                    fill={element.fill}
                    width={element.width}
                    rotation={element.rotation}
                    opacity={element.opacity}
                    lineHeight={element.lineHeight}
                    letterSpacing={element.letterSpacing}
                    listType={element.listType as "number" | "none" | "bullet" | undefined}
                    textTransform={element.textTransform as "none" | "uppercase" | "lowercase" | "capitalize" | undefined}
                    isSelected={element.id === selectedElementId}
                    isSelectMode={isSelectMode}
                    onSelect={() => setSelectedElement(element.id)}
                    onChange={(updates) => updateElement(pageId, element.id, updates)}
                  />
                );
              }

              return null;
            })}

            {/* live freehand preview */}
            {currentLine && (
              <Line
                points={currentLine}
                stroke={activeTool === "eraser" ? (page?.background ?? "#ffffff") : strokeColor}
                strokeWidth={activeTool === "eraser" ? strokeWidth * 3 : strokeWidth}
                tension={0.5}
                lineCap="round"
                lineJoin="round"
              />
            )}

            {/* live shape preview */}
            {drawingShape && drawingShape.type === "rect" && (
              <Rect
                x={Math.min(drawingShape.x, drawingShape.x2)}
                y={Math.min(drawingShape.y, drawingShape.y2)}
                width={Math.abs(drawingShape.x2 - drawingShape.x)}
                height={Math.abs(drawingShape.y2 - drawingShape.y)}
                fill="transparent"
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                dash={[6, 3]}
              />
            )}
            {drawingShape && drawingShape.type === "circle" && (
              <Ellipse
                x={Math.min(drawingShape.x, drawingShape.x2) + Math.abs(drawingShape.x2 - drawingShape.x) / 2}
                y={Math.min(drawingShape.y, drawingShape.y2) + Math.abs(drawingShape.y2 - drawingShape.y) / 2}
                radiusX={Math.abs(drawingShape.x2 - drawingShape.x) / 2}
                radiusY={Math.abs(drawingShape.y2 - drawingShape.y) / 2}
                fill="transparent"
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                dash={[6, 3]}
              />
            )}
            {drawingShape && drawingShape.type === "line" && (
              <KLine
                points={[drawingShape.x, drawingShape.y, drawingShape.x2, drawingShape.y2]}
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                lineCap="round"
                dash={[6, 3]}
              />
            )}
          </Layer>
        </Stage>
      </div>
    );
  }
);

CanvasPage.displayName = "CanvasPage";

export default CanvasPage;