import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Home from "./views/Home";
import AppointmentsWeb from "./views/AppointmentWeb";
import Register from "./views/Register";
import Login from "./views/Login";
import NotFound from "./views/NotFound";
import UserProvider from "./context/UserProvider";
import NavBar from "./components/NavBar";

function App() {
  const location = useLocation();

  // Load the page at the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const isKnownRoute = ["/", "/appointments", "/register", "/login"].includes(
    location.pathname
  );

  return (
    <UserProvider>
      <div className="app-container">
        {isKnownRoute && <NavBar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/appointments" element={<AppointmentsWeb />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </UserProvider>
  );
}

export default App;
