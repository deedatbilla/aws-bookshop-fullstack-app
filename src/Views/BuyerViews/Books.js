import React, { useEffect, useState } from "react";
import "./style.css";
import Amplify, { API, graphqlOperation, Auth } from "aws-amplify";
import { listBooks } from "../../graphql/queries";
import BookCard from "./BookCard";
let dataFetched=false
function Books({ history }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetchBooks();
    searchProducts();
    
  }, [searchTerm]);

  const searchProducts = () => {
    const results = books.filter((book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setSearchResults(
      !searchTerm ? books.slice(0, 10) : results.length === 0 ? [] : results
    );
  };
  async function fetchBooks() {
    try {
        if(dataFetched){
            return
        }
      setLoading(true);
      const bookData = await API.graphql(graphqlOperation(listBooks));
      const todos = bookData.data.listBooks.items;
      console.log(todos);
      setBooks(todos);
      setSearchResults(todos)
      setLoading(false);
      dataFetched=true
    } catch (err) {
      console.log("error fetching books", err);
      setLoading(false);
    }
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <input
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            placeholder="Search"
            className="form-control w-100"
          />
        </div>
      </div>
      <div className="row">
        {!loading ? (
          <>
            {searchResults.map((book, index) => (
              <BookCard key={index} item={book} />
            ))}
          </>
        ) : (
          <i className="fa fa-spinner fa-spin"></i>
        )}
      </div>
    </div>
  );
}

export default Books;
