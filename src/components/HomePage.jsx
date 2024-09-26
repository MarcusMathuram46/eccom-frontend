import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import CategoryFilter from './CategoryFilter';
import Product from './Product';
import ProductModal from './ProductModal';
import Spinner from './Spinner';
import '../styles/HomePage.css';
import axios from 'axios';

function HomePage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // State to handle errors
  const [selectedProduct, setSelectedProduct] = useState(null); // Store the selected product object

  // Fetch products with pagination based on the selected category
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null); // Reset error state
      try {
        // If a category is selected, fetch products by category, otherwise fetch all
        const response = selectedCategory === 'All'
          ? await axios.get('https://eccom-backend.onrender.com/products', {
              params: {
                page: currentPage,
                limit: 10,
              }
            })
          : await axios.get(`https://eccom-backend.onrender.com/products/category/${selectedCategory}`, {
              params: {
                page: currentPage,
                limit: 10,
              }
            });

        setProducts(response.data.products);
        setFilteredProducts(response.data.products);  // Ensure filtered products are updated
        setTotalPages(response.data.totalPages);  // Update the total pages for pagination
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to load products. Please try again later.');  // Set error message
      }
      setLoading(false);
    };

    fetchProducts();
  }, [currentPage, selectedCategory]);  // Re-fetch when currentPage or selectedCategory changes

  useEffect(() => {
    let updatedProducts = [...products];

    // Filter by search term if provided
    if (searchTerm) {
      updatedProducts = updatedProducts.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(updatedProducts);
  }, [searchTerm, products]);  // Filter only when search term or products change

  // Handle click on product and open modal with product details
  const handleProductClick = (product) => {
    setSelectedProduct(product);  // Set the full product object to display in the modal
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);  // Close modal
  };

  // Handle category change and reset pagination
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);  // Reset to the first page when category changes
  };

  return (
    <div className="container">
      <h1 className="page-title">Ecommerce Landing Page</h1>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <CategoryFilter selectedCategory={selectedCategory} setSelectedCategory={handleCategoryChange} />

      {loading ? ( 
        <Spinner /> 
      ) : error ? (
        <div className="error">{error}</div> // Show error message if there is an error
      ) : (
        <Product products={filteredProducts} onProductClick={handleProductClick} />
      )}

      {/* Show modal when a product is clicked */}
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={handleCloseModal} />
      )}

      {/* Pagination controls */}
      <div className="pagination">
        <button 
          disabled={currentPage === 1} 
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <button 
          disabled={currentPage === totalPages} 
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default HomePage;
