import React, { createContext, useContext, useMemo, useState } from "react";

const Context = createContext({
  messageBox: false,
  messageBoxHandler: () => {},
});

export const ContextProvider = ({ children }) => {
  const [messageBox, setMessageBox] = useState(false);

  const contextValue = useMemo(
    () => ({
      messageBox,
      messageBoxHandler: () =>
        setMessageBox((prevState) => (prevState === true ? false : true)),
    }),
    [messageBox]
  );

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export default Context;

export const UseContext = () => useContext(Context);

