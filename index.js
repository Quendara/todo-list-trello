import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Board from './Board';


import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { List, DatePicker, message } from 'antd';







class App extends Component {
  render(){
    return ( <Board />)
  }
}

// Put the things into the DOM!
ReactDOM.render(<App />, document.getElementById('root'));
