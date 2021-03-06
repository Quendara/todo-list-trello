import React, { Component } from "react";
import { selectedMessageService } from "./messageService";

class CardTemplateFetch extends React.Component {
  constructor(props) {
    super(props);
    this.item = props.item;

    this.state = {
      description: ""
    };
  }

  badgePrio(prio) {
    if (prio > 7) {
      return "badge-danger";
    }
    if (prio == "Blocker") {
      return "badge-danger";
    } else {
      return "badge-light";
    }
  }

  onClickHandle() {
    selectedMessageService.sendMessage([this.props.item]);
  }

  componentDidMount() {
    let url = "http://localhost:5000/epic/1/Beschreibung";
    fetch( url )
      .then(response => response.json())
      .then(data => this.setState({ "description":data }));
  }

  badgeStatus(status) {
    let ret = "badge-light"; //default
    switch (status) {
      case "Done":
        ret = "badge-success";
        break;
      case "Closed":
        ret = "badge-success";
        break;
      case "Verification":
        ret = "badge-success";
        break;
      case "Corrected":
        ret = "badge-success";
        break;
      case "Progress":
        ret = "badge-warning";
        break;
      case "In Progress":
        ret = "badge-warning";
        break;
      case "Delegated":
        ret = "badge-info";
        break;
      default:
        ret = "badge-light";
        break;
    }

    return ret;
  }

  render() {
    // const { item } = this.props.item

    // console.log( this.item )

    return (
      <div className="container-fluid" onClick={() => this.onClickHandle()}>
        <div className="row">
          <div className="col-sm-9">{this.props.item.id}</div>
          <div className="col-sm-3">
            <span className="badge badge-dark pull-right">
              {this.props.item.effort}
            </span>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <b>{this.props.item.summary}</b>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12">{this.description}</div>
        </div>
        <div className="row">
          <div className="col-sm-9">
            <span className="badge badge-primary pull-right">
              {this.props.item.epic}
            </span>
            <span className="badge badge-success">{this.props.item.team}</span>
            <span
              className={"badge " + this.badgeStatus(this.props.item.status)}
            >
              {this.props.item.status}
            </span>
          </div>
          <div className="col-sm-3">
            <span className={"badge " + this.badgePrio(this.props.item.prio)}>
              {this.props.item.prio}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export { CardTemplateFetch };
