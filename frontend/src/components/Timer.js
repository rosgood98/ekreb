import React, { useState, useEffect } from 'react';

// Timer component
function Timer(props) {
  const { initialTime, key, onTimerTick } = props;
  const [time, setTime] = useState(initialTime);

  // Calculate the timeClass based on the current value of time
  // green = default, more than 25s left
  // yellow = between 11 and 25 seconds left (inclusive)
  // red = less than or equal to 10s left
  let timeClass = 'green-text-timer';
  if (time > 0) {
    if (time <= 10) {
      timeClass = 'red-text-timer';
    } else if (time <= 25) {
      timeClass = 'yellow-text-timer';
    }
  }

  // update time every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime > 0) {
          onTimerTick && onTimerTick(prevTime);
          return prevTime - 1;
        }
        clearInterval(intervalId); // Stop the timer when it reaches 0
        onTimerTick && onTimerTick(0);
        return 0;
      });
    }, 1000);

    // return time values back to Game page
    return () => {
      clearInterval(intervalId);
    };
  }, [initialTime, key, onTimerTick]);

  return (
    <div className={`timer ${timeClass}`} key={key}>
      {/* Render Timer with correct class and time */}
      <p>{time}s</p>
    </div>
  );
}

export default Timer;
