import React, {Component} from 'react';
import PropTypes from 'prop-types';

const ARTICLE_TYPES = {
  blog_post: "Blog Post",
  facebook_post: "Facebook Post",
  tweet: "Tweet"
};

class Article extends Component {
  prettyArticleType(article) {
    return ARTICLE_TYPES[article.kind];
  }

  render() {
    const {article} = this.props;

    return (
      <tr>
        <th scope="row">{article.id}</th>
        <td>{article.name}</td>
        <td>{this.prettyArticleType(article)}</td>
        <td>{article.text}</td>
      </tr>
    );
  }
}

Article.propTypes = {
  article: PropTypes.object.isRequired
};

export default Article;
