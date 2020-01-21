import React, {Component} from "react";
import PropTypes from "prop-types";

import handleFieldChange from "../helpers/handleFieldChange";
import apiClient from "../helpers/apiClient";

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      article: {
        ...props.article,
        errors: {}
      },
      stories: []
    }
  }

  componentDidMount() {
    this.fetchStories();
  }

  fetchStories = () => {
    const {article} = this.state;

    apiClient().get('/stories.json')
      .then((response) => {
        const {stories} = response.data;
        this.setState({stories, article: {...article, story_id: stories[0].id}});
      })
  };

  onChange = (event) => {
    const {article} = this.state;
    this.setState({article: {...article, ...handleFieldChange(event, article)}});
  };

  onSubmit = () => {
    this.props.onSubmit(this.state.article, {
      onFail: (errors) => {
        this.setState({article: {...this.state.article, errors}})
      }
    });
  };

  renderErrors(name) {
    const {article} = this.state;
    const errors = article.errors && article.errors[name];
    if (_.isEmpty(errors)) return null;
    return <div className="text-danger">{errors.join(", ")}</div>;
  }

  render() {
    const {article, stories} = this.state;

    return (
      <form>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            placeholder="Name"
            onChange={this.onChange}
            value={article.name}
          />
          {this.renderErrors("name")}
        </div>
        <div className="form-group">
          <label htmlFor="story_id">Story</label>
          <select className="form-control" id="story_id" name="story_id" onChange={this.onChange}
                  value={article.story_id}>
            {stories.map((story) => <option key={story.id} value={story.id}>{story.name}</option>)}
          </select>
          {this.renderErrors("story_id")}
        </div>
        <div className="form-group">
          <label htmlFor="kind">Type</label>
          <select className="form-control" id="kind" name="kind" onChange={this.onChange} value={article.kind}>
            <option value="blog_post">Blog Post</option>
            <option value="facebook_post">Facebook Post</option>
            <option value="tweet">Tweet</option>
          </select>
          {this.renderErrors("kind")}
        </div>
        <div className="form-group">
          <label htmlFor="text">Text</label>
          <textarea
            className="form-control"
            id="text"
            name="text"
            placeholder="Text"
            onChange={this.onChange}
            value={article.text}
          />
          {this.renderErrors("text")}
        </div>
        <button onClick={this.onSubmit} className="btn btn-primary" type="button">Save</button>
      </form>
    );
  }
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default Form;
