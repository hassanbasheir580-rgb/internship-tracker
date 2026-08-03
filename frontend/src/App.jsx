import "./App.css";
import Home from "./pages/Home";
import AddInternship from "./pages/AddInternship";
import Statistics from "./pages/ViewStatistics";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddInternship />} />
        <Route path="/stats" element={<Statistics />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;