import { useEffect, useState } from "react";
import "./HintCountDown.css";
export default function HintCountDown({ time, id }) {
  const [hintCountdown, setHintCountdown] = useState(time);
  const [intervalId, setIntervalId] = useState([0]);
  var ids = intervalId;
  const reduceCountdown = (tme) => {
    if (tme > 0) {
      setHintCountdown(tme);
      ids.push(setTimeout(reduceCountdown, 1000, tme - 1));
      clearTimeout(ids[0])
      ids = ids.slice(1)
      setIntervalId(ids);
    }
  };

  useEffect(() => reduceCountdown(time), [time, id]);
  useEffect(
    () => () => {
      for (var i = 0; i < intervalId.length - 1; i++) {
        clearTimeout(intervalId[i]);
      }
    },
    [time, id]
  );

  var seconds = hintCountdown % 60;
  var minutes = (hintCountdown - seconds) / 60;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  return hintCountdown ? (
    <span
    className="hint" >
      Hint available in <br /> {minutes + "m " + seconds + "s"}
    </span>
  ) : (
    <></>
  );
}