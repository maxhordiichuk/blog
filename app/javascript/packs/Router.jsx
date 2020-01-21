import React, {Component, Fragment} from "react"
import {Switch, BrowserRouter, Route} from "react-router-dom";

import ArticlesIndex from "./articles/Index";
import ArticlesNew from "./articles/New";
import ArticlesEdit from "./articles/Edit";

class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <Switch>
            <Route exact path="/" component={ArticlesIndex}/>
            <Route exact path="/articles/new" component={ArticlesNew}/>
            <Route exact path="/articles/edit/:id" render={({match}) => <ArticlesEdit id={match.params.id}/>}/>
          </Switch>
        </Fragment>
      </BrowserRouter>
    );
  }
}

export default Router;
