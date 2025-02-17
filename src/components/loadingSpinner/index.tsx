// src/components/LoadingSpinner.tsx
import React from "react";
import "./styles.css";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
    </div>
  );
};

export default LoadingSpinner;
