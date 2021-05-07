import React, { useState } from "react";
import { Auth } from "aws-amplify";
import "./style.css";
import { Link } from "react-router-dom";
import { useAppContext } from "../Context/Context";
import { API, graphqlOperation } from "aws-amplify";
import { getUSER  } from "../graphql/queries";
function Login() {
  const { setUserState, addUserDetails } = useAppContext();
  const [loading,setLoading]=useState(false)
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });
  async function onSubmit(e) {
    try {
      e.preventDefault();
      setLoading(true)
      const { username, email, password } = values;
      const user = await Auth.signIn(username, password);
      setUserState(true);
      addUserDetails(user);
      localStorage.setItem("auth", JSON.stringify(user));
      console.log(user);
    } catch (error) {
      console.log("error signing up:", error);
      if (error.code === "UserNotConfirmedException") {
        var code = prompt("Please enter confirmation code sent to your email");
        if (code != null) {
          confirmSignUp(code);
        }
        return;
      }
       setLoading(false)
      alert("error signing in");
    }
  }

  async function confirmSignUp(code) {
    try {
      const user = await Auth.confirmSignUp(values.username, code);
      alert("Verification was successfull. Please sign in again");
    //   console.log(user);
    setLoading(false)
      //   setUserState(true);
      //   addUserDetails(user);
      //   localStorage.setItem("auth", JSON.stringify(user));
    } catch (error) {
      console.log("error confirming sign up", error);
    }
  }
  const onChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="container">
      <h3>Sign in</h3>
      <form onSubmit={onSubmit}>
        <div>
          <label>Username</label>
          <br />
          <input
            onChange={onChange}
            type="text"
            name="username"
            placeholder="Username"
          />
        </div>
        <div>
          <label>Password</label>
          <br />
          <input
            onChange={onChange}
            type="password"
            name="password"
            placeholder="Password"
          />
        </div>

        <button disabled={loading?true:false} className="button" type="submit">
          Sign In {loading?<i className="fa fa-spinner fa-spin" ></i>:null}
        </button>
        <div style={{ marginTop: "20px" }}>
          Dont have an account?
          <Link to="/signup">Sign Up</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
