import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { validateLoginForm } from "../validators/loginValidator";
import { useUser } from "../context/UserContext";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const { handleLogin } = useUser();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const allFieldsFilled = Object.values(formData).every(
      (field) => field.trim() !== ""
    );
    setIsFormValid(allFieldsFilled);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateLoginForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      try {
        const result = await handleLogin(formData);
        setIsSubmitting(false);

        if (result.success) {
          navigate("/");
        } else {
          setErrorMessage(result.message || "Error logging in.");
        }
      } catch (error) {
        console.error("Login error:", error);
        setErrorMessage(
          "Error logging in. Please try again."
        );
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login</h2>

        {errorMessage && <div className="error-message">{errorMessage}</div>}

        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={errors.username ? "error" : ""}
            />
            {errors.username && (
              <div className="error-text">{errors.username}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? "error" : ""}
            />
            {errors.password && (
              <div className="error-text">{errors.password}</div>
            )}
          </div>

          <div className="form-buttons">
            <button
              type="submit"
              disabled={isSubmitting || !isFormValid}
              className="submit-button"
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </div>
          <div className="register-link">
            ¿Don't have an account? <Link to="/register">Register here</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
