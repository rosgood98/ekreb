import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Start from './pages/Start';
import Game from './pages/Game';
import End from './pages/End';
import './styles/start.css';

function App() {
  document.title = "'ekreb' - the word guessing game!";
  return (
      <div className="background">
        <Router>
          <Routes>
            <Route exact path="/" element={<Start />} />
            <Route exact path="/game" element={<Game />} />
            <Route exact path="/end" element={<End />} />
          </Routes>
        </Router>
      </div>
  );
}

export default App;
