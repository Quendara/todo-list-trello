import React from "react";
import { Scatter } from "react-chartjs-2";
import { messageService } from "./messageService";
import { jsonToCSV, csvToJson } from "./csvToJson";

import { store } from "./messageService";
import { selectedMessageService } from "./messageService";
import { SelectedCards } from "./SelectedCards";



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

    this.data = {};
    this.options = {};

    this.tooltips = [];
    this.flatlist = []; // contains the cards
  }

  setCSVData = csv => {
    console.log("setCSVData");
    // console.log(csv)
    this.state.csv = csv;
    this.flatlist = csvToJson(csv);

    let values = [];
    this.tooltips = [];

    // map from simple { ... effort, prio, } ==> { x, y, ..}
    this.flatlist.map((item, index) => {
      values.push({
        x: item[this.xAxes],
        y: item[this.yAxes]
        // tooltip:
      });

      const toolt = "[" + item.id + "] " + item.summary;

      this.tooltips.push(toolt);
    });

    console.log("Scatterplt recieved new data");
    console.log(values);
    console.log(this.tooltips);

    this.setValues(values);
  };

  setValues = items => {
    const localItems = items;

    // data.datasets[0].data = localItems
    this.data = {
      datasets: [
        {
          label: this.title,
          fill: false,
          pointBackgroundColor: "#fff",
          pointBorderWidth: 2,
          pointHoverRadius: 12,
          borderColor: "#6B5B95",
          pointHoverBorderWidth: 2,
          pointRadius: 9,
          data: localItems
        }
      ]
    };

    this.options = {
      tooltips: {
        callbacks: {
          label: (tooltipItem, data) => {
            var label = this.tooltips[tooltipItem.index] || "";

            selectedMessageService.sendMessage( [ this.flatlist[tooltipItem.index]] );

            if (label) {
              label += ": ";
            }

            label += "IDX:" + tooltipItem.index + ", ";
            label += this.xAxes + " : " + tooltipItem.xLabel + ", ";
            label += this.yAxes + " : " + tooltipItem.yLabel;

            // var tooltipEl = document.getElementById('chartjs-tooltip');
            // tooltipEl.innerHTML = label

            return label;
          }
        }
      },
      scales: {
        xAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: this.xAxes
            }
          }
        ],
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: this.yAxes
            }
          }
        ]
      }
    };

    this.setState({
      isLoaded: true
    });

    // this.fo
    this.forceUpdate();
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

    this.setCSVData(store.getMessages());
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
        <div className="row">
        <div className="col-sm-6">
          <Scatter data={this.data} options={this.options} />
          </div>

          <div className="col-sm-2">
              <SelectedCards />
            </div>
        </div>
      );
    }
  }
}

export { ScatterPlot };
