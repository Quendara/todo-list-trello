import React, { Component } from "react";

import { messageService } from "./messageService";
import { store } from "./messageService";
import { jsonToCSV, csvSoJson } from "./csvToJson";

import { SettingsSimulate } from "./Settings";

const getRandElement = arr => {
  const number = Math.floor(Math.random() * Math.floor(arr.length));
  console.log(number);
  return arr[number];
};

// fake data generator
const getItems = (count, offset = 0) =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `JIRA-${k + offset}`,
    summary: `Item to  ${k + offset}`,
    description: `As user i want ${k + offset}, so that ...`,
    effort: "" + getRandElement(SettingsSimulate.storyAttributes.effort),
    epic: "" + getRandElement(SettingsSimulate.storyAttributes.epic),
    version: "v" + getRandElement(["1.0", "1.1", "2.0"]),
    prio: "" + getRandElement(SettingsSimulate.storyAttributes.prio),
    status: "" + getRandElement(SettingsSimulate.storyAttributes.status),
    start: "" + getRandElement(SettingsSimulate.storyAttributes.start)
  }));

// fake data generator
const getItemsSimple = (count, offset = 0) =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    // id: `JIRA-${k + offset}`,
    summary: `Item to  ${k + offset}`
    // description: `As user i want ${k + offset}, so that ...`,
  }));

class FileOpen extends React.Component {
  constructor(props) {
    super(props);

    this.numberOfRandonItems = 15;
  }

  loadFile = async e => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = async e => {
      const text = e.target.result;

      console.log("showFile");
      console.log(text);
      // alert(text);
      messageService.sendMessage(text);
    };
    reader.readAsText(e.target.files[0]);
  };

  
  setCSVData = csv => {

    document.getElementById("inputTextarea").value = csv;
  }

  readCSVFromInput = () => {
    const csv = document.getElementById("inputTextarea");
    store.setMessages( csv.value )
    // this.setCSVData(csv.value);
    // messageService.sendMessage(csv.value);
  };  

  componentWillUnmount() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
    const csv = document.getElementById("inputTextarea");
    store.setMessages( csv.value )

  }

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


    this.setCSVData( store.getMessages() )
  }  

  createRand = () => {
    const flatlist = getItems(this.numberOfRandonItems);
    const csv = jsonToCSV(flatlist);
    console.log(csv);
    messageService.sendMessage(csv);
  };

  createRandSimple = () => {
    const flatlist = getItemsSimple(this.numberOfRandonItems);
    const csv = jsonToCSV(flatlist);
    console.log(csv);
    messageService.sendMessage(csv);
  };

  render = () => {
    return (
      <div className="row">
        <div className="col-sm-6">
          <input
            type="file"
            className="btn btn-primary"
            onChange={e => this.loadFile(e)}
          />
        </div>
        <div className="col-sm-3">
          <button
            className="btn btn-secondary"
            onClick={e => this.createRand()}
          >
            Simulate
          </button>
        </div>
        <div className="col-sm-3">
          <button
            className="btn btn-secondary"
            onClick={e => this.createRandSimple()}
          >
            Simulate Simple
          </button>
        </div>

        <div className="col-sm-12">
        <hr /> 
          <div className="alert alert-primary" id="export" role="alert">
            <button
              className="btn btn-secondary"
              onClick={e => this.readCSVFromInput()}
            >
              Update
            </button>
            <hr />
            <textarea className="form-control" rows="10" id="inputTextarea" />
          </div>
        </div>
      </div>
    );
  };
}

export default FileOpen;
