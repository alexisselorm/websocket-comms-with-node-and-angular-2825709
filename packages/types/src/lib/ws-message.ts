import { User } from './user';

export type WsMessage = ChatMessage | ChatRelayMesage;

export interface ChatMessage {
  event: 'chat';
  contents: string;
}

export interface ChatRelayMesage {
  contents: string;
  author: User;
}
