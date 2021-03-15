import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import ServiceContainer from "./containers/ServiceContainer";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/netflix">
        <ServiceContainer service="netflix" />
      </Route>
      <Route exact path="/hulu">
        <ServiceContainer service="hulu" />
      </Route>
      <Route exact path="/disney">
        <ServiceContainer service="disney" />
      </Route>
      <Route exact path="/prime">
        <ServiceContainer service="prime" />
      </Route>
      <Route exact path="/peacock">
        <ServiceContainer service="peacock" />
      </Route>
    </Switch>
  );
}
