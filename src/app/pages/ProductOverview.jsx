import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import "../assets/css/Hometype.css";
import "../assets/css/ProductOverview.css";
import ProductComponent from "../components/ProductComponent";
import Button from "../components/ButtonComponent";
import Footer from "../components/Footer";

async function getProductDetails(productId, setProduct, setLoading) {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("Authentication token not found");
    return;
  }

  try {
    const response = await axios.get(
      `https://myhome-ng-backend.onrender.com/api/v1/products/${productId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setProduct(response.data.data);
  } catch (err) {
    if (err.response) {
      console.error(err.response.data.message);
    } else {
      console.error("An unexpected error occurred");
    }
  } finally {
    setLoading(false);
  }
}

function ProductOverview() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    getProductDetails(productId, setProduct, setLoading);
  }, [productId]);

  const handleContactAgent = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Authentication token not found");
      return;
    }

    try {
      const response = await axios.post(
        `https://myhome-ng-backend.onrender.com/api/v1/contact-agent/${productId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const chatId = response.data.data.id;
      const agentId = response.data.data.agent_id; // Assuming agent_id is returned from the backend
      history.push(
        `/chat/product/${productId}/agent/${agentId}?chatId=${chatId}`
      );
    } catch (err) {
      if (err.response) {
        console.error(err.response.data.message);
      } else {
        console.error("An unexpected error occurred");
      }
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
    <div className="product-home">
      <ProductComponent PageTitle="Property Overview" />

      {loading ? (
        <div
          className="spinner-container"
          style={{ width: "20%", marginTop: "50%" }}
        >
          <ClipLoader
            color={"rgb(122, 122, 122)"}
            loading={loading}
            size={50}
          />
        </div>
      ) : product ? (
        <>
          <div className="products-container">
            <img src={product.image_path} alt={product.property_type} />
          </div>
          <div className="product-details">
            <ul>
              <li>
                <h3>Listing Type</h3>
                <p>{product.listing_type}</p>
              </li>
              <li>
                <h3>Property Type</h3>
                <p>{product.property_type}</p>
              </li>
              <li>
                <h3>Property Location</h3>
                <p className="price">{product.location}</p>
              </li>
              <li>
                <h3>Listing Date</h3>
                <p>{product.listing_date}</p>
              </li>
              <li>
                <h3>Erf Size</h3>
                <p>
                  {product.erf_size} m<sup>2</sup>
                </p>
              </li>
              <li>
                <h3>Floor Size</h3>
                <p>
                  {product.floor_size} m<sup>2</sup>
                </p>
              </li>
              <li>
                <h3>Renting Price</h3>
                <p>{formatPrice(product.price)}</p>
              </li>
              <li>
                <h3>Dues and Levies</h3>
                <p>{formatPrice(product.dues_and_levies)} monthly</p>
              </li>
              <li>
                <h3>Pet Allowed</h3>
                <p>{product.pets_allowed ? "Yes" : "No"}</p>
              </li>
              <li>
                <h3>Bedrooms</h3>
                <p>{product.bedrooms}</p>
              </li>
              <li>
                <h3>Bathrooms</h3>
                <p>{product.bathrooms}</p>
              </li>
              <li>
                <h3>Parking Lot</h3>
                <p>{product.parking_lot}</p>
              </li>
            </ul>
            <Button onClick={handleContactAgent}>Contact Agent</Button>
          </div>
        </>
      ) : (
        <p>Product not found</p>
      )}
      <Footer currentRoute={window.location.pathname} />
    </div>
  );
}

export default ProductOverview;
