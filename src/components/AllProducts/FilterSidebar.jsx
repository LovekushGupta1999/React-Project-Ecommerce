import React from 'react';

const FilterSidebar = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFilters(prev => ({
        ...prev,
        [name]: checked ? [...prev[name], value] : prev[name].filter(v => v !== value),
      }));
    } else {
      setFilters(prev => ({ ...prev, [name]: Number(value) }));
    }
  };

  return (
    <div className="p-4 border rounded bg-gray-100 bg-white dark:bg-slate-800 dark:text-white">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>

      {/* Gender */}
      <div className="mb-4">
        <p className="font-medium">Gender</p>
        <label className="flex items-center gap-2">
          <input type="checkbox" name="gender" value="Men" onChange={handleChange} />
          Men
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" name="gender" value="Women" onChange={handleChange} />
          Women
        </label>
      </div>

      {/* Category */}
      <div className="mb-4">
        <p className="font-medium">Category</p>
        <label className="flex items-center gap-2">
          <input type="checkbox" name="category" value="Shoes" onChange={handleChange} />
          Shoes
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" name="category" value="Clothing" onChange={handleChange} />
          Clothing
        </label>
      </div>

      {/* Brand */}
      <div className="mb-4">
        <p className="font-medium">Brand</p>
        {['Nike', 'Adidas', 'Puma', 'Under Armour'].map((brand) => (
          <label key={brand} className="flex items-center gap-2">
            <input type="checkbox" name="brand" value={brand} onChange={handleChange} />
            {brand}
          </label>
        ))}
      </div>

      {/* Price */}
      <div className="mb-4">
        <p className="font-medium">Max Price: ${filters.price}</p>
        <input
          type="range"
          className="w-full"
          name="price"
          min="0"
          max="200"
          value={filters.price}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default FilterSidebar;
