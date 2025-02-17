// src/components/LoadingSpinner.tsx
import React from "react";
import "./styles.css";  // Import the styles for the spinner

const LoadingSpinner: React.FC = () => {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
    </div>
  );
};

export default LoadingSpinner;
