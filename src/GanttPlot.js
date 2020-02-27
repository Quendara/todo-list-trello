import React from "react";
import { Scatter } from "react-chartjs-2";
import { messageService } from "./messageService";
import { jsonToCSV, csvSoJson } from "./csvToJson";

import { store } from "./messageService";

import { Mermaid } from "./Mermaid.js";

import { sortBy } from 'underscore'

class GanttPlot extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mermaidText: ""
    };

    // mermaid.initialize();
  }

  effortToGantt = effort => {
    let ret = "2w"
    if( effort ){
      ret = effort + "d"      
    }
    return ret
  }

  monthToDate = month => {
    switch (month) {
      case "Jan":
        return "2020-01-01";
      case "Feb":
        return "2020-02-01";
      case "Mar":
        return "2020-03-01";
      case "Apr":
        return "2020-04-01";
      case "Mai":
        return "2020-05-01";
      default:
        return "2019-12-01";
    }
  };

  setCSVData = csv => {
    console.log("setCSVData - Gantt");

    if (csv == null) {
      console.error("CSV is null");
      return;
    }
    // console.log(csv)
    this.state.csv = csv;
    console.log(this.state.csv);
    const flatlist = csvSoJson(csv);

    let localText = "gantt \n";
    localText += "dateFormat YYYY-MM-DD \n";

    localText += `
        Go : Sprint_01, 2020-03-01, 1d
        section Sprints
        Sprint 01 : Sprint_02 , after Sprint_01, 2w
        Sprint 02 : Sprint_03 , after Sprint_02, 2w
        Sprint 03 : Sprint_04 , after Sprint_03, 2w
        Sprint 04 : Sprint_05 , after Sprint_04, 2w
        Sprint 05 : Sprint_06 , after Sprint_05, 2w
        Sprint 06 : Sprint_07 , after Sprint_06, 2w
        section Feature
`;
    // flatlist.map()
    //this.state.groups.map((item, index) => {
    //  this.state.lists.push({ title: item, items: [] });
    //});

    let sortedCopy = sortBy(flatlist, 'start' ); 

    sortedCopy.map((item, index) => {
      // Feature A : id01, 2020-03-01, 4w
      // Feature A : id02, after id01, 4w
      localText += item.summary + " : ";
      localText += item.id + ", ";
      // localText += this.monthToDate( item.start ) + ", "
      localText += "after " + item.start + ", ";
      localText += this.effortToGantt( item.effort );
      localText += "\n";
    });

    this.setState({ mermaidText: localText });
  };

  componentDidMount() {
    // subscribe to home component messages
    this.subscription = messageService.getMessage().subscribe(message => {
      if (message) {
        // add message to local state if not empty
        console.log("componentDidMount recieved message");

        this.setCSVData(message.text);
        // this.setState({ messages: [...this.state.messages, message] });
      } else {
        // clear messages when empty message received
        // this.setState({ messages: [] });
      }
    });

    this.setCSVData(store.getMessages());
  }

  render() {
    // // <Mermaid id="graph1" content={this.mermaidText} />

    if (this.state.mermaidText.length < 2) {
      return <div>No data for gantt</div>;
    }

    return (
      <div>
        <Mermaid id="graph1" content={this.state.mermaidText} />
        <pre>{this.state.mermaidText}</pre>
      </div>
    );
  }
}

export { GanttPlot };
