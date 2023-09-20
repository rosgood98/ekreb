import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/custom-alert.css';

// Custom alert component
function Alert({ message, onClose, status, data }) {
  let scoreText = '';
  let scoreTextClass = '';
  let gameOverTextClass = '';

  // update class of alert text
  // green = correct guess, red = incorrect guess, yellow = end game notification
  if (status === 'correct') {
    scoreText = '+1';
    scoreTextClass = 'green-text';
  } else if (status === 'incorrect') {
    scoreText = '+0';
    scoreTextClass = 'red-text';
  } else if (status === 'game-over') {
    gameOverTextClass = 'yellow-text-alert';
  }

  return (
    <div className='alert-background'>
      <div className='alert-content'>
        <p className={gameOverTextClass}>
          {message} <span className={scoreTextClass}>{scoreText}</span>
        </p>
        {/* If the game is over, pass final data to End page */}
        {status === 'game-over' ? (
          <Link to={`/end/${data.round}/${data.score}`} className='close' >
            <div>View</div>
          </Link>) : (
          <button className='close' onClick={onClose}>
            <div>Close</div>
          </button>)}
      </div>
    </div>
  );
}

export default Alert;