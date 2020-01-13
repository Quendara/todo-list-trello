import React from "react";

import { Component } from "react";
import { messageService } from "./messageService";
import { jsonToCSV, csvSoJson } from "./csvToJson";

import { Settings } from "./Settings";

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
    this.state = { lists: [], csv: "", columnGroup: "start" };
  }

  setCSVData(csv) {
    console.log("setCSVData");
    // console.log(csv)
    const flatlist = csvSoJson(csv);

    console.log("setJsonData");
    // console.log(flatlist)

    this.setJsonData(flatlist);
  }

  setJsonData(flatlist) {
    // clear array
    this.state.lists.length = 0;

    // const groupedList = groupBy( flatlist, groupBy )
    const groups = Settings.storyAttributes[this.state.columnGroup];
    // create groups / colums
    groups.map((item, index) => {
      this.state.lists.push({ title: item, items: [] });
    });
    // add items to the columns
    flatlist.map((listitem, index) => {
      const groupItem = listitem[this.state.columnGroup];
      const colIdx = groups.indexOf(groupItem);
      // push items to the correct column
      if (colIdx >= 0) {
        this.state.lists[colIdx].items.push(listitem);
      } else {
        console.warn("Item Ignored");
        console.warn(listitem);
      }
    });

    this.forceUpdate();
  }

  componentDidMount() {
    // subscribe to home component messages
    this.subscription = messageService.getMessage().subscribe(message => {
      if (message) {
        // add message to local state if not empty

        console.log("componentDidMount recieved message");
        // console.log(message);

        this.setCSVData(message.text);
        // this.setState({ messages: [...this.state.messages, message] });
      } else {
        // clear messages when empty message received
        // this.setState({ messages: [] });
      }
    });
  }

  componentWillUnmount() {
    this.subscription.unsubscribe();
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

      this.state.lists[+source.droppableId].items = result[+source.droppableId];
      this.state.lists[+destination.droppableId].items =
        result[+destination.droppableId];

      console.log(this.state.lists);

      // fix group by
      let destList = this.state.lists[+destination.droppableId].items;
      for (let m = 0; m < destList.length; ++m) {
        // console.log( destList[m] )
        let item = destList[m];
        item["this.state.columnGroup"] = this.state.lists[
          +destination.droppableId
        ].title;
      }

      this.state.csv = "";

      for (let m = 0; m < this.state.lists.length; ++m) {
        try {
          if (this.state.lists[m].items.length != 0) {
            console.log("Export : " + this.state.lists[m].items.length);
            this.state.csv += jsonToCSV(this.state.lists[m].items);
            this.state.csv += "\n\n";
            // console.log( this.state.lists[m]);
          } else {
            console.log("Export, no items for " + m);
          }
          //
        } finally {
          // console.error(" Export, no items for " + m);
        }
      }

      console.log("Exported");
      console.log(this.state.csv);

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
                            <div className="row">
                              <div className="col-sm-9">{item.id}</div>
                              <div className="col-sm-3">
                                <span className="badge badge-dark pull-right">
                                  {item.effort}
                                </span>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-sm-12">
                                <b>{item.summary}</b>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-sm-12">
                                {item.description}
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-sm-9">
                                <span className="badge badge-primary pull-right">
                                  {item.epic}
                                </span>
                              </div>
                              <div className="col-sm-3">
                                <span className="badge {if(item.prio>7) ? 'badge-light' : 'badge-error' } pull-right">
                                  {item.prio}
                                </span>
                              </div>
                            </div>
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
        <hr />
        <div className="alert alert-primary" id="export" role="alert">
          Export
          <hr />
          <pre>{this.state.csv}</pre>
        </div>
      </div>
    );
  }
}

export default Board;
