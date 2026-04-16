import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { FaUser } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { VscGraph } from "react-icons/vsc";
import { MdAccountBox } from "react-icons/md";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { auth } from "../src/firebase";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { AiFillProduct } from "react-icons/ai";
import { MdSwitchAccount } from "react-icons/md";

const pages = [
  { name: "Dashboard", icon: <VscGraph /> },
  { name: "Products", icon: <AiFillProduct /> },
  { name: "Accounts", icon: <MdSwitchAccount /> },
];

function NavbarLayout() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const data = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setUser(u);
    });

    return () => unsubscribe();
  }, []);

  const handleMenu = (setting) => {
    if (setting === "Logout") {
      signOut(auth);
      localStorage.clear("user");
      toast.success("Logout Successfully!");
      navigate("/");
    }

    if (setting === "Dashboard") {
      navigate("/dashboard");
    }

    if (setting === "Account") {
      navigate("/account");
    }

    handleCloseUserMenu();
  };

  const handlePage = (p) => {
    if (p === "Products") {
      navigate("/product");
    }

    if (p === "Accounts") {
      navigate("/account");
    }

    if (p === "Dashboard") {
      navigate("/dashboard");
    }

    handleCloseNavMenu();
  };

  const settings = [
    { text: "Profile", icon: <FaUser style={{ marginRight: 8 }} /> },
    { text: "Account", icon: <MdAccountBox style={{ marginRight: 8 }} /> },
    { text: "Dashboard", icon: <VscGraph style={{ marginRight: 8 }} /> },
    { text: "Logout", icon: <IoMdLogOut style={{ marginRight: 8 }} /> },
  ];

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 3,
              display: { xs: "flex", md: "flex" },
              fontWeight: 700,
              letterSpacing: ".2rem",
              color: "inherit",
              textDecoration: "none",
              border: "2px solid white",
              padding: "0px 8px 0px 8px",
              backgroundColor: "white",
            }}
          >
            <p style={{ color: "#1769aa" }}>
              Hi, {user?.displayName || data?.userInfo?.name}👋
            </p>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "flex" } }}>
            {pages.map((page, i) => (
              <Button
                key={i}
                onClick={() => handlePage(page.name)}
                size="small"
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  border: "1px solid white",
                  marginRight: "12px",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  {page.icon}
                  <p>{page.name}</p>
                </Box>
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title={user?.email || data?.userInfo?.email}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar sx={{ bgcolor: "lightblue", color: "#1769aa" }}>
                  {user?.displayName?.charAt(0) ||
                    data?.userInfo?.name?.charAt(0)}
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting, i) => (
                <MenuItem
                  key={i}
                  onClick={() => {
                    handleMenu(setting.text);
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    {setting.icon}
                    <p>{setting.text}</p>
                  </Box>{" "}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavbarLayout;
