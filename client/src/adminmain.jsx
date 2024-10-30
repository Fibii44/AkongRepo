import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './pages/adminpages/dashboard';
import EventM from './pages/adminpages/eventM';
import HistoryM from './pages/adminpages/history';
import EventDetails from './pages/adminpages/eventDetails'; 
import CalendarA from './pages/adminpages/calendarA'; 

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/events" element={<EventM />} />
          <Route path="/history" element={<HistoryM />} />
          <Route path="/history/:id" element={<EventDetails />} /> 
          <Route path="/calendar" element={<CalendarA />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;