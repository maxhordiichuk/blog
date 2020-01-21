import React, {Component} from "react";
import PropTypes from "prop-types";

import {ARTICLE_TYPES} from "../constants";

class FieldGroups extends Component {
  renderGroupField = (value) => {
    if (this.props.group === "kind") {
      return ARTICLE_TYPES[value];
    }
    return value;
  };

  render() {
    const {articles, renderArticlesTable} = this.props;

    return Object.entries(articles).map(([value, articles]) => (
      <div key={value}>
        <h3>
          {this.renderGroupField(value)}
        </h3>
        <div className="mt-2">
          {renderArticlesTable(articles)}
        </div>
      </div>
    ));
  }
}

FieldGroups.propTypes = {
  articles: PropTypes.object.isRequired,
  group: PropTypes.string.isRequired,
  renderArticlesTable: PropTypes.func.isRequired
};

export default FieldGroups;
