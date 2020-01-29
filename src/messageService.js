import { Subject } from "rxjs";
import { Component } from "react";

const subject = new Subject();

export const messageService = {
  sendMessage: message => subject.next({ text: message }),
  clearMessages: () => subject.next(),
  getMessage: () => subject.asObservable(),
};


class Messages { 

  constructor() {
    this.message = ""
    this.componentDidMount()
  }

  getMessages(){    
    return this.message
  }

  setMessages( csv )
  {
    this.message = csv
  }

  componentDidMount() {
    // subscribe to home component messages
    this.subscription = messageService.getMessage().subscribe(message => {
      if (message) {
        // add message to local state if not empty
        console.log( message.text )
        this.message = message.text
      } else {
        this.message = ""
      }
    });
  }
}

export const store = new Messages()


export default Messages;

