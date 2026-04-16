import axios from "axios";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  MenuItem,
  Typography,
  Button,
} from "@mui/material";
import { FaEye } from "react-icons/fa";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [customerData, setCustomerData] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:5000/auth/getCustomer`);

        if (res.status === 200) {
          setCustomerData(res.data);
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const handleAccount = async (acc) => {
    navigate(`/account_transaction/${acc}`);
    handleClose();
  };

  return (
    <TableContainer
      component={Paper}
      sx={{ mt: 4, maxWidth: 900, mx: "auto", border: "1px solid #D3D3D3" }}
    >
      <Typography variant="h5" sx={{ p: 2, fontWeight: "bold" }}>
        Active Customer List
      </Typography>

      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#90caf9" }}>
            <TableCell sx={{ color: "#0d47a1", fontWeight: "bold" }}>
              #
            </TableCell>
            <TableCell sx={{ color: "#0d47a1", fontWeight: "bold" }}>
              Name
            </TableCell>
            <TableCell sx={{ color: "#0d47a1", fontWeight: "bold" }}>
              Address
            </TableCell>
            <TableCell sx={{ color: "#0d47a1", fontWeight: "bold" }}>
              Accounts
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={4} align="center">
                <Typography sx={{ py: 3 }}>Loading...</Typography>
              </TableCell>
            </TableRow>
          ) : customerData.length > 0 ? (
            customerData.map((c, i) => (
              <TableRow key={i} hover>
                <TableCell>{i + 1}</TableCell>
                <TableCell>{c.name}</TableCell>
                <TableCell>{c.address?.replace("\n", ", ")}</TableCell>
                <TableCell>
                  <Button
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                    startIcon={<FaEye />}
                    size="small"
                    variant="outlined"
                  >
                    View
                  </Button>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    slotProps={{
                      list: {
                        "aria-labelledby": "basic-button",
                      },
                    }}
                  >
                    {c.accounts?.map((acc, i) => (
                      <MenuItem
                        key={i}
                        value={acc}
                        onClick={() => handleAccount(acc)}
                      >
                        <small>{acc}</small>
                      </MenuItem>
                    ))}{" "}
                  </Menu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} align="center">
                <Typography sx={{ py: 3 }}>
                  <small>No data Available</small>
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Dashboard;
