import React, { Component } from "react";

class CardTemplate extends React.Component {
  constructor(props) {
    super(props);

    this.item = props.item;
    
  }

  badgePrio( prio )
  {
    if( prio > 7){
      return 'badge-danger'
    }
    if( prio == "Blocker"){
      return 'badge-danger'
    }
    else{
      return 'badge-light'
    }
  } 

  badgeStatus( status )
  {
    let ret =  'badge-light' //default
    switch( status ){
      case "Done": ret = 'badge-success'; break;
      case "Closed": ret = 'badge-success'; break;
      case "Verification": ret = 'badge-success'; break;
      case "Corrected": ret = 'badge-success'; break;
      case "Progress": ret = 'badge-warning'; break;
      case "In Progress": ret = 'badge-warning'; break;
      case "Delegated": ret = 'badge-info'; break;
      default : ret = 'badge-light'; break;
    }
      
    return ret;
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
            <span className={ "badge " + ( this.badgeStatus( this.item.status )) } >
            { this.item.status }</span>
          </div>
          <div className="col-sm-3">
            <span className={ "badge " + ( this.badgePrio( this.item.prio )) } >
              { this.item.prio}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export { CardTemplate };
