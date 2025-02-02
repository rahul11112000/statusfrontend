import React, { useState } from "react";
import { login } from "../../api/Api";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(formData);
      setMessage({ type: "success", text: "login successful!" });

      localStorage.setItem("token", response);

      const decodedToken = jwtDecode(response);

      if (decodedToken.scope === "Admin") {

      } else if (decodedToken.scope === "App_Admin") {
        navigate("/application/admin");
      } else if (decodedToken.scope === "Com_Admin") {
        navigate("/components/app");
      }else if (decodedToken.scope === "Status") {
        navigate("/status/app");
      } else {
        navigate("/viewer/app");
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "Failed to login. Please try again.",
      });
    }
  };

  return (
    <div>
        <div
          className="container d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <div className="card p-4 shadow" style={{ width: "400px" }}>
            <h3 className="text-center mb-4">Login</h3>
            {message && (
              <div
                className={`alert ${
                  message.type === "success" ? "alert-success" : "alert-danger"
                }`}
              >
                {message.text}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="Enter your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password" // Added name attribute to match the state key
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Login
              </button>
            </form>
          </div>
        </div>
    </div>
  );
};

export default Login;
