import React, { useEffect, useState } from "react";
import "./style.css";
import Amplify, { API, graphqlOperation, Auth } from "aws-amplify";
import { listBooks } from "../../graphql/queries";
import BookCard from "./BookCard";
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
      searchTerm==="" ? books : results.length === 0 ? [] : results
    );
  };
  async function fetchBooks() {
    try {
        
      setLoading(true);
      const bookData = await API.graphql(graphqlOperation(listBooks));
      const todos = bookData.data.listBooks.items;
    
      setBooks(todos);
      // setSearchResults(todos)
      setLoading(false);
     
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
            placeholder="Start typing to search for books"
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
