'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

interface EditableTextProps {
  value: string;
  onSave: (value: string) => Promise<void> | void;
  isEditable?: boolean;
  tag?: React.ElementType;
  className?: string;
  placeholder?: string;
  multiline?: boolean;
  rows?: number;
}

export default function EditableText({
  value,
  onSave,
  isEditable = false,
  tag: Tag = 'span',
  className = '',
  placeholder = 'Click to edit...',
  multiline = false,
  rows = 3,
}: EditableTextProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const [isSaving, setIsSaving] = useState(false);
  const [inputStyles, setInputStyles] = useState<Record<string, string>>({});
  const displayRef = useRef<HTMLElement>(null);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const originalValueRef = useRef(value);

  useEffect(() => {
    if (!isEditing || (isEditing && value !== editValue)) {
      setEditValue(value);
      originalValueRef.current = value;
    }
  }, [value, isEditing, editValue, isSaving]);

  const stripHtmlTags = (html: string): string => {
    if (!html) return '';
    return html.replace(/<[^>]*>/g, '');
  };

  const getCleanText = (htmlText: string): string => {
    return stripHtmlTags(htmlText);
  };

  const startEditing = useCallback(() => {
    if (!isEditable || isSaving) return;
    if (displayRef.current) {
      const computedStyle = window.getComputedStyle(displayRef.current);
      const stylesToCopy = ['fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'letterSpacing', 'textAlign', 'color', 'backgroundColor', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft'];
      const copiedStyles: Record<string, string> = {};
      stylesToCopy.forEach(style => {
        const styleValue = computedStyle.getPropertyValue(style);
        if (styleValue && styleValue !== 'none') copiedStyles[style] = styleValue;
      });
      setInputStyles(copiedStyles);
    }
    setEditValue(getCleanText(value));
    originalValueRef.current = value;
    setIsEditing(true);
  }, [isEditable, value, isSaving]);

  const saveEdit = useCallback(async () => {
    if (!isEditing || isSaving) return;
    const cleanValue = editValue.trim();
    const originalClean = getCleanText(originalValueRef.current);
    if (cleanValue !== originalClean) {
      setIsSaving(true);
      try { await onSave(cleanValue); }
      catch (error) { console.error('Failed to save:', error); setEditValue(originalClean); setIsSaving(false); }
    } else { setIsEditing(false); setIsSaving(false); }
  }, [isEditing, editValue, onSave, isSaving]);

  useEffect(() => {
    if (isSaving && value === editValue && value !== originalValueRef.current) { setIsSaving(false); setIsEditing(false); }
  }, [isSaving, value, editValue]);

  const cancelEdit = useCallback(() => {
    if (isSaving) return;
    setEditValue(getCleanText(originalValueRef.current));
    setIsEditing(false);
  }, [isSaving]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline && !e.shiftKey) { e.preventDefault(); saveEdit(); }
    else if (e.key === 'Escape') { cancelEdit(); }
  }, [saveEdit, cancelEdit, multiline]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      if (!multiline && inputRef.current instanceof HTMLInputElement) inputRef.current.select();
    }
  }, [isEditing, multiline]);

  if (!isEditing) {
    const displayValue = getCleanText(value) || placeholder;
    return (
      <Tag ref={displayRef} onClick={startEditing} className={`${className} ${isEditable ? 'cursor-pointer hover:bg-[var(--surface)] transition-colors rounded px-1 -mx-1' : ''}`} style={isEditable ? { minHeight: '1.5em' } : undefined}>
        {displayValue === placeholder && isEditable ? (<span className="text-[var(--text-muted)] italic">{placeholder}</span>) : displayValue}
      </Tag>
    );
  }

  const commonInputProps = {
    value: editValue,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setEditValue(e.target.value),
    onBlur: saveEdit,
    onKeyDown: handleKeyDown,
    className: `${className} w-full px-3 py-2 border border-[var(--border)] rounded-[var(--radius-md)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent ${isSaving ? 'opacity-50' : ''}`,
    placeholder: placeholder,
    disabled: isSaving,
    style: inputStyles,
  };

  if (multiline) {
    return <textarea ref={inputRef as React.RefObject<HTMLTextAreaElement>} rows={rows} {...commonInputProps} />;
  }

  return <input ref={inputRef as React.RefObject<HTMLInputElement>} type="text" {...commonInputProps} />;
}
