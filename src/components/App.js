import React, { useEffect, useState } from "react";
import AppRouter from "./Router";
import { authService } from "../fbase";

function App() {
  const [init, setInit] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null); //usrObj는 많은 곳에서 필요로 하기 때문에 앱의 가장 위쪽에서 만들고 Router로 이동. ex) Home, Auth, EditProfile, Profile 등등.
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        // setIsLoggedIn(true);
        setUserObj(user);
      }
      // else {
      //   setIsLoggedIn(false);
      // }
      // 7번, 12번, 15-17번 지우고 23번에 isLoggedIn={isLoggedIn} 대신에 isLoggedIn={Boolean(userObj)} 써도 같음. userObj일 때만 로그인 할테니까
      setInit(true);
    });
  }, []);
  return (
    <>
      {init ? (
        <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} />
      ) : (
        "Initializing..."
      )}
    </>
  );
}

export default App;
