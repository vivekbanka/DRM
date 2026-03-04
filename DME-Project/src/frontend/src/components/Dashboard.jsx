import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getItems, createItem } from '../api';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Card } from 'primereact/card';
import { Menubar } from 'primereact/menubar';
import { Dialog } from 'primereact/dialog';
import 'primeflex/primeflex.css'

const Dashboard = ({ adminView = false }) => {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [value, setValue] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user, logout, hasRole } = useAuth();

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      const data = await getItems();
      setItems(data);
    } catch (err) {
      console.error('Failed to load items');
    }
  };

  const handleLogout = () => {  
    var result = logout();
    if(result.success) {
      window.location.href = '/login';
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createItem({ name, value: parseInt(value) });
      setName('');
      setValue('');
      setShowDialog(false);
      loadItems();
    } catch (err) {
      console.error('Failed to create item');
    }
    setLoading(false);
  };

  const menuItems = [
    {
      label: 'Dashboard',
      icon: 'pi pi-home',
      command: () => window.location.href = '/dashboard'
    },
    {
      
    },
    ...(hasRole('Admin') ? [{
      label: 'Admin Panel',
      icon: 'pi pi-cog',
      command: () => window.location.href = '/admin'
    }] : []),
  ];
  const end = (<> 
    <Button label="Logout"  icon="pi pi-sign-out" onClick={handleLogout} />
  </>);

  return (
    <div className="min-h-screen">
      <Menubar model={menuItems} className="mb-4" end={end} />
      
      <div className="p-4">
        <Card title={`${adminView ? 'Admin' : 'User'} Dashboard`}>
          <div className="flex justify-content-between align-items-center mb-4">
            <div>
              <h2>Welcome, {user?.firstName} {user?.lastName}!</h2>
              <p>Roles: {user?.roles?.join(', ')}</p>
              {adminView && (
                <p className="text-red-500 font-bold">Admin View - You have elevated privileges</p>
              )}
            </div>
            <Button
              label="Add Item"
              icon="pi pi-plus"
              onClick={() => setShowDialog(true)}
            />
          </div>

          <DataTable value={items} responsiveLayout="scroll">
            <Column field="id" header="ID" />
            <Column field="name" header="Name" />
            <Column field="value" header="Value" />
          </DataTable>
        </Card>
      </div>

      <Dialog
        header="Add New Item"
        visible={showDialog}
        onHide={() => setShowDialog(false)}
        className="w-full md:w-6 lg:w-4"
      >
        <form onSubmit={handleSubmit} className="p-fluid">
          <div className="field">
            <label htmlFor="name">Name</label>
            <InputText
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="value">Value</label>
            <InputText
              id="value"
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            label="Add Item"
            loading={loading}
            className="w-full"
          />
        </form>
      </Dialog>
    </div>
  );
};

export default Dashboard;
