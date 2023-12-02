import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart.js";
import { useAuth } from "../context/auth.js";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";
const CartPage = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  //total
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };

  //delete item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/braintree/token`
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);

  //handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        `/api/v1/product/braintree/payment`,
        {
          nonce,
          cart,
        }
      );
      setLoading(false);
      navigate("/dashboard/user/orders");
      localStorage.removeItem("cart");
      setCart([]);

      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // Helper function to group products by name and quantity
  const getGroupedProducts = (products) => {
    const groups = {};

    products.forEach((product) => {
      const key = product._id;
      if (groups[key]) {
        groups[key].count += 1;
      } else {
        groups[key] = {
          ...product,
          count: 1,
        };
      }
    });

    return Object.values(groups);
  };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {`HEllo ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className="text-center">
              {cart?.length >= 1
                ? `You Have ${cart.length} items in your Cart ${
                    auth?.token ? "" : "Please login"
                  }`
                : "Your Cart is Empty "}
            </h4>
          </div>
          <div className="row">
            <div className="col-md-8">
              {getGroupedProducts(cart).map((product) => (
                <div key={product._id} className="row mb-2 card flex-row">
                  <div className="col-md-4">
                    <img
                      src={`/api/v1/product/product-photo/${product._id}`}
                      className="cart-img"
                      alt={product.name}
                      style={{ height: "12rem" }}
                    />
                  </div>
                  <div className="col-md-8">
                    <p>{product.name}</p>
                    <p>{product.description.substring(0, 30)}</p>
                    <p>Price: {product.price}</p>
                    <p>Quantity: {product.count}</p>
                    <button
                      className="btn btn-danger"
                      onClick={() => removeCartItem(product._id)}
                    >
                      Remove
                    </button>
                    <button
                      class="btn btn-secondary ms-1"
                      onClick={() => {
                        setCart([...cart, product]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, product])
                        );
                        toast.success("Item Added to Cart ");
                      }}
                    >
                      Add more
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-md-4 text-center">
              <h2>Cart Summary</h2>
              <hr />
              <h4>Total Amount : {totalPrice()} </h4>
              {auth?.user?.address ? (
                <>
                  <div className="mb-3">
                    <h4>Current Address</h4>
                    <h5>{auth?.user?.address}</h5>
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      {" "}
                      Update Shipping Address
                    </button>
                  </div>
                </>
              ) : (
                <div className="mb-3">
                  {auth?.token ? (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/login", { state: "/cart" })}
                    >
                      Please Login to Checkout
                    </button>
                  )}
                </div>
              )}
              <div className="mt-2">
                {!clientToken || !cart?.length ? (
                  ""
                ) : (
                  <>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: "vault",
                        },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />

                    <button
                      className="btn btn-primary"
                      onClick={handlePayment}
                      disabled={loading || !instance || !auth?.user?.address}
                    >
                      {loading ? "Processing ...." : "Make Payment"}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
