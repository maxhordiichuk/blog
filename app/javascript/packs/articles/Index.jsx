import React, {Component} from 'react';
import axios from 'axios';

import Article from './Article';
import SearchBar from "./SearchBar";

class Index extends Component {
  constructor() {
    super();

    this.state = {
      articles: [],
      query: "",
      order: ""
    };
  }

  componentDidMount() {
    this.fetchArticles();
  }

  fetchArticles = ({query, order, onSuccess} = {}) => {
    query = query === undefined ? this.state.query : query;
    order = order === undefined ? this.state.order : order;

    axios.get('/articles.json', {params: {query, order}})
      .then((response) => {
        this.setState({articles: response.data.articles, query, order});
        onSuccess && onSuccess();
      });
  };

  orderBy = (field) => {
    const newOrder = this.state.order === `${field}_asc` ? `${field}_desc` : `${field}_asc`;
    this.fetchArticles({order: newOrder});
  };

  render() {
    const {articles} = this.state;

    return (
      <div className="container pt-4">
        <div className="mb-4">
          <SearchBar fetchArticles={this.fetchArticles}/>
        </div>
        <table className="table">
          <thead className="thead-light">
          <tr>
            <th scope="col" onClick={() => this.orderBy("id")}>#</th>
            <th scope="col" onClick={() => this.orderBy("name")}>Name</th>
            <th scope="col" onClick={() => this.orderBy("kind")}>Type</th>
            <th scope="col" onClick={() => this.orderBy("text")}>Text</th>
          </tr>
          </thead>
          <tbody>
          {articles.map(article => <Article key={article.id} article={article}/>)}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Index;
