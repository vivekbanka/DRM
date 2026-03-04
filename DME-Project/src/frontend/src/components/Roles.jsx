import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Card } from 'primereact/card';
import { getRoles } from '../api';

function Roles() {
    const [showDialog, setShowDialog] = useState(false);
    const [loading, setLoading] = useState(false);
    const [roles, setRoles] = useState([]);

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
    return (
      <div className=" w-full flex justify-content-center align-items-center">
        <Card>
            <h2 className="text-center mb-4">Roles Management</h2>
            <DataTable value={roles} tableStyle={{ Width: '100%' }}>
                <Column field="roleName" header="Role Name" />
                <Column field="roleDescription" header="Description" />
                <Column field="rolesIsActive" header="Active" />
            </DataTable>
        </Card>
        
      </div>
    );
}

export default Roles;