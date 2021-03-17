import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 인자 authService.currentUser에서는 로그인 된지 안된지 모름(firebase가 실행될 시간 조차 주지 않을 만큼 빨라서, firebase를 기다려줘야됨, 따라서 자동으로 하면 안됨)
  useEffect(() => {
    // component가 mount될 때 실행 됨
    // onAuthStateChanged : event listener, 사용자의 로그인 상태의 변화를 관찰하는 관찰자를 추가시킴(user 상태에 변화가 있을 때, 로그인할 때, 로그아웃할 때 계정을 생성할 때, firebase가 초기화될 때 등 알아차리게 함), callback을 필요로함
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setInit(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true); // init이 false라면 router를 숨길 것이기 때문
    });
  }, []);
  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} /> : "Initializing..."}
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  );
}

export default App;
