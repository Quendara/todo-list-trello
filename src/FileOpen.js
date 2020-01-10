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
    epic: "" + getRandElement(Settings.storyAttributes.epic),
    version: "v" + getRandElement(["1.0", "1.1", "2.0"]),
    prio: "" + getRandElement(Settings.storyAttributes.prio),
    status: "" + getRandElement(Settings.storyAttributes.status),
    start: "" + getRandElement(Settings.storyAttributes.start)
  }));

class FileOpen extends React.Component {
  constructor(props) {
    super(props);

    this.numberOfRandonItems = 20;
  }

  // showFile = async e => {
  //   e.preventDefault();
  //   const reader = new FileReader();
  //   reader.onload = async e => {
  //     const text = e.target.result;

  //     console.log("showFile");
  //     console.log(text);
  //     // alert(text);
  //     messageService.sendMessage(text);
  //   };
  //   reader.readAsText(e.target.files[0]);
  // };

  showFile = async e => {
    let csv = ""
    csv += "id; summary; description; effort; epic; version; prio; status; start"
    csv += "JIRA-0; Item to  0; As user i want 0, so that ...; 3; epic1; v1.0; 2; Progress; Q3"
    csv += "JIRA-1; Item to  1; As user i want 1, so that ...; 3; epic1; v2.0; 10; Open; Q1"
    csv += "JIRA-2; Item to  2; As user i want 2, so that ...; 3; epic1; v1.1; 5; Done; Q2"
    csv += "JIRA-3; Item to  3; As user i want 3, so that ...; 3; epic2; v1.1; 5; Progress; Q1"
    csv += "JIRA-4; Item to  4; As user i want 4, so that ...; 3; epic2; v1.1; 0; Progress; Q2"
    csv += "JIRA-5; Item to  5; As user i want 5, so that ...; 3; epic4; v2.0; 10; Open; Q2"
    csv += "JIRA-6; Item to  6; As user i want 6, so that ...; 3; epic1; v1.0; 10; Open; Q1"
    csv += "JIRA-7; Item to  7; As user i want 7, so that ...; 3; epic3; v2.0; 2; Verificatin; Q1"
    csv += "JIRA-8; Item to  8; As user i want 8, so that ...; 3; epic3; v1.0; 0; Open; Q2"
    csv += "JIRA-9; Item to  9; As user i want 9, so that ...; 3; epic4; v1.0; 2; Open; Q3"
    csv += "JIRA-10; Item to  10; As user i want 10, so that ...; 3; epic3; v2.0; 0; Open; Q1"
    csv += "JIRA-11; Item to  11; As user i want 11, so that ...; 3; epic3; v1.0; 0; Verificatin; Q2"
    csv += "JIRA-12; Item to  12; As user i want 12, so that ...; 3; epic3; v1.0; 2; Open; Q2"
    csv += "JIRA-13; Item to  13; As user i want 13, so that ...; 3; epic4; v1.1; 10; Progress; Q4"
    csv += "JIRA-14; Item to  14; As user i want 14, so that ...; 3; epic2; v2.0; 10; Verificatin; Q3"
    csv += "JIRA-15; Item to  15; As user i want 15, so that ...; 3; epic4; v1.1; 2; Progress; Q3"
    csv += "JIRA-16; Item to  16; As user i want 16, so that ...; 3; epic4; v2.0; 5; Progress; Q3"
    csv += "JIRA-17; Item to  17; As user i want 17, so that ...; 3; epic3; v2.0; 2; Done; Q4"
    csv += "JIRA-18; Item to  18; As user i want 18, so that ...; 3; epic4; v2.0; 2; Progress; Q1"
    csv += "JIRA-19; Item to  19; As user i want 19, so that ...; 3; epic1; v1.0; 0; Progress; Q1"    
    messageService.sendMessage(csv);
  };

  showRand = () => {
    const flatlist = getItems(this.numberOfRandonItems);
    // this.setJsonData(flatlist);

    // this.lists = [
    //   {
    //     title: "Open",
    //     items: getItems(10)
    //   },
    //   { ... }
    // ]; // lists

    const csv = jsonToCSV(flatlist);
    console.log(csv);
    messageService.sendMessage(csv);
  };

  render = () => {
    return (
      <div>
        <input type="file" onChange={e => this.showFile(e)} />
        <button onClick={this.showRand}> Simulate </button>
      </div>
    );
  };
}

export default FileOpen;
