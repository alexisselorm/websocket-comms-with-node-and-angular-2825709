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
    // this.appService.chatMessage$.subscribe(message =>this.messages.push(message))
    this.appService.chatMessage$.subscribe(
      (message) => (this.messages = [...this.messages, message])
    );

    this.appService.user$.subscribe((user) => (this.currentUser = user));
  }
  connect(userNameInput: HTMLInputElement) {
    const name = userNameInput.value;
    console.log(`Connecting as ${userNameInput.value}`);
    this.appService.connect(name);
  }

  send(chatInput: HTMLInputElement) {
    this.appService.send(chatInput.value);
    chatInput.value = '';
  }
}
