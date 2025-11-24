import React, { useState } from 'react';
import Button from '../Button/Button';
import Card from '../Card/Card';
import Input from '../Input/Input';
import { toast } from 'sonner';
import './DataTable.css';

const initialData = [
  { id: 1, nombre: "Juan Pérez", email: "juan@example.com", edad: 25 },
  { id: 2, nombre: "María García", email: "maria@example.com", edad: 30 },
  { id: 3, nombre: "Carlos López", email: "carlos@example.com", edad: 28 },
  { id: 4, nombre: "Ana Martínez", email: "ana@example.com", edad: 22 },
];

/**
 * Componente tabla CRUD para gestión de datos
 */
export const DataTable = () => {
  const [data, setData] = useState(initialData);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [isAdding, setIsAdding] = useState(false);
  const [newRow, setNewRow] = useState({});

  const handleEdit = (row) => {
    setEditingId(row.id);
    setEditForm(row);
  };

  const handleSave = () => {
    setData(data.map((row) => (row.id === editingId ? { ...row, ...editForm } : row)));
    setEditingId(null);
    setEditForm({});
    toast.success("Registro actualizado correctamente");
  };

  const handleDelete = (id) => {
    setData(data.filter((row) => row.id !== id));
    toast.success("Registro eliminado correctamente");
  };

  const handleAdd = () => {
    if (!newRow.nombre || !newRow.email || !newRow.edad) {
      toast.error("Por favor completa todos los campos");
      return;
    }
    const newId = Math.max(...data.map((d) => d.id)) + 1;
    setData([...data, { id: newId, ...newRow }]);
    setIsAdding(false);
    setNewRow({});
    toast.success("Registro agregado correctamente");
  };

  const handleCancelAdd = () => {
    setIsAdding(false);
    setNewRow({});
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  return (
    <Card className="data-table-card">
      <div className="data-table-header">
        <h3 className="data-table-title">Tabla: usuarios</h3>
        <Button
          variant="primary"
          onClick={() => setIsAdding(true)}
          disabled={isAdding}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Nuevo Registro
        </Button>
      </div>

      <div className="data-table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Edad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {isAdding && (
              <tr className="data-table-row-editing">
                <td>
                  <span className="data-table-auto-id">Auto</span>
                </td>
                <td>
                  <Input
                    id="new-nombre"
                    value={newRow.nombre || ""}
                    onChange={(e) => setNewRow({ ...newRow, nombre: e.target.value })}
                    placeholder="Nombre"
                  />
                </td>
                <td>
                  <Input
                    id="new-email"
                    value={newRow.email || ""}
                    onChange={(e) => setNewRow({ ...newRow, email: e.target.value })}
                    placeholder="Email"
                  />
                </td>
                <td>
                  <Input
                    id="new-edad"
                    type="number"
                    value={newRow.edad || ""}
                    onChange={(e) => setNewRow({ ...newRow, edad: parseInt(e.target.value) || "" })}
                    placeholder="Edad"
                  />
                </td>
                <td>
                  <div className="data-table-actions">
                    <Button variant="primary" onClick={handleAdd}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </Button>
                    <Button variant="secondary" onClick={handleCancelAdd}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                      </svg>
                    </Button>
                  </div>
                </td>
              </tr>
            )}
            {data.map((row) => (
              <tr key={row.id}>
                <td>
                  <span className="data-table-id">{row.id}</span>
                </td>
                <td>
                  {editingId === row.id ? (
                    <Input
                      id={`edit-nombre-${row.id}`}
                      value={editForm.nombre || ""}
                      onChange={(e) => setEditForm({ ...editForm, nombre: e.target.value })}
                    />
                  ) : (
                    <span>{row.nombre}</span>
                  )}
                </td>
                <td>
                  {editingId === row.id ? (
                    <Input
                      id={`edit-email-${row.id}`}
                      value={editForm.email || ""}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    />
                  ) : (
                    <span>{row.email}</span>
                  )}
                </td>
                <td>
                  {editingId === row.id ? (
                    <Input
                      id={`edit-edad-${row.id}`}
                      type="number"
                      value={editForm.edad || ""}
                      onChange={(e) => setEditForm({ ...editForm, edad: parseInt(e.target.value) || "" })}
                    />
                  ) : (
                    <span>{row.edad}</span>
                  )}
                </td>
                <td>
                  {editingId === row.id ? (
                    <div className="data-table-actions">
                      <Button variant="primary" onClick={handleSave}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      </Button>
                      <Button variant="secondary" onClick={handleCancelEdit}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="18" y1="6" x2="6" y2="18"/>
                          <line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                      </Button>
                    </div>
                  ) : (
                    <div className="data-table-actions">
                      <Button variant="secondary" onClick={() => handleEdit(row)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                      </Button>
                      <Button variant="danger" onClick={() => handleDelete(row.id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6"/>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                        </svg>
                      </Button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default DataTable;