// src/pages/ShoppingCartPage.tsx
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCart } from "../context/CartContext"; // Import CartContext
import { useNavigate } from "react-router-dom"; // Import useNavigate

const courseImage = "/src/assets/course.png"; // Placeholder course image

const ShoppingCartPage = () => {
  const { cart, removeCourse } = useCart(); // Get cart and removeCourse from context
  const navigate = useNavigate(); // Initialize useNavigate

  // Calculate the total price
  const totalPrice = cart.reduce((acc, course) => acc + course.price, 0);

  // Handle checkout and redirect to the registration page
  const handleCheckout = () => {
    if (cart.length > 0) {
      navigate("/registration"); // Redirect to RegistrationPage
    }
  };

  return (
    <Box
      sx={{ padding: "20px", minHeight: "100vh", backgroundColor: "#f5f5f5" }}
    >
      <Typography variant="h3" gutterBottom>
        Shopping Cart
      </Typography>

      <Grid container spacing={4}>
        {/* Courses List */}
        <Grid item xs={12} md={8}>
          {cart.length === 0 ? (
            <Typography variant="h5" sx={{ textAlign: "center" }}>
              Your cart is empty
            </Typography>
          ) : (
            cart.map((course) => (
              <Card
                key={course.id}
                sx={{
                  marginBottom: "10px",
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#4CAF50",
                }}
              >
                <CardMedia
                  component="img"
                  image={courseImage}
                  alt={course.title}
                  sx={{ width: "100px" }}
                />
                <CardContent sx={{ flex: 1, color: "white" }}>
                  <Typography variant="h6">{course.title}</Typography>
                  <Typography variant="body2">Date: {course.date}</Typography>
                  <Typography variant="body2">{course.description}</Typography>
                </CardContent>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    paddingRight: "10px",
                  }}
                >
                  <Typography variant="h6" sx={{ color: "white" }}>
                    RM{course.price}
                  </Typography>
                  <IconButton
                    onClick={() => removeCourse(course.id)}
                    color="inherit"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Card>
            ))
          )}
        </Grid>

        {/* Summary Section */}
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              padding: "20px",
              backgroundColor: "#e0e0e0",
              borderRadius: "8px",
            }}
          >
            <Typography variant="h5" gutterBottom>
              Total:
            </Typography>
            <Typography variant="h4" sx={{ marginBottom: "20px" }}>
              RM{totalPrice.toFixed(2)}
            </Typography>
            <Button
              variant="contained"
              color="success"
              fullWidth
              disabled={cart.length === 0} // Disable if no courses
              onClick={handleCheckout} // Call handleCheckout on click
            >
              Checkout
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ShoppingCartPage;
