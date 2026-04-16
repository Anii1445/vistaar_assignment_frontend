import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  Typography,
  Button,
  TablePagination
} from "@mui/material";
const API = import.meta.env.VITE_API_URL;

function Product(){

    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [allProduct, setAllProduct] = useState([]);
    useEffect(()=>{
        const getAllProduct = async() => {
        try {
            setLoading(true)
            const res = await axios.get(`${API}/auth/getAllDistinctProduct`)

            if(res.status === 200){
                setAllProduct(res.data)
            }
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
        }
    }

    getAllProduct();

    },[]);

    const handleChangePage = (event, newPage) => {
  setPage(newPage);
};

const handleChangeRowsPerPage = (event) => {
  setRowsPerPage(parseInt(event.target.value, 10));
  setPage(0);
};

    return(
    <>
     <TableContainer component={Paper} sx={{ mt: 4, maxWidth: 900, mx: "auto", border: "1px solid #D3D3D3" }}>
      <Typography variant="h5" sx={{ p: 2, fontWeight: "bold" }}>
        All Distinct Products
      </Typography>

      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#90caf9"}}>
            <TableCell sx={{ color: "#0d47a1", fontWeight: "bold" }}>
              #
            </TableCell>
            <TableCell sx={{ color: "#0d47a1", fontWeight: "bold" }}>
              Product Name
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {loading ? <TableRow>
      <TableCell colSpan={4} align="center">
        <Typography sx={{ py: 3 }}>Loading...</Typography>
      </TableCell>
    </TableRow> : allProduct.length > 0 ? allProduct.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((p, i) => (
            <TableRow key={i} hover>
             <TableCell>{page * rowsPerPage + i + 1}</TableCell>
             <TableCell>{p}</TableCell>
            </TableRow>
          )
        ): <TableRow>
      <TableCell colSpan={4} align="center">
        <Typography sx={{ py: 3 }}>No Data Available</Typography>
      </TableCell>
    </TableRow>}
        </TableBody>
      </Table>

       <TablePagination
    component="div"
    count={allProduct.length}
    page={page}
    onPageChange={handleChangePage}
    rowsPerPage={rowsPerPage}
    onRowsPerPageChange={handleChangeRowsPerPage}
    rowsPerPageOptions={[5, 10, 25]}
  />

    </TableContainer>
    </>
    )
}

export default Product;