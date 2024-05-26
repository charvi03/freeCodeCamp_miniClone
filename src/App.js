import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import BodyContent from "./components/BodyContent";
import SignIn from "./components/SignIn";
import Courses from "./components/Courses";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Routes>
          <Route path="/" element={<BodyContent />} />
          <Route
            path="/signin"
            element={
              isLoggedIn ? (
                <Navigate to="/courses" />
              ) : (
                <SignIn setIsLoggedIn={setIsLoggedIn} />
              )
            }
          />
          <Route
            path="/courses"
            element={isLoggedIn ? <Courses /> : <Navigate to="/signin" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
