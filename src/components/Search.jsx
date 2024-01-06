const Search = ({ handleChange, handleSearch, handleKeyPress }) => {
    return (
        <div className="flex items-center justify-center">
            <input type="text" placeholder="Enter city name" onChange={handleChange} onKeyDown={handleKeyPress} className="text-[#333] p-2 rounded-full outline-none" />
            <button className="bg-[#f1f5f9] text-[#333] p-2 rounded-full ml-2 md:hover:bg-blue-100 md:hover:border-1" onClick={handleSearch}>Search</button>
        </div>
    );
}
 
export default Search;