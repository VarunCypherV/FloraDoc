import "./App.css";
import Home from "./Pages/home";
import Registration from "./Pages/register";
import Login from "./Pages/login";
import Profile from "./Pages/profile";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppointmentRoom from "./Pages/appointmentRoom";
import Diagnosis from "./Pages/diagnosis";

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Registration />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
    <Diagnosis/>
    </>
  );
}

export default App;