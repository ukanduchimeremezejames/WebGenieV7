import React, { useEffect, useRef, useState } from "react";

const AnimatedCounterCard = ({
  title,
  value,
  duration = 2000,
  className = "",
}) => {
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
    <div
      className={`p-6 rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-100 
                  flex flex-col items-start justify-center w-full max-w-[320px] 
                  ${className}`}
      style={{
        background:
          "linear-gradient(135deg, #ffffff 0%, #f7fafe 40%, #eef6ff 100%)",
      }}
    >
      <h3 className="text-[18px] font-semibold text-[#1e4b6d] mb-2">
        {title}
      </h3>

      <span className="text-[42px] font-extrabold text-[#0A608E] tracking-tight">
        {displayValue.toLocaleString()}
      </span>

      <div className="w-full h-[4px] mt-3 rounded-full bg-gradient-to-r from-[#5B2C6F] to-[#28A745]"></div>
    </div>
  );
};

export default AnimatedCounterCard;
