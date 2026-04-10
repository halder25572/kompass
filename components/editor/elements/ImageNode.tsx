"use client";

import { useRef, useEffect } from 'react';
import { Image as KonvaImage, Transformer } from 'react-konva';
import Konva from 'konva';

interface ImageNodeProps {
  id: string;
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation?: number;
  isSelected: boolean;
  isSelectMode: boolean;
  onSelect: () => void;
  onChange: (updates: any) => void;
}

export default function ImageNode({ 
  id, src, x, y, width, height, rotation = 0, 
  isSelected, isSelectMode, onSelect, onChange 
}: ImageNodeProps) {
  const imageRef = useRef<Konva.Image>(null);
  const trRef = useRef<Konva.Transformer>(null);
  const imgElement = useRef<HTMLImageElement>();

  useEffect(() => {
    const img = new window.Image();
    img.src = src;
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      imgElement.current = img;
      imageRef.current?.getLayer()?.batchDraw();
    };
  }, [src]);

  useEffect(() => {
    if (isSelected && trRef.current && imageRef.current && isSelectMode) {
      trRef.current.nodes([imageRef.current]);
      trRef.current.getLayer()?.batchDraw();
    }
  }, [isSelected, isSelectMode]);

  return (
    <>
      <KonvaImage
        ref={imageRef}
        image={imgElement.current}
        x={x}
        y={y}
        width={width}
        height={height}
        rotation={rotation}
        draggable={isSelectMode}
        onClick={onSelect}
        onTap={onSelect}
        onDragEnd={(e) => {
          onChange({ x: e.target.x(), y: e.target.y() });
        }}
        onTransformEnd={() => {
          const node = imageRef.current;
          if (!node) return;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            x: node.x(),
            y: node.y(),
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(5, node.height() * scaleY),
            rotation: node.rotation(),
          });
        }}
      />
      {isSelected && isSelectMode && <Transformer ref={trRef} />}
    </>
  );
}
