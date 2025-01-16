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
  const [step, setStep] = useState("form"); // "form" for login/register, "otp" for OTP verification
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    otp: "", // OTP input
  });
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>(""); // Success message
  const [loading, setLoading] = useState(false); // Loading state for button
  const { login } = useAuth(); // Access login function from AuthContext
  const navigate = useNavigate();
  const location = useLocation();

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    resetForm();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setErrorMessage("");
    setSuccessMessage("");
    setFormData({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      otp: "",
    });
    setStep("form");
  };

  const handleSubmit = async () => {
    setErrorMessage("");
    setSuccessMessage("");

    if (
      step === "form" &&
      tabValue === 1 &&
      formData.password !== formData.confirmPassword
    ) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    const endpoint =
      step === "form"
        ? tabValue === 0
          ? `${BASE_URL}/token/`
          : `${BASE_URL}/register/`
        : `${BASE_URL}/verify-otp/`;

    const payload =
      step === "form"
        ? tabValue === 0
          ? { username: formData.username, password: formData.password }
          : {
              username: formData.username,
              email: formData.email,
              password: formData.password,
            }
        : { email: formData.email, otp: formData.otp };

    setLoading(true);
    try {
      const response = await axios.post(endpoint, payload);

      if (response.status === 200 || response.status === 201) {
        if (step === "form") {
          if (tabValue === 0) {
            // Login success: Save token and merge cart
            localStorage.setItem("token", response.data.access);
            await login(); // Update auth state
            const redirectTo = location.state?.redirectTo || "/cart";
            setSuccessMessage("Login successful! Redirecting to your cart...");
            setTimeout(() => navigate(redirectTo), 1500); // Delay redirection for better UX
          } else {
            // Registration success: Proceed to OTP step
            setStep("otp");
            setSuccessMessage(
              "Registration successful! Please check your email for the OTP."
            );
          }
        } else if (step === "otp") {
          // OTP verification success
          setTabValue(0); // Switch to login tab
          resetForm();
          setSuccessMessage(
            "Your account has been verified. You can now log in."
          );
        }
      }
    } catch (err: any) {
      setErrorMessage(
        err.response?.data?.detail ||
          err.response?.data?.message ||
          "An unexpected error occurred. Please try again."
      );
    } finally {
      setLoading(false);
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
        padding: "20px",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          padding: 4,
          maxWidth: 420,
          width: "100%",
          borderRadius: "16px",
          boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            textAlign: "center",
            marginBottom: 3,
            color: "#3251A1",
            fontWeight: "bold",
          }}
        >
          Checkout Options
        </Typography>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{
            marginBottom: 3,
            "& .MuiTabs-indicator": { backgroundColor: "#3251A1" },
          }}
        >
          <Tab
            label="Login"
            sx={{
              color: tabValue === 0 ? "#3251A1" : "#777",
              fontWeight: tabValue === 0 ? "bold" : "normal",
            }}
          />
          <Tab
            label="Register"
            sx={{
              color: tabValue === 1 ? "#3251A1" : "#777",
              fontWeight: tabValue === 1 ? "bold" : "normal",
            }}
          />
        </Tabs>

        {errorMessage && (
          <Alert severity="error" sx={{ marginBottom: 2 }}>
            {errorMessage}
          </Alert>
        )}

        {successMessage && (
          <Alert severity="success" sx={{ marginBottom: 2 }}>
            {successMessage}
          </Alert>
        )}

        <Box>
          {step === "otp" ? (
            <>
              <TextField
                label="OTP"
                name="otp"
                type="text"
                fullWidth
                value={formData.otp}
                onChange={handleInputChange}
                sx={{
                  marginBottom: 3,
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#3251A1" },
                    "&:hover fieldset": { borderColor: "red" },
                    "&.Mui-focused fieldset": { borderColor: "#3251A1" },
                  },
                }}
              />
              <Button
                variant="contained"
                fullWidth
                onClick={handleSubmit}
                disabled={loading}
                sx={{
                  backgroundColor: "#3251A1",
                  color: "white",
                  padding: "10px 0",
                  "&:hover": { backgroundColor: "red" },
                }}
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </Button>
            </>
          ) : (
            <>
              {tabValue === 1 && (
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  fullWidth
                  value={formData.email}
                  onChange={handleInputChange}
                  sx={{ marginBottom: 3 }}
                />
              )}
              <TextField
                label="Username"
                name="username"
                fullWidth
                value={formData.username}
                onChange={handleInputChange}
                sx={{ marginBottom: 3 }}
              />
              <TextField
                label="Password"
                name="password"
                type="password"
                fullWidth
                value={formData.password}
                onChange={handleInputChange}
                sx={{ marginBottom: tabValue === 1 ? 3 : 0 }}
              />
              {tabValue === 1 && (
                <TextField
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  fullWidth
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  sx={{ marginBottom: 3 }}
                />
              )}
              <Button
                variant="contained"
                fullWidth
                onClick={handleSubmit}
                disabled={loading}
                sx={{
                  backgroundColor: "#3251A1",
                  color: "white",
                  padding: "10px 0",
                  "&:hover": { backgroundColor: "red" },
                }}
              >
                {loading
                  ? "Please wait..."
                  : tabValue === 0
                  ? "Login"
                  : "Register"}
              </Button>
            </>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default CheckoutOptionPage;
