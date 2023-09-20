import React, { useEffect, useState } from "react";
import "./LoadingSpinner.css";

const LoadingSpinner = () => {
  const [text, setText] = useState("Loading");
  const setCount = useState(0)[1];

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev < 3) {
          setText((val) => val + ".");
          return prev + 1;
        } else {
          setText((prev) => {
            const newValue = prev.substring(0, prev.length - 3);
            return newValue;
          });
          return 0;
        }
      });
    }, 700);
    return () => {
      clearInterval(timer);
      console.log("timer cleared");
    };
  }, [setCount]);

  return (
    <div className="loading">
      <h1>{text}</h1>
    </div>
  );
};

export default LoadingSpinner;
