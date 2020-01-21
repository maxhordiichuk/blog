import React, {Component} from "react";
import PropTypes from "prop-types";

class StoryGroups extends Component {
  render() {
    const {articles, renderArticlesTable} = this.props;

    return articles.map((storyGroup) => (
      <div key={storyGroup.id}>
        <h3>
          {storyGroup.name}
        </h3>
        <div>
          Articles Count: {storyGroup.articles_count}
        </div>
        <div>
          Article Types Count: {storyGroup.article_kinds_count}
        </div>
        <div className="mt-2">
          {renderArticlesTable([storyGroup.recent_article])}
        </div>
      </div>
    ));
  }
}

StoryGroups.propTypes = {
  articles: PropTypes.array.isRequired,
  renderArticlesTable: PropTypes.func.isRequired
};

export default StoryGroups;
