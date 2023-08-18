import React, { useState, useEffect } from 'react';

function Wimhoffcount({ initialTimeInSeconds }: { initialTimeInSeconds: number }) {
  const [timeRemaining, setTimeRemaining] = useState<number>(initialTimeInSeconds);
  const [running, setRunningWim] = useState<boolean>(false);
  const [countdownIndex, setCountdownIndex] = useState<number>(0);

  const countdownTimes = [initialTimeInSeconds, 15,2]; // Add more countdown times if needed

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (running && timeRemaining > 0) {
      intervalId = setInterval(() => {
        setTimeRemaining(prevTime => prevTime - 1);
      }, 1000); // Update every second
    } else if (timeRemaining === 0) {
      setRunningWim(false);

      // Start the next countdown if available
      if (countdownIndex < countdownTimes.length - 1) {
        setCountdownIndex(prevIndex => prevIndex + 1);
        setTimeRemaining(countdownTimes[countdownIndex + 1]);
        setRunningWim(true);
      }
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [running, timeRemaining, countdownIndex]);

  const startStop = () => {
    setRunningWim(prevRunning => !prevRunning);
  };

  const reset = () => {
    setCountdownIndex(0);
    setTimeRemaining(countdownTimes[0]);
    setRunningWim(false);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div>
      <h2>Wim Hoff Breathing Timer</h2>
      <p>After your 30 Power Breaths</p>
      <br/>
      <p> Hold for 1 minute - Breathe In All the Way and Hold for 15 sec - then breathe all the way out and start Power Breathing again </p>
      <br/>
      <p>Time Remaining: {formatTime(timeRemaining)}</p>
      <br/>
      <button onClick={startStop}>{running ? 'Pause' : 'Start'}</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default Wimhoffcount;
