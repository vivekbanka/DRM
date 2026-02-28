
import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

function NavMenu() {
  const navigate = useNavigate();
  
  // Menu items configuration
  const items = [
    {
      label: "Home",
      icon: "pi pi-home",
      command: () => navigate("/")
    },
    {
      label: "Products",
      icon: "pi pi-briefcase",
      command: () => navigate("/products")
    },
    {
      label: "About",
      icon: "pi pi-info-circle",
      command: () => navigate("/about")
    },
    {
      label: "Contact",
      icon: "pi pi-envelope",
      command: () => navigate("/contact")
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
      size="small"
      outlined
      onClick={() => navigate("/Identity/Account/Manage")}
    />
  );

  return (
    <Menubar model={items} start={start} end={end} />
  );
}

export default NavMenu;


