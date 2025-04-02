import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import {
  setCurrentSession,
  setToolSessions,
} from '@/libs/redux/slices/toolSessionsSlice';
import MultipleLayouts from '@/pages/PresentationResponse/components/MultipleLayouts';
import { current } from '@reduxjs/toolkit';

const PresentationOutline = () => {
  const { error, loading, sessions } = useSelector(
    (state) => state.toolSessions
  );
  const { data: userData } = useSelector((state) => state.user);
  const router = useRouter();
  const [selectedOutline, setSelectedOutline] = useState(null);
  const dispatch = useDispatch();

  console.log('sessions data', sessions);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }
  if (!sessions) {
    return <p>No data available</p>;
  }

  const handleGeneratePresentation = async () => {
    try {
      if (sessions) {
        // Store response in sessionStorage
        // console.log('selectedOutline', selectedOutline);
        sessionStorage.setItem('presentationData', JSON.stringify(sessions));

        // Set the selected outline as the current session
        dispatch(setCurrentSession(selectedOutline));

        // Redirect to the PresentationResponse page without the long URL
        router.push('/PresentationResponse');
      }
    } catch (err) {
      console.error('Error generating presentation:', err);
    }
  };

  return (
    <div
      style={{
        width: 800,
        height: 792.7,
        padding: 28,
        background: '#0C0B17',
        borderRadius: 20,
        border: '2px #9D74FF solid',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 36,
        display: 'inline-flex',
      }}
    >
      <div
        style={{
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          gap: 7,
          display: 'flex',
          height: 'fit-content',
        }}
      >
        <div
          style={{
            alignSelf: 'stretch',
            textAlign: 'center',
            color: 'white',
            fontSize: 28,
            fontFamily: 'Satoshi',
            fontWeight: '700',
            wordWrap: 'break-word',
          }}
        >
          Presentation Outline
        </div>
        <div
          style={{
            alignSelf: 'stretch',
            textAlign: 'center',
            color: '#B3B2B2',
            fontSize: 16,
            fontFamily: 'Satoshi',
            fontWeight: '500',
            wordWrap: 'break-word',
          }}
        >
          Create a presentation for specific content.
        </div>
      </div>
      <div
        style={{
          alignSelf: 'stretch',
          height: 633.7,
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          gap: 24,
          display: 'flex',
        }}
      >
        <div
          style={{
            alignSelf: 'stretch',
            height: 'fit-content',
            borderRadius: 12,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            gap: 8,
            display: 'flex',
          }}
        >
          <div
            style={{
              alignSelf: 'stretch',
              color: 'white',
              fontSize: 16,
              fontFamily: 'Satoshi',
              fontWeight: '700',
              wordWrap: 'break-word',
            }}
          >
            Presentation Details
          </div>
          <div
            style={{
              alignSelf: 'stretch',
              height: 'fit-content',
              paddingLeft: 24,
              paddingRight: 24,
              paddingTop: 12,
              paddingBottom: 12,
              background: '#24272F',
              borderRadius: 15,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start',
              gap: 20,
              display: 'flex',
            }}
          >
            <div
              style={{
                alignSelf: 'stretch',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                gap: 20,
                display: 'inline-flex',
              }}
            >
              <div
                style={{
                  color: 'white',
                  fontSize: 16,
                  fontFamily: 'Satoshi',
                  fontStyle: 'italic',
                  fontWeight: '500',
                  wordWrap: 'break-word',
                }}
              />
            </div>
            <div
              style={{
                paddingLeft: 16,
                paddingRight: 16,
                paddingTop: 8,
                paddingBottom: 8,
                borderRadius: 20,
                overflow: 'hidden',
                border: '1px #DECDFF dotted',
                justifyContent: 'flex-start',
                alignItems: 'center',
                gap: 8,
                display: 'inline-flex',
                width: '100%',
              }}
            >
              <div
                style={{
                  color: 'white',
                  fontFamily: 'Satoshi',
                  fontWeight: '700',
                  wordWrap: 'break-word',
                  width: '100%',
                }}
              >
                {console.log('sessions', sessions.slides)}
                {sessions?.slides?.map((slide, index) => (
                  <div
                    key={index}
                    role="button"
                    tabIndex="0"
                    style={{
                      backgroundColor: '#1C1C1C',
                      cursor: 'pointer',
                      marginBottom: '8px',
                      padding: '8px',
                      borderRadius: '10px',
                      marginLeft: '12px',
                      background:
                        selectedOutline === slide ? '#3C3C3C' : '#1C1C1C',
                      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                    }}
                    onClick={() => setSelectedOutline(slide)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setSelectedOutline(slide);
                      }
                    }}
                  >
                    {index + 1}. {slide.title}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            alignSelf: 'stretch',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 31,
            display: 'inline-flex',
          }}
        >
          <button
            type="button"
            onClick={handleGeneratePresentation}
            disabled={!selectedOutline}
            style={{
              width: 224,
              paddingLeft: 32,
              paddingRight: 32,
              paddingTop: 12,
              paddingBottom: 12,
              background: '#8552FF',
              borderRadius: 26.89,
              justifyContent: 'center',
              alignItems: 'center',
              gap: 10,
              display: 'flex',
              border: 'none',
              cursor: selectedOutline ? 'pointer' : 'not-allowed',
              opacity: selectedOutline ? 1 : 0.5,
            }}
          >
            <div
              style={{
                textAlign: 'center',
                color: 'white',
                fontSize: 16,
                fontFamily: 'Satoshi',
                fontWeight: '700',
                wordWrap: 'break-word',
              }}
            >
              Generate Presentation
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PresentationOutline;
