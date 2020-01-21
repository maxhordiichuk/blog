import React, {Component} from "react";
import PropTypes from "prop-types";
import {Link, withRouter} from "react-router-dom";

import apiClient from "../helpers/apiClient";

import Form from "./Form";
import ApplicationLayout from "../layouts/ApplicationLayout";

class New extends Component {
  onSubmit = (article, {onFail} = {}) => {
    apiClient().post("/articles", {article})
      .then((_response) => {
        this.props.history.push("/");
      })
      .catch(({response}) => {
        onFail && onFail(response.data.errors);
      });
  };

  render() {
    const article = {
      name: "",
      story_id: "",
      kind: "blog_post",
      text: ""
    };

    return (
      <ApplicationLayout>
        <Form article={article} onSubmit={this.onSubmit}/>
        <div className="mt-3">
          <Link to="/" className="btn btn-secondary">Back</Link>
        </div>
      </ApplicationLayout>
    );
  }
}

New.propTypes = {
  history: PropTypes.object.isRequired
};

export default withRouter(New);
