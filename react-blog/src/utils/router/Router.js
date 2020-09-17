import React from "react";
import "bootstrap/dist/css/bootstrap.css";

import "react-toastify/dist/ReactToastify.css";
import { PrivateRouter } from "../../components";
import {
  Tags,
  Categories,
  Posts,
  AllTags,
  AllCategories,
  AllPosts,
  Login,
  Registration,
  SinglePost,
} from "../../containers";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const RouterBlog = () => {
  return (
    <Router>
      <Switch>
        <PrivateRouter path="/admin/tags" component={Tags} exact={true} />
        <PrivateRouter
          path="/admin/categories"
          component={Categories}
          exact={true}
        />
        <PrivateRouter path="/admin/posts" component={Posts} exact={true} />
        <Route path="/tag" component={AllTags} exact={true} />
        <Route path="/category" component={AllCategories} exact={true} />
        <Route path="/" component={AllPosts} exact={true} />
        <Route path="/login" component={Login} exact={true} />
        <Route path="/registration" component={Registration} exact={true} />
        <Route path="/:slug-:id" component={SinglePost} exact={true} />
      </Switch>
    </Router>
  );
};

export default RouterBlog;
