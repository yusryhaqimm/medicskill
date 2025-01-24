import {
  Box,
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Button,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const API_BASE_URL = "http://127.0.0.1:8000/api";

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
  const { isLoggedIn } = useAuth();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );
  const [orderId, setOrderId] = useState<string | null>(null);
  const [totalPrice, setTotalPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  // Fetch order details from navigation state or redirect if missing
  useEffect(() => {
    const { orderId, totalPrice } = location.state || {};

    if (!isLoggedIn || !orderId || totalPrice === undefined) {
      setSnackbarMessage(
        "Invalid order. Please start the checkout process again."
      );
      setSnackbarSeverity("error");
      navigate("/shopping-cart");
      return;
    }

    setOrderId(orderId);
    setTotalPrice(totalPrice);
    setLoading(false);
  }, [isLoggedIn, location.state, navigate]);

  // Handle payment option selection
  const handleSelect = (id: string) => {
    setSelectedOption(id);
  };

  // Handle payment confirmation
  const handlePayment = async () => {
    if (!selectedOption || !orderId) {
      setSnackbarMessage("Please select a payment method before proceeding.");
      setSnackbarSeverity("error");
      return;
    }

    try {
      setIsProcessing(true);

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication token is missing. Please log in.");
      }

      // Simulate backend processing and payment confirmation
      const response = await fetch(`${API_BASE_URL}/payments/payment/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "initiate",
          order_id: orderId,
          payment_method: selectedOption,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to initiate payment.");
      }

      const result = await response.json();

      // Simulate successful payment and redirect to homepage
      setSnackbarMessage(result.message || "Payment successful!");
      setSnackbarSeverity("success");
      setTimeout(() => navigate("/"), 2000); // Redirect to homepage after showing success message
    } catch (error: any) {
      console.error("Payment failed:", error.message);
      setSnackbarMessage(error.message || "An unexpected error occurred.");
      setSnackbarSeverity("error");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Box
      sx={{ padding: "20px", backgroundColor: "#f5f5f5", minHeight: "100vh" }}
    >
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Typography variant="h4" gutterBottom sx={{ textAlign: "center" }}>
            Select Payment Method
          </Typography>

          <Box
            sx={{
              margin: "20px 0",
              padding: "20px",
              borderRadius: "8px",
              backgroundColor: "#3251A1",
              color: "white",
              textAlign: "center",
            }}
          >
            <Typography variant="h5" sx={{ marginBottom: "10px" }}>
              Order ID: {orderId}
            </Typography>
            <Typography variant="h5">
              Total Price: RM{totalPrice?.toFixed(2)}
            </Typography>
          </Box>

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
                      <Typography variant="body2">
                        {option.description}
                      </Typography>
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
              disabled={!selectedOption || isProcessing}
              onClick={handlePayment}
            >
              {isProcessing ? "Processing..." : "Confirm Payment"}
            </Button>
          </Box>
        </>
      )}

      <Snackbar
        open={!!snackbarMessage}
        autoHideDuration={6000}
        onClose={() => setSnackbarMessage(null)}
      >
        <Alert
          onClose={() => setSnackbarMessage(null)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PaymentGatewayPage;
