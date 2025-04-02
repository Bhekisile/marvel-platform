// pages/index.tsx
import Head from 'next/head';

import MultipleLayouts from './MultipleLayouts';

function TiptapSlide() {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Satoshi:wght@400;500;700&display=swap"
        rel="stylesheet"
      />
      <Head>
        <title>Multi-Layout Slide Editor</title>
        <meta
          name="description"
          content="A slide editor with multiple layouts using Tiptap and Next.js"
        />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center p-8">
        <h1
          // className="text-3xl font-bold mb-8"
          style={{
            color: '#fff',
            fontFamily: 'Satoshi, Sans Serif',
            fontSize: 28,
            fontWeight: 600,
            marginBottom: '8px',
          }}
        >
          Multi-Layout Slide Editor
        </h1>
        <p>Choose from different layouts while preserving your content</p>
        <MultipleLayouts />
      </main>
    </>
  );
}

export default TiptapSlide;
