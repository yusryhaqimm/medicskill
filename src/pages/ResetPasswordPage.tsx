import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  Paper,
} from "@mui/material";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const ResetPasswordPage = () => {
  const { setIsLoggedIn } = useContext(AuthContext)!; // ✅ Correctly access AuthContext
  const { uid, token } = useParams<{ uid: string; token: string }>(); // Extract UID and Token from URL
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Checking isLoggedIn state:", localStorage.getItem("token"));
  }, []);

  const handleSubmit = async () => {
    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/accounts/password-reset-confirm/${uid}/${token}/`,
        { new_password: newPassword }
      );

      if (response.status === 200) {
        const { access, refresh } = response.data; // ✅ Get new JWT tokens

        // ✅ Store tokens in local storage
        localStorage.setItem("token", access);
        localStorage.setItem("refreshToken", refresh);

        // ✅ Update `isLoggedIn` state
        setIsLoggedIn(true);
        console.log("✅ User is now logged in!");

        setSuccessMessage(
          "Password reset successfully. Sending notification..."
        );

        // ✅ Send password change notification with the new token
        await sendPasswordChangeNotification(access);

        setTimeout(() => navigate("/"), 3000); // ✅ Redirect to dashboard instead of login
      }
    } catch (err: any) {
      setErrorMessage(
        err.response?.data?.error ||
          "An error occurred. Please try again or request a new reset link."
      );
    } finally {
      setLoading(false);
    }
  };

  // ✅ Updated function to send password change notification using the new JWT token
  const sendPasswordChangeNotification = async (authToken: string) => {
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/notifications/password-change-notification/",
        {},
        {
          headers: {
            Authorization: `Bearer ${authToken}`, // ✅ Use the newly obtained token
            "Content-Type": "application/json",
          },
        }
      );
      console.log("✅ Password change notification sent successfully.");
    } catch (error) {
      console.error("❌ Failed to send password change notification:", error);
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
          maxWidth: 400,
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
          Reset Password
        </Typography>

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

        <TextField
          label="New Password"
          type="password"
          fullWidth
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Confirm Password"
          type="password"
          fullWidth
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          sx={{ marginBottom: 3 }}
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
          {loading ? "Resetting Password..." : "Reset Password"}
        </Button>
      </Paper>
    </Box>
  );
};

export default ResetPasswordPage;
