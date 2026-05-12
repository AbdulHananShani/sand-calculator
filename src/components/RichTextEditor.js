// ============================================================
// FILE: src/components/RichTextEditor.js
// PURPOSE: Rich text editor with full table support:
//          - Paste tables from Word/Google Docs
//          - Add/delete rows and columns
//          - Table toolbar controls
//          - All previous features maintained
// PLACEMENT: src/components/RichTextEditor.js (REPLACE)
// ============================================================

'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import { createPortal } from 'react-dom';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import { TextStyle } from '@tiptap/extension-text-style';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import { useRef, useCallback, useState, useEffect } from 'react';
import {
  Upload, Minus, Link2, RotateCcw, RotateCw,
  X, Image as ImageIcon, Save, Table as TableIcon,
  Plus, Trash2,
} from 'lucide-react';

// ── RichTextEditor Component ─────────────────────────────────
export default function RichTextEditor({ content, onChange, placeholder }) {

  const fileInputRef  = useRef(null);
  const editorWrapRef = useRef(null);

  // ── Image modal state ────────────────────────────────────
  const [showImageModal, setShowImageModal]       = useState(false);
  const [pendingImageUrl, setPendingImageUrl]     = useState('');
  const [imageAlt, setImageAlt]                   = useState('');
  const [imageTitle, setImageTitle]               = useState('');
  const [isUploading, setIsUploading]             = useState(false);
  const [isEditingExisting, setIsEditingExisting] = useState(false);

  // ── Table insert modal state ─────────────────────────────
  const [showTableModal, setShowTableModal] = useState(false);
  const [tableRows, setTableRows]           = useState(3);
  const [tableCols, setTableCols]           = useState(3);

  // ── Initialize Tiptap editor ─────────────────────────────
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4, 5, 6] },
        link: false, // use configured Link extension below
        underline: false, // use our configured Underline below
      }),

      // ── Image ──────────────────────────────────────────
      Image.configure({
        inline: false,
        allowBase64: false,
        HTMLAttributes: { class: 'blog-image' },
      }),

      // ── Link ───────────────────────────────────────────
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'editor-link',
          rel: 'noopener noreferrer',
          target: '_blank',
        },
      }),

      // ── Text formatting ─────────────────────────────────
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      TextStyle,

      // ── Placeholder ─────────────────────────────────────
      Placeholder.configure({
        placeholder: placeholder ||
          'Start writing or paste from Google Docs / Word...\n\nAll text formatting and tables are preserved automatically!',
      }),

      // ── Table extensions ─────────────────────────────────
      Table.configure({
        resizable: true,
        HTMLAttributes: { class: 'editor-table' },
      }),
      TableRow.configure({
        HTMLAttributes: { class: 'editor-table-row' },
      }),
      TableHeader.configure({
        HTMLAttributes: { class: 'editor-table-header' },
      }),
      TableCell.configure({
        HTMLAttributes: { class: 'editor-table-cell' },
      }),
    ],

    content: content || '',
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: { class: 'tiptap-editor' },
    },
  });

  // ── Click on existing image to edit metadata ─────────────
  useEffect(() => {
    if (!editorWrapRef.current) return;
    const handleImageClick = (e) => {
      const img = e.target.closest('img.blog-image');
      if (!img) return;
      setPendingImageUrl(img.src);
      setImageAlt(img.alt    || '');
      setImageTitle(img.title || '');
      setIsEditingExisting(true);
      setShowImageModal(true);
    };
    const wrapper = editorWrapRef.current;
    wrapper.addEventListener('click', handleImageClick);
    return () => wrapper.removeEventListener('click', handleImageClick);
  }, [editor]);

  // ── Force re-render when cursor moves (fixes table controls) ──
  const [, forceUpdate] = useState(0);
  useEffect(() => {
    if (!editor) return;
    const update = () => forceUpdate(n => n + 1);
    editor.on('selectionUpdate', update);
    editor.on('transaction', update);
    return () => {
      editor.off('selectionUpdate', update);
      editor.off('transaction', update);
    };
  }, [editor]);

  
  // ── Handle image file upload ─────────────────────────────
  const handleFileSelected = useCallback(async (e) => {
    const file = e.target.files[0];
    if (!file || !editor) return;
    if (!file.type.startsWith('image/')) { alert('Please select an image file.'); return; }
    if (file.size > 5 * 1024 * 1024) { alert('Image must be under 5MB.'); return; }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res  = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.url) {
        setPendingImageUrl(data.url);
        setImageAlt(file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '));
        setImageTitle('');
        setIsEditingExisting(false);
        setShowImageModal(true);
      } else {
        alert('Upload failed. Please try again.');
      }
    } catch { alert('Upload error. Please try again.'); }
    finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  }, [editor]);

  // ── Insert new image ─────────────────────────────────────
  const handleInsertImage = useCallback(() => {
    if (!editor || !pendingImageUrl) return;
    editor.chain().focus().setImage({
      src:   pendingImageUrl,
      alt:   imageAlt   || 'Image',
      title: imageTitle || '',
    }).run();
    closeModal();
  }, [editor, pendingImageUrl, imageAlt, imageTitle]);

  // ── Update existing image metadata ───────────────────────
  const handleUpdateImageMeta = useCallback(() => {
    if (!editor || !pendingImageUrl) return;
    const { state, dispatch } = editor.view;
    const { tr, doc } = state;
    let updated = false;
    doc.descendants((node, pos) => {
      if (node.type.name === 'image' && node.attrs.src === pendingImageUrl) {
        tr.setNodeMarkup(pos, undefined, {
          ...node.attrs,
          alt:   imageAlt   || 'Image',
          title: imageTitle || '',
        });
        updated = true;
      }
    });
    if (updated) { dispatch(tr); onChange(editor.getHTML()); }
    closeModal();
  }, [editor, pendingImageUrl, imageAlt, imageTitle, onChange]);

  // ── Close image modal ────────────────────────────────────
  const closeModal = () => {
    setShowImageModal(false);
    setPendingImageUrl('');
    setImageAlt('');
    setImageTitle('');
    setIsEditingExisting(false);
  };

  // ── Insert table ─────────────────────────────────────────
  const handleInsertTable = useCallback(() => {
    if (!editor) return;
    editor.chain().focus().insertTable({
      rows:        tableRows,
      cols:        tableCols,
      withHeaderRow: true,
    }).run();
    setShowTableModal(false);
    setTableRows(3);
    setTableCols(3);
  }, [editor, tableRows, tableCols]);

  // ── Handle link ──────────────────────────────────────────
  const handleAddLink = useCallback(() => {
    const url = window.prompt('Enter URL (include https://):');
    if (!url || !editor) return;
    editor.chain().focus().setLink({ href: url }).run();
  }, [editor]);

  if (!editor) return null;

  const wordCount = editor.getText().trim().split(/\s+/).filter(Boolean).length;

  // ── isInTable updates on every selection change ──────────
  // Using editor.isActive() directly in JSX ensures it
  // re-renders whenever cursor moves into/out of a table
  const isInTable = editor.isActive('table');

  // ── Toolbar button ───────────────────────────────────────
  const Btn = ({ onClick, active, children, title, accent }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`w-full flex items-center gap-2 px-3 py-2 text-xs rounded-lg border transition-all duration-150 text-left ${
        active
          ? 'bg-primary-600 text-white border-primary-500'
          : accent
          ? 'text-accent-400 bg-accent-500/10 border-accent-500/20 hover:bg-accent-500/20'
          : 'text-gray-300 hover:text-white border-gray-700/50 hover:bg-dark-700 bg-dark-800/50'
      }`}
    >
      {children}
    </button>
  );

  // ── Section label ────────────────────────────────────────
  const Label = ({ children }) => (
    <p className="text-gray-600 text-xs uppercase tracking-wider font-medium px-1 pt-3 pb-1 border-t border-gray-800 mt-1 first:border-t-0 first:pt-0 first:mt-0">
      {children}
    </p>
  );

  // ── Portal target ────────────────────────────────────────
  const modalRoot = typeof document !== 'undefined' ? document.body : null;

  return (
    <>
      {/* ── Image Metadata Modal — rendered in body via portal ── */}
      {showImageModal && modalRoot && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-dark-900 border border-gray-700 rounded-2xl p-6 w-full max-w-md mx-4 shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-white font-bold text-lg flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-primary-400" />
                {isEditingExisting ? 'Edit Image Details' : 'Image Details'}
              </h3>
              <button onClick={closeModal} className="text-gray-500 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="mb-4 rounded-xl overflow-hidden border border-gray-700 bg-dark-950 max-h-48 flex items-center justify-center">
              <img src={pendingImageUrl} alt="Preview" className="max-w-full max-h-48 object-contain" />
            </div>
            <div className="flex flex-col gap-2 mb-4">
              <label className="text-gray-300 text-sm font-medium">
                Alt Text <span className="text-red-400">*</span>
                <span className="text-gray-500 font-normal ml-2 text-xs">(SEO — required)</span>
              </label>
              <input
                type="text"
                value={imageAlt}
                onChange={(e) => setImageAlt(e.target.value)}
                placeholder="Describe the image for search engines..."
                className="input-field text-sm"
                autoFocus
              />
            </div>
            <div className="flex flex-col gap-2 mb-6">
              <label className="text-gray-300 text-sm font-medium">
                Image Title
                <span className="text-gray-500 font-normal ml-2 text-xs">(shown on hover)</span>
              </label>
              <input
                type="text"
                value={imageTitle}
                onChange={(e) => setImageTitle(e.target.value)}
                placeholder="e.g. Sand calculation for backyard patio"
                className="input-field text-sm"
              />
            </div>
            <div className="flex gap-3">
              {isEditingExisting ? (
                <button onClick={handleUpdateImageMeta} className="btn-primary flex-1 flex items-center justify-center gap-2">
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              ) : (
                <button onClick={handleInsertImage} className="btn-primary flex-1 flex items-center justify-center gap-2">
                  <ImageIcon className="w-4 h-4" />
                  Insert Image
                </button>
              )}
              <button onClick={closeModal} className="btn-secondary flex items-center gap-2">
                <X className="w-4 h-4" />
                Cancel
              </button>
            </div>
          </div>
        </div>,
        modalRoot
      )}

      {/* ── Table Insert Modal — rendered in body via portal ── */}
      {showTableModal && modalRoot && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-dark-900 border border-gray-700 rounded-2xl p-6 w-full max-w-sm mx-4 shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-white font-bold text-lg flex items-center gap-2">
                <TableIcon className="w-5 h-5 text-primary-400" />
                Insert Table
              </h3>
              <button onClick={() => setShowTableModal(false)} className="text-gray-500 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Rows input */}
            <div className="flex flex-col gap-2 mb-4">
              <label className="text-gray-300 text-sm font-medium">
                Number of Rows
              </label>
              <input
                type="number"
                min="1"
                max="20"
                value={tableRows}
                onChange={(e) => setTableRows(parseInt(e.target.value) || 3)}
                className="input-field"
              />
            </div>

            {/* Cols input */}
            <div className="flex flex-col gap-2 mb-6">
              <label className="text-gray-300 text-sm font-medium">
                Number of Columns
              </label>
              <input
                type="number"
                min="1"
                max="10"
                value={tableCols}
                onChange={(e) => setTableCols(parseInt(e.target.value) || 3)}
                className="input-field"
              />
            </div>

            {/* Preview grid */}
            <div className="mb-6">
              <p className="text-gray-500 text-xs mb-2">Preview:</p>
              <div
                className="grid gap-1"
                style={{ gridTemplateColumns: `repeat(${Math.min(tableCols, 6)}, 1fr)` }}
              >
                {Array.from({ length: Math.min(tableRows, 4) * Math.min(tableCols, 6) }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-6 rounded border text-xs ${
                      i < Math.min(tableCols, 6)
                        ? 'bg-primary-600/30 border-primary-500/50'
                        : 'bg-dark-800 border-gray-700'
                    }`}
                  />
                ))}
              </div>
              {(tableRows > 4 || tableCols > 6) && (
                <p className="text-gray-600 text-xs mt-1">
                  Preview truncated — actual table will have {tableRows} rows × {tableCols} columns
                </p>
              )}
            </div>

            <div className="flex gap-3">
              <button onClick={handleInsertTable} className="btn-primary flex-1 flex items-center justify-center gap-2">
                <TableIcon className="w-4 h-4" />
                Insert Table
              </button>
              <button onClick={() => setShowTableModal(false)} className="btn-secondary">
                Cancel
              </button>
            </div>
          </div>
        </div>,
        modalRoot
      )}

      {/* ── Main Editor Layout ────────────────────────────── */}
      <div className="flex gap-4 items-start">

        {/* ── Editor Area ──────────────────────────────────── */}
        <div className="flex-1 flex flex-col border border-gray-600 rounded-xl overflow-hidden min-w-0">
          <div className="px-4 py-2 bg-dark-950 border-b border-gray-700 text-xs text-gray-600">
            💡 Click any image to edit its details · Paste from Google Docs/Word to preserve tables and formatting
          </div>
          <div ref={editorWrapRef}>
            <EditorContent editor={editor} />
          </div>
          <div className="px-4 py-2 bg-dark-950 border-t border-gray-700 flex items-center justify-between">
            <span className="text-gray-600 text-xs">
              {wordCount} words · ~{Math.ceil(wordCount / 200)} min read
            </span>
            {isInTable && (
              <span className="text-primary-400 text-xs font-medium">
                📊 Cursor is inside a table
              </span>
            )}
          </div>
        </div>

        {/* ── Right Sidebar Toolbar — SCROLLABLE ───────────── */}
        <div
          className="w-44 flex-shrink-0 flex flex-col gap-1 bg-dark-900 border border-gray-700/50 rounded-xl p-3 sticky top-24 overflow-y-auto"
          style={{ maxHeight: 'calc(100vh - 8rem)' }}
        >

          {/* ── Headings ── */}
          <Label>Headings</Label>
          {[1, 2, 3, 4].map((level) => (
            <Btn
              key={level}
              onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
              active={editor.isActive('heading', { level })}
              title={`Heading ${level}`}
            >
              <span className="font-bold text-sm w-6">H{level}</span>
              <span className="text-gray-500">
                {level === 1 ? 'Title' : level === 2 ? 'Section' : level === 3 ? 'Sub' : 'Minor'}
              </span>
            </Btn>
          ))}

          {/* ── Formatting ── */}
          <Label>Format</Label>
          <Btn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} title="Bold">
            <strong className="text-sm w-6">B</strong><span className="text-gray-500">Bold</span>
          </Btn>
          <Btn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} title="Italic">
            <em className="text-sm w-6">I</em><span className="text-gray-500">Italic</span>
          </Btn>
          <Btn onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive('underline')} title="Underline">
            <span className="underline text-sm w-6">U</span><span className="text-gray-500">Underline</span>
          </Btn>
          <Btn onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive('strike')} title="Strikethrough">
            <span className="line-through text-sm w-6">S</span><span className="text-gray-500">Strike</span>
          </Btn>

          {/* ── Lists ── */}
          <Label>Lists</Label>
          <Btn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} title="Bullet List">
            <span className="w-6">•</span><span className="text-gray-500">Bullets</span>
          </Btn>
          <Btn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')} title="Numbered List">
            <span className="w-6">1.</span><span className="text-gray-500">Numbered</span>
          </Btn>

          {/* ── Blocks ── */}
          <Label>Blocks</Label>
          <Btn onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')} title="Blockquote">
            <span className="w-6 text-base">"</span><span className="text-gray-500">Quote</span>
          </Btn>
          <Btn onClick={() => editor.chain().focus().setHorizontalRule().run()} active={false} title="Insert Divider">
            <Minus className="w-3 h-3 w-6" /><span className="text-gray-500">Divider</span>
          </Btn>

          {/* ── Table ── */}
          <Label>Table</Label>

          {/* Insert new table */}
          <Btn
            onClick={() => setShowTableModal(true)}
            active={false}
            accent={true}
            title="Insert a new table"
          >
            <TableIcon className="w-3 h-3 flex-shrink-0" />
            <span>Add Table</span>
          </Btn>

          {/* Table controls — only shown when cursor is in a table */}
          {isInTable && (
            <>
              <div className="text-gray-600 text-xs px-1 py-1">— Table Controls —</div>

              <Btn onClick={() => editor.chain().focus().addRowAfter().run()} active={false} title="Add row below">
                <Plus className="w-3 h-3" /><span className="text-gray-500">Add Row</span>
              </Btn>
              <Btn onClick={() => editor.chain().focus().addColumnAfter().run()} active={false} title="Add column after">
                <Plus className="w-3 h-3" /><span className="text-gray-500">Add Col</span>
              </Btn>
              <Btn onClick={() => editor.chain().focus().deleteRow().run()} active={false} title="Delete current row">
                <Trash2 className="w-3 h-3 text-red-400" /><span className="text-red-400">Del Row</span>
              </Btn>
              <Btn onClick={() => editor.chain().focus().deleteColumn().run()} active={false} title="Delete current column">
                <Trash2 className="w-3 h-3 text-red-400" /><span className="text-red-400">Del Col</span>
              </Btn>
              <Btn onClick={() => editor.chain().focus().deleteTable().run()} active={false} title="Delete entire table">
                <Trash2 className="w-3 h-3 text-red-400" /><span className="text-red-400">Del Table</span>
              </Btn>
              <Btn onClick={() => editor.chain().focus().toggleHeaderRow().run()} active={false} title="Toggle header row">
                <TableIcon className="w-3 h-3" /><span className="text-gray-500">Header</span>
              </Btn>
            </>
          )}

          {/* ── Alignment ── */}
          <Label>Align</Label>
          <Btn onClick={() => editor.chain().focus().setTextAlign('left').run()} active={editor.isActive({ textAlign: 'left' })} title="Left">
            <span className="w-6">≡L</span><span className="text-gray-500">Left</span>
          </Btn>
          <Btn onClick={() => editor.chain().focus().setTextAlign('center').run()} active={editor.isActive({ textAlign: 'center' })} title="Center">
            <span className="w-6">≡C</span><span className="text-gray-500">Center</span>
          </Btn>
          <Btn onClick={() => editor.chain().focus().setTextAlign('right').run()} active={editor.isActive({ textAlign: 'right' })} title="Right">
            <span className="w-6">≡R</span><span className="text-gray-500">Right</span>
          </Btn>

          {/* ── Insert ── */}
          <Label>Insert</Label>
          <Btn onClick={handleAddLink} active={editor.isActive('link')} title="Add Link">
            <Link2 className="w-3 h-3 flex-shrink-0" /><span className="text-gray-500">Link</span>
          </Btn>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            title="Upload Image"
            className="w-full flex items-center gap-2 px-3 py-2 text-xs rounded-lg border transition-all duration-150 text-left text-accent-400 bg-accent-500/10 border-accent-500/20 hover:bg-accent-500/20 disabled:opacity-50"
          >
            <Upload className="w-3 h-3 flex-shrink-0" />
            <span>{isUploading ? 'Uploading...' : 'Image'}</span>
          </button>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelected} className="hidden" />

          {/* ── History ── */}
          <Label>History</Label>
          <Btn onClick={() => editor.chain().focus().undo().run()} active={false} title="Undo">
            <RotateCcw className="w-3 h-3 flex-shrink-0" /><span className="text-gray-500">Undo</span>
          </Btn>
          <Btn onClick={() => editor.chain().focus().redo().run()} active={false} title="Redo">
            <RotateCw className="w-3 h-3 flex-shrink-0" /><span className="text-gray-500">Redo</span>
          </Btn>

          {/* Bottom padding */}
          <div className="h-4" />

        </div>
      </div>
    </>
  );
}