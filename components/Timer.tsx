import { useState, useMemo, useEffect } from "react";
import { differenceInSeconds } from "date-fns";

const Timer = ({ deadline }: any) => {
  const ONE_DAY = 60 * 60 * 24;
  const ONE_HOUR = 60 * 60;
  const ONE_MINUTE = 60;
  const [currentTime, setCurrentTime] = useState(new Date().getTime());

  const diffInSeconds = differenceInSeconds(deadline, currentTime);

  const getCoundown = () => {
    if (diffInSeconds < 1) {
      return {
        days: "00",
        hours: "00",
        minutes: "00",
        seconds: "00",
      };
    }
    let days: any = Math.floor(diffInSeconds / ONE_DAY);
    let hours: any = Math.floor((diffInSeconds - days * ONE_DAY) / ONE_HOUR);
    let minutes: any = Math.floor(
      (diffInSeconds - days * ONE_DAY - hours * ONE_HOUR) / ONE_MINUTE
    );
    let seconds: any =
      diffInSeconds - days * ONE_DAY - hours * ONE_HOUR - minutes * ONE_MINUTE;

    if (days < 10) days = `0${days}`;
    if (hours < 10) hours = `0${hours}`;
    if (minutes < 10) minutes = `0${minutes}`;
    if (seconds < 10) seconds = `0${seconds}`;
    return {
      days,
      hours,
      minutes,
      seconds,
    };
  };

  const countdown = useMemo(getCoundown, [ONE_DAY, ONE_HOUR, diffInSeconds]);

  useEffect(() => {
    let interval: any;
    if (deadline > currentTime) {
      interval = setInterval(() => {
        const now = new Date().getTime();
        setCurrentTime(now);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [currentTime, deadline]);

  return (
    <div className="tabular-nums flex justify-between  text-2xl  ">
      {countdown.days}:{countdown.hours}:{countdown.minutes}:{countdown.seconds}
    </div>
  );
};

export default Timer;
