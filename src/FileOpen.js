import React, { Component } from "react";

import { messageService } from "./messageService";
import { jsonToCSV, csvSoJson } from "./csvToJson";

import { Settings } from "./Settings";


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
    effort: 3,
    epic: "" + getRandElement( Settings.storyAttributes.epic),
    version: "v" + getRandElement(["1.0", "1.1", "2.0"]),
    prio: "" + getRandElement( Settings.storyAttributes.prio),
    status: "" + getRandElement( Settings.storyAttributes.status),
    start: "" + getRandElement( Settings.storyAttributes.start)
  }));




class FileOpen extends React.Component {
  constructor(props) {
    super(props);

    this.numberOfRandonItems = 20;
  }


  showFile = async e => {
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

  showRand = () => {

    const flatlist = getItems( this.numberOfRandonItems );
    // this.setJsonData(flatlist);

    // this.lists = [
    //   {
    //     title: "Open",
    //     items: getItems(10)
    //   },
    //   { ... }
    // ]; // lists    

    const csv = jsonToCSV(flatlist);
    console.log( csv )
    messageService.sendMessage(csv);
  };


  render = () => {
    return (
      <div>
        <input type="file" onChange={e => this.showFile(e)} />
        <button onClick={ this.showRand } > Simulate </button>
      </div>

    );
  };
}

export default FileOpen;