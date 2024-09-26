import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import CategoryFilter from './CategoryFilter';
import Product from './Product';
import ProductModal from './ProductModal';
import Spinner from './Spinner'; // Import spinner
import axios from 'axios';
import '../styles/HomePage.css';

function HomePage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);  // For handling pagination
  const [loading, setLoading] = useState(false);  // Add loading state for pagination
  const [selectedProduct, setSelectedProduct] = useState(null);  // Change this to hold the selected product data

  // Fetch products with pagination
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); // Start loading
      try {
        const response = await axios.get('https://eccom-backend.onrender.com/products', {
          params: {
            page: currentPage,
            limit: 10  // Adjust the limit based on your requirement
          }
        });
        setProducts(response.data.products);
        setFilteredProducts(response.data.products);  // Initially show all products
        setTotalPages(response.data.totalPages);  // Update the total number of pages
      } catch (error) {
        console.error('Error fetching products:', error);
      }
      setLoading(false); // End loading
    };

    fetchProducts();
  }, [currentPage]);  // Refetch products when page changes

  // Handle product search and category filter
  useEffect(() => {
    let updatedProducts = [...products];

    if (searchTerm) {
      updatedProducts = updatedProducts.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'All') {
      updatedProducts = updatedProducts.filter(product => product.category === selectedCategory);
    }

    setFilteredProducts(updatedProducts);
  }, [searchTerm, selectedCategory, products]);

  // Handle click on product and open modal with product details
  const handleProductClick = (product) => {
    setSelectedProduct(product);  // Set the full product object to display in the modal
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);  // Close modal
  };

  return (
    <div className="container">
      <h1 className="page-title">Ecommerce Landing Page</h1>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <CategoryFilter selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />

      {loading ? ( 
        <Spinner />  // Show spinner while loading products
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
