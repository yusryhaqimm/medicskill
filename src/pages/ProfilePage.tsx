// src/pages/ProfilePage.tsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  Paper,
  Alert,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://127.0.0.1:8000/api/accounts";

const ProfilePage = () => {
  const [profileData, setProfileData] = useState({
    salutation: "",
    full_name: "",
    billing_address: "",
    mobile_number: "",
    hospital_clinic_name: "",
    designation: "",
    dietary_restrictions: "",
  });
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}/profile/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfileData(response.data);
      } catch (err: any) {
        setErrorMessage(
          err.response?.data?.detail ||
            "Failed to fetch profile. Please try again."
        );
      }
    };
    fetchProfile();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const token = localStorage.getItem("token");
      await axios.put(`${BASE_URL}/profile/`, profileData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccessMessage("Profile updated successfully.");
    } catch (err: any) {
      setErrorMessage(
        err.response?.data?.detail ||
          "Failed to update profile. Please try again."
      );
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
    navigate("/login");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: 4,
      }}
    >
      <Paper elevation={3} sx={{ padding: 4, maxWidth: 600, width: "100%" }}>
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          My Profile
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
          label="Salutation"
          name="salutation"
          fullWidth
          value={profileData.salutation}
          onChange={handleInputChange}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Full Name"
          name="full_name"
          fullWidth
          value={profileData.full_name}
          onChange={handleInputChange}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Billing Address"
          name="billing_address"
          fullWidth
          multiline
          rows={2}
          value={profileData.billing_address}
          onChange={handleInputChange}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Mobile Number"
          name="mobile_number"
          fullWidth
          value={profileData.mobile_number}
          onChange={handleInputChange}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Hospital/Clinic Name"
          name="hospital_clinic_name"
          fullWidth
          value={profileData.hospital_clinic_name}
          onChange={handleInputChange}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Designation"
          name="designation"
          fullWidth
          value={profileData.designation}
          onChange={handleInputChange}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Dietary Restrictions"
          name="dietary_restrictions"
          fullWidth
          multiline
          rows={2}
          value={profileData.dietary_restrictions}
          onChange={handleInputChange}
          sx={{ marginBottom: 2 }}
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSave}
          sx={{ marginBottom: 2 }}
        >
          Save Profile
        </Button>

        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Paper>
    </Box>
  );
};

export default ProfilePage;
