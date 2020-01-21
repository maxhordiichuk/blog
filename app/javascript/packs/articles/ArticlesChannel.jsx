import React, {Component} from "react";
import PropTypes from "prop-types";

import consumer from "../../channels/consumer";

class ArticlesChannel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articlesSubscription: null
    };
  }

  componentDidMount() {
    this.createArticlesChannel();
  }

  componentWillUnmount() {
    this.destroyArticlesChannel();
  }

  createArticlesChannel = () => {
    const {fetchArticles} = this.props;

    this.setState({
      articlesSubscription: consumer.subscriptions.create("ArticlesChannel", {
        connected() {
          console.log("[ArticlesChannel] Connected");
        },
        disconnected() {
          console.log("[ArticlesChannel] Disconnected");
        },
        received(data) {
          if (data.action === "RELOAD") {
            fetchArticles();
          }
        }
      })
    });
  };

  destroyArticlesChannel = () => {
    const {articlesSubscription} = this.state;
    if (articlesSubscription) {
      consumer.subscriptions.remove(this.state.articlesSubscription);
      this.setState({articlesSubscription: null});
    }
  };

  render() {
    return null;
  }
}

ArticlesChannel.propTypes = {
  fetchArticles: PropTypes.func.isRequired
};

export default ArticlesChannel;
