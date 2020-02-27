import React, { Component } from "react";
import mermaid from "mermaid";

class Mermaid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      svg: null
    };

    console.log(this.props.content);

    const config = {
      startOnLoad: false,
      gantt: {
        titleTopMargin: 25,
        barHeight: 20,
        barGap: 5,
        topPadding: 50,
        leftPadding: 105,
        gridLineStartPadding: 35,
        fontSize: 12,
        fontFamily: '"Open-Sans", "sans-serif"',
        numberSectionStyles: 2,
        axisFormat:'W.%U',
        // axisFormat: "%Y-%m-%d"
      }
    };

    mermaid.initialize(
      config
    );
  }

  componentDidMount() {
    console.log(this.props.content);

    mermaid.mermaidAPI.render(this.props.id, this.props.content, svg => {
      this.setState({ svg });
    });
  }

  render() {
    if (!this.state.svg) {
      return <div>Loading...</div>;
    }

    return <div dangerouslySetInnerHTML={{ __html: this.state.svg }} />;
  }
}

export { Mermaid };
