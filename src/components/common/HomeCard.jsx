import React from 'react';

const HomeCard = ({ label, children }) => {
  return (
    <div className="home-card">
      <div className="home-header">{label}</div>
      <div className="home-content">{children}</div>
    </div>
  );
};

export default HomeCard;
