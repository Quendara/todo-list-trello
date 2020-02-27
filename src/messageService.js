import { Subject } from "rxjs";
import { Component } from "react";
import { jsonToCSV, csvToJson } from "./csvToJson";

const subject = new Subject();

export const messageService = {
  sendMessage: message => subject.next({ text: message }),
  clearMessages: () => subject.next(),
  getMessage: () => subject.asObservable()
};

const selSubject = new Subject();

export const selectedMessageService = {
  sendMessage: message => selSubject.next({ json: message }),
  clearMessages: () => selSubject.next(),
  getMessage: () => selSubject.asObservable()
};

class Messages {
  constructor() {
    // this.message = ""
    this.messageArr = [];
    this.componentDidMount();
  }

  setMessages(csv) {
    console.log( "setMessages" )
    this.messageArr = csvToJson(csv);
  }

  getMessages() {
    console.log( "getMessage" )
    if( this.messageArr.length == 0){ 
      return ""
    }
    return jsonToCSV(this.messageArr, true);
  }

  setMessagesJson(json) {
    this.messageArr = json;
  }

  getMessagesJson() {
    return this.messageArr;
  }

  componentDidMount() {
    // subscribe to home component messages
    this.subscription = messageService.getMessage().subscribe(message => {
      if (message) {
        // add message to local state if not empty
        console.log(message.text);
        this.message = message.text;
      } else {
        this.message = "";
      }
    });
  }
}

export const store = new Messages();

export default Messages;
