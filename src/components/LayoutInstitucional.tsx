import React from 'react';
import NavbarInstitucional from './NavbarInstitucional';
import './LayoutInstitucional.css';

const LayoutInstitucional = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="layout-institucional">
      <NavbarInstitucional />
      <div className="layout-body">
        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default LayoutInstitucional;
