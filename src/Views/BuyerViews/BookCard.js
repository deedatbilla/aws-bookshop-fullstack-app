import React from "react";
import "./style.css";
import { useAppContext } from "../../Context/Context";

function BookCard({ item }) {
  const { manageCart, isProductInCart } = useAppContext();
  const { title, price } = item;
  return (
    <div className="col-md-3">
      <div className="">
        <img
          className="book-thumbnail"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcw8LbUqUn-cN48aqhq9FXx4QtEZWdFR5sWg&usqp=CAU"
          alt="img"
        />
        <div>
          <div>{title}</div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>${price.toFixed(2)}</div>
            {!isProductInCart(item) ? (
              <button
                className="btn btn-success"
                onClick={() => manageCart("ADD_TO_CART", item)}
              >
                Add to cart
              </button>
            ) : (
              <button
                className="btn btn-danger"
                onClick={() => manageCart("REMOVE_FROM_CART", item)}
              >
                Remove
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookCard;
