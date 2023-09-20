import React, { useEffect, useState } from "react";
import "./LoadingSpinner.css";

const LoadingSpinner = () => {
  const [loadingCount, setLoadingCount] = useState({
    value: "Loading",
    count: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setLoadingCount((prev) => {
        if (prev.count < 3) {
          return {
            ...prev,
            value: prev.value + ".",
            count: prev.count + 1,
          };
        } else {
          return {
            ...prev,
            value: "Loading",
            count: 0,
          };
        }
      });
    }, 700);
    return () => {
      clearInterval(timer);
      console.log("timer cleared");
    };
  }, []);

  return (
    <div className="loading">
      <h1>{loadingCount.value}</h1>
    </div>
  );
};

export default LoadingSpinner;
