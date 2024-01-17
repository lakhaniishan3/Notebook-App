import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import SignUp from './components/SignUp';




function App() {
  const [alerts, setAlerts] = useState(null);

  const showAlerts = (messages, types) => {
    setAlerts({
      message: messages,
      type: types
    })
    // Time for alerts
    setTimeout(() => {
      setAlerts(null)
    }, 2000);
  }

  return (
    <>
      <NoteState>
        <Router>

          <Navbar />
          <Alert alert={alerts} />

          <div className="container my-4">
            <Routes>
              <Route exact path="/" element={<Home showAlerts={showAlerts} />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/login" element={<Login showAlerts={showAlerts} />} />
              <Route exact path="/signup" element={<SignUp showAlerts={showAlerts} />} />
            </Routes>
          </div>

        </Router >
      </NoteState>
    </>
  );
}

export default App;

