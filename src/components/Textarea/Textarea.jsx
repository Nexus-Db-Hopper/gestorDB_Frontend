import React from 'react';
import './Textarea.css';

/**
 * Componente Textarea reutilizable
 * @param {object} props - Propiedades del componente
 */
function Textarea({ id, label, value, onChange, placeholder, required, error, name, disabled, rows = 4, className = '' }) {
  return (
    <div className="textarea-group">
      {label && (
        <label htmlFor={id} className="textarea-label">
          {label}
          {required && <span className="textarea-required">*</span>}
        </label>
      )}
      <textarea
        id={id}
        name={name || id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        rows={rows}
        className={`textarea-field ${error ? 'textarea-field-error' : ''} ${className}`}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error && (
        <p id={`${id}-error`} className="textarea-error-message">
          {error}
        </p>
      )}
    </div>
  );
}

export default Textarea;