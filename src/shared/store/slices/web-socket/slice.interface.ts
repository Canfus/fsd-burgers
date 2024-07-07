import { socketActions } from './slice';

export interface Slice {
  status: 'disconnected' | 'connecting' | 'connected' | 'error';
  url: string | null;
  error: string | null;
}

export type SocketActions = typeof socketActions;

