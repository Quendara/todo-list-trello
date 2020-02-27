import React from "react";
import ReactDOM from "react-dom";

import { Component } from "react";
import { messageService } from "./messageService";
import { store } from "./messageService";

import { jsonToCSV, csvSoJson } from "./csvToJson";

import { Settings } from "./Settings";
import { CardTemplate } from "./CardTemplate";

// import ReactDOM from "react-dom";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const grid = 4;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  fontSize: 14,
  textAlign: "left",
  // display: "block",

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "white",

  // styles we need to apply on draggables
  ...draggableStyle
});

const sumEffort = arr => {
  return arr.length;

  let sum = 0;
  arr.map((item, index) => {
    sum += +item.effort;
  });
  return sum;
};

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "#F1F1F1",
  padding: grid,
  width: 250,
  margin: 4
});

class Board extends Component {
  constructor(probs) {
    super(probs);
    this.state = {
      lists: [],
      csv: "", // input / output
      columnGroup: "start",
      groups: []
    };

    // console.log( store )
    // console.log( ">" + store.getMessages() + "<" )
    
  }

  setCSVData = csv => {
    console.log("setCSVData");

    if( csv == null )
    {
      console.error( "CSV is null" )  
      return
    }
    // console.log(csv)
    this.state.csv = csv;
    const flatlist = csvSoJson(csv);

    // document.getElementById("inputTextarea").value = this.state.csv;

    console.log("setJsonData");
    // console.log(flatlist)

    this.setJsonData(flatlist, this.state.columnGroup);
  };

  setGroup = group => {
    console.log("setGroup");
    const flatlist = csvSoJson(this.state.csv);

    this.setJsonData(flatlist, group);
  };

  reset = columnGroup => {
    // clear array
    this.state.lists.length = 0;
    this.state.columnGroup = columnGroup;
    this.state.groups.length = 0;
    this.state.groups = Settings.storyAttributes[columnGroup]; // predefined/initial setting

    // if ( Settings.storyAttributes.hasOwnProperty( columnGroup ) ){

    // }
    // else{
    //   // clear
    //   this.state.groups.length = 0;
    // }

    // const groupedList = groupBy( flatlist, groupBy )

    // create predefined groups / colums
    this.state.groups.map((item, index) => {
      this.state.lists.push({ title: item, items: [] });
    });
  };

  setJsonData = (flatlist, columnGroup) => {
    // create groups out of the FLAT LIST
    this.reset(columnGroup);

    // add items to the columns
    flatlist.map((listitem, index) => {
      const groupItem = listitem[columnGroup]; // check to which colums this item belongs to
      console.log(groupItem);

      let colIdx = this.state.groups.indexOf(groupItem);
      // push items to the correct column
      if (colIdx >= 0) {
        // items fits to a column
        this.state.lists[colIdx].items.push(listitem);
      } else {
        let newColHeader = "Unspecified";
        if (groupItem != undefined && groupItem.length > 0) {
          newColHeader = groupItem;
        }

        // if item was undefined, now check if the Unspecified columns was already added
        let colIdx = this.state.groups.indexOf(newColHeader);
        if (colIdx >= 0) {
          // found
        } else {
          this.state.groups.push(newColHeader);

          // push item to last columnGroup
          this.state.lists.push({ title: newColHeader, items: [] });
          colIdx = this.state.lists.length - 1; // last column
        }
        this.state.lists[colIdx].items.push(listitem);
      }
    });

    this.forceUpdate();
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


    this.setCSVData( store.getMessages() )
  }

  componentWillUnmount() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

  getList = id => {
    return this.state.lists[+id].items;
    // return // this.state[this.id2List[id]]
  };

  onDragEnd = result => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      // called when dragged within a list
      console.log("reorder");
      const items = reorder(
        this.getList(source.droppableId),
        source.index,
        destination.index
      );

      console.log("droppableId : " + source.droppableId);
      // console.log(items);

      this.state.lists[+source.droppableId].items = items;
      this.forceUpdate();
    } else {
      // called when dragged from list to list
      console.log("Move");

      const result = move(
        this.getList(source.droppableId),
        this.getList(destination.droppableId),
        source,
        destination
      );

      console.log(result);

      // update lists in view
      this.state.lists[+source.droppableId].items = result[+source.droppableId];
      this.state.lists[+destination.droppableId].items =
        result[+destination.droppableId];

      console.log(this.state.lists);

      // fix group by
      let destList = this.state.lists[+destination.droppableId].items;
      for (let m = 0; m < destList.length; ++m) {
        // console.log( destList[m] )
        let item = destList[m];
        item[this.state.columnGroup] = this.state.lists[
          +destination.droppableId
        ].title;
      }

      // Export CSV
      this.state.csv = "";

      let newList = []

      for (let m = 0; m < this.state.lists.length; ++m) {
        try {
          if (this.state.lists[m].items.length != 0) {
            // console.log("Export : " + this.state.lists[m].items.length);
            newList.push.apply(newList, this.state.lists[m].items )
          } else {
            console.log("Export, no items for " + m);
          }
          //
        } finally {
          // console.error(" Export, no items for " + m);
        }
      }

      try {
        this.state.csv = jsonToCSV(
              newList,
              true
            );
      } finally {
          // console.error(" Export, no items for " + m);
        }

      store.setMessages( this.state.csv )
      this.forceUpdate();
    }
  };

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    // {this.state.lists.map((listitem, index) => ({ listitem.title }))}

    return (
      <div className="col-sm-12">
        <div className="row">
          <div className="col-sm-12">
            <hr />
            <div className="btn-group" role="group" aria-label="Basic example">
              <button
                className={
                  "btn btn-secondary " +
                  (this.state.columnGroup == "start" ? "active" : "")
                }
                onClick={e => this.setGroup("start")}
              >
                Time
              </button>
              <button
                className={
                  "btn btn-secondary " +
                  (this.state.columnGroup == "status" ? "active" : "")
                }
                onClick={e => this.setGroup("status")}
              >
                Status
              </button>
              <button
                className={
                  "btn btn-secondary " +
                  (this.state.columnGroup == "epic" ? "active" : "")
                }
                onClick={e => this.setGroup("epic")}
              >
                Epic 
              </button>
              <button
                className={
                  "btn btn-secondary " +
                  (this.state.columnGroup == "team" ? "active" : "")
                }
                onClick={e => this.setGroup("team")}
              >
                Team
              </button> 
              <button
                className={
                  "btn btn-secondary " +
                  (this.state.columnGroup == "effort" ? "active" : "")
                }
                onClick={e => this.setGroup("effort")}
              >
                Effort
              </button>
              <button
                className={
                  "btn btn-secondary " +
                  (this.state.columnGroup == "prio" ? "active" : "")
                }
                onClick={e => this.setGroup("prio")}
              >
                Prio
              </button>
            </div>
          </div>
        </div>

        <div className="row">
          <DragDropContext onDragEnd={this.onDragEnd}>
            {this.state.lists.map((listitem, index) => (
              <Droppable droppableId={"" + index}>
                {(provided, snapshot) => (
                  <div
                    className="card"
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                  >
                    <div className="row">
                      <div className="col-sm-9">
                        <b>{listitem.title}</b>
                      </div>
                      <div className="col-sm-3">
                        <span className="badge badge-dark pull-right">
                          {sumEffort(listitem.items)}
                        </span>
                      </div>
                    </div>
                    <hr />

                    {listitem.items.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            className="card"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                          >
                            <CardTemplate item={item} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </DragDropContext>
        </div>
      </div>
    );
  }
}

export default Board;
