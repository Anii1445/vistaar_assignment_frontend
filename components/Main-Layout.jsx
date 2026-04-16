import { Toolbar } from "@mui/material";
import NavbarLayout from "./Navbar-Layout";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <>
      <NavbarLayout />
      <Toolbar />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default MainLayout;
