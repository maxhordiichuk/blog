import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

import {ARTICLE_TYPES} from "../constants";

import apiClient from "../helpers/apiClient";

class Article extends Component {
  prettyArticleType(article) {
    return ARTICLE_TYPES[article.kind];
  }

  onDestroy = () => {
    const {article, fetchArticles} = this.props;

    apiClient().delete(`/articles/${article.id}`)
      .then((_response) => {
        fetchArticles();
      })
  };

  render() {
    const {article} = this.props;

    return (
      <tr>
        <th scope="row">{article.id}</th>
        <td>{article.name}</td>
        <td>{this.prettyArticleType(article)}</td>
        <td>{article.text}</td>
        <td>
          <Link to={`/articles/edit/${article.id}`}>Edit</Link>
          <a href="#" className="text-danger ml-2" onClick={this.onDestroy}>Destroy</a>
        </td>
      </tr>
    );
  }
}

Article.propTypes = {
  article: PropTypes.object.isRequired,
  fetchArticles: PropTypes.func.isRequired
};

export default Article;
