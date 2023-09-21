import "./App.css";
import Home from "./Pages/home";
import Registration from "./Pages/register";
import Login from "./Pages/login";
import Profile from "./Pages/profile";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
      </Routes>
    </BrowserRouter>
    <AppointmentRoom/>
    </>
  );
}

export default App;