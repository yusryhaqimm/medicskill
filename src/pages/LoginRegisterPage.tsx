import { useState } from "react";
import { Box, Button, TextField, Tabs, Tab, Paper, Alert } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const BASE_URL = "http://127.0.0.1:8000/api/accounts";

const LoginRegisterPage = () => {
  const [tabValue, setTabValue] = useState(0); // 0 for Login, 1 for Register
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "", // Only used for Register
    otp: "", // OTP input for verification
  });
  const [step, setStep] = useState("form"); // "form" for registration form, "otp" for OTP input
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState(false); // Loading state for button
  const { login } = useAuth(); // Access login function from AuthContext
  const navigate = useNavigate();

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

    if (
      tabValue === 1 &&
      step === "form" &&
      formData.password !== formData.confirmPassword
    ) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    const endpoint =
      tabValue === 0
        ? `${BASE_URL}/token/`
        : step === "form"
        ? `${BASE_URL}/register/`
        : `${BASE_URL}/verify-otp/`;
    const payload =
      tabValue === 0
        ? { username: formData.username, password: formData.password }
        : step === "form"
        ? {
            username: formData.username,
            email: formData.email,
            password: formData.password,
          }
        : { email: formData.email, otp: formData.otp };

    setLoading(true);
    try {
      const response = await axios.post(endpoint, payload);

      if (response.status === 200 || response.status === 201) {
        if (tabValue === 0) {
          // Login success
          localStorage.setItem("token", response.data.access);
          login();
          navigate("/");
        } else if (step === "form") {
          // Registration success, move to OTP step
          setStep("otp");
          setErrorMessage("A verification OTP has been sent to your email.");
        } else if (step === "otp") {
          // OTP verified
          setErrorMessage("");
          setTabValue(0); // Switch to login tab
          resetForm();
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
      }}
    >
      <Paper elevation={3} sx={{ padding: 4, maxWidth: 400, width: "100%" }}>
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
          {step === "otp" ? (
            <>
              <TextField
                label="OTP"
                name="otp"
                type="text"
                fullWidth
                value={formData.otp}
                onChange={handleInputChange}
                sx={{ marginBottom: 2 }}
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSubmit}
                disabled={loading}
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
                disabled={loading}
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

export default LoginRegisterPage;
