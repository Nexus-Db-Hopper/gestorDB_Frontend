import React from 'react';
import './Switch.css';

/**
 * Componente Switch (toggle) reutilizable
 */
function Switch({ id, checked, onChange, disabled = false }) {
  return (
    <label className={`switch ${disabled ? 'disabled' : ''}`} htmlFor={id}>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="switch-input"
      />
      <span className="switch-slider"></span>
    </label>
  );
}

export default Switch;