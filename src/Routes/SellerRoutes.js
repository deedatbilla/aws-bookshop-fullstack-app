// import { Dash, Upload } from "../Views/";
import React from "react";
const Dash = React.lazy(() => import("../Views/SellerViews/Dash"));
const Upload = React.lazy(() => import("../Views/SellerViews/Upload"));
const routes = [
  { path: "/", exact: true },
  { path: "/dashboard", name: "Dashboard", component: Dash },
  { path: "/upload", name: "Upload", component: Upload } ,
];

export default routes;
