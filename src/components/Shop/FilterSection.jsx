const FilterSection = ({
  priceRange,
  handlePriceChange,
  categories,
  selectedCategory,
  handleCategoryChange,
  searchQuery,
  handleSearchQuery,
  sortOrder,
  handleSorting,
}) => {
  const MAX_PRICE = 1000;

  return (
    <div className="mb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Price Range Filter */}
      <div className="bg-base-100 p-6 rounded-box shadow-md flex flex-col">
        <label className="label self-start">
          <span className="label-text text-lg font-semibold text-white">
            Price Range
          </span>
        </label>
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text text-neutral-content">Min Price</span>
          </label>
          <input
            type="range"
            min="0"
            max={priceRange[1] - 1}
            value={priceRange[0]}
            onChange={(e) => handlePriceChange(0, Number(e.target.value))}
            className="range range-primary range-xs"
            style={{
              "--range-shdw": "transparent",
              "--range-track-h": "4px",
              "--range-thumb-h": "16px",
              "--range-thumb-w": "16px",
            }}
          />
          <div className="w-full flex justify-between text-xs px-2 mt-1">
            <input
              type="number"
              min="0"
              max={priceRange[1] > 0 ? priceRange[1] - 1 : 0}
              value={priceRange[0]}
              onChange={(e) => handlePriceChange(0, Number(e.target.value))}
              className="input input-bordered input-sm w-1/3 text-center text-primary"
            />
            <span className="self-center text-neutral-content">-</span>
            <span className="self-center text-neutral-content">
              ${priceRange[0]}
            </span>
          </div>
        </div>

        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text text-neutral-content">Max Price</span>
          </label>
          <input
            type="range"
            min={priceRange[0] + 1}
            max={MAX_PRICE}
            value={priceRange[1]}
            onChange={(e) => handlePriceChange(1, Number(e.target.value))}
            className="range range-primary range-xs"
            style={{
              "--range-shdw": "transparent",
              "--range-track-h": "4px",
              "--range-thumb-h": "16px",
              "--range-thumb-w": "16px",
            }}
          />
          <div className="w-full flex justify-between text-xs px-2 mt-1">
            <span className="self-center text-neutral-content">
              ${priceRange[1]}
            </span>
            <span className="self-center text-neutral-content">-</span>
            <input
              type="number"
              min={priceRange[0] < MAX_PRICE ? priceRange[0] + 1 : MAX_PRICE}
              max={MAX_PRICE}
              value={priceRange[1]}
              onChange={(e) => handlePriceChange(1, Number(e.target.value))}
              className="input input-bordered input-sm w-1/3 text-center text-primary"
            />
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-base-100 p-6 rounded-box shadow-md flex flex-col items-center">
        <label className="label self-start">
          <span className="label-text text-lg font-semibold text-white">
            Category
          </span>
        </label>
        <div className="flex-grow flex items-center w-full">
          <select
            className="select select-bordered w-full max-w-xs text-neutral-content"
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Search */}
      <div className="bg-base-100 p-6 rounded-box shadow-md flex flex-col items-center">
        <label className="label self-start">
          <span className="label-text text-lg font-semibold text-white">
            Search
          </span>
        </label>
        <div className="flex-grow flex items-center w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearchQuery(e.target.value)}
            placeholder="Search foods..."
            className="input input-bordered w-full max-w-xs text-neutral-content"
          />
        </div>
      </div>

      {/* Sorting Section */}
      {/* Sorting Section */}
      <div className="bg-base-100 p-6 rounded-box shadow-md flex flex-col">
        <label className="label self-center">
          {" "}
          {/* Use self-center to center the label */}
          <span className="label-text text-lg font-semibold text-white">
            Sort By Price
          </span>
        </label>
        <div className="flex-grow flex justify-center items-center">
          <div className="btn-group flex flex-col space-y-2">
            <button
              onClick={() => handleSorting("")}
              className={`btn btn-block ${
                sortOrder === ""
                  ? "btn-primary text-base-100"
                  : "btn-ghost text-neutral-content"
              }`}
            >
              Default
            </button>
            <button
              onClick={() => handleSorting("price")}
              className={`btn btn-block ${
                sortOrder === "price"
                  ? "btn-primary text-base-100"
                  : "btn-ghost text-neutral-content"
              }`}
            >
              Price: Low to High
            </button>
            <button
              onClick={() => handleSorting("-price")}
              className={`btn btn-block ${
                sortOrder === "-price"
                  ? "btn-primary text-base-100"
                  : "btn-ghost text-neutral-content"
              }`}
            >
              Price: High to Low
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
