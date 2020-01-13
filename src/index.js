import React, { Component } from "react";
import ReactDOM from "react-dom";

import Board from "./Board";
import FileOpen from "./FileOpen";

import { HomePage } from "./HomePage";
import { MessageReciever } from "./MessageReciever";

// import { groupBy,uniq,map } from 'underscore'

// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import { List, DatePicker, message } from "antd";

class App extends Component {
  constructor(probs) {
    super(probs);

    this.state = {
      lists: []
    };
    this.subscription = null;
  }

  render() {
    // <HomePage />
    // <MessageReciever />
    //

    return (
        <div className="container-fluid">
        <br />
            
              <FileOpen /> 
            
          <div className="row">
            <Board />
          </div>
        </div>
    );
  }
}

// Put the things into the DOM!
ReactDOM.render(<App />, document.getElementById("root"));
