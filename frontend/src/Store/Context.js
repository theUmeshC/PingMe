import React, { createContext, useContext, useMemo, useState } from "react";

const Context = createContext({
  messageBox: false,
  messageBoxHandler: () => {},
});

export const ContextProvider = ({ children }) => {
  const [messageBox, setMessageBox] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const contextValue = useMemo(
    () => ({
      messageBox,
      userInfo,
      messageBoxHandler: () =>
        setMessageBox((prevState) => (prevState === true ? false : true)),
      handleUserInfo: ((user) => {
        setUserInfo(user);
      })
    }),
    [messageBox, userInfo]
  );
  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export default Context;

export const UseContext = () => useContext(Context);

