import React, { useEffect } from "react";

import "./App.css";
import { useState } from "react";

import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Results } from "./pages/Results";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<MainContainer />}></Route>
      </Routes>
    </div>
  );
}

export default App;
