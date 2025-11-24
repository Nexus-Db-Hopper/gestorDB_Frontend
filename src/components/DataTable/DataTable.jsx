import React from 'react';
import Card from '../Card/Card';
import './DataTable.css';

/**
 * Componente para visualizar los resultados de una consulta SQL.
 * @param {object} props - Propiedades del componente.
 * @param {object} props.data - Los datos a mostrar. Puede ser un array de objetos (resultados) o un objeto con una propiedad 'error'.
 */
export const DataTable = ({ data }) => {
  // Caso 1: No hay datos o no se ha ejecutado ninguna consulta todavía.
  if (!data) {
    return (
      <Card className="data-table-card">
        <div className="data-table-message">
          <p>The results of your query will be displayed here.</p>
        </div>
      </Card>
    );
  }

  // Caso 2: La consulta resultó en un error.
  if (data.error) {
    return (
      <Card className="data-table-card">
        <div className="data-table-message error">
          <h3>Query Error</h3>
          <p>{data.error}</p>
        </div>
      </Card>
    );
  }

  // Caso 3: La consulta devolvió un array vacío.
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <Card className="data-table-card">
        <div className="data-table-message">
          <p>Query executed successfully, but returned no rows.</p>
        </div>
      </Card>
    );
  }

  // Caso 4: La consulta devolvió datos.
  const headers = Object.keys(data[0]);

  return (
    <Card className="data-table-card">
      <div className="data-table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              {headers.map((header) => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {headers.map((header) => (
                  <td key={`${rowIndex}-${header}`}>{String(row[header])}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default DataTable;
