import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TablePagination
} from "@mui/material";
const API = import.meta.env.VITE_API_URL;
import { ImSpinner2 } from "react-icons/im";

function Account() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [accountTransaction, setAccountTransaction] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const getAccountTransaction = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${API}/auth/getTransactionBelow5000?page=${page + 1}&limit=${rowsPerPage}`);
        console.log(res.data);

        if (res.status === 200) {
          setAccountTransaction(res.data.response);
          setTotal(res.data.total);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getAccountTransaction();
  }, [page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ mt: 4, maxWidth: 900, mx: "auto", border: "1px solid #D3D3D3" }}
      >
        <Typography variant="h5" sx={{ p: 2, fontWeight: "bold" }}>
          Accounts
        </Typography>

        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#90caf9" }}>
              <TableCell sx={{ color: "#0d47a1", fontWeight: "bold" }}>
                #
              </TableCell>
              <TableCell sx={{ color: "#0d47a1", fontWeight: "bold" }}>
                Account ID
              </TableCell>
              <TableCell sx={{ color: "#0d47a1", fontWeight: "bold" }}>
                Transaction Amount
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <Typography sx={{ py: 3, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", color: "grey" }}>
                    <ImSpinner2/><small>Loading...</small>
                  </Typography>
                </TableCell>
              </TableRow>
            ) : accountTransaction?.length > 0 ? (
              accountTransaction?.map((t, i) => (
                  <TableRow key={i} hover>
                    <TableCell>{page * rowsPerPage + i + 1}</TableCell>
                    <TableCell>{t.account_id}</TableCell>
                    <TableCell>
                      ₹{t.transactions.map((amt) => amt.amount).join(", ")}
                    </TableCell>
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <Typography sx={{ py: 3 }}><small>No data Available</small></Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <TablePagination
          component="div"
          count={total}
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

export default Account;
