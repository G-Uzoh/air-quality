const Search = ({
  handleChange,
  handleSearch,
  handleKeyPress,
  dropdownSuggestions,
  handleSelectSuggestion,
  city,
  dropdownRef,
}) => {
  return (
    <div className="flex items-center justify-center relative">
      <input
        type="text"
        placeholder="Enter city name"
        value={city?.split(",")[0]}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
        className="text-[#333] p-2 rounded-full outline-none"
      />

      {/* Suggestions dropdown */}
      {dropdownSuggestions?.length > 0 && (
        <div ref={dropdownRef} className="absolute top-[60px] z-10 border border-[#ccc] bg-white text-[#333] w-full">
          {dropdownSuggestions?.map((suggestion, i) => (
            <div
              key={i}
              onClick={() => handleSelectSuggestion(i)}
              className="cursor-pointer hover:bg-[#ccc] p-1 my-px truncate max-w-full block"
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}

      <button
        className="bg-[#f1f5f9] text-[#333] font-semibold p-2 rounded-full ml-2 md:hover:bg-blue-100 md:hover:border-1"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};

export default Search;
