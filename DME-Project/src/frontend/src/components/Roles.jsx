import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { getRoles } from '../api';
import { Dialog } from 'primereact/dialog';
import 'primeflex/primeflex.css'
import { InputText } from 'primereact/inputtext';
import { createRole } from '../api';

function Roles() {
    const [showDialog, setShowDialog] = useState(false);
    const [loading, setLoading] = useState(false);
    const [roles, setRoles] = useState([]);
    const [roleName, setRoleName] = useState('');
    const [roleDescription, setRoleDescription] = useState('');

    useEffect(() => {
        loadRoles();
    }, []);

    const loadRoles = async () => {
        try {
            const data = await getRoles();
            setRoles(data);
        } catch (err) {
            console.error('Failed to load roles');
        }
    }; 

      const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
          await createRole({ roleName: roleName, roleDescription: roleDescription, rolesIsActive: true });
          setRoleName('');
          setRoleDescription('');
          setShowDialog(false);
          loadRoles();
        } catch (err) {
          console.error('Failed to create role');
        }
        setLoading(false);
      };
    return (
      <>
        <Card title="Roles">
          <div className="flex justify-content-between align-items-center mb-4">
            <div>
              <h2>Manage System Roles</h2>
            </div>
            <Button
              label="Add Roles"
              icon="pi pi-plus"
              onClick={() => setShowDialog(true)}
            />
          </div>

          <DataTable value={roles} responsiveLayout="scroll" className="w-full">
            <Column field="roleName" header="Role Name" />
            <Column field="roleDescription" header="Description" />
            <Column field="rolesIsActive" header="Active" />
          </DataTable>
        </Card>
            <Dialog
                header="Add New Role"
                visible={showDialog}
                onHide={() => setShowDialog(false)}
                className="w-full md:w-6 lg:w-4"
              >
                <form onSubmit={handleSubmit} className="p-fluid">
                  <div className="field">
                    <label htmlFor="roleName">Role Name</label>
                    <InputText
                      id="roleName"
                      value={roleName}
                      onChange={(e) => setRoleName(e.target.value)}
                      required
                    />
                  </div>
        
                  <div className="field">
                    <label htmlFor="roleDescription">Description</label>
                    <InputText
                      id="roleDescription"
                      value={roleDescription}
                      onChange={(e) => setRoleDescription(e.target.value)}
                      required
                    />
                  </div>
        
                  <Button
                    type="submit"
                    label="Add Role"
                    loading={loading}
                    className="w-full"
                  />
                </form>
              </Dialog>
      </>
    );
}

export default Roles;