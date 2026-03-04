import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth } from '../contexts/AuthContext';
import { fetchItems, addItem, selectItems, selectItemsLoading } from '../store/slices/itemsSlice';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Card } from 'primereact/card';
import { Dialog } from 'primereact/dialog';
import 'primeflex/primeflex.css'

const Dashboard = ({ adminView = false }) => {
  const [name, setName] = useState('');
  const [value, setValue] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const dispatch = useDispatch();
  const items = useSelector(selectItems);
  const loading = useSelector(selectItemsLoading);
  const { user, hasRole } = useAuth();

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(addItem({ name, value: parseInt(value) })).unwrap();
      setName('');
      setValue('');
      setShowDialog(false);
    } catch (err) {
      console.error('Failed to create item');
    }
  };


  return (
    <>
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
    </>
  );
};

export default Dashboard;
