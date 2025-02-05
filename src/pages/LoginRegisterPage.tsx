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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const BASE_URL = "http://127.0.0.1:8000/api/accounts";

const LoginRegisterPage = () => {
  const [tabValue, setTabValue] = useState(0); // 0 for Login, 1 for Register
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    otp: "",
  });
  const [step, setStep] = useState("form"); // "form" for registration form, "otp" for OTP input
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState(false); // Loading state for button
  const { login } = useAuth(); // Access login function from AuthContext
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState<string>("");

  // Forgot Password State
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [forgotPasswordMessage, setForgotPasswordMessage] = useState("");

  const [resendDisabled, setResendDisabled] = useState(true);
  const [resendTimer, setResendTimer] = useState(120); // 120 seconds = 2 minutes

  const startResendTimer = () => {
    const timer = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setResendDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Open/Close Forgot Password Dialog
  const openForgotPasswordDialog = () => setIsForgotPasswordOpen(true);
  const closeForgotPasswordDialog = () => {
    setForgotPasswordEmail("");
    setForgotPasswordMessage("");
    setIsForgotPasswordOpen(false);
  };

  // Handle Forgot Password Request
  const handleForgotPassword = async () => {
    setForgotPasswordMessage("");
    try {
      const response = await axios.post(`${BASE_URL}/password-reset/`, {
        email: forgotPasswordEmail,
      });
      if (response.status === 200) {
        setForgotPasswordMessage(
          "A password reset link has been sent to your email."
        );
      }
    } catch (err: any) {
      setForgotPasswordMessage(
        err.response?.data?.error ||
          "Failed to send reset link. Please try again."
      );
    }
  };

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

  interface LocationState {
    redirectTo?: string;
  }

  const location = useLocation();
  const locationState = location.state as LocationState | null;

  const handleSubmit = async () => {
    setErrorMessage("");
    setSuccessMessage("");

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
          const token = response.data.access;
          localStorage.setItem("token", token); // Save token only during login
          login();
          const redirectTo = locationState?.redirectTo || "/";
          navigate(redirectTo);
        } else if (step === "form") {
          // Registration success, move to OTP step
          setStep("otp");
          setSuccessMessage("A verification OTP has been sent to your email.");
          setErrorMessage(""); // Clear any previous errors

          // Start countdown when OTP is sent
          setResendDisabled(true);
          setResendTimer(120);
          startResendTimer();
        } else if (step === "otp") {
          // OTP verified
          console.log(
            "OTP verified successfully, attempting to hit notification endpoint..."
          );
          const token = response.data?.access; // Extract token from OTP response

          if (token) {
            console.log("Temporary token for admin notification:", token);

            // Notify admin about the new user registration
            try {
              const notifyResponse = await axios.post(
                "http://127.0.0.1:8000/api/notifications/new-user-registration/",
                {},
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              console.log("Admin notified successfully:", notifyResponse.data);

              setSuccessMessage(
                "Your account has been verified, and the admin has been notified. You can now log in."
              );
            } catch (notifyError) {
              console.error(
                "Failed to notify admin:",
                notifyError.response?.data || notifyError
              );
              setSuccessMessage(
                "Your account has been verified. You can now log in, but admin notification failed."
              );
            }
          } else {
            console.warn(
              "No token received after OTP verification. Unable to notify admin."
            );
          }

          // Reset form and switch to login tab
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

  const handleResendOTP = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/resend-otp/`, {
        email: formData.email,
      });
      if (response.status === 200) {
        setErrorMessage("");
        setSuccessMessage("A new OTP has been sent to your email.");

        // Restart the timer
        setResendDisabled(true);
        setResendTimer(120);
        startResendTimer();
      }
    } catch (err: any) {
      setErrorMessage(
        err.response?.data?.error || "Failed to resend OTP. Please try again."
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
        {successMessage && <Alert severity="success">{successMessage}</Alert>}

        {errorMessage && (
          <Alert severity="error" sx={{ marginBottom: 2 }}>
            {errorMessage}
          </Alert>
        )}

        <Box>
          {step === "otp" ? (
            <>
              <Typography
                variant="h6"
                sx={{ textAlign: "center", color: "#3251A1" }}
              >
                Verify Your Email
              </Typography>
              <Typography
                variant="body2"
                sx={{ textAlign: "center", marginBottom: 2 }}
              >
                Enter the 6-digit OTP sent to your email.
              </Typography>
              <TextField
                label="Enter OTP"
                name="otp"
                type="text"
                fullWidth
                value={formData.otp}
                onChange={handleInputChange}
                sx={{ marginBottom: 3 }}
              />
              <Button
                variant="contained"
                fullWidth
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </Button>

              {/* 🔹 Resend OTP Section */}
              <Typography
                variant="body2"
                sx={{ textAlign: "center", marginTop: 2 }}
              >
                Didn't receive the OTP?{" "}
                <span
                  onClick={resendDisabled ? undefined : handleResendOTP}
                  style={{
                    color: resendDisabled ? "#AAA" : "#3251A1",
                    fontWeight: "bold",
                    cursor: resendDisabled ? "default" : "pointer",
                  }}
                >
                  {resendDisabled
                    ? `Resend OTP in ${resendTimer}s`
                    : "Resend OTP"}
                </span>
              </Typography>
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

              {tabValue === 0 && (
                <Typography
                  variant="body2"
                  sx={{
                    textAlign: "right",
                    color: "#3251A1",
                    cursor: "pointer",
                    marginBottom: 2,
                    "&:hover": { textDecoration: "underline" },
                  }}
                  onClick={openForgotPasswordDialog}
                >
                  Forgot Password?
                </Typography>
              )}

              <Typography
                variant="body2"
                sx={{
                  textAlign: "center",
                  marginBottom: 2,
                  color: "#555",
                }}
              ></Typography>
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

      {/* 🔹 Forgot Password Dialog */}
      <Dialog
        open={isForgotPasswordOpen}
        onClose={closeForgotPasswordDialog}
        sx={{
          "& .MuiPaper-root": {
            borderRadius: "12px",
            padding: "20px",
            width: "100%",
            maxWidth: "420px",
          },
        }}
      >
        <DialogTitle
          sx={{ textAlign: "center", fontWeight: "bold", color: "#3251A1" }}
        >
          Reset Your Password
        </DialogTitle>
        <DialogContent sx={{ textAlign: "center" }}>
          <Typography variant="body2" sx={{ marginBottom: 2, color: "#555" }}>
            Enter your email below, and we'll send you a link to reset your
            password.
          </Typography>
          <TextField
            label="Email Address"
            variant="outlined"
            fullWidth
            value={forgotPasswordEmail}
            onChange={(e) => setForgotPasswordEmail(e.target.value)}
            sx={{
              marginBottom: 2,
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#3251A1" },
                "&:hover fieldset": { borderColor: "#FF6347" },
                "&.Mui-focused fieldset": { borderColor: "#3251A1" },
              },
            }}
          />
          {forgotPasswordMessage && (
            <Alert
              severity="info"
              sx={{
                marginTop: 2,
                backgroundColor: "#E3F2FD",
                color: "#1E88E5",
              }}
            >
              {forgotPasswordMessage}
            </Alert>
          )}
        </DialogContent>
        <DialogActions
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: "16px",
          }}
        >
          <Button
            onClick={closeForgotPasswordDialog}
            sx={{ color: "#777", "&:hover": { color: "#333" } }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleForgotPassword}
            variant="contained"
            sx={{
              backgroundColor: "#3251A1",
              color: "white",
              padding: "8px 20px",
              borderRadius: "8px",
              "&:hover": { backgroundColor: "#FF6347" },
            }}
          >
            Send Reset Link
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default LoginRegisterPage;
