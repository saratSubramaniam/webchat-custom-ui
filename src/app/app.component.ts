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
    const directLine = window.WebChat.createDirectLine({
      secret: "u_xRnDdnx-4.qlO1IKZocqyAbFg-wHkoxEQzIL-VGbXFDIWhFfmysow",
      webSocket: false
    });

    window.WebChat.renderWebChat(
      {
        directLine: directLine,
        userID: "USER_ID"
      },
      this.botWindowElement.nativeElement
    );

    directLine.postActivity({
      from: {
        id: "USER_ID",
        name: "USER_NAME"
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
}
