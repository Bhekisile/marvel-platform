/* eslint-disable */
import React from 'react';

import { styles } from '../styles';
import { EditorContent } from '@tiptap/react';

const StretchImageSlide = ({
  currentSlide,
  imageInputVisible,
  setImageInputVisible,
  titleEditor,
}) => {
  // Default placeholder image if none provided
  const defaultImage = 'https://picsum.photos/1200/800';

  return (
    <article style={styles.slide.container}>
      <div style={styles.slide.content}>
        <h2 style={styles.slide.title}>
          {titleEditor && <EditorContent editor={titleEditor} />}
        </h2>

        {/* Use reveal.js r-stretch class with custom styling */}
        <img
          src={currentSlide.imageUrl || defaultImage}
          alt={currentSlide.title}
          className="r-stretch"
          style={styles.slide.stretchImage}
          onClick={() => setImageInputVisible(!imageInputVisible)}
        />

        {currentSlide.content && (
          <p style={styles.slide.caption}>{currentSlide.content}</p>
        )}
      </div>
    </article>
  );
};

export default StretchImageSlide;
