import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="flex items-center bg-white shadow-sm border rounded-full px-4 py-2">
      <span className="text-gray-500 mr-2">
        <FontAwesomeIcon icon={faSearch} />
      </span>
      <input
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="bg-transparent flex-1 outline-none"
      />
    </div>
  );
};

export default SearchBar;
