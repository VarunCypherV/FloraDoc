import "./App.css";
import Home from "./Pages/home";
import Registration from "./Pages/register";
import Login from "./Pages/login";
import Profile from "./Pages/profile";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookAppointment from "./Pages/bookAppointment";
import AppointmentRoom from "./Pages/appointmentRoom";
import { AuthProvider } from "./Context/AuthContext"; // Import the AuthProvider

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Registration />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/book" element={<BookAppointment />} />
          <Route path="/appointment" element={<AppointmentRoom />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
