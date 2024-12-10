import React, { useEffect } from "react";
import styles from "./Timer.module.css"; // CSS for retro style

const Timer = ({ time }) => {
  useEffect(() => {
    if (time === 0) {
      console.log("Time's up!"); // Add any action here for time-out
    }
  }, [time]);

  return (
    <div className={styles.timerBox}>
      <span className={styles.timerText}>Time Left: </span>
      <span className={styles.timerValue}>{time}s</span>
    </div>
  );
};

export default Timer;
