import React from "react";
import { Scatter } from "react-chartjs-2";
import { messageService } from "./messageService";
import { jsonToCSV, csvSoJson } from "./csvToJson";

class ScatterPlot extends React.Component {
  constructor(props) {
    super(props);

    this.group_unit = props.group_unit;

    this.xAxes = "effort";
    this.yAxes = "prio";
    this.title = "effort vs. prio";

    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      data: {}
    };

    this.data = {
      datasets: [
        {
          label: props.group_unit,
          fill: false,
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          borderColor: "#F00",
          pointHoverBorderWidth: 2,
          pointRadius: 6,
          data: []
        }
      ]
    };
  }

  setCSVData = csv => {
    console.log("setCSVData");
    // console.log(csv)
    this.state.csv = csv;
    const flatlist = csvSoJson(csv);

    let values = [];

    // map from simple { ... effort, prio, } ==> { x, y, ..}
    flatlist.map((item, index) => {
      values.push({
        x: item[this.xAxes],
        y: item[this.yAxes]
      });
    });

    console.log(values);
    this.setValues(values);
  };

  setValues = items => {
    const localItems = items;

    // data.datasets[0].data = localItems
    this.data = {
      datasets: [
        {
          label: props.group_unit,
          fill: false,
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          borderColor: "#F00",
          pointHoverBorderWidth: 2,
          pointRadius: 6,
          data: []
        }
      ]
    };
    
    this.setState({
      isLoaded: true
    });
  };

  componentDidMount() {
    // subscribe to home component messages
    this.subscription = messageService.getMessage().subscribe(message => {
      if (message) {
        // add message to local state if not empty
        console.log("componentDidMount recieved message");

        this.setCSVData(message.text);
      } else {
      }
    });
  }

  componentWillUnmount() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

  render() {
    console.log("GetComponent.renders");

    const { error, isLoaded, items } = this.state;

    if (error) {
      return <div>Error {error} </div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      // console.log( items )
      // plot( items )
      return (
        <Scatter
          data={this.data}
          options={{
            scales: {
              xAxes: [
                {
                  scaleLabel: {
                    display: true,
                    labelString: "test"
                  }
                }
              ]
            }
          }}
        />
      );
    }
  }
}

export { ScatterPlot };
