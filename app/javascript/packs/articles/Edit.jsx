import React, {Component} from "react";
import PropTypes from "prop-types";
import {Link, withRouter} from "react-router-dom";

import apiClient from "../helpers/apiClient";

import Form from "./Form";
import ApplicationLayout from "../layouts/ApplicationLayout";

class Edit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      article: {}
    }
  }

  componentDidMount() {
    this.fetchArticle();
  }

  fetchArticle = () => {
    const {id} = this.props;
    apiClient().get(`/articles/${id}.json`)
      .then((response) => {
        this.setState({article: response.data.article});
      })
  };

  onSubmit = (article, {onFail} = {}) => {
    apiClient().put(`/articles/${article.id}`, {article})
      .then((_response) => {
        this.props.history.push("/");
      })
      .catch(({response}) => {
        onFail && onFail(response.data.errors);
      });
  };

  render() {
    const {article} = this.state;

    return (
      <ApplicationLayout>
        {article.id && <Form onSubmit={this.onSubmit} article={article}/>}
        <div className="mt-3">
          <Link to="/" className="btn btn-secondary">Back</Link>
        </div>
      </ApplicationLayout>
    );
  }
}

Edit.propTypes = {
  id: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired
};

export default withRouter(Edit);
