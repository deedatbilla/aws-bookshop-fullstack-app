import React, { createContext, useState, useContext, useEffect } from "react";
import { Auth } from "aws-amplify";

const Context = createContext({
  isLoggedIn: false,

  setUserState: () => {},
  setTabbarState: () => {},
  user: {},
  addUserDetails: () => {},
  cart: [],
  manageCart: () => {},
  isProductInCart: () => false,
  cartTotal: 0,
});

const Provider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [user, setUser] = useState({});

  useEffect(() => {
    const getUser = async () => {
      const user = await Auth.currentUserInfo();
      // console.log(user)
      if (user) {
        setUserState(true);
        addUserDetails(user);
      }
    };
    getUser();
    calculateTotal();
  }, [cart]);

  const calculateTotal = () => {
    let total = 0;
    cart.forEach((item) => (total += item.count * item.price));
    setCartTotal(total.toFixed(2));
  };

  const manageCart = (action, product) => {
    let tempCart = [];
    let updatedProduct;
    let updatedProductIndex = 0;
    switch (action) {
      case "ADD_TO_CART":
        if (isProductInCart(product)) {
          return;
        }
        product.count = 1;
        setCart([...cart, product]);
        break;
      case "REMOVE_FROM_CART":
        setCart(cart.filter((cartItem) => cartItem.id !== product?.id));
        break;
      case "EMPTY_CART":
        setCart([]);
        break;
      case "INCREASE_COUNT":
        tempCart = [...cart];
        updatedProductIndex = tempCart.findIndex(
          (item) => item.id === product?.id
        );
        updatedProduct = tempCart[updatedProductIndex];
        updatedProduct.count++;
        tempCart[updatedProductIndex] = updatedProduct;
        setCart(tempCart);
        break;
      case "DECREASE_COUNT":
        tempCart = [...cart];
        updatedProductIndex = tempCart.findIndex(
          (item) => item.id === product?.id
        );
        updatedProduct = tempCart[updatedProductIndex];
        if (updatedProduct.count === 1) {
          setCart(cart.filter((item) => item.id !== product.id));
          return;
        }
        updatedProduct.count--;
        tempCart[updatedProductIndex] = updatedProduct;
        setCart(tempCart);
        break;
      default:
        break;
    }
  };

  const isProductInCart = (item) => {
    if (cart.find((product) => product.id === item.id)) {
      return true;
    }
    return false;
  };

  const setUserState = (state) => {
    setIsLoggedIn(state);
  };

  const addUserDetails = (userDetails) => {
    setUser(userDetails);
  };

  const state = {
    isLoggedIn,
    setUserState,
    user,
    addUserDetails,
    isProductInCart,
    manageCart,
    cart,
    cartTotal,
  };
  return <Context.Provider value={state}>{children}</Context.Provider>;
};

const useAppContext = () => useContext(Context);

export { Provider, useAppContext };
