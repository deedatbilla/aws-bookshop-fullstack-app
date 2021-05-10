import React, { Suspense } from "react";
import { Header } from "../Components/";
import { Redirect, Route, Switch } from "react-router-dom";
import BuyerRoutes from "../Routes/BuyerRoutes";
import { useAppContext } from "../Context/Context";
import SellerRoutes from "../Routes/SellerRoutes";
function MainContent({ history }) {
  const { user } = useAppContext();
  //   console.log(user)
  return (
    <div>
      <Header history={history} />
      <Suspense fallback={<div>loading</div>}>
        {user?.attributes ? (
          <>
            {user.attributes["custom:role"] === "seller" ? (
              <Switch>
                {SellerRoutes.map((route, idx) => {
                  return (
                    route.component && (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={(props) => <route.component {...props} />}
                      />
                    )
                  );
                })}
                <Redirect from="/" to="/dashboard" />
              </Switch>
            ) : (
              <Switch>
                {BuyerRoutes.map((route, idx) => {
                  return (
                    route.component && (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={(props) => <route.component {...props} />}
                      />
                    )
                  );
                })}
                <Redirect from="/" to="/books" />
              </Switch>
            )}
          </>
        ) : null}
      </Suspense>
    </div>
  );
}

export default MainContent;
