import React, { Component } from "react";
import Board from "./Board";
import { GanttPlot } from "./GanttPlot";
import Board from "./Board";

class SplitView extends Component {
  render() {
    return (
      <div>
        <Board />
        <GanttPlot />
      </div>
    );
  }
}

export { SplitView }