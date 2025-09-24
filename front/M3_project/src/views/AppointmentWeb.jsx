import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import AppointmentForm from "../components/AppointmentForm";
import ConfirmDialog from "../components/ConfirmDialog";
import { texts } from "../helpers/texts";
import "./AppointmentWeb.css";

const AppointmentWeb = () => {
  const navigate = useNavigate();
  const {
    createAppointment,
    userAppointments,
    loadUserAppointments,
    user,
    cancelAppointment,
    loading: userLoading,
  } = useContext(UserContext);
  const [showForm, setShowForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [appointmentsLoaded, setAppointmentsLoaded] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [appointmentToCancel, setAppointmentToCancel] = useState(null);


  useEffect(() => {
    if (!user && !userLoading) {
      navigate("/login");
    }
  }, [user, userLoading, navigate]);

  useEffect(() => {
    const loadAppointments = async () => {
      if (user && !appointmentsLoaded && !userLoading) {
        setLoading(true);
        await loadUserAppointments(user.id);
        setLoading(false);
        setAppointmentsLoaded(true);
      }
    };

    loadAppointments();
  }, [user, appointmentsLoaded, loadUserAppointments, userLoading]);

  const handleCreateAppointment = async (appointmentData) => {
    const result = await createAppointment(appointmentData);
    setShowForm(false);

    if (result.success) {
      setSuccessMessage("Appointment created successfully");
      setTimeout(() => setSuccessMessage(""), 3000);
    } else {
      setError(result.message || "Error creating the appointment");
      setTimeout(() => setError(null), 3000);
    }
  };

  const confirmCancelAppointment = (id) => {
    setAppointmentToCancel(id);
    setShowConfirmDialog(true);
  };

  const handleCancelConfirm = async () => {
    if (!appointmentToCancel) return;

    const result = await cancelAppointment(appointmentToCancel);
    setShowConfirmDialog(false);

    if (result.success) {
      setSuccessMessage("Appointment cancelled successfully");
      setTimeout(() => setSuccessMessage(""), 3000);
    } else {
      setError(result.message || "Error canceling the appointment");
      setTimeout(() => setError(null), 3000);
    }

    setAppointmentToCancel(null);
  };

  const handleCancelDialog = () => {
    setShowConfirmDialog(false);
    setAppointmentToCancel(null);
  };

  return (
    <div className="appointments-page">
      <div className="appointments-container">
        <div className="appointments-header">
          <h2>{texts.appointments.title}</h2>
          <button
            className="new-appointment-button"
            onClick={() => setShowForm(true)}
          >
            {texts.appointments.newButton}
          </button>
        </div>

        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}

        {error && <div className="error-message">{error}</div>}

        {showForm && (
          <AppointmentForm
            onSubmit={handleCreateAppointment}
            onCancel={() => setShowForm(false)}
            texts={texts.appointments.form}
          />
        )}

        {showConfirmDialog && (
          <ConfirmDialog
            message="Are you sure you want to cancel this appointment?"
            onConfirm={handleCancelConfirm}
            onCancel={handleCancelDialog}
          />
        )}

        {loading ? (
          <div className="loading-message">{texts.appointments.loading}</div>
        ) : userAppointments.length === 0 ? (
          <div className="no-appointments">
            {texts.appointments.noAppointments}
          </div>
        ) : (
          <div className="appointments-grid">
            {userAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className={`appointment-card ${appointment.status}`}
              >
                <div className="appointment-info">
                  <h3>Appointment</h3>
                  <p>
                    Date: {new Date(appointment.date).toLocaleDateString()}
                  </p>
                  <p>Time: {appointment.time}</p>
                  <p
                    className={
                      appointment.status === "cancelled"
                        ? "status-cancelled"
                        : ""
                    }
                  >
                    Status:{" "}
                    {appointment.status === "active" ? "Active" : "Cancelled"}
                  </p>
                  {appointment.status === "active" && (
                    <button
                      className="card-cancel-button"
                      onClick={() => confirmCancelAppointment(appointment.id)}
                    >
                      Cancel Appointment
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentWeb;
