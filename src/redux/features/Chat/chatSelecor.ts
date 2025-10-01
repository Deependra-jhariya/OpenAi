import { RootState } from '../../store';

export const SessionSelector = (state: RootState) => state.chat.sessions;
export const currentSessionIdSelector = (state: RootState) =>
  state.chat.currentSessionId;
