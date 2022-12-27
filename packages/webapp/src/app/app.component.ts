import { Component, OnInit } from '@angular/core';
import { ChatRelayMessage, User } from '@websocket/types';
import { AppService } from './app.service';
@Component({
  selector: 'websocket-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'webapp';
  currentUser: User;
  messages: ChatRelayMessage[] = [];
  constructor(private appService: AppService) {}
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

    this.appService.user$.subscribe((user) => (this.currentUser = user));
  }
  connect(userNameInput: HTMLInputElement) {
    const name = userNameInput.value;
    console.log(`Connecting as ${userNameInput.value}`);
    this.appService.connect(name);
  }
}
