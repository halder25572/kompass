"use client";

import { useRef, useEffect } from 'react';
import { Rect, Circle, Transformer } from 'react-konva';
import Konva from 'konva';

interface ShapeNodeProps {
  id: string;
  shapeType: 'rect' | 'circle';
  x: number;
  y: number;
  width?: number;
  height?: number;
  radius?: number;
  fill?: string;
  stroke?: string;
  rotation?: number;
  isSelected: boolean;
  isSelectMode: boolean;
  onSelect: () => void;
  onChange: (updates: any) => void;
}

export default function ShapeNode({ 
  id, shapeType, x, y, width = 100, height = 100, radius = 50, 
  fill = '#ffffff', stroke = '#000000', rotation = 0,
  isSelected, isSelectMode, onSelect, onChange 
}: ShapeNodeProps) {
  const shapeRef = useRef<Konva.Circle | Konva.Rect>(null);
  const trRef = useRef<Konva.Transformer>(null);

  useEffect(() => {
    if (isSelected && trRef.current && shapeRef.current && isSelectMode) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer()?.batchDraw();
    }
  }, [isSelected, isSelectMode]);

  const handleTransformEnd = () => {
    const node = shapeRef.current;
    if (!node) return;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();
    node.scaleX(1);
    node.scaleY(1);

    if (shapeType === 'circle') {
      onChange({
        x: node.x(),
        y: node.y(),
        radius: Math.max(5, radius * scaleX),
        rotation: node.rotation(),
      });
    } else {
      onChange({
        x: node.x(),
        y: node.y(),
        width: Math.max(5, width * scaleX),
        height: Math.max(5, height * scaleY),
        rotation: node.rotation(),
      });
    }
  };

  if (shapeType === 'circle') {
    return (
      <>
        <Circle
          ref={shapeRef as any}
          x={x}
          y={y}
          radius={radius}
          fill={fill}
          stroke={stroke}
          rotation={rotation}
          draggable={isSelectMode}
          onClick={onSelect}
          onTap={onSelect}
          onDragEnd={(e) => onChange({ x: e.target.x(), y: e.target.y() })}
          onTransformEnd={handleTransformEnd}
        />
        {isSelected && isSelectMode && <Transformer ref={trRef} />}
      </>
    );
  }

  return (
    <>
      <Rect
        ref={shapeRef as any}
        x={x}
        y={y}
        width={width}
        height={height}
        fill={fill}
        stroke={stroke}
        rotation={rotation}
        draggable={isSelectMode}
        onClick={onSelect}
        onTap={onSelect}
        onDragEnd={(e) => onChange({ x: e.target.x(), y: e.target.y() })}
        onTransformEnd={handleTransformEnd}
      />
      {isSelected && isSelectMode && <Transformer ref={trRef} />}
    </>
  );
}
