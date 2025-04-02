// /* eslint-disable */
import React from 'react';

import { EditorContent } from '@tiptap/react';

import { useSelector } from 'react-redux';

import { styles } from '../styles';

const TitleBulletsImageSlide = ({
  currentSlide,
  imageInputVisible,
  setImageInputVisible,
  titleEditor,
  bulletEditor,
}) => {
  // Default placeholder image if none provided
  const defaultImage = 'https://picsum.photos/800/400';
  const { currentSession, sessions } = useSelector(
    (state) => state.toolSessions
  );

  return (
    <article style={styles.slide.container}>
      <div style={styles.slide.content}>
        <h2 style={styles.slide.title}>
          {titleEditor && <EditorContent editor={titleEditor} />}
        </h2>

        <div style={styles.slide.flexContainer}>
          <div style={styles.slide.textColumn}>
            {bulletEditor && <EditorContent editor={bulletEditor} />}
          </div>

          <div style={styles.slide.imageColumn}>
            <img
              src={currentSession.imageUrl || defaultImage}
              alt={currentSession.title}
              style={styles.slide.contentImage}
              className="r-frame"
              onClick={() => setImageInputVisible(!imageInputVisible)}
            />
          </div>
        </div>
      </div>
    </article>
  );
};

export default TitleBulletsImageSlide;
