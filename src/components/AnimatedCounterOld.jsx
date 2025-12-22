import React, { useEffect, useRef, useState } from "react";

const AnimatedCounter = ({ title, value, duration = 2000, className = "" }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const frameRef = useRef(null);

  useEffect(() => {
    let start = 0;
    const end = Number(value);
    const startTime = performance.now();

    const animate = (time) => {
      const progress = Math.min((time - startTime) / duration, 1);
      const currentValue = Math.floor(progress * (end - start) + start);
      setDisplayValue(currentValue);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameRef.current);
  }, [value, duration]);

  return (
    <div className={`flex flex-col ${className}`}>
      <h3 className="text-[20px] font-medium text-[#125A7A] mb-1">{title}</h3>
      <span className="text-[48px] font-bold text-[#0A608E]">
        {displayValue.toLocaleString()}
      </span>
    </div>
  );
};

export default AnimatedCounter;
