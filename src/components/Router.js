import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Navigation from "components/Navigation";
import Profile from "routes/Profile";

const AppRouter = ({ isLoggedIn, userObj }) => {
  //render시킬 routes는 로그인 여부에 따라 달라짐
  return (
    <Router>
      {isLoggedIn && <Navigation />}
      <Switch>
        {/* 사용자가 로그인 되어있는 상태 : isLoggedIn */}
        {isLoggedIn ? (
          <>
            {/* fragment : 많은 요소들를 render하고 싶을 때(부모 요소가 없을 때), div, span에 넣기 싫을 때 */}
            <Route exact path="/">
              <Home userObj={userObj} />{" "}
              {/* Home에 userObj를 공유(=props를 전달하는 것) */}
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
            {/* <Redirect from="*" to="/" /> */}
            {/* "/" route에 있으면 상관 없음, 그 외의 route로 가게되면 "/"로 돌아가라는 의미 */}
          </>
        ) : (
          <>
            <Route exact path="/">
              <Auth />
            </Route>
            {/* <Redirect from="*" to="/" /> */}
          </>
        )}
        {/* Auth : 로그인 페이지 */}
      </Switch>
    </Router>
  );
};

export default AppRouter;
