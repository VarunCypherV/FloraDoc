import "./App.css";
import Home from "./Pages/home";
import Registration from "./Pages/register";
import Login from "./Pages/login";
import Profile from "./Pages/profile";
import Diagnosis from "./Pages/diagnosis";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookAppointment from "./Pages/bookAppointment";
import AppointmentRoom from "./Pages/appointmentRoom";
function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Registration />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/diagnosis" element={<Diagnosis />} />
        <Route path="/book" element={<BookAppointment />} />
        <Route path="/appointment" element={<AppointmentRoom />} />
      </Routes>
    </BrowserRouter>
    <Diagnosis/>
    </>
  );
}

export default App;