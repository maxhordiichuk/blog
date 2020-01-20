import React, {Component} from 'react';
import axios from 'axios';

import Article from './Article';
import SearchBar from "./SearchBar";

class Index extends Component {
  constructor() {
    super();

    this.state = {
      articles: []
    };
  }

  componentDidMount() {
    this.fetchArticles();
  }

  fetchArticles = ({query = ""} = {}) => {
    axios.get('/articles.json', {params: {query}})
      .then((response) => {
        this.setState({articles: response.data.articles});
      });
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
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Type</th>
            <th scope="col">Text</th>
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
