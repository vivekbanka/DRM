import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from 'primereact/button';
import { Menubar } from 'primereact/menubar';

const Navigation = () => {
  const { user, logout, hasRole } = useAuth();

  const handleLogout = () => {  
    var result = logout();
    if(result.success) {
      window.location.href = '/login';
    }
  };

  const menuItems = [
    {
      label: 'Dashboard',
      icon: 'pi pi-home',
      command: () => window.location.href = '/dashboard'
    },
    {
      label: 'Roles',
      icon: 'pi pi-users',
      command: () => window.location.href = '/roles'
    },
    ...(hasRole('Admin') ? [{
      label: 'Admin Panel',
      icon: 'pi pi-cog',
      command: () => window.location.href = '/admin'
    }] : []),
  ];

  const end = (
    <Button 
      label="Logout"  
      icon="pi pi-sign-out" 
      onClick={handleLogout} 
    />
  );

  return (
    <Menubar model={menuItems} className="mb-4" end={end} />
  );
};

export default Navigation;
