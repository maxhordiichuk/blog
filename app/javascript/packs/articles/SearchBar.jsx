import React, {Component} from "react";
import PropTypes from "prop-types";

class SearchBar extends Component {
  onChange = (event) => {
    this.setState({query: event.target.value});
  };

  onKeyDown = (event) => {
    if (event.keyCode === 13) {
      this.props.fetchArticles({query: event.target.value});
    }
  };

  render() {
    return (
      <input type="search" className="form-control" placeholder="Search" onKeyDown={this.onKeyDown}/>
    );
  }
}

SearchBar.propTypes = {
  fetchArticles: PropTypes.func.isRequired
};

export default SearchBar;
