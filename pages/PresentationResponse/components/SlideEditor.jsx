// components/SlideEditor.tsx
import { useEffect, useState } from 'react';

import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

const SlideEditor = () => {
  const [slideState, setSlideState] = useState({
    title: 'Presentation with Images',
    subtitle: 'Using Tiptap.js image capabilities',
    imageUrl: 'https://picsum.photos/id/1015/800/600',
  });

  const [imageInputVisible, setImageInputVisible] = useState(false);
  const [tempImageUrl, setTempImageUrl] = useState('');

  // Title editor
  const titleEditor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Enter slide title...',
      }),
    ],
    content: `<h1>${slideState.title}</h1>`,
    onUpdate: ({ editor }) => {
      const content = editor.getHTML();
      // Extract text content from HTML
      const parser = new DOMParser();
      const doc = parser.parseFromString(content, 'text/html');
      setSlideState(prev => ({ ...prev, title: doc.body.textContent || 'Title' }));
    },
    editorProps: {
      attributes: {
        class: 'outline-none text-3xl font-bold mb-4 p-2 focus:bg-gray-100 rounded',
      },
    },
  });

  // Subtitle editor
  const subtitleEditor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Enter slide subtitle...',
      }),
    ],
    content: `<p>${slideState.subtitle}</p>`,
    onUpdate: ({ editor }) => {
      const content = editor.getHTML();
      const parser = new DOMParser();
      const doc = parser.parseFromString(content, 'text/html');
      setSlideState(prev => ({ ...prev, subtitle: doc.body.textContent || 'Subtitle' }));
    },
    editorProps: {
      attributes: {
        class: 'outline-none text-xl text-gray-600 mb-6 p-2 focus:bg-gray-100 rounded',
      },
    },
  });

  const handleImageUpdate = () => {
    if (tempImageUrl) {
      setSlideState(prev => ({ ...prev, imageUrl: tempImageUrl }));
      setTempImageUrl('');
      setImageInputVisible(false);
    }
  };

  useEffect(() => {
    if (titleEditor && slideState.title !== titleEditor.getHTML()) {
      titleEditor.commands.setContent(`<h1>${slideState.title}</h1>`);
    }

    if (subtitleEditor && slideState.subtitle !== subtitleEditor.getHTML()) {
      subtitleEditor.commands.setContent(`<p>${slideState.subtitle}</p>`);
    }
  }, [slideState, titleEditor, subtitleEditor]);

  return (
    <div
      // className="w-full max-w-2xl bg-white shadow-lg rounded-lg overflow-hidden"
      style={{
        width: '1000px',
        padding: '8px',
        display: 'flex',
        flexDirection: 'column',
        color: '#fff',
        border: '1px solid #fff',
        fontFamily: 'Satoshi, sans-serif',
      }}
    >
      {/* Slide Editor Controls */}
      <div
        // className="bg-gray-100 p-3 border-b flex justify-between items-center"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexItems: 'center',
        }}
      >
        <h2 className="font-semibold">Edit Slide</h2>
        <div className="space-x-2">
          <button
            type="button"
            // className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
            style={{
              padding: '1px 3px',
              borderRadius: '5px',
              backgroundColor: '#3182ce',
              color: '#fff',
              focus: 'pointer',

              // hover: {
              //   backgroundColor: 'red',
              // },
            }}
            onClick={() => setImageInputVisible(!imageInputVisible)}
          >
            Change Image
          </button>
          <button
            type="button"
            // className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
            style={{
              padding: '1px 3px',
              borderRadius: '5px',
              backgroundColor: '#3182ce',
              color: '#fff',
              focus: 'pointer',
            }}
            onClick={() => console.log('Slide data:', slideState)}
          >
            Save
          </button>
        </div>
      </div>

      {/* Image URL Input */}
      {imageInputVisible && (
        <div
          className="bg-gray-50 p-3 flex"
          style={{
            backgroundColor: '#f7fafc',
            padding: '8px',
          }}
        >
          <input
            type="text"
            value={tempImageUrl}
            onChange={(e) => setTempImageUrl(e.target.value)}
            placeholder="Enter image URL"
            style={{
              padding: '1px 3px',
              borderRadius: '5px',
              width: '500px',
              color: '#fff',
              focus: 'pointer',
            }}
            // className="flex-1 p-2 border rounded mr-2"
          />
          <button
            type="button"
            style={{
              padding: '1px 3px',
              borderRadius: '5px',
              backgroundColor: '#3182ce',
              color: '#fff',
              focus: 'pointer',
            }}
            // className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleImageUpdate}
          >
            Update
          </button>
        </div>
      )}

      {/* Slide Content */}
      <div className="bg-white p-6">
        <div className="slide-container aspect-video border rounded-lg flex flex-col justify-between p-8">
          <div className="slide-content z-10">
            {titleEditor && <EditorContent editor={titleEditor} />}
            {subtitleEditor && <EditorContent editor={subtitleEditor} />}
          </div>

          <div className="slide-image mt-6 flex-grow flex justify-center items-center">
            <img
              src={slideState.imageUrl}
              alt="Slide image"
              style={{
                maxHeight: '400px',
                width: '100%',
                // objectFit: 'contain',
              }}
              // className="max-h-64 object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideEditor;
