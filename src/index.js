import React, { Component } from "react";
import ReactDOM from "react-dom";

import Board from "./Board";

import { messageService } from "./messageService";

import { HomePage } from "./HomePage";
import { MessageReciever } from "./MessageReciever";

import { jsonToCSV, csvSoJson } from "./csvToJson";


// import { groupBy,uniq,map } from 'underscore'



import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { List, DatePicker, message } from "antd";

const getRandElement = arr => {
  const number = Math.floor(Math.random() * Math.floor(arr.length))
  console.log(number)
  return arr[number];
};

const storyAttributes = {
  status: ["Open", "Progress", "Verificatin", "Done"],
  epic: ["epic1", "epic2", "epic3", "epic4"],
  prio: ["0", "2", "5", "10"],
  start: ["Q1", "Q2", "Q3", "Q4"]
}

// fake data generator
const getItems = (count, offset = 0) =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `JIRA-${k + offset}`,
    summary: `Item to  ${k + offset}`,
    description: `As user i want ${k + offset}, so that ...`,
    effort: 3,
    epic: "" + getRandElement(storyAttributes.epic),
    version: "v" + getRandElement(["1.0", "1.1", "2.0"]),
    prio: "" + getRandElement(storyAttributes.prio),
    status: "" + getRandElement(storyAttributes.status),
    start: "" + getRandElement(storyAttributes.start),
  }));


function testCSV( jsonInput )
{
    console.log("Print flatlist")
    console.log(jsonInput)

    const csv = jsonToCSV( jsonInput )

    console.log("Print csv")
    console.log(csv)

    const json2 = csvSoJson( csv )

    console.log("Print json")
    console.log(json2)

    const csv2 = jsonToCSV( json2 )
    
    console.log("Print csv")
    console.log(csv2)    
}

import React, { Component } from 'react';

class FileOpen extends Component {

  constructor(props) {
    super(props);
  }

  showFile = async (e) => {
    e.preventDefault()
    const reader = new FileReader()
    reader.onload = async (e) => { 
      const text = (e.target.result)
      console.log(text)
      alert(text)
      messageService.sendMessage(text)
    };
    reader.readAsText(e.target.files[0])
  }

  render = () => {

    return (<div>
      <input type="file" onChange={(e) => this.showFile(e)} />
    </div>
    )
  }
}

export default App;


class App extends Component {
  constructor() {
    super();

    
    const flatlist = getItems(10)

    testCSV( flatlist  )
   
    this.lists = []

    const groupBy = "start"
    // const groupedList = groupBy( flatlist, groupBy ) 

    const groups = storyAttributes[groupBy]

    // create groups / colums
    groups.map((item, index) => {
      this.lists.push({ title: item, items: [] })
    })

    // add items to the columns
    flatlist.map((listitem, index) => {

      const groupItem = listitem[groupBy]
      const colIdx = groups.indexOf(groupItem)

      // push items to the correct column
      if (colIdx >= 0) {
        this.lists[colIdx].items.push(listitem)
      }
      else {
        console.warn("Item Ignored")
        console.warn(listitem)
      }



      // if( listitem[ groupBy ] === 'Done' )

    })

    // this.lists = [
    //   {
    //     title: "Open",
    //     items: getItems(10)
    //   },
    //   { ... }
    // ]; // lists
  }

  componentDidMount() { }

  render() {
    // <HomePage />
    return (
      <div>
        <div className="container text-center">
          
          <MessageReciever />
          <FileOpen />
          <div className="row">
            <Board list={this.lists} />

          </div>
        </div>


      </div>
    );
  }
}

// Put the things into the DOM!
ReactDOM.render(<App />, document.getElementById("root"));