import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Tabs,
  Tab,
  Paper,
  Alert,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const BASE_URL = "http://127.0.0.1:8000/api/accounts";

const CheckoutOptionPage = () => {
  const [tabValue, setTabValue] = useState(0); // 0 for Login, 1 for Register
  const initialFormData = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "", // Only used for Register
  };
  const [formData, setFormData] = useState(initialFormData);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { login } = useAuth(); // Access login function from AuthContext
  const navigate = useNavigate();
  const location = useLocation();

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    setErrorMessage("");
    setFormData(initialFormData); // Reset form on tab change
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    setErrorMessage("");

    if (tabValue === 1 && formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    const endpoint =
      tabValue === 0 ? `${BASE_URL}/token/` : `${BASE_URL}/register/`;

    try {
      const response = await axios.post(endpoint, {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 200 || response.status === 201) {
        if (tabValue === 0) {
          // Login success: Save token and merge cart
          localStorage.setItem("token", response.data.access);

          // Merge guest cart and update auth state
          await login();

          // Redirect back to cart or another specified route
          const redirectTo = location.state?.redirectTo || "/cart";
          navigate(redirectTo);
        } else {
          // Registration success: Redirect to login tab
          setTabValue(0);
          setFormData(initialFormData);
        }
      }
    } catch (err: any) {
      setErrorMessage(
        err.response?.data?.detail ||
          err.response?.data?.message ||
          "An unexpected error occurred. Please try again."
      );
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Paper elevation={3} sx={{ padding: 4, maxWidth: 400, width: "100%" }}>
        <Typography variant="h5" sx={{ textAlign: "center", marginBottom: 2 }}>
          Checkout Options
        </Typography>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{ marginBottom: 2 }}
        >
          <Tab label="Login" />
          <Tab label="Register" />
        </Tabs>

        {errorMessage && (
          <Alert severity="error" sx={{ marginBottom: 2 }}>
            {errorMessage}
          </Alert>
        )}

        <Box sx={{ marginTop: 2 }}>
          {tabValue === 1 && (
            <TextField
              label="Email"
              name="email"
              type="email"
              fullWidth
              value={formData.email}
              onChange={handleInputChange}
              sx={{ marginBottom: 2 }}
            />
          )}
          <TextField
            label="Username"
            name="username"
            fullWidth
            value={formData.username}
            onChange={handleInputChange}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            value={formData.password}
            onChange={handleInputChange}
            sx={{ marginBottom: tabValue === 1 ? 2 : 0 }}
          />
          {tabValue === 1 && (
            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              fullWidth
              value={formData.confirmPassword}
              onChange={handleInputChange}
              sx={{ marginBottom: 2 }}
            />
          )}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
            sx={{ marginBottom: 2 }}
          >
            {tabValue === 0 ? "Login" : "Register"}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default CheckoutOptionPage;
