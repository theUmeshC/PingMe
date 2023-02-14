import React, { createContext, useContext, useMemo, useState } from "react";

const Context = createContext({
  messageBox: false,
  messageBoxHandler: () => {},
});

export const ContextProvider = ({ children }) => {
  const [messageBox, setMessageBox] = useState(false);

  const [friend, setFriend] = useState(null);

  const contextValue = useMemo(
    () => ({
      messageBox,
      friend,
      messageBoxHandler: () => {
        setMessageBox((prevState) => !prevState);
      },
      friendHandler: (user) => {
        setFriend(user);
      },
    }),
    [messageBox, friend]
  );
  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export default Context;

export const SubContext = () => useContext(Context);
