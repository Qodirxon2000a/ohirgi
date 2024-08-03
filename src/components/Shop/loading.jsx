// src/components/LoadingPage.js
import React from 'react';
import './loading.css'; // Create this CSS file for styling

const LoadingPage = () => {
  return (
    <div className="loading-overlay">
      <div className="loading-spinner"></div>
      <p></p>
    </div>
  );
};

export default LoadingPage;
