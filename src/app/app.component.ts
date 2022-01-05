import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";

/**
 * Declares the WebChat property on the window object.
 */
declare global {
  interface Window {
    WebChat: any;
  }
}

window.WebChat = window.WebChat || {};

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})

export class AppComponent implements OnInit {
  @ViewChild("botWindow") botWindowElement: any;

  public ngOnInit(): void {
    setTimeout(() => {
      this.initializeConversation();
    }, 0);
  }

  initializeConversation(): void {
    let userID = this.generateRandomUserID();
    let name = this.generateRandomUserName();

    const directLine = window.WebChat.createDirectLine({
      secret: "u_xRnDdnx-4.qlO1IKZocqyAbFg-wHkoxEQzIL-VGbXFDIWhFfmysow",
      webSocket: false
    });

    window.WebChat.renderWebChat(
      {
        directLine: directLine,
        userID: userID
      },
      this.botWindowElement.nativeElement
    );

    directLine.postActivity({
      from: {
        id: userID,
        name: name
      },
      name: "requestWelcomeDialog",
      type: "event",
      value: "token"
    }).subscribe(
      (id: any) => {
        console.log(`Posted activity, assigned ID ${id}`)
      },
      (error: any) => {
        console.log(`Error posting activity ${error}`)
      }
    );
  }

  generateRandomUserID(): string {
    var result = '';
    var characters = '0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 5; i++) {
      result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
    }

    return result;
  }

  generateRandomUserName(): string {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_';
    var charactersLength = characters.length;
    for (var i = 0; i < 5; i++) {
      result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
    }

    return result;
  }
}
