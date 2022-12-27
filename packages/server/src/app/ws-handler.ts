import { IncomingMessage } from 'http';
import { WebSocket, WebSocketServer, ServerOptions, RawData } from 'ws';
import { UserManager } from './user-manager';
import { WsMessage } from '@websocket/types';

export class WsHandler {
  private wsServer: WebSocketServer;
  private userManager: UserManager;
  initialize(options: ServerOptions) {
    this.wsServer = new WebSocketServer(options);
    this.userManager = new UserManager();

    this.wsServer.on('listening', () =>
      console.log(`Server listening on port ${options.port}.`)
    );
    this.wsServer.on('connection', (socket, request) =>
      this.onSocketConnected(socket, request)
    );
  }

  onSocketConnected(socket: WebSocket, request: IncomingMessage) {
    console.log(`New Websocket connection`);
    this.userManager.add(socket, request);
    socket.on('message', (data: RawData) => this.onSocketMessage(socket, data));
    socket.on('close', (code, reason) =>
      this.onSocketClosed(socket, code, reason)
    );
  }

  onSocketMessage(socket: WebSocket, data: RawData) {
    const payload: WsMessage = JSON.parse(`${data}`);
    console.log(`Received message: ${JSON.stringify(payload)}`);

    switch (payload.event) {
      case 'chat': {
        this.userManager.relayChat(socket, payload);
        break;
      }
    }
  }

  onSocketClosed(socket: WebSocket, code: number, reason: Buffer) {
    console.log(`Socket closed; code=${code}, reason=${reason}`);
    this.userManager.remove(socket);
  }
}
