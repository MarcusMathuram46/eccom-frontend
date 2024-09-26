import React from 'react';
import '../styles/CategoryFilter.css';

function CategoryFilter({ selectedCategory, setSelectedCategory }) {
  const categories = ['All', 'Electronics', 'Clothing', 'Home Appliances'];

  return (
    <div className="category-filter-container">
      <select
        className="form-select"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
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
