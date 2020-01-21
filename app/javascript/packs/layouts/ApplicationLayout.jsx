import React, {Component} from "react";

class ApplicationLayout extends Component {
  render() {
    return (
      <div className="container pt-4">
        {this.props.children}
      </div>
    );
  }
}

export default ApplicationLayout;
