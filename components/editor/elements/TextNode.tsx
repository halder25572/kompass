"use client";

import { useRef, useEffect, useState } from 'react';
import { Text, Transformer } from 'react-konva';
import { Html } from 'react-konva-utils';
import Konva from 'konva';
import { InPlaceTextEditor } from './InPlaceTextEditor';
import { PageElement } from '@/store/useBookStore';

interface TextNodeProps {
  id: string;
  text: string;
  x: number;
  y: number;
  fontSize?: number;
  fontFamily?: string;
  fontStyle?: string;
  textDecoration?: string;
  textAlign?: string;
  fill?: string;
  width?: number;
  rotation?: number;
  isSelected: boolean;
  isSelectMode: boolean;
  onSelect: () => void;
  onChange: (updates: any) => void;
}

export default function TextNode({ 
  id, text, x, y, fontSize = 32, fontFamily = 'Arial', fontStyle, textDecoration,
  textAlign = 'center', fill = '#000000', width = 200, rotation = 0,
  isSelected, isSelectMode, onSelect, onChange 
}: TextNodeProps) {
  const [isEditing, setIsEditing] = useState(false);
  const textRef = useRef<Konva.Text>(null);
  const trRef = useRef<Konva.Transformer>(null);

  useEffect(() => {
    if (isSelected && trRef.current && textRef.current && isSelectMode && !isEditing) {
      trRef.current.nodes([textRef.current]);
      trRef.current.getLayer()?.batchDraw();
    }
  }, [isSelected, isSelectMode, isEditing]);

  const handleDoubleClick = () => {
    if (isSelectMode) {
      setIsEditing(true);
    }
  };

  const handleTextUpdate = (updates: Partial<PageElement>) => {
    onChange(updates);
    setIsEditing(false);
  };

  const textItem: PageElement = {
    id,
    type: 'text',
    text,
    x,
    y,
    fontSize,
    fontFamily,
    fontStyle,
    textDecoration,
    textAlign,
    fill,
    width,
    rotation,
    zIndex: 0,
  };

  return (
    <>
      {!isEditing && (
        <Text
          ref={textRef}
          text={text}
          x={x}
          y={y}
          fontSize={fontSize}
          fontFamily={fontFamily}
          fontStyle={fontStyle}
          textDecoration={textDecoration}
          align={textAlign}
          fill={fill}
          width={width}
          rotation={rotation}
          draggable={isSelectMode}
          onClick={onSelect}
          onTap={onSelect}
          onDblClick={handleDoubleClick}
          onDblTap={handleDoubleClick}
          onDragEnd={(e) => {
            onChange({ x: e.target.x(), y: e.target.y() });
          }}
          onTransformEnd={() => {
            const node = textRef.current;
            if (!node) return;
            const scaleX = node.scaleX();
            const scaleY = node.scaleY();
            node.scaleX(1);
            node.scaleY(1);
            onChange({
              x: node.x(),
              y: node.y(),
              width: Math.max(50, node.width() * scaleX),
              fontSize: Math.max(8, fontSize * scaleY),
              rotation: node.rotation(),
            });
          }}
        />
      )}
      
      {isSelected && isSelectMode && !isEditing && (
        <Transformer 
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 50) return oldBox;
            return newBox;
          }}
          enabledAnchors={['middle-left', 'middle-right']}
        />
      )}

      {isEditing && (
        <Html
          divProps={{
            style: {
              position: 'absolute',
              top: 0,
              left: 0,
              pointerEvents: 'auto',
            }
          }}
        >
          <InPlaceTextEditor
            textItem={textItem}
            onUpdate={handleTextUpdate}
            onBlur={() => setIsEditing(false)}
          />
        </Html>
      )}
    </>
  );
}
