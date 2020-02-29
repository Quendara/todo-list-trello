import React, { Component } from "react";
import ReactDOM from "react-dom";

import Board from "./Board";
import FileOpen from "./FileOpen";

import { HomePage } from "./HomePage";
/import { MessageReciever } from "./MessageReciever";
import { ScatterPlot } from "./ScatterPlot";
import { GanttPlot } from "./GanttPlot";


import {
  BrowserRouter as Router,
  Route,
  Link,
  IndexRoute,
  useLocation
} from "react-router-dom";

// import { Router, Route, IndexRoute, Link, IndexLink, browserHistory } from 'react-router';

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
      <div className="container-fluid board">
        <hr />
        <Router>
          <Link to="/import">
            <button className="btn btn-secondary " activeClassName="active">
              Import
            </button>
          </Link>
          <Link to="/board">
            {" "}
            <button className="btn btn-secondary " activeClassName="active">
              Board
            </button>
          </Link>
          <Link to="/plot">
            {" "}
            <button className="btn btn-secondary " activeClassName="active">
              Plot
            </button>
          </Link>
          <Link to="/gantt">
            {" "}
            <button className="btn btn-secondary " activeClassName="active">
              Gantt
            </button>
          </Link>
          <hr />

          <div className="row">
            <div className="col-sm-12">
              <Route exact path="/" component={FileOpen} />
              <Route exact path="/import" component={FileOpen} />
              <Route exact path="/board" component={Board} />
              <Route exact path="/plot" component={ScatterPlot} />
              <Route exact path="/gantt" component={GanttPlot} />
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

// Put the things into the DOM!
ReactDOM.render(<App />, document.getElementById("root"));
