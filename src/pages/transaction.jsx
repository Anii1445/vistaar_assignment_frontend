import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  TablePagination,
} from "@mui/material";
const API = import.meta.env.VITE_API_URL;


function Transaction() {
  const { id } = useParams();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [allTransaction, setAllTransaction] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const getAccountTransaction = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${API}/auth/getAccountTransaction/${id}`,
        );

        if (res.status === 200) {
          setAllTransaction(res.data[0].transactions);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getAccountTransaction();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  console.log(allTransaction);
  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ mt: 4, maxWidth: 900, mx: "auto", border: "1px solid #D3D3D3" }}
      >
        <Typography
          variant="h5"
          sx={{
            p: 2,
            fontWeight: "bold",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          All Transactions
          <Button
            variant="contained"
            size="small"
            onClick={() => navigate("/dashboard")}
            startIcon={<IoArrowBackOutline />}
          >
            Back
          </Button>
        </Typography>

        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#90caf9" }}>
              <TableCell sx={{ color: "#0d47a1", fontWeight: "bold" }}>
                #
              </TableCell>
              <TableCell sx={{ color: "#0d47a1", fontWeight: "bold" }}>
                Transaction Symbol
              </TableCell>
              <TableCell sx={{ color: "#0d47a1", fontWeight: "bold" }}>
                Amount
              </TableCell>
              <TableCell sx={{ color: "#0d47a1", fontWeight: "bold" }}>
                Transaction Code
              </TableCell>
              <TableCell sx={{ color: "#0d47a1", fontWeight: "bold" }}>
                Date
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
            ) : allTransaction.length > 0 ? (
              allTransaction
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((t, i) => (
                  <TableRow key={i} hover>
                    <TableCell>{page * rowsPerPage + i + 1}</TableCell>
                    <TableCell>{t.symbol}</TableCell>
                    <TableCell>₹{t.amount}</TableCell>
                    <TableCell>{t.transaction_code}</TableCell>
                    <TableCell>
                      {" "}
                      {new Date(t.date).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </TableCell>
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <Typography sx={{ py: 3 }}>Not Data Available</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <TablePagination
          component="div"
          count={allTransaction.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </TableContainer>
    </>
  );
}

export default Transaction;
