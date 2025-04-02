import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { styles } from './styles';

import { setCurrentSession } from '@/libs/redux/slices/toolSessionsSlice';

const NavItem = ({ number, text, setCurrentSlideIndex }) => {
  const dispatch = useDispatch();
  const { currentSession, sessions } = useSelector(
    (state) => state.toolSessions
  );

  const handleClick = () => {
    // Find the session with the matching title
    const sessionToSet = sessions.slides?.find(
      (session) => session.title === text
    );

    // If found, dispatch the action to update the current session and the slide index
    if (sessionToSet) {
      setCurrentSlideIndex(number - 1);
      dispatch(setCurrentSession(sessionToSet));
    }
  };

  return (
    <div
      style={{
        ...styles.navItem.container,
        ...styles.navItem[
          text === currentSession.title ? 'active' : 'inactive'
        ],
      }}
      onClick={handleClick}
    >
      <span style={styles.navItem.number}>{number}</span>
      <span style={styles.navItem.text}>{text}</span>
    </div>
  );
};

export default NavItem;
