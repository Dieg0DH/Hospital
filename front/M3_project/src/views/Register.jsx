import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateRegisterForm } from "../validators/registerValidator";
import axios from "axios";
import "./Register.css";

const Register = () => {
  const navigateTo = useNavigate();
  const [registrationData, setRegistrationData] = useState({
    name: "",
    email: "",
    birthdate: "",
    nDni: "",
    username: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [registrationError, setRegistrationError] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const [isFormValid, setIsFormValid] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegistrationData({
      ...registrationData,
      [name]: value,
    });

    const hasEmptyFields = Object.values(registrationData).some(
      (field) => !field.trim()
    );
    setIsFormValid(!hasEmptyFields);

    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: null,
      });
    }
  };

  const validateRegistrationData = (data) => {
    return validateRegisterForm(data);
  };

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateRegistrationData(registrationData);
    setFormErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsRegistering(true);
      setRegistrationError("");
      setRegistrationSuccess("");

      try {
        await axios.post(
          "http://localhost:3000/users/register",
          registrationData
        );

        setRegistrationSuccess("Successful registration! Please log in.");
        setTimeout(() => {
          navigateTo("/login");
        }, 3000);
      } catch (error) {
        console.error("Registration error:", error);
        setRegistrationError(
          error.response?.data?.message ||
            "Registration error. Please try again"
        );
      } finally {
        setIsRegistering(false);
      }
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h2>Create Account</h2>

        {registrationSuccess && (
          <div className="success-message">{registrationSuccess}</div>
        )}

        {registrationError && (
          <div className="error-message">{registrationError}</div>
        )}

        <form onSubmit={handleRegistrationSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="name">Name and Last Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={registrationData.name}
              onChange={handleChange}
              className={formErrors.name ? "error" : ""}
              required
            />
            {formErrors.name && (
              <div className="error-message">{formErrors.name}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={registrationData.email}
              onChange={handleChange}
              className={formErrors.email ? "error" : ""}
              required
            />
            {formErrors.email && (
              <div className="error-message">{formErrors.email}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="birthdate">Birthdate</label>
            <input
              type="date"
              id="birthdate"
              name="birthdate"
              value={registrationData.birthdate}
              onChange={handleChange}
              className={formErrors.birthdate ? "error" : ""}
              required
            />
            {formErrors.birthdate && (
              <div className="error-message">{formErrors.birthdate}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="nDni">DNI Number</label>
            <input
              type="text"
              id="nDni"
              name="nDni"
              value={registrationData.nDni}
              onChange={handleChange}
              className={formErrors.nDni ? "error" : ""}
              required
            />
            {formErrors.nDni && (
              <div className="error-message">{formErrors.nDni}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={registrationData.username}
              onChange={handleChange}
              className={formErrors.username ? "error" : ""}
              required
            />
            {formErrors.username && (
              <div className="error-message">{formErrors.username}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={registrationData.password}
              onChange={handleChange}
              className={formErrors.password ? "error" : ""}
              required
            />
            {formErrors.password && (
              <div className="error-message">{formErrors.password}</div>
            )}
          </div>

          <button
            type="submit"
            disabled={isRegistering || !isFormValid}
            className="submit-button"
          >
            {isRegistering ? "Creating account..." : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
