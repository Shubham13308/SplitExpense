import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import IntroPage from './Components/IntroPage';
import DetailsPages from './Pages/DetailsPages'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/details" element={<DetailsPages />} />
      </Routes>
    </Router>
  );
};

export default App;
