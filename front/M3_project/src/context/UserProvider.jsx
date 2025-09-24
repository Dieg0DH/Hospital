import React, { useState, useEffect } from "react";
import axios from "axios";
import UserContext from "./UserContext";

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userAppointments, setUserAppointments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const loadUserAppointments = async (userId) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3000/appointments/user/${userId}`
      );
      setUserAppointments(response.data);
      return { success: true };
    } catch (error) {
      console.error("Error loading appointments:", error);
      return { success: false, message: error.message };
    } finally {
      setLoading(false);
    }
  };

  const createAppointment = async (appointmentData) => {
    try {
      // Verify that user is authenticated
      if (!user || !user.id) {
        return { success: false, message: "User not authenticated" };
      }

      const appointmentWithUserId = {
        ...appointmentData,
        userId: user.id,
      };

      const response = await axios.post(
        "http://localhost:3000/appointments/schedule",
        appointmentWithUserId
      );

      if (response.status === 201) {
        await loadUserAppointments(user.id);
        return { success: true };
      } else {
        return {
          success: false,
          message: response.data.message || "Could not schedule appointment.",
        };
      }
    } catch (error) {
      console.error("Error scheduling appointment:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Error scheduling appointment",
      };
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/appointments/cancel/${appointmentId}`
      );

      if (response.status === 200) {
        // Update the state of the appointments
        setUserAppointments(
          userAppointments.map((app) =>
            app.id === appointmentId ? { ...app, status: "cancelled" } : app
          )
        );
        return { success: true };
      } else {
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      console.error("Error canceling appointment:", error);
      return { success: false, message: error.message };
    }
  };

  const handleLogin = async (credentials) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/users/login",
        credentials
      );

      const userData = response.data.user;
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));

      await loadUserAppointments(userData.id);

      return { success: true };
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        message:
          error.response?.data?.message || "Incorrect Password or Username.",
      };
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setUserAppointments([]);
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider
      value={{
        user,
        userAppointments,
        loading,
        loadUserAppointments,
        createAppointment,
        cancelAppointment,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
