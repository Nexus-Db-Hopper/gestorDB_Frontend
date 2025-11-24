import React from 'react';
import './Select.css';

/**
 * Componente Select reutilizable
 */
function Select({ id, label, value, onChange, options, required, error, disabled }) {
  return (
    <div className="select-group">
      {label && (
        <label htmlFor={id} className="select-label">
          {label}
          {required && <span className="select-required">*</span>}
        </label>
      )}
      <select
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={`select-field ${error ? 'select-field-error' : ''}`}
        aria-invalid={!!error}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="select-error-message">{error}</p>}
    </div>
  );
}

export default Select;