// src/pages/PaymentGatewayPage.tsx
import { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

// Payment options data
const paymentOptions = [
  { id: "visa", title: "Visa", description: "Pay with Visa Credit/Debit card" },
  { id: "debit", title: "Debit", description: "Pay using Debit card" },
  {
    id: "onlineBanking",
    title: "Online Banking",
    description: "Use online banking",
  },
  { id: "hrdf", title: "HRDF", description: "HRDF Funded" },
];

const PaymentGatewayPage = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null); // Track selected payment
  const navigate = useNavigate();

  // Handle payment option selection
  const handleSelect = (id: string) => {
    setSelectedOption(id);
  };

  // Handle payment confirmation
  const handlePayment = () => {
    if (selectedOption) {
      alert(`Payment successful via ${selectedOption.toUpperCase()}`);
      navigate("/"); // Redirect to homepage or confirmation page
    }
  };

  return (
    <Box
      sx={{
        padding: "20px",
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ textAlign: "center" }}>
        Select Payment Method
      </Typography>

      <Grid container spacing={4} sx={{ marginTop: "20px" }}>
        {paymentOptions.map((option) => (
          <Grid item xs={12} sm={6} md={3} key={option.id}>
            <Card
              sx={{
                backgroundColor:
                  selectedOption === option.id ? "#4CAF50" : "#fff",
                color: selectedOption === option.id ? "white" : "black",
              }}
            >
              <CardActionArea onClick={() => handleSelect(option.id)}>
                <CardContent>
                  <Typography variant="h6">{option.title}</Typography>
                  <Typography variant="body2">{option.description}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ marginTop: "30px", textAlign: "center" }}>
        <Button
          variant="contained"
          color="success"
          disabled={!selectedOption} // Disable if no payment option selected
          onClick={handlePayment}
        >
          Confirm Payment
        </Button>
      </Box>
    </Box>
  );
};

export default PaymentGatewayPage;
