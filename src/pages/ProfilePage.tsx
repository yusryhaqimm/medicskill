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

// Define the type for profileData
interface ProfileData {
  salutation: string;
  full_name: string;
  billing_address: string;
  mobile_number: string;
  hospital_clinic_name: string;
  designation: string;
  dietary_restrictions: string;
}

const ProfilePage = () => {
  const [profileData, setProfileData] = useState<ProfileData>({
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;

    setProfileData((prevData) => ({
      ...prevData,
      [name]: value as string, // Ensure TypeScript understands the dynamic key
    }));
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
        padding: "20px",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          padding: 4,
          maxWidth: 600,
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
          My Profile
        </Typography>

        {errorMessage && (
          <Alert severity="error" sx={{ marginBottom: 3 }}>
            {errorMessage}
          </Alert>
        )}
        {successMessage && (
          <Alert severity="success" sx={{ marginBottom: 3 }}>
            {successMessage}
          </Alert>
        )}

        {[
          { label: "Salutation", name: "salutation" },
          { label: "Full Name", name: "full_name" },
          {
            label: "Billing Address",
            name: "billing_address",
            multiline: true,
            rows: 2,
          },
          { label: "Mobile Number", name: "mobile_number" },
          { label: "Hospital/Clinic Name", name: "hospital_clinic_name" },
          { label: "Designation", name: "designation" },
          {
            label: "Dietary Restrictions",
            name: "dietary_restrictions",
            multiline: true,
            rows: 2,
          },
        ].map((field) => (
          <TextField
            key={field.name}
            label={field.label}
            name={field.name}
            fullWidth
            value={profileData[field.name as keyof ProfileData]} // Use keyof to ensure type safety
            onChange={handleInputChange}
            multiline={field.multiline || false}
            rows={field.rows || 1}
            sx={{
              marginBottom: 3,
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#3251A1" },
                "&:hover fieldset": { borderColor: "red" },
                "&.Mui-focused fieldset": { borderColor: "#3251A1" },
              },
            }}
          />
        ))}

        <Button
          variant="contained"
          fullWidth
          onClick={handleSave}
          sx={{
            marginBottom: 2,
            backgroundColor: "#3251A1",
            color: "white",
            padding: "10px 0",
            "&:hover": { backgroundColor: "red" },
          }}
        >
          Save Profile
        </Button>

        <Button
          variant="outlined"
          fullWidth
          onClick={handleLogout}
          sx={{
            color: "#3251A1",
            borderColor: "#3251A1",
            padding: "10px 0",
            "&:hover": {
              backgroundColor: "#f5f5f5",
              borderColor: "red",
              color: "red",
            },
          }}
        >
          Logout
        </Button>
      </Paper>
    </Box>
  );
};

export default ProfilePage;
