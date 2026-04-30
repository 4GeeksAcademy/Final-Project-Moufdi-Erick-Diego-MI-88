import React from "react";

export const HeroSubPages = ({ title, description }) => {
  return (
    <div className="container py-2">
      <div className="bg-dark text-white rounded-4 p-5 mb-3 shadow">
        <h1 className="display-5 fw-bold mb-3">{title}</h1>
        <p className="lead mb-0"> {description}
        </p>
      </div>
    </div>
  )
};