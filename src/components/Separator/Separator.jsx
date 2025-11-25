import React from 'react';
import './Separator.css';

function Separator({ className = '' }) {
  return <hr className={`separator ${className}`} />;
}

export default Separator;