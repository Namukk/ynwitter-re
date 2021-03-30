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
        setUserObj({
          displayName: user.displayName,
          uid: user.uid.refreshUser,
          updateProfile: (args) => user.updateProfile(args),
        });
        // setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setUserObj(null);
      }
      // else {
      //   setIsLoggedIn(false);
      // }
      // 7번, 17번, 22-24번 지우고 41번에 isLoggedIn={isLoggedIn} 대신에 isLoggedIn={Boolean(userObj)} 써도 같음. userObj일 때만 로그인 할테니까
      setInit(true);
    });
  }, []);
  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid.refreshUser,
      updateProfile: (args) => user.updateProfile(args),
    });
  };
  return (
    <>
      {init ? (
        <AppRouter
          isLoggedIn={Boolean(userObj)}
          userObj={userObj}
          refreshUser={refreshUser}
        />
      ) : (
        "Initializing..."
      )}
    </>
  );
}

export default App;
