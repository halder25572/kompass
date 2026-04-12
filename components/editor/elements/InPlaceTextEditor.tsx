"use client";

import { useState, useRef, useEffect } from 'react';
import { PageElement } from '@/store/useBookStore';

interface InPlaceTextEditorProps {
  textItem: PageElement;
  onUpdate: (updates: Partial<PageElement>) => void;
  onBlur: () => void;
}

export function InPlaceTextEditor({ textItem, onUpdate, onBlur }: InPlaceTextEditorProps) {
  const [value, setValue] = useState(textItem.text || '');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.select();
    }
  }, []);

  const handleBlur = () => {
    if (value.trim()) {
      onUpdate({ text: value });
    }
    onBlur();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleBlur();
    }
  };

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      style={{
        position: 'absolute',
        left: `${textItem.x}px`,
        top: `${textItem.y}px`,
        width: `${textItem.width || 200}px`,
        fontSize: `${textItem.fontSize || 32}px`,
        fontFamily: textItem.fontFamily || 'Arial',
        color: textItem.fill || '#000000',
        textAlign: (textItem.textAlign as any) || 'center',
        border: '2px solid #4A90E2',
        outline: 'none',
        resize: 'none',
        background: 'rgba(255, 255, 255, 0.95)',
        padding: '4px',
        overflow: 'hidden',
        lineHeight: '1.2',
      }}
      rows={1}
    />
  );
}
