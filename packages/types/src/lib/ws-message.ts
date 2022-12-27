import { User } from './user';

export type WsMessage = ChatMessage | ChatRelayMesage | SystemNotice;

export interface ChatMessage {
  event: 'chat';
  contents: string;
}

export interface ChatRelayMesage {
  contents: string;
  author: User;
}

export interface SystemNotice {
  event: 'systemNotice';
  contents: string;
}
