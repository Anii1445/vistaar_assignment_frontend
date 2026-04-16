import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { FaEye } from "react-icons/fa";
import InputAdornment from "@mui/material/InputAdornment";
import { FaEyeSlash } from "react-icons/fa6";
import { useState } from "react";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import FormHelperText from "@mui/material/FormHelperText";
const API = import.meta.env.VITE_API_URL;
import LoadingButton from "@mui/lab/LoadingButton";

function Login() {
  const [errors, setErrors] = useState({});
  const [showPasssword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const validate = () => {
    let tempErrors = {};

    if (!userData.email) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
      tempErrors.email = "Invalid email";
    }

    if (!userData.password) {
      tempErrors.password = "Password is required";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleLogin = async () => {
    setGoogleLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result.user);

      if (result.user) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            name: result.user?.displayName,
            email: result.user?.email,
          }),
        );
        navigate("/dashboard");
        toast.success("Login Successfully!");
      } else {
        navigate("/");
        toast.error("Something went wrong!");
      }
    } catch (err) {
      console.error(err);
    }finally{
      setGoogleLoading(false);
    }
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    if (!validate()) {
      return;
    }
    setLoading(true);

    try {
      const response = await axios.post(`${API}/auth/login`, userData);

      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data));
        toast.success("Login Succesfully");
        navigate("/dashboard");
      }
    } catch (error) {
      const message = error.response?.data?.msg || "Something went wrong";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleshowPasssword = () => {
    if (userData.password) {
      setShowPassword(true);
    }
  };

  const hidePassword = () => {
    setShowPassword(false);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(135deg, #9ACAE9, #044F7A)",
      }}
    >
      <Card sx={{ maxWidth: 395, width: "100%", p: 4, borderRadius: "20px" }}>
        <CardContent>
          <Typography variant="h5" textalign="center" sx={{ mb: 4 }}>
            Login
          </Typography>

          <div>
            <TextField
              id="outlined-basic"
              fullWidth
              label="Email"
              type="email"
              onChange={handleChange}
              name="email"
              variant="outlined"
              size="small"
              sx={{ mb: 1 }}
              error={!!errors.email}
              helperText={errors.email}
            />
            <FormControl
              sx={{ mb: 1 }}
              variant="outlined"
              onChange={handleChange}
              size="small"
              fullWidth
              error={!!errors.password}
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPasssword ? "text" : "password"}
                name="password"
                endAdornment={
                  <InputAdornment position="end" sx={{ cursor: "pointer" }}>
                    {!showPasssword ? (
                      <FaEye onClick={handleshowPasssword} />
                    ) : (
                      <FaEyeSlash onClick={hidePassword} />
                    )}
                  </InputAdornment>
                }
                label="Password"
              />

              <FormHelperText>{errors.password}</FormHelperText>
            </FormControl>
          </div>

          <div>
            <LoadingButton
              loading={loading}
              loadingPosition="start"
              variant="contained"
              fullWidth
              onClick={login}
            >
              {loading ? "Logging..." : "Login"}
            </LoadingButton>
          </div>
          <small>Don't have an account?</small>
          <NavLink
            to="/register"
            style={{
              fontSize: "15px",
              textDecoration: "none",
              marginLeft: "5px",
            }}
          >
            Create an account
          </NavLink>
          <div>
            <Divider sx={{ my: 2 }}>or</Divider>
            
              <LoadingButton
              loading={loading}
              loadingPosition="start"
              variant="outlined"
              fullWidth
              onClick={handleLogin}
              startIcon={!loading && <FcGoogle />}
            >
              {loading ? "Loading...":"Continue with Google"}
            </LoadingButton>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;
