import React, { useState } from 'react';
import './Tabs.css';

/**
 * Componente Tabs para navegación por pestañas
 * @param {object} props - Propiedades del componente
 * @param {string} props.defaultValue - Valor de la pestaña activa por defecto
 * @param {React.ReactNode} props.children - Contenido de las pestañas
 */
export const Tabs = ({ defaultValue, children, className = '' }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { activeTab, setActiveTab });
    }
    return child;
  });

  return (
    <div className={`tabs-container ${className}`}>
      {childrenWithProps}
    </div>
  );
};

export const TabsList = ({ children, className = '', activeTab, setActiveTab }) => {
  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { activeTab, setActiveTab });
    }
    return child;
  });

  return (
    <div className={`tabs-list ${className}`}>
      {childrenWithProps}
    </div>
  );
};

export const TabsTrigger = ({ value, children, activeTab, setActiveTab }) => {
  const isActive = activeTab === value;
  
  return (
    <button
      type="button"
      onClick={() => setActiveTab(value)}
      className={`tabs-trigger ${isActive ? 'active' : ''}`}
    >
      {children}
    </button>
  );
};

export const TabsContent = ({ value, children, activeTab }) => {
  if (activeTab !== value) return null;
  
  return (
    <div className="tabs-content">
      {children}
    </div>
  );
};