import React from 'react';
import Navigation from './Navigation';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="p-4">
        {children}
      </div>
    </div>
  );
};

export default Layout;
