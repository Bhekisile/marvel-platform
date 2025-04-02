import axios from 'axios';
import { addDoc, collection, Timestamp } from 'firebase/firestore';

import { setToolSessions } from '@/libs/redux/slices/toolSessionsSlice';
import { firestore } from '@/libs/redux/store';

const saveResponseToFirestore = async (sessionData) => {
  try {
    await addDoc(collection(firestore, 'toolSessions'), {
      ...sessionData,
      createdAt: Timestamp.fromMillis(Date.now()),
    });
  } catch (error) {
    console.error('Error saving tool session to Firestore:', error);
  }
};

const submitPrompt = (payload) => async (dispatch) => {
  try {
    let response;

    if (payload.tool_data.tool_id === 'presentation-generator') {
      response = {
        data: {
          data: {
            slides: [
              {
                title: 'Introduction to World War II',
                content: [
                  'An overview of the global conflict that lasted from 1939 to 1945.',
                ],
                template: 'titleBody',
                imageUrl: 'https://picsum.photos/id/1016/800/600',
              },
              {
                title: 'Causes of the War',
                content: [
                  'Treaty of Versailles and its consequences',
                  'Rise of totalitarian regimes',
                  'Expansionist policies of Axis Powers',
                  'Failure of the League of Nations',
                ],
                template: 'titleBullets',
                imageUrl: 'https://picsum.photos/id/1050/800/600',
              },
              {
                template: 'titleImage',
                title: 'Presentation with Images',
                subtitle: 'Using Reveal.js image capabilities',
                imageUrl: 'https://picsum.photos/id/1015/800/600',
              },
              {
                title: 'Key Events of the War',
                content: [
                  'Germany invades Poland (1939)',
                  'Battle of Britain (1940)',
                  'Pearl Harbor Attack (1941)',
                  'D-Day Invasion (1944)',
                  'Hiroshima and Nagasaki (1945)',
                ],
                template: 'titleBullets',
                imageUrl: 'https://picsum.photos/id/1029/800/600',
              },
              {
                title: 'The Eastern Front',
                content: [
                  'The largest and bloodiest front of WWII, primarily between Nazi Germany and the Soviet Union.',
                ],
                template: 'titleBody',
                imageUrl: 'https://picsum.photos/id/1020/800/600',
              },
               // Second vertical group - Advanced layouts
              {
                template: 'titleBodyImage',
                title: 'Advanced Layout Options',
                content: [
                  'Explore different layout configurations for presenting complex information',
                ],
                imageUrl: 'https://picsum.photos/id/1025/800/600',
                group: 'advancedLayouts',
              },
              {
                template: 'twoColumnImage',
                title: 'Two Columns with Image',
                leftContent: {
                  title: 'Left Column',
                  bullets: ['Point 1', 'Point 2', 'Point 3'],
                },
                rightContent: {
                  title: 'Right Column',
                  bullets: ['Item A', 'Item B', 'Item C'],
                },
                imageUrl: 'https://picsum.photos/id/1020/800/600',
                group: 'advancedLayouts',
              },
              {
                title: 'End of the War',
                content: [
                  'Germany surrenders in May 1945',
                  'Japan surrenders in September 1945 after atomic bombings',
                ],
                template: 'titleBullets',
                imageUrl: 'https://picsum.photos/id/1019/800/600',
              },
              {
                title: 'Aftermath and Consequences',
                content: [
                  'Formation of the United Nations',
                  'Start of the Cold War',
                  'Decolonization movements',
                  'Economic recovery and rebuilding',
                ],
                template: 'titleBullets',
                imageUrl: 'https://picsum.photos/id/1015/800/600',
              },
              // Third vertical group - Design tips
              {
                template: 'titleBodyImage',
                title: 'Design Tips',
                content: [
                  'Effective strategies for creating visually appealing presentations',
                ],
                imageUrl: 'https://picsum.photos/id/1029/800/600',
                group: 'designTips',
              },
            ],
          },
        },
      };
      const sessions = response.data.data;
      // console.log('presentation generator', sessions);
      dispatch(setToolSessions(sessions));
    } else {
      const url = `${process.env.NEXT_PUBLIC_MARVEL_ENDPOINT}submit-tool`;
      response = await axios.post(url, payload, {
        headers: {
          'Content-Type': 'application/json',
          'API-Key': 'dev',
        },
      });
    }

    const topicInput = payload.tool_data.inputs.find(
      (input) => input.name === 'topic'
    );
    const topic = topicInput ? topicInput.value : null;

    const sessionData = {
      response: response.data?.data,
      toolId: payload.tool_data.tool_id,
      topic,
      userId: payload.user.id,
    };

    saveResponseToFirestore(sessionData);

    return response.data?.data;
  } catch (err) {
    const { response } = err;
    console.error('Error sending request:', err);
    throw new Error(
      response?.data?.message || `Error: could not send prompt, ${err}`
    );
  }
};

export default submitPrompt;
