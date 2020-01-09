import React from "react";
// import { BrowserRouter as Router, Route } from 'react-router-dom';

import { messageService } from "./messageService";

class MessageReciever extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: []
    };
  }

  componentDidMount() {
    // subscribe to home component messages
    this.subscription = messageService.getMessage().subscribe(message => {
      if (message) {
        // add message to local state if not empty
        this.setState({ messages: [...this.state.messages, message] });
      } else {
        // clear messages when empty message received
        this.setState({ messages: [] });
      }
    });
  }

  componentWillUnmount() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

  render() {
    const { messages } = this.state;
    return (
      <div>
        <div className="container text-center">
          <div className="row">
            <div className="col-sm-8 offset-sm-2">
              <h2>Message Reciever</h2>
              {messages.map((message, index) => (
                <div key={index} className="alert alert-success">
                  {message.text}
                </div>
              ))}
              <hr />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export { MessageReciever };
