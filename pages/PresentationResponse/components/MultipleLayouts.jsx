'use client';

// components/SlideEditor.jsx
import { useEffect, useRef, useState } from 'react';

import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

import { useDispatch, useSelector } from 'react-redux';

import StretchImageSlide from '../SlideTemplates/StretchImageSlide';
import TitleBodyImageSlide from '../SlideTemplates/TitleBodyImageSlide';
import TitleBulletsImageSlide from '../SlideTemplates/TitleBulletsImageSlide';
import TwoColumnImageSlide from '../SlideTemplates/TwoColumnImageSlide';

import FormattingToolbar from './FormattingToolbar';

import {
  setCurrentSession,
  setToolSessions,
} from '@/libs/redux/slices/toolSessionsSlice';

const MultipleLayouts = ({ setCurrentSlideIndex, currentSlideIndex }) => {
  const [imageInputVisible, setImageInputVisible] = useState(false);
  const [tempImageUrl, setTempImageUrl] = useState('');
  const [activeEditor, setActiveEditor] = useState(null);
  const isChangingSlide = useRef(false);
  const dispatch = useDispatch();
  const { currentSession, sessions } = useSelector(
    (state) => state.toolSessions
  );
  // const { data: userData } = useSelector((state) => state.user);

  const presentationSlides = sessions.slides;

  // Get current slide
  const currentSlide = currentSession || {
    template: 'titleBody',
    title: 'Click to edit title',
    subtitle: 'Click to edit subtitle',
    content: ['Click to edit body text'],
    imageUrl: 'https://picsum.photos/id/1015/800/600',
  };

  // Title editor
  const titleEditor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Placeholder.configure({
        placeholder: 'Enter slide title...',
      }),
    ],
    immediatelyRender: false,
    content: `${currentSlide.title || 'Title'}`,
    onUpdate: ({ editor }) => {
      if (isChangingSlide.current) return;

      const content = editor.getHTML();

      // Update the current session in Redux
      dispatch(
        setCurrentSession({
          ...currentSession,
          title: content,
          titleText: editor.getText() || 'Title',
        })
      );

      // Also update the slide in sessions array
      const updatedSessions = [...sessions.slides];
      updatedSessions[currentSlideIndex] = {
        ...updatedSessions[currentSlideIndex],
        title: content,
        titleText: editor.getText() || 'Title',
      };
      dispatch(setToolSessions({ ...sessions, slides: updatedSessions }));
    },
    onFocus: ({ editor }) => {
      setActiveEditor(editor);
    },
    editorProps: {
      attributes: {
        class:
          'outline-none text-3xl font-bold mb-4 p-2 focus:bg-gray-100 rounded',
      },
    },
  });

  // Body Editor
  const bodyEditor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Placeholder.configure({
        placeholder: 'Enter slide body text...',
      }),
    ],
    immediatelyRender: false,
    content: Array.isArray(currentSlide.content)
      ? currentSlide.content[0] || ''
      : currentSlide.content,
    onUpdate: ({ editor }) => {
      if (isChangingSlide.current) return;

      const content = editor.getHTML();

      // Update the current session in Redux
      dispatch(
        setCurrentSession({
          ...currentSession,
          title: content,
          titleText: editor.getText() || 'Title',
        })
      );

      // Also update the slide in sessions array
      const updatedSessions = [...sessions.slides];
      updatedSessions[currentSlideIndex] = {
        ...updatedSessions[currentSlideIndex],
        title: content,
        titleText: editor.getText() || 'Title',
      };
      dispatch(setToolSessions({ ...sessions, slides: updatedSessions }));
    },
    onFocus: ({ editor }) => {
      setActiveEditor(editor);
    },
    editorProps: {
      attributes: {
        class:
          'outline-none text-lg mb-6 p-2 focus:bg-gray-100 rounded min-h-32',
      },
    },
  });

  // Bullet points editor
  const bulletEditor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Placeholder.configure({
        placeholder: 'Enter bullet points...',
      }),
    ],
    immediatelyRender: false,
    content: Array.isArray(currentSlide.content)
      ? `<ul>${currentSlide.content
          .map((point) => `<li><p>${point}</p></li>`)
          .join('')}</ul>`
      : '<ul><li><p>Empty bullet point</p></li></ul>',
    onUpdate: ({ editor }) => {
      if (isChangingSlide.current) return;

      const content = editor.getHTML();

      // Update the current session in Redux
      dispatch(
        setCurrentSession({
          ...currentSession,
          title: content,
          titleText: editor.getText() || 'Title',
        })
      );

      // Also update the slide in sessions array
      const updatedSessions = [...sessions.slides];
      updatedSessions[currentSlideIndex] = {
        ...updatedSessions[currentSlideIndex],
        title: content,
        titleText: editor.getText() || 'Title',
      };
      dispatch(setToolSessions({ ...sessions, slides: updatedSessions }));
    },
    onFocus: ({ editor }) => {
      setActiveEditor(editor);
    },
    editorProps: {
      attributes: {
        class:
          'outline-none text-lg list-disc pl-5 mb-6 p-2 focus:bg-gray-100 rounded min-h-32',
      },
    },
  });

  // Left column editor
  const leftColumnEditor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Placeholder.configure({
        placeholder: 'Left column content...',
      }),
    ],
    immediatelyRender: false,
    content: currentSlide.leftContent?.bullets
      ? currentSlide.leftContent.bullets
          .map((point) => `<li>${point}</li>`)
          .join('')
      : '<li>Point 1</li><li>Point 2</li><li>Point 3</li>',
    onUpdate: ({ editor }) => {
      if (isChangingSlide.current) return;

      const content = editor.getHTML();

      // Update the current session in Redux
      dispatch(
        setCurrentSession({
          ...currentSession,
          title: content,
          titleText: editor.getText() || 'Title',
        })
      );

      // Also update the slide in sessions array
      const updatedSessions = [...sessions.slides];
      updatedSessions[currentSlideIndex] = {
        ...updatedSessions[currentSlideIndex],
        title: content,
        titleText: editor.getText() || 'Title',
      };
      dispatch(setToolSessions({ ...sessions, slides: updatedSessions }));
    },
    onFocus: ({ editor }) => {
      setActiveEditor(editor);
    },
    editorProps: {
      attributes: {
        class:
          'outline-none text-lg list-disc pl-5 p-2 focus:bg-gray-100 rounded min-h-48',
      },
    },
  });

  // Right column editor
  const rightColumnEditor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Placeholder.configure({
        placeholder: 'Right column content...',
      }),
    ],
    immediatelyRender: false,
    content: currentSlide.rightContent?.bullets
      ? currentSlide.rightContent.bullets
          .map((point) => `<li>${point}</li>`)
          .join('')
      : '<li>Item A</li><li>Item B</li><li>Item C</li>',
    onUpdate: ({ editor }) => {
      if (isChangingSlide.current) return;

      const content = editor.getHTML();

      // Update the current session in Redux
      dispatch(
        setCurrentSession({
          ...currentSession,
          title: content,
          titleText: editor.getText() || 'Title',
        })
      );

      // Also update the slide in sessions array
      const updatedSessions = [...sessions.slides];
      updatedSessions[currentSlideIndex] = {
        ...updatedSessions[currentSlideIndex],
        title: content,
        titleText: editor.getText() || 'Title',
      };
      dispatch(setToolSessions({ ...sessions, slides: updatedSessions }));
    },
    onFocus: ({ editor }) => {
      setActiveEditor(editor);
    },
    editorProps: {
      attributes: {
        class:
          'outline-none text-lg list-disc pl-5 p-2 focus:bg-gray-100 rounded min-h-48',
      },
    },
  });

  // Modified from your existing code to handle HTML content
  useEffect(() => {
    if (!currentSlide) return;

    isChangingSlide.current = true;

    if (titleEditor) {
      // Check if the title is HTML content or plain text
      const titleContent =
        typeof currentSlide.title === 'string' &&
        (currentSlide.title.startsWith('<') ||
          currentSlide.title.includes('</'))
          ? currentSlide.title
          : `<h1>${currentSlide.title || 'Title'}</h1>`;

      titleEditor.commands.setContent(titleContent);
    }

    if (bodyEditor) {
      // Check if content is array, HTML string, or plain text
      let bodyContent;
      if (Array.isArray(currentSlide.content)) {
        bodyContent = currentSlide.content[0] || '';
        // If it doesn't look like HTML, wrap it in paragraph tags
        if (!bodyContent.startsWith('<')) {
          bodyContent = `<p>${bodyContent}</p>`;
        }
      } else if (typeof currentSlide.content === 'string') {
        bodyContent = currentSlide.content;
        // If it doesn't look like HTML, wrap it in paragraph tags
        if (!bodyContent.startsWith('<')) {
          bodyContent = `<p>${bodyContent}</p>`;
        }
      } else {
        bodyContent = '<p></p>';
      }

      bodyEditor.commands.setContent(bodyContent);
    }

    if (bulletEditor) {
      let bulletContent;
      if (Array.isArray(currentSlide.content)) {
        bulletContent = `<ul>${currentSlide.content
          .map((point) => `<li>${point}</li>`)
          .join('')}</ul>`;
        console.log('bulletContent', Array.isArray(currentSlide.content));
      } else if (typeof currentSlide.content === 'string') {
        // If it doesn't look like HTML, wrap it in paragraph tags
        bulletContent = `<ul><li><p>${currentSlide.content}</p></li></ul>`;
      } else {
        bulletContent = '<ul><li><p>Empty bullet point</p></li></ul>';
      }
      bulletEditor.commands.setContent(bulletContent);
    }

    if (leftColumnEditor) {
      let leftColumnContent;
      if (currentSlide.leftContent?.bullets) {
        leftColumnContent = `<ul>${currentSlide.leftContent.bullets
          .map((point) => `<li>${point}</li>`)
          .join('')}</ul>`;
      } else {
        leftColumnContent =
          '<ul><li><p>Point 1</p></li><li><p>Point 2</p></li><li><p>Point 3</p></li></ul>';
      }
      leftColumnEditor.commands.setContent(leftColumnContent);
    }

    if (rightColumnEditor) {
      let rightColumnContent;
      if (currentSlide.rightContent?.bullets) {
        rightColumnContent = `<ul>${currentSlide.rightContent.bullets
          .map((point) => `<li>${point}</li>`)
          .join('')}</ul>`;
      } else {
        rightColumnContent =
          '<ul><li><p>Item A</p></li><li><p>Item B</p></li><li><p>Item C</p></li></ul>';
      }
      rightColumnEditor.commands.setContent(rightColumnContent);
    }

    setTimeout(() => {
      isChangingSlide.current = false;
    }, 100); // Slightly longer timeout to ensure content is fully loaded
  }, [
    currentSlideIndex,
    titleEditor,
    bodyEditor,
    bulletEditor,
    leftColumnEditor,
    rightColumnEditor,
  ]);

  // Map template to layout
  const getLayoutFromTemplate = (template) => {
    const templateToLayoutMap = {
      titleImage: 'title-subtitle-image',
      titleBody: 'title-body-image',
      titleBullets: 'title-bullets-image',
      twoColumnImage: 'two-column-image',
      stretchImage: 'title-subtitle-image',
    };
    return templateToLayoutMap[template] || 'title-body-image';
  };

  const currentLayout = getLayoutFromTemplate(currentSlide.template);

  // Utility function to validate URL
  const isValidUrl = (url) => {
    try {
      return Boolean(new URL(url));
    } catch (e) {
      if (!isValidUrl(tempImageUrl)) {
        throw new Error('Invalid URL format');
      }
    }
  };

  // Handle image update
  const handleImageUpdate = () => {
    if (tempImageUrl && tempImageUrl.trim()) {
      setToolSessions((prevData) => {
        const newData = [...prevData];
        newData[currentSlideIndex] = {
          ...newData[currentSlideIndex],
          imageUrl: tempImageUrl,
        };
        return newData;
      });
      setTempImageUrl('');
      setImageInputVisible(false);
    }
  };

  // Change slide layout/template
  const changeLayout = (newLayout) => {
    const layoutToTemplateMap = {
      titleImage: 'title-subtitle-image',
      titleBody: 'title-body-image',
      titleBullets: 'title-bullets-image',
      twoColumnImage: 'two-column-image',
    };

    const newTemplate = layoutToTemplateMap[newLayout];

    if (newTemplate) {
      // Preserve as much data as possible when switching templates
      setToolSessions((prevData) => {
        const newData = [...prevData];
        const currentData = newData[currentSlideIndex];

        // Create a new slide with the template
        const updatedSlide = {
          ...currentData,
          template: newTemplate,
        };

        // Handle specific template conversions
        if (
          newTemplate === 'titleBullets' &&
          !Array.isArray(updatedSlide.content)
        ) {
          updatedSlide.content = ['First bullet point'];
        } else if (
          newTemplate === 'titleBody' &&
          Array.isArray(updatedSlide.content) &&
          updatedSlide.content.length > 0
        ) {
          // For title-body, just use the first bullet if coming from bullets
          updatedSlide.content = [updatedSlide.content[0]];
        } else if (newTemplate === 'twoColumn' && !updatedSlide.leftContent) {
          updatedSlide.leftContent = {
            title: 'Left Column',
            bullets: ['Point 1', 'Point 2', 'Point 3'],
          };
          updatedSlide.rightContent = {
            title: 'Right Column',
            bullets: ['Item A', 'Item B', 'Item C'],
          };
        }

        newData[currentSlideIndex] = updatedSlide;
        return newData;
      });
    }
  };

  // Navigate between slides - keeping your existing function
  const goToSlide = (index) => {
    if (index >= 0 && index < sessions.slides?.length) {
      dispatch(setCurrentSession(sessions.slides[index]));
      setCurrentSlideIndex(index);
    }
  };

  // Render correct layout based on current selection
  const renderSlideContent = () => {
    switch (currentLayout) {
      case 'title-body-image':
        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              height: 'auto',
            }}
          >
            <TitleBodyImageSlide
              setImageInputVisible={setImageInputVisible}
              imageInputVisible={imageInputVisible}
              currentSlide={currentSlide}
              titleEditor={titleEditor}
              bodyEditor={bodyEditor}
            />
          </div>
        );

      case 'title-subtitle-image':
        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: '#fff',
              color: '#000',
              borderRadius: '5px',
              height: 'auto',
            }}
          >
            <StretchImageSlide
              setImageInputVisible={setImageInputVisible}
              imageInputVisible={imageInputVisible}
              currentSlide={currentSlide}
              titleEditor={titleEditor}
            />
          </div>
        );

      case 'title-bullets-image':
        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              height: 'auto',
            }}
          >
            <TitleBulletsImageSlide
              setImageInputVisible={setImageInputVisible}
              imageInputVisible={imageInputVisible}
              currentSlide={currentSlide}
              titleEditor={titleEditor}
              bulletEditor={bulletEditor}
            />
          </div>
        );

      case 'two-column-image':
        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              height: 'auto',
            }}
          >
            <TwoColumnImageSlide
              setImageInputVisible={setImageInputVisible}
              imageInputVisible={imageInputVisible}
              currentSlide={currentSlide}
              titleEditor={titleEditor}
              leftColumnEditor={leftColumnEditor}
              rightColumnEditor={rightColumnEditor}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      style={{
        width: '1000px',
        height: '80vh',
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
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <h2 style={{ fontWeight: 'bold' }}>
            Edit Slide {currentSlideIndex + 1}/{presentationSlides?.length}
          </h2>
          <div>
            <button
              type="button"
              style={{
                padding: '1px 3px',
                borderRadius: '5px',
                backgroundColor: '#1C1C1C',
                color: '#fff',
                cursor: 'pointer',
              }}
              onClick={() => goToSlide(currentSlideIndex - 1)}
              disabled={currentSlideIndex === 0}
            >
              ← Prev
            </button>
            <button
              type="button"
              style={{
                padding: '1px 3px',
                marginLeft: '5px',
                borderRadius: '5px',
                backgroundColor: '#1C1C1C',
                color: '#fff',
                cursor: 'pointer',
              }}
              onClick={() => goToSlide(currentSlideIndex + 1)}
              disabled={
                presentationSlides?.length
                  ? currentSlideIndex === presentationSlides.length - 1
                  : true
              }
            >
              Next →
            </button>
          </div>
        </div>
      </div>

      {/* Formatting Toolbar - Added */}
      {activeEditor && (
        <div
          style={{
            marginBottom: '1rem',
            backgroundColor: '#333',
            padding: '8px',
            borderRadius: '5px',
          }}
        >
          <FormattingToolbar editor={activeEditor} />
        </div>
      )}

      {/* Layout Selection */}
      <div
        style={{
          padding: '1px 3px',
          display: 'flex',
          gap: '10px',
          marginBottom: '1rem',
        }}
      >
        <button
          type="button"
          style={{
            padding: '1px 3px',
            backgroundColor:
              currentLayout === 'title-body-image' ? '#9D74FF' : '#1C1C1C',
            borderRadius: '5px',
            color: 'white',
            cursor: 'pointer',
          }}
          onClick={() => changeLayout('title-body-image')}
        >
          Title & Body
        </button>
        <button
          type="button"
          style={{
            padding: '1px 3px',
            backgroundColor:
              currentLayout === 'title-bullets-image' ? '#9D74FF' : '#1C1C1C',
            borderRadius: '5px',
            color: 'white',
            cursor: 'pointer',
          }}
          onClick={() => {
            changeLayout('title-bullets-image');
          }}
        >
          Title & Bullets
        </button>
        <button
          type="button"
          style={{
            padding: '1px 3px',
            backgroundColor:
              currentLayout === 'two-column-image' ? '#9D74FF' : '#1C1C1C',
            borderRadius: '5px',
            color: 'white',
            cursor: 'pointer',
          }}
          onClick={() => changeLayout('two-column-image')}
        >
          Two Columns
        </button>
        <button
          type="button"
          style={{
            padding: '1px 3px',
            backgroundColor:
              currentLayout === 'title-subtitle-image' ? '#9D74FF' : '#1C1C1C',
            borderRadius: '5px',
            color: 'white',
            cursor: 'pointer',
          }}
          onClick={() => changeLayout('title-subtitle-image')}
        >
          Title & Subtitle
        </button>
      </div>

      {/* Image URL Input */}
      {imageInputVisible && (
        <div
          style={{
            backgroundColor: '#333',
            padding: '12px',
            display: 'flex',
            gap: '10px',
            marginBottom: '10px',
          }}
        >
          <input
            type="text"
            value={tempImageUrl}
            onChange={(e) => setTempImageUrl(e.target.value)}
            placeholder="Enter image URL"
            style={{
              padding: '4px 8px',
              borderRadius: '5px',
              flex: 1,
              backgroundColor: '#444',
              color: '#fff',
              border: 'none',
            }}
          />
          <button
            type="button"
            style={{
              padding: '4px 8px',
              borderRadius: '5px',
              backgroundColor: '#9D74FF',
              color: '#fff',
              cursor: 'pointer',
              border: 'none',
            }}
            onClick={handleImageUpdate}
          >
            Update
          </button>
        </div>
      )}

      {/* Slide Content */}
      <div
        style={{
          backgroundColor: '#333',
          padding: '24px',
          borderRadius: '5px',
          flex: 1,
          overflow: 'auto',
        }}
      >
        <div
          style={{
            border: '1px solid #666',
            borderRadius: '8px',
            overflow: 'hidden',
            backgroundColor: 'white',
          }}
        >
          {renderSlideContent()}
        </div>
      </div>
    </div>
  );
};

export default MultipleLayouts;
