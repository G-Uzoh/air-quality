const Search = ({ handleChange, handleSearch, handleKeyPress }) => {
    return (
        <div className="flex items-center justify-center">
            <input type="text" placeholder="Enter city name" onChange={handleChange} onKeyDown={handleKeyPress} className="text-[#333] p-2 rounded-3xl outline-none" />
            <button className="bg-[#333] text-white p-2 rounded-full ml-2" onClick={handleSearch}>Search</button>
        </div>
    );
}
 
export default Search;