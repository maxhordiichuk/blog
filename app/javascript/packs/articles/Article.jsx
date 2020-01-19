import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Article extends Component {
  prettyArticleType(article) {
    switch (article.kind) {
      case "blog_post": {
        return "Blog Post"
      }
      case "facebook_post": {
        return "Facebook Post"
      }
      case "tweet": {
        return "Tweet"
      }
    }
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
