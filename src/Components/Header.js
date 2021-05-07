import React from "react";
import "./style.css";
import { useAppContext } from "../Context/Context";
import { Auth } from "aws-amplify";

function Header({history}) {
  const { user, setUserState, addUserDetails, cart } = useAppContext();
  console.log(user);
  return (
    <div className="nav bg-dark">
      <div className="nav-left">
        <i className="fa fa-home"></i>
        <div>Home</div>
      </div>

      <div className="nav-right">
        <div>Hello, {user.username}</div>

        <div style={{ marginLeft: "30px", position: "relative" }} onClick={()=>history.push("/summary")}>
          Cart
          <div
            className="bg-success"
            style={{
              position: "absolute",
              height: "20px",
              width: "20px",
              display: "flex",
              top: -5,
              right: -20,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "40px",

              //   margin: "10px",
            }}
          >
            {cart.length}
          </div>
        </div>
        <div
          style={{ marginLeft: "30px" }}
          onClick={async (e) => {
            try {
              await Auth.signOut();
              setUserState(false);
              addUserDetails("");
              localStorage.removeItem("auth");
            } catch (error) {
              console.log("error signing out: ", error);
            }
          }}
        >
          Logout
        </div>
      </div>
    </div>
  );
}

export default Header;
