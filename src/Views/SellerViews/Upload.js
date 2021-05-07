import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { Link } from "react-router-dom";
import { useAppContext } from "../../Context/Context";
import Amplify, { API, graphqlOperation, Storage } from "aws-amplify";
import { createBook } from "../../graphql/mutations";
// import { listTodos } from './graphql/queries'
function Upload({ history }) {
  const { setUserState, addUserDetails, user } = useAppContext();
  const [loading, setLoading] = useState(false);
  // console.log(user)
  const [file, setFile] = useState();
  const [values, setValues] = useState({
    title: "",
    description: "",
    authur: "",
    price: "",
    fileurl: "",
  });

  async function onSubmit(e) {
    try {
      setLoading(true);
      e.preventDefault();
      //   const { username, email, password } = values;

      const filedata = await Storage.put(file.name, file, {
        contentType: "image/pdf", // contentType is optional
      });
      const signedURL = await Storage.get(filedata.key);
      await API.graphql(
        graphqlOperation(createBook, {
          input: { ...values, ownerId: user.id, fileurl: signedURL },
        })
      );
      setLoading(false);
      alert("upload complete");
      setValues({
        title: "",
        description: "",
        authur: "",
        price: "",
        fileurl: "",
      });
      
    } catch (error) {
      console.log("error signing up:", error);
      alert("Something went wrong");
      setLoading(false);
    }
  }

  const onChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div>
      <div style={{ margin: "10px" }} onClick={() => history.goBack()}>
        <i className="fa fa-arrow-left"></i>
      </div>
      <div className="container">
        <h3>Upload a book</h3>
        <form onSubmit={onSubmit}>
          <div>
            <label>Title</label>
            <br />
            <input
              value={values.title}
              onChange={onChange}
              type="text"
              required
              name="title"
              placeholder="Title"
            />
          </div>
          <div>
            <label>Description</label>
            <br />
            <textarea
              value={values.description}
              onChange={onChange}
              type="text"
              required
              name="description"
              placeholder="Description"
            />
          </div>

          <div>
            <label>Authur</label>
            <br />
            <input
              value={values.authur}
              onChange={onChange}
              type="text"
              required
              name="authur"
              placeholder="Auther"
            />
          </div>

          <div>
            <label>Price</label>
            <br />
            <input
              onChange={onChange}
              type="number"
              value={values.price}
              name="price"
              required
              placeholder="Price"
            />
          </div>

          <div>
            <label>Upload pdf</label>
            <br />
            <input
             required
              onChange={(e) => setFile(e.target.files[0])}
              type="file"
              name="file"
            />
          </div>

          <button className="button" type="submit">
            {loading ? (
              <span>
                Uploading <i className="fa fa-spinner fa-spin"></i>{" "}
              </span>
            ) : (
              "Upload"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Upload;
