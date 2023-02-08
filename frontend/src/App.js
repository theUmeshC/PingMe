import { Route, Switch, useHistory } from "react-router-dom";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import { Security, LoginCallback, SecureRoute } from "@okta/okta-react";
import NavBar from "./Components/NavBar";
import Auth from "./Pages/Auth";
import Home from "./Pages/Home";
import { ColorContextProvider } from "./Store/themeContext";
import { oktaConfig } from "./Lib/oktaConfig";
import AddUsers from "./Pages/AddUsers";

const CALLBACK_PATH = "/login/callback";

const oktaAuth = new OktaAuth(oktaConfig);

function App() {
  const history = useHistory();
  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    history.replace(toRelativeUrl(originalUri || "/", window.location.origin));
  };

  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      <>
        <Switch>
          <Route exact path="/">
            <Auth />
          </Route>
          <Route exact path={CALLBACK_PATH}>
            <LoginCallback />
          </Route>
          <ColorContextProvider>
            <SecureRoute path="/home" exact>
              <NavBar />
              <Home />
            </SecureRoute>
            <SecureRoute path="/addUsers">
              <AddUsers />
            </SecureRoute>
          </ColorContextProvider>
        </Switch>
      </>
    </Security>
  );
}

export default App;
