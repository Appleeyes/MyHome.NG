import React, { useState } from "react";
import axios from "axios";
import "../assets/css/ProductCard.css";
import Rating from "../assets/images/rating.svg";
import Location from "../assets/images/location.svg";
import Love from "../assets/images/love-icon.svg";
import Loved from "../assets/images/loved.svg";
import Footer from "../components/Footer";

function ProductCard({
  ProductImage,
  ProductImageAlt,
  ProductPrice,
  ProductTitle,
  ProductLocation,
  ProductId,
  isBookmarked: initialIsBookmarked = false,
}) {
  const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked);
  const [error, setError] = useState(null);

  const toggleBookmark = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Authentication token not found");
      return;
    }

    try {
      const response = await axios.post(
        `https://myhome-ng-backend.onrender.com/api/v1/products/${ProductId}/bookmark`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsBookmarked(!isBookmarked);
      console.log(response.data.message);
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="product">
      <div className="product-image">
        <img src={ProductImage} alt={ProductImageAlt} />
      </div>
      <div className="product-content">
        <div className="first">
          <p>{ProductPrice}</p>
          <img src={Rating} alt="Rating Icon" />
        </div>
        <div className="second">
          <div>
            <p>{ProductTitle}</p>
            <div className="product-location">
              <img src={Location} alt="Location Icon" />
              <span>{ProductLocation}</span>
            </div>
          </div>
          <a href={`/product/overview/${ProductId}`}>Explore</a>
        </div>
        <div className="love-img">
          <img
            src={isBookmarked ? Loved : Love}
            alt="Love Icon"
            onClick={toggleBookmark}
            className={isBookmarked ? "bookmarked" : ""}
          />
        </div>
        {error && <div className="error">{error}</div>}
      </div>
      <Footer currentRoute={window.location.pathname} />
    </div>
  );
}

export default ProductCard;
