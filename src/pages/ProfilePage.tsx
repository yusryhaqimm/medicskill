import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  Paper,
  Alert,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://127.0.0.1:8000/api/accounts";

interface ProfileData {
  salutation: string;
  full_name: string;
  billing_address: string;
  mobile_number: string;
  hospital_clinic_name: string;
  designation: string;
  dietary_restrictions: string;
}

interface Purchase {
  courseName: string;
  datePurchased: string;
  price: number;
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
  const [purchases, setPurchases] = useState<Purchase[]>([
    { courseName: "Course A", datePurchased: "2025-01-01", price: 99.99 },
    { courseName: "Course B", datePurchased: "2025-01-05", price: 49.99 },
    { courseName: "Course C", datePurchased: "2025-01-10", price: 149.99 },
    { courseName: "Course D", datePurchased: "2025-01-15", price: 79.99 },
  ]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(2);
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
      [name]: value as string,
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

  const handlePageChange = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        padding: "20px",
        minHeight: "100vh",
      }}
    >
      {/* Profile Section */}
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          width: "80%",
          marginBottom: 4,
          borderRadius: "16px",
          backgroundColor: "white",
          boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            marginBottom: 4,
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

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Salutation"
              name="salutation"
              value={profileData.salutation}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Full Name"
              name="full_name"
              value={profileData.full_name}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Mobile Number"
              name="mobile_number"
              value={profileData.mobile_number}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Billing Address"
              name="billing_address"
              value={profileData.billing_address}
              onChange={handleInputChange}
              variant="outlined"
              multiline
              rows={2}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Hospital/Clinic Name"
              name="hospital_clinic_name"
              value={profileData.hospital_clinic_name}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Designation"
              name="designation"
              value={profileData.designation}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Dietary Restrictions"
              name="dietary_restrictions"
              value={profileData.dietary_restrictions}
              onChange={handleInputChange}
              variant="outlined"
              multiline
              rows={3}
            />
          </Grid>
        </Grid>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 4,
          }}
        >
          <Button
            variant="contained"
            onClick={handleSave}
            sx={{
              backgroundColor: "#3251A1",
              "&:hover": { backgroundColor: "#1d3a6e" },
            }}
          >
            Save Profile
          </Button>
          <Button
            variant="outlined"
            onClick={handleLogout}
            sx={{
              color: "#3251A1",
              borderColor: "#3251A1",
              "&:hover": {
                backgroundColor: "#f5f5f5",
                borderColor: "#1d3a6e",
                color: "#1d3a6e",
              },
            }}
          >
            Logout
          </Button>
        </Box>
      </Paper>

      {/* Purchase History Section */}
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          width: "80%",
          borderRadius: "16px",
          backgroundColor: "white",
          boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            marginBottom: 3,
            color: "#3251A1",
            fontWeight: "bold",
          }}
        >
          Purchase History
        </Typography>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Course Name</TableCell>
                <TableCell>Date Purchased</TableCell>
                <TableCell>Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {purchases
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((purchase, index) => (
                  <TableRow key={index}>
                    <TableCell>{purchase.courseName}</TableCell>
                    <TableCell>{purchase.datePurchased}</TableCell>
                    <TableCell>${purchase.price.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={purchases.length}
          page={page}
          onPageChange={handlePageChange}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </Paper>
    </Box>
  );
};

export default ProfilePage;
