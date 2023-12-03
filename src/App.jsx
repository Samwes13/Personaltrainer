import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import CustomerList from './components/CustomerList';
import TrainingsList from './components/TrainingsList';
import CalenderTraining from './components/CalenderTraining'; 
import 'react-big-calendar/lib/css/react-big-calendar.css';


const App = () => {
  return (
    <Router>
      <div>
        <Navigation />

        <Routes>
          <Route path="/trainings" element={<TrainingsList />} />
          <Route path="/" element={<CustomerList />} />
          <Route path="/calendar" element={<CalenderTraining/>} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;
