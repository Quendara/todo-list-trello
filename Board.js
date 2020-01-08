import React from "react";

import React, { Component } from "react";
import ReactDOM from "react-dom";

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
  // display: "block",

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "white",

  // styles we need to apply on draggables
  ...draggableStyle
});

const sumEffort = (arr) => {

}

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "#F1F1F1",
  padding: grid,
  width: 250,
  margin: 4
});

class Board extends Component {
  constructor(probs) {
    super(probs);
    this.state = { lists: probs.list };
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

      // map the fechted items to the state . list
      // let val = {};
      // val[this.id2List[source.droppableId]] = result[source.droppableId];
      // val[this.id2List[destination.droppableId]] = result[destination.droppableId];
      // console.log(val);
      // this.setState(val);

      this.state.lists[+source.droppableId].items = result[+source.droppableId];
      this.state.lists[+destination.droppableId].items =
        result[+destination.droppableId];
      this.forceUpdate();
    }
  };

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    // {this.state.lists.map((listitem, index) => ({ listitem.title }))}

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        {this.state.lists.map((listitem, index) => (
          <Droppable droppableId={"" + index}>
            {(provided, snapshot) => (
              <div
                className="card"
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                <h4>
                  {listitem.title} <small>{listitem.items.length}</small>{" "}
                </h4>
                <hr />

                {listitem.items.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
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
                        
                        <div className="container-fluid">
                          <div className="row">
                          
                            <div className="col-sm-9">{item.id}</div>
        <div className="col-sm-3">
                              <span className="badge badge-light pull-right">
                                {item.effort}
                              </span>
                            </div>                            

                          </div>
                           <div className="row">
                            <div className="col-sm-12"><b>{item.summary}</b></div>
                          </div>

                          
                          <div className="row">
                            <div className="col-sm-12">{item.desctiption}</div>
                          </div>
                          <div className="row">
                            <div className="col-sm-9">
                              <span className="badge badge-primary pull-right">
                                {item.epic}
                              </span>
                            </div>
                            <div className="col-sm-3">
                              <span className="badge badge-light pull-right">
                                x
                              </span>
                            </div>
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
    );
  }
}

export default Board;
