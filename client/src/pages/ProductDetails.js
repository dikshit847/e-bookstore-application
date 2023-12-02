import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart.js";
import axios from "axios";
import toast from "react-hot-toast";
import "../styles/ProductDetailsStyles.css";
import { useParams, useNavigate } from "react-router-dom";
const ProductDetails = () => {
  const [cart, setCart] = useCart();
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  //initalp details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);
  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
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
      <div className="row container mt-2">
        <div className="col-md-6">
          <img
            src={`/api/v1/product/product-photo/${product._id}`}
            className="cart-img"
            alt={product.name}
            height="300"
            width={"250"}
          />
        </div>
        <div className="col-md-4 ">
          <h1 className="text-center">Book Details</h1>
          <h1>{product.name}</h1>
          <h4>Author : {product.description}</h4>
          <h4>Price : {product.price}</h4>
          <h4>Category : {product?.category?.name}</h4>

          <button
            class="btn btn-secondary ms-1"
            onClick={() => {
              setCart([...cart, product]);
              localStorage.setItem("cart", JSON.stringify([...cart, product]));
              toast.success("Item Added to Cart ");
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
      <hr />
      <div className="row container">
        <h6>Similar Products</h6>
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products found</p>
        )}
        <div className="d-flex flex-wrap">
          {relatedProducts?.map((p) => (
            <div className="card m-2" style={{ width: "18rem" }}>
              <img
                src={`/api/v1/product/product-photo/${p?._id}`}
                className="card-img-top"
                alt={p.name}
              />
              <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">{p.description.substring(0, 30)}...</p>
                <p className="card-text"> $ {p.price}</p>
                <button
                  className="btn btn-primary ms-1"
                  onClick={() => navigate(`/product/${p.slug}`)}
                >
                  More Details
                </button>
                <button class="btn btn-secondary ms-1">ADD TO CART</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
