import React from "react";

import React, { Component } from "react";
import ReactDOM from "react-dom";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// fake data generator
const getItems = (count, offset = 0) =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k + offset}`,
    content: `Item to  ${k + offset}`
  }));

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

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "white",

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "#F1F1F1",
  padding: grid,
  width: 250,
  margin: 4
});

class Board extends Component {
  constructor() {
    this.state = {
      lists: [
        {
          title: "Open",
          items: getItems(10)
        },
        {
          title: "Progress",
          items: getItems(5, 10)
        }
      ]

      // items2: getItems(5, 10),
      // items3: getItems(5, 20)
    };

    /**
     * A semi-generic way to handle multiple lists. Matches
     * the IDs of the droppable container to the names of the
     * source arrays stored in the state.
     */
    this.id2List = {
      droppable1: "items1",
      droppable2: "items2",
      droppable3: "items3"
    };
  }

  getList = id => this.state[this.id2List[id]];

  onDragEnd = result => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        this.getList(source.droppableId),
        source.index,
        destination.index
      );

      // let state = { items };

      // this.state.items[1].name = 'updated field name'
      // this.forceUpdate()

      console.log(+source.droppableId);

      // this.state.items[ +source.droppableId ].items = items;
      // this.forceUpdate()

      // state[ this.lists[ source.droppableId ] ] = {}
      // state[ this.lists[ source.droppableId ] ]['items']  = items

      // this.setState(state);

      // val[this.id2List[source.droppableId]] = items;
      // this.setState(val);

      // ...
      // if (source.droppableId === 'droppable3') {
      //     state = { items3: items };
      // }
      // this.setState(state);
    } else {
      const result = move(
        this.getList(source.droppableId),
        this.getList(destination.droppableId),
        source,
        destination
      );

      console.log(result);

      // map the fechted items to the state . list
      let val = {};
      val[this.id2List[source.droppableId]] = result[source.droppableId];
      val[this.id2List[destination.droppableId]] =
        result[destination.droppableId];

      console.log(val);
      this.setState(val);
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
                  {" "}
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
                        {item.content}
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
