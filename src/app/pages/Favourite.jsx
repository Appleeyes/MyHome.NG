import React, { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";
import "../assets/css/Hometype.css";
import ProductComponent from "../components/ProductComponent";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";

function Favourite() {
  const [bookmarkedProducts, setBookmarkedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getBookmarkedProduct = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Authentication token not found");
      return;
    }

    try {
      const response = await axios.get(
        "https://myhome-ng-backend.onrender.com/api/v1/products/bookmarked",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const products = response.data.data.map((bookmark) => bookmark.product);
      setBookmarkedProducts(products);
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
    getBookmarkedProduct();
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
      <ProductComponent PageTitle="Favourites" />

      <div className="products-container">
        {loading ? (
          <div className="spinner-container">
            <ClipLoader
              color={"rgb(122, 122, 122)"}
              loading={loading}
              size={50}
            />
          </div>
        ) : bookmarkedProducts.length > 0 ? (
          bookmarkedProducts.map((product) => (
            <ProductCard
              key={product.id}
              ProductImage={product.image_path}
              ProductImageAlt="Favourite1 Image"
              ProductPrice={formatPrice(product.price)}
              ProductTitle={product.property_type}
              ProductLocation={product.location}
              ProductId={product.id}
              isBookmarked={true}
            />
          ))
        ) : (
          <p>No bookmarked products available.</p>
        )}
      </div>
      <Footer currentRoute={window.location.pathname} />
    </div>
  );
}

export default Favourite;
