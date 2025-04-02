import { createSlice } from '@reduxjs/toolkit';
// Slice for tool sessions
const toolSessionsSlice = createSlice({
  name: 'toolSessions',
  initialState: {
    sessions: [],
    currentSession: null,
    loading: false,
    error: null,
  },
  reducers: {
    setToolSessions(state, action) {
      state.sessions = action.payload;
    },
    setCurrentSession(state, action) {
      state.currentSession = action.payload;
    },
  },
});

export const { setToolSessions, setCurrentSession } = toolSessionsSlice.actions;
export default toolSessionsSlice.reducer;
