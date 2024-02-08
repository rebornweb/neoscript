import React, { useState, useEffect } from 'react';

function Wimhoffcount({ initialTimeInSeconds, isBreathFinished }: { initialTimeInSeconds: number, isBreathFinished: boolean }) {
  const [timeRemaining, setTimeRemaining] = useState<number>(initialTimeInSeconds);
  const [running, setRunningWim] = useState<boolean>(true); // Start the timer automatically
  const [countdownIndex, setCountdownIndex] = useState<number>(0);
  const [countdownTimes, setCountdownTimes] = useState<number[]>([initialTimeInSeconds, 15, 2]);

<<<<<<< HEAD
=======
  const toggleTimer = () => {
    setRunningWim(prevRunning => !prevRunning);
  };

>>>>>>> c74920f933b3da867091e3e6fc680ce22c07aef2
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
  }, [running, timeRemaining, countdownIndex, countdownTimes]);

  const reset = () => {
    setCountdownIndex(0);
    setTimeRemaining(countdownTimes[0]);
    setRunningWim(false);
  };

  const updateInitialTime = () => {
    setCountdownTimes([90, 15, 2]);
    setCountdownIndex(0);
    setTimeRemaining(90);
    setRunningWim(false);
  };

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  if (isBreathFinished) {
    return (
      <div>
        <h2>Wim Hoff Breathing Timer</h2>
        <p>Hold breath Time Remaining: {formatTime(timeRemaining)}</p>
        <br/>
<<<<<<< HEAD
=======
        <button onClick={toggleTimer}>{running ? 'Pause' : 'Continue'}</button>
>>>>>>> c74920f933b3da867091e3e6fc680ce22c07aef2
        <button onClick={reset}>Reset Timer</button>
        <button onClick={updateInitialTime}>Round 2+</button>
        <br/>
        <p>After your 30 Power Breaths</p>
        <br/>
        <p> Hold for 1 minute - Breathe In All the Way and Hold for 15 sec - then breathe all the way out and start Power Breathing again </p>
        <br/>
      </div>
    );
  } else {
    return null; // Don't render anything until the breath is finished
  }
}

export default Wimhoffcount;
