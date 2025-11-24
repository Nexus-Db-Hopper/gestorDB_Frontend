import React from 'react';
import { Toaster } from 'sonner';
import DatabaseInfo from '../../../components/DatabaseInfo/DatabaseInfo';
import QueryEditor from '../../../components/QueryEditor/QueryEditor';
import DataTable from '../../../components/DataTable/DataTable';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../../components/Tabs/Tabs';
import './UserDashboard.css';

/**
 * Dashboard principal del usuario
 * Incluye información de la base de datos, editor SQL y tabla CRUD
 */
const UserDashboard = () => {
  return (
    <>
      <Toaster position="top-right" richColors />
      <div className="user-dashboard">
        <div className="user-dashboard-container">
          <DatabaseInfo dbId="1" />
          
          <Tabs defaultValue="query" className="user-dashboard-tabs">
            <TabsList className="user-dashboard-tabs-list">
              <TabsTrigger value="query">Editor de Consultas</TabsTrigger>
              <TabsTrigger value="data">Datos (CRUD)</TabsTrigger>
            </TabsList>
            
            <TabsContent value="query">
              <QueryEditor />
            </TabsContent>
            
            <TabsContent value="data">
              <DataTable />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;