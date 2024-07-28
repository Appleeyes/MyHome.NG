import React, { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";
import axiosRetry from "axios-retry";
import "../../assets/css/UserHomepage.css";
import BellIcon from "../../assets/images/bell.svg";
import Home from "../../assets/images/home.svg";
import Loan from "../../assets/images/loan.svg";
import Apartment from "../../assets/images/apartment.svg";
import Location from "../../assets/images/location.svg";
import Love from "../../assets/images/love-icon.svg";
import Loved from "../../assets/images/loved.svg";
import Rating from "../../assets/images/rating.svg";
import SearchComponent from "../../components/SearchComponent";
import Footer from "../../components/Footer";

axiosRetry(axios, {
  retries: 3,
  retryDelay: (retryCount) => retryCount * 1000,
});

function Homepage() {
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  const getRecommendedProduct = async () => {
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
      setRecommendedProducts(response.data.data);
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

  const getUserDetails = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Authentication token not found");
      return;
    }

    try {
      const response = await axios.get(
        "https://myhome-ng-backend.onrender.com/api/v1/user",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserDetails(response.data.data);
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
    getUserDetails()
    getRecommendedProduct();
  }, []);

  const getPopularProduct = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Authentication token not found");
      return;
    }

    try {
      const response = await axios.get(
        "https://myhome-ng-backend.onrender.com/api/v1/products/popular",
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

  const toggleBookmark = async (productId, isBookmarked, setBookmarkState) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Authentication token not found");
      return;
    }

    try {
      await axios.post(
        `https://myhome-ng-backend.onrender.com/api/v1/products/${productId}/bookmark`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBookmarkState(!isBookmarked);
    } catch (err) {
      console.error("Failed to toggle bookmark:", err);
    }
  };

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
    <div className="user-homepage">
      <div className="user-head">
        <div className="user-info">
          <a href="/profile">
            <img src={userDetails.image} alt="Profile Woman" />
          </a>
          <h3>Hello {userDetails.name},</h3>
        </div>
        <a href="/notification">
          <img src={BellIcon} alt="Bell Icon" />
        </a>
      </div>
      <SearchComponent />
      <div className="property-type">
        <a href="/product/home">
          <img src={Home} alt="Home" />
          <p>House</p>
        </a>
        <a href="/chats">
          <img src={Apartment} alt="Apartment" />
          <p>Chats</p>
        </a>
        <a href="/user/loan">
          <img src={Loan} alt="Loan" />
          <p>Loan</p>
        </a>
      </div>
      <div className="recommended">
        <div className="rec-head">
          <h1>Recommended</h1>
          <a href="/product/recommended">View all</a>
        </div>
        <div className="flex-prop">
          {loading ? (
            <div className="spinner-container">
              <ClipLoader
                color={"rgb(122, 122, 122)"}
                loading={loading}
                size={50}
              />
            </div>
          ) : recommendedProducts.length > 0 ? (
            recommendedProducts.slice(0, 2).map((product) => (
              <div className="property" key={product.id}>
                <div className="prop-img">
                  <img src={product.image_path} alt="Home Thumbnail" />
                </div>
                <div className="down">
                  <div className="house">
                    <p>House</p>
                    <span>{formatPrice(product.price)}</span>
                  </div>
                  <div className="prop-loc">
                    <img src={Location} alt="Location Icon" />
                    <p>{product.location}</p>
                    <div className="lov-img">
                      <img
                        src={product.isBookmarked ? Loved : Love}
                        alt="Love Icon"
                        className={product.isBookmarked ? "bookmarked" : ""}
                        onClick={() =>
                          toggleBookmark(
                            product.id,
                            product.isBookmarked,
                            (newBookmarkState) => {
                              setRecommendedProducts((prev) =>
                                prev.map((p) =>
                                  p.id === product.id
                                    ? { ...p, isBookmarked: newBookmarkState }
                                    : p
                                )
                              );
                            }
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className="ratings">
                    <img src={Rating} alt="Rating Icon" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No recommended products available.</p>
          )}
        </div>
      </div>
      <div className="popular">
        <div className="pop-head">
          <h1>Popular</h1>
          <a href="/product/popular">View all</a>
        </div>
        <div className="flex-prop">
          {loading ? (
            <div className="spinner-container">
              <ClipLoader
                color={"rgb(122, 122, 122)"}
                loading={loading}
                size={50}
              />
            </div>
          ) : popularProducts.length > 0 ? (
            popularProducts.slice(0, 4).map((product) => (
              <div className="property" key={product.id}>
                <div className="prop-img">
                  <img src={product.image_path} alt="Home Thumbnail" />
                </div>
                <div className="down">
                  <div className="house">
                    <p>House</p>
                    <span>{formatPrice(product.price)}</span>
                  </div>
                  <div className="prop-loc">
                    <img src={Location} alt="Location Icon" />
                    <p>{product.location}</p>
                    <div className="lov-img">
                      <img
                        src={product.isBookmarked ? Loved : Love}
                        alt="Love Icon"
                        className={product.isBookmarked ? "bookmarked" : ""}
                        onClick={() =>
                          toggleBookmark(
                            product.id,
                            product.isBookmarked,
                            (newBookmarkState) => {
                              setPopularProducts((prev) =>
                                prev.map((p) =>
                                  p.id === product.id
                                    ? { ...p, isBookmarked: newBookmarkState }
                                    : p
                                )
                              );
                            }
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className="ratings">
                    <img src={Rating} alt="Rating Icon" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No popular products available.</p>
          )}
        </div>
      </div>
      <Footer currentRoute={window.location.pathname} />
    </div>
  );
}

export default Homepage;
