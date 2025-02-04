
import axios from "axios";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate(); // Initialize navigate

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });
       toast.success("Login successful!");
   
      
      // Redirect to the dashboard after successful login
      navigate("/dashboard"); // Navigate to the dashboard
    } catch (error) {
        toast.error("Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg relative">
      <div className="absolute top-0 left-0 w-full h-24 rounded-t-lg bg-gradient-to-b from-purple-200 to-transparent"></div>
      <h2 className="text-2xl font-bold text-center text-gray-900">
        Welcome
      </h2>
      <p className="text-sm text-center text-gray-600">
        Please enter your details to sign in
      </p>
    
      <form className="mt-8 space-y-6" onSubmit={handleLogin}>
        <div>
          <label htmlFor="email" className="sr-only">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
            placeholder="Enter your email"
          />
        </div>
        <div className="relative">
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
            placeholder="Password"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 flex items-center pr-3"
          >
            {showPassword ? (
              <EyeOffIcon className="w-5 h-5 text-gray-400" />
            ) : (
              <EyeIcon className="w-5 h-5 text-gray-400" />
            )}
          </button>
        </div>
        
        <div>
          {" "}
          <a href="/signup">
            <button
              type="submit"
              className="w-full px-4 py-2 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-md shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 text-center"
            >
              Login
            </button>
          </a>
        </div>
        <div className="text-sm text-center">
            <span className="font-medium text-black">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="text-purple-600 hover:text-purple-500">
                Create account
              </Link>
            </span>
          </div>
      </form>
    </div>
  </div>
  );
};

export default Login;
