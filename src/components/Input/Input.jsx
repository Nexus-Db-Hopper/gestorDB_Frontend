// src/components/Input/Input.jsx
import React from 'react';
import './Input.css'; // Estilos específicos para el input

/**
 * Componente Input reutilizable con estilos modernos y manejo de errores.
 * @param {object} props - Propiedades del componente.
 * @param {string} props.id - ID único para el input y el label.
 * @param {string} props.label - Texto de la etiqueta del input.
 * @param {string} props.type - Tipo de input (text, email, password, etc.).
 * @param {string} [props.value] - Valor actual del input.
 * @param {function} [props.onChange] - Función a llamar cuando el valor del input cambia.
 * @param {string} [props.placeholder] - Texto de placeholder.
 * @param {boolean} [props.required] - Indica si el campo es requerido.
 * @param {string} [props.error] - Mensaje de error a mostrar debajo del input.
 * @param {string} [props.name] - Atributo 'name' del input.
 * @param {boolean} [props.disabled] - Indica si el input está deshabilitado.
 */
function Input({ id, label, type, value, onChange, placeholder, required, error, name, disabled }) {
  return (
    <div className="input-group">
      <label htmlFor={id} className="input-label">
        {label}
        {required && <span className="input-required">*</span>}
      </label>
      <input
        id={id}
        name={name || id} // Usa 'name' si está definido, de lo contrario usa 'id'
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={`input-field ${error ? 'input-field-error' : ''}`}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error && (
        <p id={`${id}-error`} className="input-error-message">
          {error}
        </p>
      )}
    </div>
  );
}

export default Input;
