"use client";

import { useRef, useEffect } from 'react';
import { Text, Transformer } from 'react-konva';
import Konva from 'konva';

interface TextNodeProps {
  id: string;
  text: string;
  x: number;
  y: number;
  fontSize?: number;
  fill?: string;
  rotation?: number;
  isSelected: boolean;
  isSelectMode: boolean;
  onSelect: () => void;
  onChange: (updates: any) => void;
}

export default function TextNode({ 
  id, text, x, y, fontSize = 16, fill = '#000000', rotation = 0,
  isSelected, isSelectMode, onSelect, onChange 
}: TextNodeProps) {
  const textRef = useRef<Konva.Text>(null);
  const trRef = useRef<Konva.Transformer>(null);

  useEffect(() => {
    if (isSelected && trRef.current && textRef.current && isSelectMode) {
      trRef.current.nodes([textRef.current]);
      trRef.current.getLayer()?.batchDraw();
    }
  }, [isSelected, isSelectMode]);

  return (
    <>
      <Text
        ref={textRef}
        text={text}
        x={x}
        y={y}
        fontSize={fontSize}
        fill={fill}
        rotation={rotation}
        draggable={isSelectMode}
        onClick={onSelect}
        onTap={onSelect}
        onDragEnd={(e) => {
          onChange({ x: e.target.x(), y: e.target.y() });
        }}
        onTransformEnd={() => {
          const node = textRef.current;
          if (!node) return;
          const scaleX = node.scaleX();
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            x: node.x(),
            y: node.y(),
            fontSize: Math.max(5, fontSize * scaleX),
            rotation: node.rotation(),
          });
        }}
      />
      {isSelected && isSelectMode && <Transformer ref={trRef} />}
    </>
  );
}
