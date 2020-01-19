import React, {Component} from 'react';
import axios from 'axios';

import Article from './Article';

class Index extends Component {
  constructor() {
    super();

    this.state = {
      articles: []
    };
  }

  componentDidMount() {
    axios.get('/articles.json')
      .then((response) => {
        this.setState({articles: response.data.articles});
      });
  }

  render() {
    const {articles} = this.state;

    return (
      <div className='container'>
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
