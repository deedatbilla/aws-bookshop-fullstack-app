import React from "react";
import "./style.css";
function Dash({ history }) {
  return (
    <div className="container">
      <div className="options" onClick={() => history.push("/upload")}>
        <i className="fa fa-plus"></i>
        Upload a book
      </div>
    </div>
  );
}

export default Dash;
