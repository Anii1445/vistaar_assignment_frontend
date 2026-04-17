
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useState } from "react";
const API = import.meta.env.VITE_API_URL;
import LoadingButton from "@mui/lab/LoadingButton";
import { Box } from "@mui/material";

function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  const validate = () => {
    let tempErrors = {};

    if (!formData.name.trim()) {
      tempErrors.name = "Name is required";
    }

    if (!formData.phone) {
      tempErrors.phone = "Phone is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      tempErrors.phone = "Enter valid 10-digit phone";
    }

    if (!formData.email) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Invalid email";
    }

    if (!formData.password) {
      tempErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      tempErrors.password = "Minimum 6 characters required";
    }

    setErrors(tempErrors);

    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    if (!validate()) {
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API}/auth/register`,
        formData,
      );

      if (response.data) {
        toast.success("Registered Successfully");
        navigate("/");
      } else {
        toast.error("Registration Failed!");
      }
    } catch (err) {
      console.error(err);
    }finally{
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(135deg, #9ACAE9, #044F7A)",
      }}
    >
      <Card sx={{  width: "100%", maxWidth: { xs: 310, md: 560 }, p: 4, borderRadius: "20px" }}>
        <CardContent>
          <Typography variant="h5" textalign="center" sx={{ mb: 4 }}>
            Sign Up
          </Typography>

          <Box sx={{ display: {md: "flex", xs:"block"}, gap: "10px", marginBottom: "1px" }}>
            <TextField
              id="outlined-basic"
              fullWidth
              label="Name"
              type="text"
              name="name"
              onChange={handleChange}
              variant="outlined"
              size="small"
              sx={{ mb: 1 }}
              error={!!errors.name}
              helperText={errors.name}
            />
            <TextField
              id="outlined-basic"
              fullWidth
              label="Phone"
              type="text"
              name="phone"
              onChange={handleChange}
              variant="outlined"
              size="small"
              sx={{ mb: 1 }}
              error={!!errors.phone}
              helperText={errors.phone}
            />
          </Box>

          <Box sx={{ display: {md: "flex", xs:"block"}, gap: "10px", marginBottom: "2px" }}>
            <TextField
              id="outlined-basic"
              fullWidth
              label="Email"
              type="email"
              name="email"
              onChange={handleChange}
              variant="outlined"
              size="small"
              sx={{ mb: 1 }}
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              id="outlined-basic"
              fullWidth
              label="Password"
              type="password"
              onChange={handleChange}
              name="password"
              variant="outlined"
              size="small"
              sx={{ mb: 1 }}
              error={!!errors.password}
              helperText={errors.password}
            />
          </Box>

          <Box>
            <LoadingButton
              loading={loading}
              loadingPosition="start"
              variant="contained"
              fullWidth
              onClick={handleRegister}
            >
              {loading ? "Creating..." : "Create Account"}
            </LoadingButton>
          </Box>
          <small>Already have an account?</small>
          <NavLink
            to="/"
            style={{
              fontSize: "15px",
              textDecoration: "none",
              marginLeft: "5px",
            }}
          >
            Login
          </NavLink>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Register;
