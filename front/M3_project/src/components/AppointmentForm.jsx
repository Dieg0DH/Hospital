import React, { useState, useEffect } from "react";
import { validateAppointmentForm } from "../validators/appointmentValidator";
import "./AppointmentForm.css";


const AppointmentForm = ({ onSubmit, onCancel, texts }) => {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    reason: "",
    doctor: "Dr. Smith",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const today = new Date().toISOString().split("T")[0];


  useEffect(() => {
    const requiredFields = ["date", "time", "reason", "doctor"];
    const allFieldsFilled = requiredFields.every(
      (field) => formData[field] && formData[field].toString().trim() !== ""
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

    const validationErrors = validateAppointmentForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      try {
        await onSubmit({
          ...formData,
          status: "scheduled",
        });
      } catch (error) {
        console.error("Error sending form:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="appointment-form-container">
      <h2>{texts.title || "New Appointment"}</h2>
      <form onSubmit={handleSubmit} className="appointment-form" noValidate>
        <div className={`form-group ${errors.date ? "error" : ""}`}>
          <label htmlFor="date">{texts.dateLabel || "Date"}</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            min={today}
            disabled={isSubmitting}
            placeholder="mm / dd / yyyy"
          />
          {errors.date && <span className="error-text">{errors.date}</span>}
          <small className="form-help-text">Working days only</small>
        </div>

        <div className={`form-group ${errors.time ? "error" : ""}`}>
          <label htmlFor="time">{texts.timeLabel || "Hora"}</label>
          <select
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            disabled={isSubmitting}
          >
            <option value="">Select a time</option>
            <option value="09:00">9:00 AM</option>
            <option value="10:00">10:00 AM</option>
            <option value="11:00">11:00 AM</option>
            <option value="12:00">12:00 PM</option>
            <option value="13:00">1:00 PM</option>
            <option value="14:00">2:00 PM</option>
            <option value="15:00">3:00 PM</option>
            <option value="16:00">4:00 PM</option>
            <option value="17:00">5:00 PM</option>
            <option value="18:00">6:00 PM</option>
            <option value="19:00">7:00 PM</option>
            <option value="20:00">8:00 PM</option>
            <option value="21:00">9:00 PM</option>
          </select>
          {errors.time && <span className="error-text">{errors.time}</span>}
        </div>

        <div className={`form-group ${errors.reason ? "error" : ""}`}>
          <label htmlFor="reason">
            {texts.reasonLabel || "Reason for consultation"}
          </label>
          <textarea
            id="reason"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            disabled={isSubmitting}
            rows="4"
            placeholder="Describe briefly the reason for your consultation"
          />
          {errors.reason && <span className="error-text">{errors.reason}</span>}
        </div>

        <div className={`form-group ${errors.doctor ? "error" : ""}`}>
          <label htmlFor="doctor">{texts.doctorLabel || "Doctor"}</label>
          <select
            id="doctor"
            name="doctor"
            value={formData.doctor}
            onChange={handleChange}
            disabled={isSubmitting}
          >
            <option value="Dr. Smith">Dr. John</option>
            <option value="Dr. Julien">Dr. Kayla</option>
            <option value="Dr. Li">Dr. Ming</option>
          </select>
          {errors.doctor && <span className="error-text">{errors.doctor}</span>}
        </div>

        <div className="form-buttons">
          <button
            type="button"
            onClick={onCancel}
            className="form-cancel-button"
            disabled={isSubmitting}
          >
            {texts.cancelButton || "Cancel"}
          </button>
          <button
            type="submit"
            className="submit-button"
            disabled={isSubmitting || !isFormValid}
          >
            {isSubmitting ? "Sending..." : texts.submitButton || "Send"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AppointmentForm;
