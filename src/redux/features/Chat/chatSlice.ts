import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Message {
  role: string;
  content: string;
}

export interface ChatSession {
  sessionId: string;
  sessionName: string;
  messages: Message[];
}

interface ChatState {
  sessions: ChatSession[];
  currentSessionId: string | null;
}

const initialState: ChatState = {
  sessions: [],
  currentSessionId: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    startNewChat: (state, action: PayloadAction<{ sessionName: string }>) => {
      if (state.currentSessionId) {
        // Already have an active chat — keep it
      }
      const newSession: ChatSession = {
        sessionId: Date.now().toString(),
        sessionName: action.payload.sessionName,
        messages: [],
      };
      state.sessions.push(newSession);
      state.currentSessionId = newSession.sessionId;
    },
    addMessage: (state, action: PayloadAction<Message>) => {
      const session = state.sessions.find(
        (s) => s.sessionId === state.currentSessionId
      );
      if (session) session.messages.push(action.payload);
    },
    setCurrentSession: (state, action: PayloadAction<string>) => {
      state.currentSessionId = action.payload;
    },
  },
});

export const { startNewChat, addMessage, setCurrentSession } =
  chatSlice.actions;
export default chatSlice.reducer;
