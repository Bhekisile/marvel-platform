'use client';

import React, { useState } from 'react';

// import TiptapSlide from './components';
import MultipleLayouts from './components/MultipleLayouts';
import SlideEditor from './components/SlideEditor';
import Sidebar from './Sidebar';
import Slides from './Slides';
import { styles } from './styles';
import TopBar from './TopBar';

const PresentationResponse = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Satoshi:wght@400;500;700&display=swap"
        rel="stylesheet"
      />
      <main style={styles.app}>
        <TopBar />
        <div style={styles.content}>
          <Sidebar
            currentSlideIndex={currentSlideIndex}
            setCurrentSlideIndex={setCurrentSlideIndex}
          />
          <MultipleLayouts
            currentSlideIndex={currentSlideIndex}
            setCurrentSlideIndex={setCurrentSlideIndex}
          />
          {/* <SlideEditor /> */}
          {/* <Slides /> */}
        </div>
      </main>
    </>
  );
};

export default PresentationResponse;
