import "./App.css";
import React from "react";
import Amplify from "aws-amplify";
import awsExports from "./aws-exports";
import { HashRouter, Switch } from "react-router-dom";
import { Provider } from "./Context/Context";
import { PublicRoute, PrivateRoute } from "./Helpers";
import { MainContent } from "./Views/";
const SignIn = React.lazy(() => import("./Pages/SignIn"));
const SignUp = React.lazy(() => import("./Pages/SignUp"));
Amplify.configure(awsExports);

const App = () => {
  return (
    <Provider>
      <HashRouter>
        <React.Suspense fallback={<div>Loading</div>}>
          <Switch>
            <PublicRoute restricted={true} path="/signin" component={SignIn} />
            <PublicRoute restricted={true} path="/signup" component={SignUp} />
            <PrivateRoute path="/" component={MainContent} />
          </Switch>
        </React.Suspense>
      </HashRouter>
    </Provider>
  );
};

export default App;
