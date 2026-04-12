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
  const isSaved = useRef(false);

  useEffect(() => {
    // Small timeout to ensure the textarea is mounted and styled before focusing
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        const length = textareaRef.current.value.length;
        textareaRef.current.setSelectionRange(length, length);
        
        // Auto-resize to fit content
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
      }
    }, 50);
  }, [textItem.id]);

  const saveAndClose = () => {
    if (isSaved.current) return;
    isSaved.current = true;
    if (value.trim() !== textItem.text) {
      onUpdate({ text: value });
    }
    onBlur();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    e.stopPropagation();
    
    if (e.key === 'Enter' && e.shiftKey) {
      // Allow multi-line typing
      return;
    } else if (e.key === 'Enter') {
      e.preventDefault();
      saveAndClose();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      saveAndClose();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onBlur={saveAndClose}
      style={{
        position: 'absolute',
        left: `${textItem.x}px`,
        top: `${textItem.y}px`,
        width: `${textItem.width || 200}px`,
        fontSize: `${textItem.fontSize || 32}px`,
        fontFamily: textItem.fontFamily || 'Arial',
        fontWeight: textItem.fontStyle?.includes('bold') ? 'bold' : 'normal',
        fontStyle: textItem.fontStyle?.includes('italic') ? 'italic' : 'normal',
        textDecoration: textItem.textDecoration || 'none',
        textAlign: (textItem.textAlign as any) || 'center',
        color: textItem.fill || '#000000',
        opacity: textItem.opacity ?? 1,
        lineHeight: textItem.lineHeight ?? 1.2,
        letterSpacing: `${textItem.letterSpacing ?? 0}px`,
        background: 'rgba(255, 255, 255, 0.95)',
        border: '2px solid #3B82F6',
        borderRadius: '4px',
        outline: 'none',
        resize: 'none',
        minWidth: '200px',
        maxWidth: '600px',
        zIndex: 1000,
        whiteSpace: 'pre-wrap',
        overflow: 'hidden',
        padding: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      }}
      rows={1}
    />
  );
}
