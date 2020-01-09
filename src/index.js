import React, { Component } from "react";
import ReactDOM from "react-dom";

import Board from "./Board";

import { messageService } from "./messageService";

import { HomePage } from "./HomePage";
import { MessageReciever } from "./MessageReciever";

// import { groupBy,uniq,map } from 'underscore'



import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { List, DatePicker, message } from "antd";

const getRandElement = arr => {
  const number = Math.floor(Math.random() * Math.floor(arr.length))
  // console.log(number)
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
    desctiption: `As user i want ${k + offset}, so that ...`,
    effort: 3,
    epic: getRandElement(storyAttributes.epic),
    version: getRandElement(["1.0", "1.1", "2.0"]),
    prio: getRandElement(storyAttributes.prio),
    status: getRandElement(storyAttributes.status),
    start: getRandElement(storyAttributes.start),
  }));


const createCSV = ( count, offset = 0 ) => {
  let csvDummy = ""
  csvDummy += "id, " 
  csvDummy += "summary, " 
  csvDummy += "desctiption, " 
  csvDummy += "effort, " 
  csvDummy += "epic, " 
  csvDummy += "version, " 
  csvDummy += "prio, " 
  csvDummy += "status, " 
  csvDummy += "start \n" 

  for( let index = 0; index < count; ++ index ){
    csvDummy +=  "JIRA-" + index
    csvDummy +=  "Item to " + index + offset
    csvDummy +=  "As user i want ${k + offset}, so that ..."
    csvDummy +=  3
    csvDummy +=  getRandElement(storyAttributes.epic)
    csvDummy +=  getRandElement(["1.0", "1.1", "2.0"])
    csvDummy +=  getRandElement(storyAttributes.prio)
    csvDummy +=  getRandElement(storyAttributes.status)
    csvDummy +=  getRandElement(storyAttributes.start)    

  }

  console.log( csvDummy )

  return csvDummy;

}

class App extends Component {
  constructor() {
    super();

    createCSV(5)
    const flatlist = getItems(10)

    console.log(flatlist)
    // 

    // console.log( groupedList )
    // const groups = ( uniq( flatlist.status ) ) 

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
    //   {
    //     title: "Progress",
    //     items: getItems(5, 10)
    //   },
    //   {
    //     title: "Done",
    //     items: getItems(5, 20)
    //   }
    // ]; // lists
  }

  componentDidMount() { }

  render() {
    return (
      <div>
        <div className="container text-center">
          <HomePage />
          <MessageReciever />
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
