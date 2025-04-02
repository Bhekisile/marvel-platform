import React from 'react';

import { EditorContent } from '@tiptap/react';

import { styles } from '../styles';

const TitleBodyImageSlide = ({
  currentSlide,
  imageInputVisible,
  setImageInputVisible,
  titleEditor,
  bodyEditor,
}) => {
  // Default placeholder image if none provided
  const defaultImage = 'https://picsum.photos/800/400';

  return (
    <article style={styles.slide.container}>
      <div style={styles.slide.content}>
        <h2 style={styles.slide.title}>
          {titleEditor && <EditorContent editor={titleEditor} />}
        </h2>

        <div style={styles.slide.flexContainer}>
          <div style={styles.slide.textColumn}>
            <div style={styles.slide.body}>
              {bodyEditor && <EditorContent editor={bodyEditor} />}
            </div>
          </div>

          <div style={styles.slide.imageColumn}>
            <img
              src={currentSlide?.imageUrl || defaultImage}
              alt={currentSlide?.title || 'Slide image'}
              style={styles.slide.contentImage}
              onClick={() => setImageInputVisible(!imageInputVisible)}
            />
          </div>
        </div>
      </div>
    </article>
  );
};

export default TitleBodyImageSlide;
