import React, { useState, useEffect } from 'react';

const messages = [
  ["Breath In *"],
  ["Breath Out *"]
];

function Wimhoffbreath() {
  const [count, setCount] = useState<number>(0);
  const [messageIndex, setMessageIndex] = useState<number>(0);
  const [countFinished, setCountFinished] = useState<boolean>(false);
  const [wimhoffCountVisible, setWimhoffCountVisible] = useState<boolean>(false); // Control whether to render Wimhoffcount

  useEffect(() => {
    const interval = setInterval(() => {
      if (count < 30) {
        setCount(prevCount => prevCount + 0.5); // Increment half a count
        setMessageIndex(prevIndex => (prevIndex + 1) % messages.length); // Toggle message index
      } else {
        clearInterval(interval);
        setMessageIndex(messages.length - 1);
        setCountFinished(true); // Set the countFinished state to true
        setWimhoffCountVisible(true); // Show the Wimhoffcount component
      }
    }, 2000); // Adjust the breath time here

    return () => {
      clearInterval(interval);
    };
  }, [count]);

  const resetWimhoffbreath = () => {
    setCount(0);
    setMessageIndex(0);
    setCountFinished(false);
    setWimhoffCountVisible(false); // Hide the Wimhoffcount component
  };

  return (
    <div>
      <p>Count: {count}</p>
      <p>{messages[messageIndex]}</p>
      <button onClick={resetWimhoffbreath}>Breath Again</button>
      {wimhoffCountVisible && <Wimhoffcount initialTimeInSeconds={60} isBreathFinished={countFinished} />}
    </div>
  );
}

export default Wimhoffbreath;
