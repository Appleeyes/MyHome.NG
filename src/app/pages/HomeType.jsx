import React, { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";
import axiosRetry from "axios-retry";
import "../assets/css/Hometype.css";
import HomeProduct1 from "../assets/images/hometype1.png";
import HomeProduct2 from "../assets/images/hometype2.png";
import HomeProduct3 from "../assets/images/hometype3.png";
import ProductComponent from "../components/ProductComponent";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";

axiosRetry(axios, {
  retries: 3,
  retryDelay: (retryCount) => retryCount * 1000,
});

function HomeType() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getProducts = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Authentication token not found");
      return;
    }

    try {
      const response = await axios.get(
        "https://myhome-ng-backend.onrender.com/api/v1/products",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProducts(response.data.data);
    } catch (err) {
      if (err.response) {
        console.error(err.response.data.message);
      } else {
        console.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    })
      .format(price)
      .replace("NGN", "#");
  };

  return (
    <div className="product-home">
      <ProductComponent PageTitle="Home" PageResult="Showing 330 homes" />

      <div className="products-container">
        {loading ? (
          <div className="spinner-container">
            <ClipLoader
              color={"rgb(122, 122, 122)"}
              loading={loading}
              size={50}
            />
          </div>
        ) : products.length > 0 ? (
          products.map((product) => (
            <ProductCard
              key={product.id}
              ProductImage={product.image_path}
              ProductImageAlt="Recommended1 Image"
              ProductPrice={formatPrice(product.price)}
              ProductTitle={product.property_type}
              ProductLocation={product.location}
              ProductId={product.id}
              isBookmarked={product.isBookmarked}
            />
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
      <Footer currentRoute={window.location.pathname} />
    </div>
  );
}

export default HomeType;
