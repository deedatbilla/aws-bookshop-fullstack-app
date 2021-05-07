import React, { useState } from "react";
import { Auth } from "aws-amplify";
import "./style.css";
import { Link } from "react-router-dom";
import { useAppContext } from "../Context/Context";
import { API, graphqlOperation } from "aws-amplify";
import { createUSER } from "../graphql/mutations";

function SignUp({ history }) {
  const { setUserState, addUserDetails } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });
  async function onSubmit(e) {
    try {
      e.preventDefault();
      setLoading(true);
      const { username, email, password, role } = values;
      //   console.log(values)

      const { user } = await Auth.signUp({
        username,
        password,
        attributes: {
          email, // optional
          "custom:role": role,
        },
      });

      console.log(user);
      //   await API.graphql(
      //     graphqlOperation(createUSER, {
      //       input: { username,email,userType:role, },
      //     })
      //   );
      setLoading(false);
      alert("Sign up successul. Please login now");
      history.push("/signin");
    } catch (error) {
      console.log("error signing up:", error);
      alert("Error signing up");
      setLoading(false);
    }
  }

  async function confirmSignUp(code) {
    try {
      const user = await Auth.confirmSignUp(values.username, code);
      alert("Verification was successfull. Please sign in again");
      console.log(user);
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
      <h3>Sign Up</h3>
      <form onSubmit={onSubmit}>
        <div>
          <label>Username</label>
          <br />
          <input
            required
            onChange={onChange}
            type="text"
            name="username"
            placeholder="Username"
          />
        </div>
        <div>
          <label>Email</label>
          <br />
          <input
            required
            onChange={onChange}
            type="email"
            name="email"
            placeholder="Email"
          />
        </div>

        <div>
          <label>Password</label>
          <br />
          <input
            required
            onChange={onChange}
            type="password"
            name="password"
            placeholder="Password"
          />
        </div>

        <div>
          <label>Sign up as</label>
          <br />
          <select onChange={onChange} required name="role">
            <option value="">---select---</option>
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
          </select>
        </div>
        <button
          disabled={loading ? true : false}
          className="button"
          type="submit"
        >
          Sign Up {loading ? <i className="fa fa-spinner fa-spin"></i> : null}
        </button>

        <div style={{ marginTop: "20px" }}>
          Already have an account?
          <Link to="/signup">Sign In</Link>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
