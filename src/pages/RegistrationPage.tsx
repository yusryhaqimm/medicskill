import { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Grid,
  FormControlLabel,
  Checkbox,
  Button,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegistrationPage = () => {
  const [formData, setFormData] = useState<{ [key: string]: string }>({
    salutation: "",
    full_name: "",
    billing_address: "",
    mobile_number: "",
    hospital_clinic_name: "",
    designation: "",
    dietary_restrictions: "",
    email: "",
  });

  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAgreementChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAgreed(event.target.checked);
  };

  const validateForm = () => {
    const requiredFields = [
      "salutation",
      "full_name",
      "billing_address",
      "mobile_number",
      "email",
    ];

    const missingFields = requiredFields.filter(
      (field) => !formData[field].trim()
    );

    if (missingFields.length > 0) {
      setError(
        `Please complete the following fields: ${missingFields.join(", ")}.`
      );
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    if (!agreed) {
      setError(
        "You must agree to the terms before proceeding with registration."
      );
      return;
    }

    if (!validateForm()) {
      return;
    }

    try {
      // Step 1: Submit guest info
      console.log("Submitting guest info:", formData);
      const guestInfoResponse = await axios.post(
        "http://127.0.0.1:8000/api/orders/guest-info/",
        formData
      );

      if (
        guestInfoResponse.status === 200 ||
        guestInfoResponse.status === 201
      ) {
        const { id: guest_info_id } = guestInfoResponse.data; // Extract guest info ID
        console.log("guest info:", guestInfoResponse);

        // Step 2: Create the order with the guest_info_id
        console.log("Creating order with guest_info_id:", guest_info_id);
        const orderResponse = await axios.post(
          "http://127.0.0.1:8000/api/orders/checkout/",
          { guest_info_id } // Pass required ID
        );

        if (orderResponse.status === 201) {
          const { order_id, total_price } = orderResponse.data;

          setSuccess(true);
          setError("");

          // Step 3: Redirect to payment gateway with order details
          navigate(`/payment-gateway`, {
            state: { order_id, total_price },
          });
        } else {
          throw new Error("Failed to create order. Please try again.");
        }
      } else {
        throw new Error("Failed to save guest information. Please try again.");
      }
    } catch (err: any) {
      console.error("Error:", err.response?.data || err.message);
      setError(
        err.response?.data?.message ||
          "Failed to complete the registration process. Please try again."
      );
      setSuccess(false);
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

      {error && <Alert severity="error">{error}</Alert>}
      {success && (
        <Alert severity="success">
          Registration successful! Proceeding to payment...
        </Alert>
      )}

      <Grid container spacing={3}>
        {[
          { label: "Salutation (Mr, Ms, Dr)", name: "salutation" },
          { label: "Full Name (as per IC)", name: "full_name" },
          {
            label: "Billing Address",
            name: "billing_address",
            multiline: true,
            rows: 4,
          },
          { label: "Mobile Number", name: "mobile_number" },
          {
            label: "Hospital / Clinic / Institution Name",
            name: "hospital_clinic_name",
          },
          { label: "Designation", name: "designation" },
          { label: "Dietary Restrictions", name: "dietary_restrictions" },
          { label: "Email", name: "email" },
        ].map((field, index) => (
          <Grid item xs={field.rows ? 12 : 6} key={index}>
            <TextField
              fullWidth
              label={field.label}
              name={field.name}
              variant="outlined"
              multiline={field.multiline}
              rows={field.rows}
              value={formData[field.name]}
              onChange={handleInputChange}
            />
          </Grid>
        ))}

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
