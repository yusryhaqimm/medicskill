// src/pages/RegistrationPage.tsx
import { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Grid,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const RegistrationPage = () => {
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();

  const handleAgreementChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAgreed(event.target.checked);
  };

  const handleRegister = () => {
    if (agreed) {
      // Redirect to payment gateway
      navigate("/payment-gateway");
    }
  };

  return (
    <Box
      sx={{
        padding: "20px",
        maxWidth: "800px",
        margin: "0 auto",
        backgroundColor: "#f5f5f5",
        borderRadius: "8px",
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ textAlign: "center" }}>
        Registration Form
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Salutation (Mr, Ms, Dr)"
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Full Name (as per IC)"
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Billing Address"
            variant="outlined"
            multiline
            rows={4}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField fullWidth label="Mobile Number" variant="outlined" />
        </Grid>

        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Hospital / Clinic / Institution Name"
            variant="outlined"
          />
        </Grid>

        <Grid item xs={6}>
          <TextField fullWidth label="Designation" variant="outlined" />
        </Grid>

        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Dietary Restrictions"
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField fullWidth label="Email" variant="outlined" />
        </Grid>

        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={agreed}
                onChange={handleAgreementChange}
                color="primary"
              />
            }
            label="By submitting this, I hereby understand that my seat allocation and confirmation is ONLY secured once payment on the course fee(s) has been completed."
          />
        </Grid>

        <Grid item xs={12}>
          <Button
            fullWidth
            variant="contained"
            color="success"
            disabled={!agreed}
            onClick={handleRegister}
          >
            Register
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RegistrationPage;
