import React from "react";
import ReactDOM from "react-dom/client";
import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";

function NavMenu() {
  // Menu items configuration
  const items = [
    {
      label: "Home",
      icon: "pi pi-home",
      command: () => alert("Home clicked")
    },
    {
      label: "Products",
      icon: "pi pi-briefcase",
      command: () => alert("Home clicked")
    },
    {
      label: "About",
      icon: "pi pi-info-circle",
      command: () => alert("About clicked")
    },
    {
      label: "Contact",
      icon: "pi pi-envelope",
      command: () => alert("Contact clicked")
    }
  ];

  // Custom start content (logo or brand name)
  const start = (
    <img
      alt="logo"
      src="/assets/VcareLog.webp"
      height="40"
      className="mr-2"
    />
  );

  // Custom end content (login button)
  const end = (
    <Button
      label="Login"
      icon="pi pi-sign-in"
      className="p-button-sm p-button-outlined"
      onClick={() => alert("Login clicked")}
    />
  );

  return (
    <div className="card">
      <Menubar model={items} start={start} end={end} />
    </div>
  );
}

export default NavMenu;


