import React, {Component} from 'react';
import axios from 'axios';

import Article from './Article';
import SearchBar from "./SearchBar";
import GroupSelect from "./GroupSelect";
import FieldGroups from "./FieldGroups";
import StoryGroups from "./StoryGroups";

class Index extends Component {
  constructor() {
    super();

    this.state = {
      articles: [],
      query: "",
      order: "",
      group: ""
    };
  }

  componentDidMount() {
    this.fetchArticles();
  }

  fetchArticles = ({query, order, group} = {}) => {
    query = query === undefined ? this.state.query : query;
    order = order === undefined ? this.state.order : order;
    group = group === undefined ? this.state.group : group;

    axios.get('/articles.json', {params: {query, order, group}})
      .then((response) => {
        this.setState({articles: response.data.articles, query, order, group});
      });
  };

  orderBy = (field) => {
    if (this.state.group) {
      return;
    }

    const newOrder = this.state.order === `${field}_asc` ? `${field}_desc` : `${field}_asc`;
    this.fetchArticles({order: newOrder});
  };

  renderTable = (articles) => {
    return (
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
    );
  };

  renderGroups = () => {
    const {articles, group} = this.state;

    if (group === "story") {
      return <StoryGroups articles={articles} renderArticlesTable={this.renderTable}/>;
    }
    return <FieldGroups articles={articles} renderArticlesTable={this.renderTable}/>;
  };

  render() {
    const {group, articles} = this.state;

    return (
      <div className="container pt-4">
        <div className="mb-4">
          <div className="row">
            <div className="col-6">
              <SearchBar fetchArticles={this.fetchArticles}/>
            </div>
            <div className="col-6">
              <GroupSelect fetchArticles={this.fetchArticles}/>
            </div>
          </div>
        </div>
        {group ? this.renderGroups() : this.renderTable(articles)}
      </div>
    );
  }
}

export default Index;
