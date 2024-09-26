import React from 'react';
import '../styles/CategoryFilter.css';

function CategoryFilter({ selectedCategory, setSelectedCategory }) {
  const categories = ['All', 'Electronics', 'Clothing', 'Home Appliances'];

  // Handle category change
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value); // Set the selected category
  };

  return (
    <div className="category-filter-container">
      <select
        className="form-select"
        value={selectedCategory}
        onChange={handleCategoryChange} // Call the handler
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CategoryFilter;
