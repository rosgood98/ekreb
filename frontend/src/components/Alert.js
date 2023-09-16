import React from 'react';
import '../styles/custom-alert.css';

function Alert({ message, onClose, status }) {
    // Determine the score text and its color based on the status
    let scoreText = '';
    let scoreTextClass = ''; // CSS class for score text
  
    if (status === 'correct') {
      scoreText = '+1';
      scoreTextClass = 'green-text'; // Apply green color for correct status
    } else if (status === 'incorrect') {
      scoreText = '+0';
      scoreTextClass = 'red-text'; // Apply red color for incorrect status
    }
  
    return (
      <div className='alert-background'>
        <div className='alert-content'>
          <p>
            {message} <span className={scoreTextClass}>{scoreText}</span>
          </p>
          <button className='close' onClick={onClose}>
            <div>Close</div>
          </button>
        </div>
      </div>
    );
  }
  

export default Alert;