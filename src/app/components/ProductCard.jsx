import React from 'react';
import '../assets/css/ProductCard.css';
import Rating from '../assets/images/rating.svg';
import Location from '../assets/images/location.svg';
import Love from '../assets/images/love-icon.svg';
import Footer from '../components/Footer';

function ProductCard({
  ProductImage,
  ProductImageAlt,
  ProductPrice,
  ProductTitle,
  ProductLocation,
  ProductId,
}) {
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
          <img src={Love} alt="Love Icon" />
        </div>
      </div>
      <Footer currentRoute={window.location.pathname} />
    </div>
  );
}

export default ProductCard;
