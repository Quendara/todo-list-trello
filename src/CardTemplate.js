import React, { Component } from "react";

class CardTemplate extends React.Component {
  constructor(props) {
    super(props);

    this.item = props.item;
    
  }

  prioBadge( prio )
  {
    if( this.item.prio > 7){
      return 'badge-error'
    }
    else{
      return 'badge-light'
    }
  }

  render() {
    // const { item } = this.item;

    // console.log( this.item )

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-9">{ this.item.id }</div>
          <div className="col-sm-3">
            <span className="badge badge-dark pull-right">{ this.item.effort }</span>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <b>{ this.item.summary }</b>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12">{ this.item.description }</div>
        </div>
        <div className="row">
          <div className="col-sm-9">
            <span className="badge badge-primary pull-right">{ this.item.epic }</span>
          </div>
          <div className="col-sm-3">
  
            <span className="badge { prioBadge( this.item.prio ) } pull-right">
              { this.item.prio}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export { CardTemplate };
