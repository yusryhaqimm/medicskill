import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  IconButton,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const placeholderImage = "/src/assets/course.png"; // Placeholder image
const API_BASE_URL = "http://127.0.0.1:8000/api"; // Configurable API base URL
const API_MEDIA_URL = "http://127.0.0.1:8000/";

export type Course = {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  price: number;
  date: string;
  location: string;
  address: string;
  image?: string;
};

const ShoppingCartPage = () => {
  const { isLoggedIn } = useAuth();
  const [cart, setCart] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [profileComplete, setProfileComplete] = useState(false);
  const navigate = useNavigate();

  // Fetch cart and profile data
  useEffect(() => {
    const fetchCartAndProfile = async () => {
      setLoading(true);
      try {
        if (isLoggedIn) {
          const guestCart = JSON.parse(
            localStorage.getItem("guestCart") || "[]"
          );

          if (guestCart.length > 0) {
            const headers = {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            };

            await fetch(`${API_BASE_URL}/cart/merge/`, {
              method: "POST",
              headers,
              body: JSON.stringify({ cart: guestCart }),
            });

            localStorage.removeItem("guestCart");
          }

          const headers = {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          };

          const cartResponse = await fetch(`${API_BASE_URL}/cart/`, {
            headers,
          });

          if (!cartResponse.ok) {
            throw new Error("Failed to fetch user cart.");
          }

          const cartData = await cartResponse.json();
          const formattedCart = cartData.map((item: any) => ({
            id: `${item.course}-${item.session || "no-session"}`,
            title: item.course_details?.title || "Untitled Course",
            description:
              item.course_details?.description || "No description available.",
            shortDescription: item.course_details?.short_description || "N/A",
            price: item.session_details?.price || 0,
            date: item.session_details?.date || "N/A",
            location: item.location_details?.name || "Unknown location",
            address: item.location_details?.address || "No address provided",
            image: item.course_details?.image
              ? `${API_MEDIA_URL}${item.course_details.image}`
              : placeholderImage,
          }));
          setCart(formattedCart);

          const profileResponse = await fetch(
            `${API_BASE_URL}/accounts/profile/`,
            {
              headers,
            }
          );

          const profileData = await profileResponse.json();
          const isComplete =
            profileData?.full_name?.trim() &&
            profileData?.billing_address?.trim() &&
            profileData?.mobile_number?.trim();
          setProfileComplete(Boolean(isComplete));
        } else {
          const guestCart = JSON.parse(
            localStorage.getItem("guestCart") || "[]"
          );
          const enrichedCart: Course[] = [];
          for (const item of guestCart) {
            try {
              const response = await fetch(
                `${API_BASE_URL}/courses/${item.course_id}/`
              );
              const courseDetails = await response.json();
              const sessionDetails = courseDetails.sessions.find(
                (session: any) => session.id === item.session_id
              );
              if (sessionDetails) {
                enrichedCart.push({
                  id: `${item.course_id}-${item.session_id}`,
                  title: courseDetails.title,
                  description:
                    courseDetails.description || "No description available.",
                  shortDescription: courseDetails.short_description || "N/A",
                  price: parseFloat(sessionDetails.price) || 0,
                  date: sessionDetails.date || "N/A",
                  location: sessionDetails.location?.name || "Unknown location",
                  address:
                    sessionDetails.location?.address || "No address provided",
                  image: courseDetails.image
                    ? `${courseDetails.image}`
                    : placeholderImage,
                });
              }
            } catch (error) {
              console.error("Error fetching course info:", error);
            }
          }
          setCart(enrichedCart);
        }
      } catch (error) {
        console.error("Error fetching cart or profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartAndProfile();
  }, [isLoggedIn]);

  // Clear all items in the cart
  const clearCart = async () => {
    if (isLoggedIn) {
      try {
        const headers = {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        };
        await fetch(`${API_BASE_URL}/cart/`, {
          method: "DELETE",
          headers,
        });
        setCart([]);
      } catch (error) {
        console.error("Error clearing the cart:", error);
      }
    } else {
      localStorage.removeItem("guestCart");
      setCart([]);
    }
  };

  // Remove a specific course from the cart
  const removeCourse = async (id: string) => {
    if (isLoggedIn) {
      try {
        const [courseId, sessionId] = id.split("-");
        const headers = {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        };
        await fetch(`${API_BASE_URL}/cart/${courseId}/${sessionId || ""}`, {
          method: "DELETE",
          headers,
        });
        setCart((prevCart) => prevCart.filter((course) => course.id !== id));
      } catch (error) {
        console.error("Error removing course from cart:", error);
      }
    } else {
      const updatedCart = cart.filter((course) => course.id !== id);
      setCart(updatedCart);
      localStorage.setItem("guestCart", JSON.stringify(updatedCart));
    }
  };

  // Calculate total price
  const totalPrice = cart.reduce((acc, course) => acc + course.price, 0);

  // Handle checkout
  const handleCheckout = async () => {
    if (!isLoggedIn) {
      navigate("/checkout-options", {
        state: { redirectTo: "/shopping-cart" },
      });
      return;
    }

    if (!profileComplete) {
      alert(
        "Please complete your profile (name, billing address, mobile number) before proceeding."
      );
      navigate("/profile");
      return;
    }

    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      };

      const response = await fetch(`${API_BASE_URL}/orders/checkout/`, {
        method: "POST",
        headers,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to complete checkout.");
      }

      const result = await response.json();

      // Redirect to payment gateway with order details
      navigate("/payment-gateway", {
        state: {
          orderId: result.order_id,
          totalPrice: result.total_price,
        },
      });
    } catch (error: any) {
      console.error("Checkout failed:", error.message);
      alert("Checkout failed. Please try again.");
    }
  };

  return (
    <Box
      sx={{ padding: "20px", minHeight: "100vh", backgroundColor: "#f5f5f5" }}
    >
      <Typography variant="h3" gutterBottom>
        Shopping Cart
      </Typography>

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
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            {cart.length === 0 ? (
              <Typography variant="h5" sx={{ textAlign: "center" }}>
                Your cart is empty
              </Typography>
            ) : (
              <>
                {cart.map((course) => (
                  <Card
                    key={course.id}
                    sx={{
                      marginBottom: "10px",
                      display: "flex",
                      alignItems: "center",
                      backgroundColor: "#4CAF50",
                      color: "white",
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={course.image || placeholderImage}
                      alt={course.title || "Course Image"}
                      sx={{ width: "100px" }}
                    />
                    <CardContent sx={{ flex: 1 }}>
                      <Typography variant="h6">{course.title}</Typography>
                      <Typography variant="body2">
                        {course.shortDescription}
                      </Typography>
                      <Typography variant="body2">
                        Location: {course.location}
                      </Typography>
                      <Typography variant="body2">
                        Address: {course.address}
                      </Typography>
                      <Typography variant="body2">
                        Date: {course.date}
                      </Typography>
                    </CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        paddingRight: "10px",
                      }}
                    >
                      <Typography variant="h6">
                        RM{course.price.toFixed(2)}
                      </Typography>
                      <IconButton
                        onClick={() => removeCourse(course.id)}
                        color="inherit"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Card>
                ))}

                <Box sx={{ textAlign: "right", marginTop: "10px" }}>
                  <Button
                    variant="contained"
                    color="error"
                    startIcon={<ClearAllIcon />}
                    onClick={clearCart}
                  >
                    Clear All
                  </Button>
                </Box>
              </>
            )}
          </Grid>

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
                disabled={cart.length === 0}
                onClick={handleCheckout}
              >
                Checkout
              </Button>
            </Box>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default ShoppingCartPage;
