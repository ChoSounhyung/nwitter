import React, { useState } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";

const AppRouter = ({ isLoggedIn }) => {
  //render시킬 routes는 로그인 여부에 따라 달라짐
  return (
    <Router>
      <Switch>
        {/* 사용자가 로그인 되어있는 상태 : isLoggedIn */}
        {isLoggedIn ? (
          <>
            {" "}
            {/* fragment : 많은 요소들를 render하고 싶을 때(부모 요소가 없을 때), div, span에 넣기 싫을 때 */}
            <Route exact path="/">
              <Home />
            </Route>
          </>
        ) : (
          <Route exact path="/">
            <Auth />
          </Route>
        )}{" "}
        {/* Auth : 로그인 페이지 */}
      </Switch>
    </Router>
  );
};

export default AppRouter;
