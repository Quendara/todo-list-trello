import Board from "./Board";
import { ScatterPlot } from "./ScatterPlot";
import Board from "./Board";

class SplittView extends Component {
  render() {
    return (
      <div>
        <Board />
        <GanttPlot />
      </div>
    );
  }
}

export { SplittView }