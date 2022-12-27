import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChatRelayMessage, SystemNotice, User } from '@websocket/types';
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
  constructor(private appService: AppService, private snackbar: MatSnackBar) {}
  ngOnInit(): void {
    // this.appService.chatMessage$.subscribe(message =>this.messages.push(message))
    this.appService.chatMessage$.subscribe(
      (message) => (this.messages = [...this.messages, message])
    );
    this.appService.systemNotice$.subscribe((notice) =>
      this.onSystemNotice(notice)
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
  onSystemNotice(notice: SystemNotice) {
    this.snackbar.open(notice.contents, undefined, { duration: 5000 });
  }
}
