import React from "react";

const Card: React.FC<{ title?: string }> = ({ children, title }) => (
  <div className="card">
    {title && <h2 className="card__title">{title}</h2>}
    {children}
  </div>
);

export default Card;
