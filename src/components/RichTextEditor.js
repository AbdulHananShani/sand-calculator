// ============================================================
// FILE: src/components/RichTextEditor.js
// PURPOSE: Rich text editor with improvements:
//          - Scrollable right sidebar toolbar
//          - Click existing image to edit alt/title metadata
//          - Image metadata modal on upload AND on click
//          - All previous features maintained
// PLACEMENT: src/components/RichTextEditor.js (REPLACE)
// ============================================================

'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import { TextStyle } from '@tiptap/extension-text-style';
import { useRef, useCallback, useState, useEffect } from 'react';
import {
  Upload, Minus, Link2, RotateCcw, RotateCw,
  X, Image as ImageIcon, Save,
} from 'lucide-react';

// ── RichTextEditor Component ─────────────────────────────────
export default function RichTextEditor({ content, onChange, placeholder }) {

  const fileInputRef  = useRef(null);
  const editorWrapRef = useRef(null);

  // ── Image modal state ────────────────────────────────────
  const [showImageModal, setShowImageModal]   = useState(false);
  const [pendingImageUrl, setPendingImageUrl] = useState('');
  const [imageAlt, setImageAlt]               = useState('');
  const [imageTitle, setImageTitle]           = useState('');
  const [isUploading, setIsUploading]         = useState(false);
  const [isEditingExisting, setIsEditingExisting] = useState(false);

  // ── Initialize Tiptap editor ─────────────────────────────
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4, 5, 6] },
      }),
      Image.configure({
        inline: false,
        allowBase64: false,
        HTMLAttributes: { class: 'blog-image' },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'editor-link',
          rel: 'noopener noreferrer',
          target: '_blank',
        },
      }),
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Placeholder.configure({
        placeholder: placeholder ||
          'Start writing or paste from Google Docs / Word...\n\nAll text formatting is preserved automatically!',
      }),
      TextStyle,
    ],
    content: content || '',
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: { class: 'tiptap-editor' },
    },
  });

  // ── Click on existing image to edit its metadata ─────────
  useEffect(() => {
    if (!editorWrapRef.current) return;

    const handleImageClick = (e) => {
      const img = e.target.closest('img.blog-image');
      if (!img) return;

      // Open modal with existing image data
      setPendingImageUrl(img.src);
      setImageAlt(img.alt   || '');
      setImageTitle(img.title || '');
      setIsEditingExisting(true);
      setShowImageModal(true);
    };

    const wrapper = editorWrapRef.current;
    wrapper.addEventListener('click', handleImageClick);
    return () => wrapper.removeEventListener('click', handleImageClick);
  }, [editor]);

  // ── Handle image file selected for upload ────────────────
  const handleFileSelected = useCallback(async (e) => {
    const file = e.target.files[0];
    if (!file || !editor) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('Image must be under 5MB.');
      return;
    }

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
    } catch {
      alert('Upload error. Please try again.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  }, [editor]);

  // ── Insert new image with metadata ───────────────────────
  const handleInsertImage = useCallback(() => {
    if (!editor || !pendingImageUrl) return;
    editor.chain().focus().setImage({
      src:   pendingImageUrl,
      alt:   imageAlt   || 'Image',
      title: imageTitle || '',
    }).run();
    closeModal();
  }, [editor, pendingImageUrl, imageAlt, imageTitle]);

  // ── Update existing image metadata in-place ──────────────
  const handleUpdateImageMeta = useCallback(() => {
    if (!editor || !pendingImageUrl) return;

    // Find the image node in the editor and update its attributes
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

    if (updated) {
      dispatch(tr);
      onChange(editor.getHTML());
    }
    closeModal();
  }, [editor, pendingImageUrl, imageAlt, imageTitle, onChange]);

  // ── Close modal and reset state ──────────────────────────
  const closeModal = () => {
    setShowImageModal(false);
    setPendingImageUrl('');
    setImageAlt('');
    setImageTitle('');
    setIsEditingExisting(false);
  };

  // ── Handle link insertion ────────────────────────────────
  const handleAddLink = useCallback(() => {
    const url = window.prompt('Enter URL (include https://):');
    if (!url || !editor) return;
    editor.chain().focus().setLink({ href: url }).run();
  }, [editor]);

  if (!editor) return null;

  const wordCount = editor.getText().trim().split(/\s+/).filter(Boolean).length;

  // ── Toolbar button ───────────────────────────────────────
  const Btn = ({ onClick, active, children, title }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`w-full flex items-center gap-2 px-3 py-2 text-xs rounded-lg border transition-all duration-150 text-left ${
        active
          ? 'bg-primary-600 text-white border-primary-500'
          : 'text-gray-300 hover:text-white border-gray-700/50 hover:bg-dark-700 bg-dark-800/50'
      }`}
    >
      {children}
    </button>
  );

  // ── Toolbar section label ────────────────────────────────
  const Label = ({ children }) => (
    <p className="text-gray-600 text-xs uppercase tracking-wider font-medium px-1 pt-3 pb-1 border-t border-gray-800 mt-1 first:border-t-0 first:pt-0 first:mt-0">
      {children}
    </p>
  );

  return (
    <>
      {/* ── Image Metadata Modal ──────────────────────────── */}
      {showImageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-dark-900 border border-gray-700 rounded-2xl p-6 w-full max-w-md mx-4 shadow-2xl">

            {/* Modal header */}
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-white font-bold text-lg flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-primary-400" />
                {isEditingExisting ? 'Edit Image Details' : 'Image Details'}
              </h3>
              <button onClick={closeModal} className="text-gray-500 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Image preview */}
            <div className="mb-4 rounded-xl overflow-hidden border border-gray-700 bg-dark-950 max-h-48 flex items-center justify-center">
              <img
                src={pendingImageUrl}
                alt="Preview"
                className="max-w-full max-h-48 object-contain"
              />
            </div>

            {/* Alt text */}
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
              <p className="text-gray-600 text-xs">
                Example: "Sand calculator showing cubic yards for patio project"
              </p>
            </div>

            {/* Image title */}
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

            {/* Modal actions */}
            <div className="flex gap-3">
              {isEditingExisting ? (
                // Update existing image metadata
                <button
                  onClick={handleUpdateImageMeta}
                  className="btn-primary flex-1 flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              ) : (
                // Insert new image
                <button
                  onClick={handleInsertImage}
                  className="btn-primary flex-1 flex items-center justify-center gap-2"
                >
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
        </div>
      )}

      {/* ── Main Editor Layout ────────────────────────────── */}
      <div className="flex gap-4 items-start">

        {/* ── Editor Area ──────────────────────────────────── */}
        <div className="flex-1 flex flex-col border border-gray-600 rounded-xl overflow-hidden min-w-0">

          {/* Click tip for images */}
          <div className="px-4 py-2 bg-dark-950 border-b border-gray-700 text-xs text-gray-600">
            💡 Click any image in the editor to edit its alt text and title
          </div>

          {/* Editor content with ref for image click detection */}
          <div ref={editorWrapRef}>
            <EditorContent editor={editor} />
          </div>

          {/* Word count footer */}
          <div className="px-4 py-2 bg-dark-950 border-t border-gray-700 flex items-center justify-between">
            <span className="text-gray-600 text-xs">
              {wordCount} words · ~{Math.ceil(wordCount / 200)} min read
            </span>
            <span className="text-gray-700 text-xs hidden sm:block">
              Paste from Google Docs to preserve formatting
            </span>
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
          <Btn
            onClick={() => editor.chain().focus().toggleBold().run()}
            active={editor.isActive('bold')}
            title="Bold (Ctrl+B)"
          >
            <strong className="text-sm w-6">B</strong>
            <span className="text-gray-500">Bold</span>
          </Btn>
          <Btn
            onClick={() => editor.chain().focus().toggleItalic().run()}
            active={editor.isActive('italic')}
            title="Italic (Ctrl+I)"
          >
            <em className="text-sm w-6">I</em>
            <span className="text-gray-500">Italic</span>
          </Btn>
          <Btn
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            active={editor.isActive('underline')}
            title="Underline"
          >
            <span className="underline text-sm w-6">U</span>
            <span className="text-gray-500">Underline</span>
          </Btn>
          <Btn
            onClick={() => editor.chain().focus().toggleStrike().run()}
            active={editor.isActive('strike')}
            title="Strikethrough"
          >
            <span className="line-through text-sm w-6">S</span>
            <span className="text-gray-500">Strike</span>
          </Btn>

          {/* ── Lists ── */}
          <Label>Lists</Label>
          <Btn
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            active={editor.isActive('bulletList')}
            title="Bullet List"
          >
            <span className="w-6">•</span>
            <span className="text-gray-500">Bullets</span>
          </Btn>
          <Btn
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            active={editor.isActive('orderedList')}
            title="Numbered List"
          >
            <span className="w-6">1.</span>
            <span className="text-gray-500">Numbered</span>
          </Btn>

          {/* ── Blocks ── */}
          <Label>Blocks</Label>
          <Btn
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            active={editor.isActive('blockquote')}
            title="Blockquote"
          >
            <span className="w-6 text-base">"</span>
            <span className="text-gray-500">Quote</span>
          </Btn>
          <Btn
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            active={false}
            title="Insert Divider Line between sections"
          >
            <Minus className="w-3 h-3 w-6" />
            <span className="text-gray-500">Divider</span>
          </Btn>

          {/* ── Alignment ── */}
          <Label>Align</Label>
          <Btn
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            active={editor.isActive({ textAlign: 'left' })}
            title="Align Left"
          >
            <span className="w-6">≡L</span>
            <span className="text-gray-500">Left</span>
          </Btn>
          <Btn
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            active={editor.isActive({ textAlign: 'center' })}
            title="Align Center"
          >
            <span className="w-6">≡C</span>
            <span className="text-gray-500">Center</span>
          </Btn>
          <Btn
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            active={editor.isActive({ textAlign: 'right' })}
            title="Align Right"
          >
            <span className="w-6">≡R</span>
            <span className="text-gray-500">Right</span>
          </Btn>

          {/* ── Insert ── */}
          <Label>Insert</Label>
          <Btn
            onClick={handleAddLink}
            active={editor.isActive('link')}
            title="Add Hyperlink"
          >
            <Link2 className="w-3 h-3 flex-shrink-0" />
            <span className="text-gray-500">Link</span>
          </Btn>

          {/* Image upload */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            title="Upload Image to Cloudinary"
            className="w-full flex items-center gap-2 px-3 py-2 text-xs rounded-lg border transition-all duration-150 text-left text-accent-400 bg-accent-500/10 border-accent-500/20 hover:bg-accent-500/20 disabled:opacity-50"
          >
            <Upload className="w-3 h-3 flex-shrink-0" />
            <span>{isUploading ? 'Uploading...' : 'Image'}</span>
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelected}
            className="hidden"
          />

          {/* ── History ── */}
          <Label>History</Label>
          <Btn
            onClick={() => editor.chain().focus().undo().run()}
            active={false}
            title="Undo (Ctrl+Z)"
          >
            <RotateCcw className="w-3 h-3 flex-shrink-0" />
            <span className="text-gray-500">Undo</span>
          </Btn>
          <Btn
            onClick={() => editor.chain().focus().redo().run()}
            active={false}
            title="Redo (Ctrl+Y)"
          >
            <RotateCw className="w-3 h-3 flex-shrink-0" />
            <span className="text-gray-500">Redo</span>
          </Btn>

          {/* Bottom padding for scroll */}
          <div className="h-4" />

        </div>
      </div>
    </>
  );
}