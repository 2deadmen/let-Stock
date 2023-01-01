import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Home from "./components/homepage/Home";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Resetpass from "./components/Resetpass";
import StockState from "./components/StockState";
import Stock from "./components/stock/Stock";
import Add from "./components/search/Add";
import Profile from "./components/Profile";
import Reports from "./components/Reports";

const App = () => {
  return (
    <>
      <StockState>
        <Router>
          <Navbar />
        
          <div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/Signup" element={<Signup />} />
              <Route path="/search" element={<Add />} />
              <Route path="/Stock" element={<Stock />} />
              <Route path="/Resetpass" element={<Resetpass />} />
              <Route path="/Profile" element={<Profile />} />
              <Route path="/Report" element={<Reports />} />
            </Routes>
          </div>
        </Router>
      </StockState>
    </>
  );
};

export default App;
