import React, {Component} from "react";
import PropTypes from "prop-types";

class GroupSelect extends Component {
  onChange = (event) => {
    this.props.fetchArticles({group: event.target.value});
  };

  render() {
    return (
      <div>
        <select className="form-control" onChange={this.onChange}>
          <option value="">Group By</option>
          <option value="name">Name</option>
          <option value="kind">Type</option>
          <option value="text">Text</option>
          <option value="story">Story</option>
        </select>
      </div>
    );
  }
}

GroupSelect.propTypes = {
  fetchArticles: PropTypes.func.isRequired
};

export default GroupSelect;
