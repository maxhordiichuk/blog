import React, {Component} from "react";
import PropTypes from "prop-types";

class SearchBar extends Component {
  onBlur = (event) => {
    this.fetchArticles(event);
  };

  onKeyDown = (event) => {
    if (event.keyCode === 13) {
      this.fetchArticles(event);
    }
  };

  fetchArticles = (event) => {
    this.props.fetchArticles({query: event.target.value});
  };

  render() {
    return (
      <input
        type="search"
        className="form-control"
        placeholder="Search"
        onKeyDown={this.onKeyDown}
        onBlur={this.onBlur}
      />
    );
  }
}

SearchBar.propTypes = {
  fetchArticles: PropTypes.func.isRequired
};

export default SearchBar;
