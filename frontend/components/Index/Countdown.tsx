import React, { useEffect, useState } from "react";

interface CountdownProps {
  seconds: number;
  isRunning: boolean;
  onTimerEnd: () => void;
}

const Countdown: React.FC<CountdownProps> = ({
  seconds,
  isRunning,
  onTimerEnd,
}) => {
  const [count, setCount] = useState(seconds);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined;

    if (isRunning) {
      intervalId = setInterval(() => {
        setCount((prevCount) => {
          if (prevCount > 1) {
            // decrement every second
            return prevCount - 1;
          } else {
            // clear interval when count is 0
            clearInterval(intervalId);
            onTimerEnd();
            return 0;
          }
        });
      }, 1000);
    } else if (intervalId) {
      // clear interval when isRunning is false
      clearInterval(intervalId);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning]);

  return (
    <p>[{count}]</p>
  );
};

export default Countdown;
