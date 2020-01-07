import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Board from './Board';


import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { List, DatePicker, message } from 'antd';




// fake data generator
const getItems = (count, offset = 0) =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `JIRA-${k + offset}`,
    content: `Item to  ${k + offset}`,
    desctiption: `As user i want ${k + offset}, so that ...`,
    effort: 3,
    epic:"epic"

  }));



class App extends Component {
  constructor(){
    super()

      this.lists = [
        {
          title: "Open",
          items: getItems(10)
        },
        {
          title: "Progress",
          items: getItems(5, 10)
        },
        {
          title: "Done",
          items: getItems(5, 20)
        }
      ]
    }
  

  render(){
    return ( <Board list={this.lists} />)
  }
}

// Put the things into the DOM!
ReactDOM.render(<App />, document.getElementById('root'));
