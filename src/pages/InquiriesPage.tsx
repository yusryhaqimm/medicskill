// src/pages/InquiriesPage.tsx
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import { SetStateAction, useState } from "react";

const InquiriesPage = () => {
  // State for dropdown selection
  const [inquiryType, setInquiryType] = useState("");

  const handleInquiryChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setInquiryType(event.target.value);
  };

  return (
    <Box
      sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh", padding: "50px 0" }}
    >
      <Grid container spacing={4} justifyContent="center">
        {/* Left Section: Contact Information */}
        <Grid item xs={12} md={5}>
          <Typography variant="h3" gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="body1" gutterBottom>
            We are committed to processing the information in order to contact
            you and talk about your project.
          </Typography>

          <Box sx={{ marginTop: "20px" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <EmailIcon sx={{ marginRight: "10px" }} />
              <Typography variant="body1">medicskill@synagene.com</Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <LocationOnIcon sx={{ marginRight: "10px" }} />
              <Typography variant="body1">
                Kelana Square, 403030 Petaling Jaya
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <PhoneIcon sx={{ marginRight: "10px" }} />
              <Typography variant="body1">+009920929929</Typography>
            </Box>
          </Box>
        </Grid>

        {/* Right Section: Contact Form */}
        <Grid item xs={12} md={5}>
          <form noValidate autoComplete="off">
            {/* Dropdown for Inquiry Type */}
            <FormControl fullWidth sx={{ marginBottom: "20px" }} required>
              <InputLabel>Type of Inquiry</InputLabel>
              <Select
                value={inquiryType}
                onChange={handleInquiryChange}
                label="Type of Inquiry"
              >
                <MenuItem value="general">General Inquiry</MenuItem>
                <MenuItem value="onsite">Onsite Training</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              required
              type="email"
            />
            <TextField
              label="Company"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Message"
              variant="outlined"
              fullWidth
              margin="normal"
              multiline
              rows={4}
            />
            <Button
              type="submit"
              variant="contained"
              color="success"
              fullWidth
              sx={{ marginTop: "20px", padding: "10px 0" }}
            >
              Submit
            </Button>
          </form>
        </Grid>
      </Grid>
    </Box>
  );
};

export default InquiriesPage;
