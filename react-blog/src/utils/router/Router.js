import React from "react";
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
import { useTransition, animated } from "react-spring";

import { Route, Switch, useLocation } from "react-router-dom";

const RouterBlog = () => {
  const location = useLocation();
  const transitions = useTransition(location, (location) => location.pathname, {
    from: { opacity: 0, transform: "translate3d(100%,0,0)" },
    enter: { opacity: 1, transform: "translate3d(0%,0,0)" },
    leave: { opacity: 0, transform: "translate3d(-50%,0,0)" },
  });

  return transitions.map(({ item: location, props, key }) => (
    <animated.div key={key} style={props}>
      <Switch location={location}>
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
    </animated.div>
  ));
};

export default RouterBlog;
