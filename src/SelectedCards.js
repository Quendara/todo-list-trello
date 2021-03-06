import React, { Component } from "react";
import { Settings } from "./Settings";
import { CardTemplate } from "./CardTemplate";

import { CardTemplateFetch } from "./CardTemplateFetch";
import { selectedMessageService } from "./messageService";

class SelectedCards extends React.Component {
  constructor(props) {
    super(props);

    this.state = { items: [] };
    this.subscription = null;
  } 

  componentDidMount() {
    // subscribe to home component messages
    this.subscription = selectedMessageService
      .getMessage()
      .subscribe(message => {
        if (message && message.json.length != 0 ) { 
          this.setState({ items: [] });
          // add message to local state if not empty
          this.setState({ items: message.json });
          this.forceUpdate();
          console.log("Selected Cards recieved items");
          console.log(message.json[0].id);
        } else {
          // clear messages when empty message received
          this.setState({ items: [] });
        }
      });
  }

  componentWillUnmount() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

  render() {
    // <CardTemplate item={item} />
    //
    return (
      <div>
        {this.state.items.map((item, index) => (
          <div className="card" key={"card" + index}>
            <CardTemplateFetch item={item} />
            
          </div>
        ))}
      </div>
    );
  }
}

export { SelectedCards };
