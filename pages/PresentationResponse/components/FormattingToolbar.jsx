/* eslint-disable */
import React from 'react';

const FormattingToolbar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px',
      padding: '8px',
      backgroundColor: '#f0f0f0',
      borderRadius: '5px',
      marginBottom: '8px',
    }}>
      <div style={{ display: 'flex', gap: '4px' }}>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
          style={{
            padding: '4px 8px',
            backgroundColor: editor.isActive('heading', { level: 1 }) ? '#9D74FF' : '#e0e0e0',
            borderRadius: '3px',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          H1
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
          style={{
            padding: '4px 8px',
            backgroundColor: editor.isActive('heading', { level: 2 }) ? '#9D74FF' : '#e0e0e0',
            borderRadius: '3px',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
          style={{
            padding: '4px 8px',
            backgroundColor: editor.isActive('heading', { level: 3 }) ? '#9D74FF' : '#e0e0e0',
            borderRadius: '3px',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          H3
        </button>
      </div>
      
      <div style={{ display: 'flex', gap: '4px' }}>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'is-active' : ''}
          style={{
            padding: '4px 8px',
            backgroundColor: editor.isActive('bold') ? '#9D74FF' : '#e0e0e0',
            borderRadius: '3px',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <strong>B</strong>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'is-active' : ''}
          style={{
            padding: '4px 8px',
            backgroundColor: editor.isActive('italic') ? '#9D74FF' : '#e0e0e0',
            borderRadius: '3px',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <em>I</em>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive('underline') ? 'is-active' : ''}
          style={{
            padding: '4px 8px',
            backgroundColor: editor.isActive('underline') ? '#9D74FF' : '#e0e0e0',
            borderRadius: '3px',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <u>U</u>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive('strike') ? 'is-active' : ''}
          style={{
            padding: '4px 8px',
            backgroundColor: editor.isActive('strike') ? '#9D74FF' : '#e0e0e0',
            borderRadius: '3px',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <s>S</s>
        </button>
      </div>
      
      <div style={{ display: 'flex', gap: '4px' }}>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'is-active' : ''}
          style={{
            padding: '4px 8px',
            backgroundColor: editor.isActive('bulletList') ? '#9D74FF' : '#e0e0e0',
            borderRadius: '3px',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          • List
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'is-active' : ''}
          style={{
            padding: '4px 8px',
            backgroundColor: editor.isActive('orderedList') ? '#9D74FF' : '#e0e0e0',
            borderRadius: '3px',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          1. List
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive('blockquote') ? 'is-active' : ''}
          style={{
            padding: '4px 8px',
            backgroundColor: editor.isActive('blockquote') ? '#9D74FF' : '#e0e0e0',
            borderRadius: '3px',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Quote
        </button>
      </div>
      
      <div style={{ display: 'flex', gap: '4px' }}>
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          style={{
            padding: '4px 8px',
            backgroundColor: '#e0e0e0',
            borderRadius: '3px',
            border: 'none',
            cursor: editor.can().undo() ? 'pointer' : 'not-allowed',
            opacity: editor.can().undo() ? 1 : 0.5,
          }}
        >
          ↩ Undo
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          style={{
            padding: '4px 8px',
            backgroundColor: '#e0e0e0',
            borderRadius: '3px',
            border: 'none',
            cursor: editor.can().redo() ? 'pointer' : 'not-allowed',
            opacity: editor.can().redo() ? 1 : 0.5,
          }}
        >
          ↪ Redo
        </button>
      </div>
    </div>
  );
};

export default FormattingToolbar;