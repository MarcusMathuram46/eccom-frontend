import React from "react";
import "../styles/ProductModal.css";
import Spinner from "./Spinner";

function ProductModal({ product, onClose }) {
  // Check if the product prop is provided
  if (!product) return null;

  return (
    <div className="modal fade show d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{product.title}</h5>
            <button type="button" className="close" onClick={onClose} aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <img
              src={product.imageUrl}
              className="img-fluid mb-3"
              alt={product.title}
              loading="lazy"
            />
            <p>{product.description}</p>
            <p><strong>Price:</strong> ${product.price}</p>
            <p><strong>Available Quantity:</strong> {product.quantity}</p>
            <p><strong>Category:</strong> {product.category}</p>
            {/* Add more details as necessary */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;
