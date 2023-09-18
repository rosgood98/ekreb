import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/custom-alert.css';

function Alert({ message, onClose, status, data }) {
    // Determine the score text and its color based on the status
    let scoreText = '';
    let scoreTextClass = ''; // CSS class for score text
    let gameOverTextClass = ''; 
  
    if (status === 'correct') {
      scoreText = '+1';
      scoreTextClass = 'green-text'; // Apply green color for correct status
    } else if (status === 'incorrect') {
      scoreText = '+0';
      scoreTextClass = 'red-text'; // Apply red color for incorrect status
    } else if (status === 'game-over') {
      gameOverTextClass = 'yellow-text';
    }
  
    return (
      <div className='alert-background'>
        <div className='alert-content'>
          <p className={gameOverTextClass}>
            {message} <span className={scoreTextClass}>{scoreText}</span>
          </p>
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