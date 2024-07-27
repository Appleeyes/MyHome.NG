import React, { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";
import axiosRetry from "axios-retry";
import "../assets/css/Hometype.css";
import ProductComponent from "../components/ProductComponent";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";

axiosRetry(axios, {
  retries: 3,
  retryDelay: (retryCount) => retryCount * 1000,
});

function Popular() {
  const [popularProducts, setPopularProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getPopularProduct = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Authentication token not found");
      return;
    }

    try {
      const response = await axios.get(
        "https://myhome-ng-backend.onrender.com/api/v1/products/recommended",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPopularProducts(response.data.data);
    } catch (err) {
      if (err.response) {
        console.error(err.response.data.message);
      } else {
        console.error("An unexpected error occured");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPopularProduct();
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="product-home">
      <ProductComponent
        PageTitle="Popular"
        PageResult="Showing houses that are popular"
      />

      <div className="products-container">
        {loading ? (
          <div className="spinner-container">
            <ClipLoader
              color={"rgb(122, 122, 122)"}
              loading={loading}
              size={50}
            />
          </div>
        ) : popularProducts.length > 0 ? (
          popularProducts.map((product) => (
            <ProductCard
              key={product.id}
              ProductImage={product.image_path}
              ProductImageAlt="Popular Image"
              ProductPrice={formatPrice(product.price)}
              ProductTitle={product.property_type}
              ProductLocation={product.location}
              ProductId={product.id}
              isBookmarked={product.isBookmarked}
            />
          ))
        ) : (
          <p>No popular products available.</p>
        )}
      </div>
      <Footer currentRoute={window.location.pathname} />
    </div>
  );
}

export default Popular;
