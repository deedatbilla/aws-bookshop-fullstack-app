import React from "react";
const Books = React.lazy(() => import("../Views/BuyerViews/Books"));
const OrderSummary = React.lazy(() =>
  import("../Views/BuyerViews/OrderSummary")
);

const routes = [
  { path: "/", exact: true },
  { path: "/books", name: "Books", component: Books },
  { path: "/summary", name: "Books", component: OrderSummary },
];

export default routes;
