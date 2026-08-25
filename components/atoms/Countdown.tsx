"use client";

import { useEffect, useMemo, useState } from "react";
import { FlipUnit } from "./FlipUnit";

export function Countdown({
  targetDate,
}: {
  targetDate: string | number | Date;
}) {
  const target = useMemo(() => new Date(targetDate).getTime(), [targetDate]);

  const getRemaining = () => {
    const diff = Math.max(0, target - Date.now());

    const totalSeconds = Math.floor(diff / 1000);

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return {
      hours,
      minutes,
      seconds,
    };
  };

  const [remaining, setRemaining] = useState(getRemaining);

  useEffect(() => {
    const update = () => {
      setRemaining(getRemaining());
    };

    update();

    const interval = window.setInterval(update, 250);

    return () => {
      window.clearInterval(interval);
    };
  }, [target]);

  const isExpired =
    remaining.hours === 0 && remaining.minutes === 0 && remaining.seconds === 0;

  if (isExpired) {
    return <div className="pf-expired-msg">Chương trình đã kết thúc</div>;
  }

  return (
    <div className="pf-countdown">
      <FlipUnit value={remaining.hours} label="GIỜ" />

      <span className="pf-colon">:</span>

      <FlipUnit value={remaining.minutes} label="PHÚT" />

      <span className="pf-colon">:</span>

      <FlipUnit value={remaining.seconds} label="GIÂY" />
    </div>
  );
}
