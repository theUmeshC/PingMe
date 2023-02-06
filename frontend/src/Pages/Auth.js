import React from "react";
import { useOktaAuth } from "@okta/okta-react";

const Auth = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const login = () => oktaAuth.signInWithRedirect({ originalUri: "/Home" });

  if (!authState) {
    return <div>Loading authentication...</div>;
  } else if (!authState.isAuthenticated) {
    return (
      <div>
        <button onClick={login}>Login</button>
      </div>
    );
  } else {
    return "You authenticated";
  }
};

export default Auth;
