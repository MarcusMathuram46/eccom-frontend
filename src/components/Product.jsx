import React from "react";
import '../styles/Product.css';

const Product = ({ products = [], onProductClick }) => {
  return (
    <div className="container">
      <div className="row product-grid">
        {Array.isArray(products) && products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className="col-6 col-sm-6 col-md-4 col-lg-3 mb-4 product-card"
              onClick={() => onProductClick(product)}  // Pass the full product object here
            >
              <div className="card h-100 shadow-sm hover-card">
                <img
                  src={product.imageUrl}
                  className="card-img-top img-fluid"
                  alt={product.title}
                  loading="lazy"
                />
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">${product.price}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
};

export default Product;
