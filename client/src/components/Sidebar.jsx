import { useState ,useEffect} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faStar, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [active, setActive] = useState(location.pathname);
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Get username from localStorage
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    navigate("/"); // Redirect to home
  };

  const handleClick = (path) => {
    setActive(path);
  };
  return (
    <div className="w-64 h-screen bg-white shadow-md p-5 flex flex-col justify-between">
      <div>
        <h1 className="text-xl font-semibold text-purple-800 flex items-center space-x-2">
          <FontAwesomeIcon icon={faHouse} />
          <span>AI Notes</span>
        </h1>
        <ul className="mt-6 space-y-4">
          <Link to="/dashboard" onClick={() => handleClick("/dashboard")}>
            <li
              className={`px-4 py-2 rounded-3xl flex items-center space-x-2 ${
                active === "/dashboard"
                  ? "bg-purple-100 text-purple-700"
                  : "text-gray-600"
              }`}
            >
              <FontAwesomeIcon icon={faHouse} />
              <span className="ml-2">Home</span>
            </li>
          </Link>
          <Link to="/favorite" onClick={() => handleClick("/favorite")}>
            <li
              className={`px-4 py-2 mt-4 rounded-3xl flex items-center space-x-2 ${
                active === "/favorite"
                  ? "bg-purple-100 text-purple-700"
                  : "text-gray-600"
              }`}
            >
              <FontAwesomeIcon icon={faStar} />
              <span className="ml-2">Favorites</span>
            </li>
          </Link>
        </ul>
      </div>

      <div className="flex flex-col space-y-4">
        <button
          onClick={handleLogout}
          className="w-full px-4 py-2 flex items-center space-x-2 text-gray-600 hover:bg-purple-100 rounded-3xl"
        >
          <FontAwesomeIcon icon={faSignOutAlt} />
          <span>Logout</span>
        </button>
        <div className="mb-5">
        {username && (
          <div className="flex items-center space-x-2 text-gray-700 mb-4 px-3">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-500">
              {username.charAt(0).toUpperCase()}
            </div>
            <span>{username}</span>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
