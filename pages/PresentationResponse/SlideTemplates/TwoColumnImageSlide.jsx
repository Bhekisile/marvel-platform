/* eslint-disable */
import React from 'react';

import { styles } from '../styles';
import { EditorContent } from '@tiptap/react';

const TwoColumnImageSlide = ({
  currentSlide,
  imageInputVisible,
  setImageInputVisible,
  titleEditor,
  leftColumnEditor,
  rightColumnEditor,
}) => {
  // Default placeholder image if none provided
  const defaultImage = 'https://picsum.photos/800/400';

  return (
    <article style={styles.slide.container}>
      <div style={styles.slide.content}>
        <h2 style={styles.slide.title}>
          {titleEditor && <EditorContent editor={titleEditor} />}
        </h2>

        <div style={styles.slide.threeColumnContainer}>
          <div style={styles.slide.column}>
            <h3 style={styles.slide.columnTitle}>
              {currentSlide.leftContent.title}
            </h3>
              {leftColumnEditor && (
                <div style={styles.slide.bulletList}>
                  <EditorContent editor={leftColumnEditor} />
                </div>
              )}
          </div>

          <div style={styles.slide.column}>
            <h3 style={styles.slide.columnTitle}>
              {currentSlide.rightContent.title}
            </h3>
              {rightColumnEditor && (
                <div style={styles.slide.bulletList}>
                  <EditorContent editor={rightColumnEditor} />
                </div>
              )}
          </div>

          <div style={styles.slide.imageColumn}>
            <img
              src={currentSlide.imageUrl || defaultImage}
              alt={currentSlide.title}
              style={styles.slide.contentImage}
              onClick={() => setImageInputVisible(!imageInputVisible)}
            />
          </div>
        </div>
      </div>
    </article>
  );
};

export default TwoColumnImageSlide;
