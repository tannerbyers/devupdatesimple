import "./App.css";
import ResponsiveAppBar from "./components/ResponsiveAppBar.js";
import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.js";
import About from "./pages/About.js";
import HolyGrail from "./pages/HolyGrail";

function App() {
  return (
    <div className="App">
      <ResponsiveAppBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="holygrail" element={<HolyGrail />} />
      </Routes>
    </div>
  );
}

export default App;
