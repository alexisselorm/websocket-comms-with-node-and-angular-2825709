import { Component, OnInit } from '@angular/core';
import { ChatRelayMessage, User } from '@websocket/types';
@Component({
  selector: 'websocket-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'webapp';
  currentUser: User;
  messages: ChatRelayMessage[] = [];

  ngOnInit(): void {
    this.messages = [
      {
        event: 'chatRelay',
        author: { name: 'Jane', id: 1 },
        contents: 'Hi this is Jane',
      },
      {
        event: 'chatRelay',
        author: { name: 'Henry', id: 1 },
        contents: 'Hi I am Henry',
      },
    ];
    this.currentUser = {
      name: 'Xavier ',
      id: 3,
    };
  }
}
