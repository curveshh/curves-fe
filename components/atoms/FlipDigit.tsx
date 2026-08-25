"use client";

import { useEffect, useState } from "react";

type FlipDigitProps = {
  value: string;
};

export function FlipDigit({ value }: FlipDigitProps) {
  const [current, setCurrent] = useState(value);
  const [previous, setPrevious] = useState(value);
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    if (value === current) return;

    setPrevious(current);
    setCurrent(value);
    setFlipping(true);

    const timer = window.setTimeout(() => {
      setFlipping(false);
    }, 500);

    return () => window.clearTimeout(timer);
  }, [value, current]);

  return (
    <div className="pf-digit-wrap pf-dim">
      <div className={`pf-digit-inner ${flipping ? "pf-flip" : ""}`}>
        <div className="pf-face">{previous}</div>
        <div className="pf-face pf-face-back">{current}</div>
      </div>
    </div>
  );
}
