import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';

function Stopwatch() {
  const [time, setTime] = useState<number>(0); // Specified types
  const [running, setRunning] = useState<boolean>(false); // Types

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (running) {
      intervalId = setInterval(() => {
        setTime(prevTime => prevTime + 100); // Update every 100 milliseconds
      }, 100); // Update every 100 milliseconds
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [running]);

  const startStop = () => {
    setRunning(prevRunning => !prevRunning);
  };

  const reset = () => {
    setTime(0);
    setRunning(false);
  };

  // Calculate split seconds
  const splitSeconds = (time / 1000).toFixed(1);

  return (
    <div>
      <h1>Stopwatch</h1>
      <p>Time: {splitSeconds} seconds</p>
      <br/>
      <Button variant="success" onClick={startStop}>{running ? 'Stop' : 'Start'}</Button>
      <Button onClick={reset}>Reset</Button>
    </div>
  );
}

export default Stopwatch;
