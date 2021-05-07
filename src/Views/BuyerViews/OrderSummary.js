import React, { useState } from "react";
import { useAppContext } from "../../Context/Context";
import { API, graphqlOperation, Auth } from "aws-amplify";
import { createOrder } from "../../graphql/mutations";

function OrderSummary() {
  const { cart, user } = useAppContext();
  const [loading, setLoading] = useState(false);
  const sendEmail = async () => {
    const apiName = "bookshopRestApi";
    const path = "/sendmail";
    const myInit = {
      // OPTIONAL
      body: { email: user.email, order: cart }, // replace this with attributes you need
      headers: {}, // OPTIONAL
    };

    return await API.post(apiName, path, myInit);
  };
  async function SubmitOrder() {
    try {
      setLoading(true);
      const email=await sendEmail()
      console.log(email)
    //   const payload = {
    //     buyerId: user.id,
    //     items: cart,
    //   };
    //   await API.graphql(graphqlOperation(createOrder, { input: payload }));
      setLoading(false);
      alert("Order submitted");
    } catch (err) {
      console.log("error creating todo:", err);
      setLoading(false);
    }
  }
  return (
    <div className="container">
      <table className="table">
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Description</th>
          <th>Quantity</th>
        </tr>
        {cart.map((item, index) => (
          <tr>
            <td>{index} </td>
            <td>{item.title} </td>
            <td>{item.description} </td>
            <td>{item.count} </td>
          </tr>
        ))}
        <tr>
          <td></td> <td></td>
          <td></td>
          <td colSpan={4}>
            <button onClick={() => SubmitOrder()} className="btn btn-success">
              Place order{" "}
              {loading ? <i className="fa fa-spin fa-spinner"></i> : null}
            </button>
          </td>
        </tr>
      </table>
    </div>
  );
}

export default OrderSummary;
