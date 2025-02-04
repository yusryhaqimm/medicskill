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
import DeleteIcon from "@mui/icons-material/close";
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
      alert(
        "You need to log in to proceed with checkout. Redirecting to login..."
      );
      navigate("/login", { state: { redirectTo: "/shopping-cart" } });
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
      <Typography
        variant="h3"
        gutterBottom
        sx={{
          color: "#3251A1",
          fontWeight: "bold", // Optional: Makes the text bold for better emphasis
        }}
      >
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
              <Typography
                variant="h5"
                sx={{
                  textAlign: "center",
                  color: "#3251A1",
                  fontWeight: "bold",
                }}
              >
                Your cart is empty
              </Typography>
            ) : (
              <>
                {cart.map((course) => (
                  <Card
                    key={course.id}
                    sx={{
                      marginBottom: "20px",
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      borderRadius: "8px",
                      backgroundColor: "#f5f5f5",
                      border: "1px solid #ddd",
                      overflow: "hidden",
                    }}
                  >
                    {/* Delete Icon in Top-Right */}
                    <IconButton
                      onClick={() => removeCourse(course.id)}
                      sx={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        color: "#FF7043",
                        "&:hover": { backgroundColor: "#FFEDE7" },
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>

                    <CardMedia
                      component="img"
                      image={course.image || placeholderImage}
                      alt={course.title || "Course Image"}
                      sx={{
                        width: "150px",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                    <CardContent sx={{ flex: 1 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "bold",
                          color: "#3251A1",
                          marginBottom: "10px",
                        }}
                      >
                        {course.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#555",
                          marginBottom: "8px",
                        }}
                      >
                        {course.shortDescription}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#555",
                          marginBottom: "8px",
                        }}
                      >
                        Location: {course.location}
                      </Typography>
                      {/* Date and Price on the Same Row */}
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginTop: "8px",
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#555",
                          }}
                        >
                          Date: {course.date}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#3251A1",
                            fontWeight: "bold",
                            fontSize: 18,
                          }}
                        >
                          RM{course.price.toFixed(2)}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                ))}

                <Box sx={{ textAlign: "right", marginTop: "10px" }}>
                  <Button
                    variant="outlined"
                    startIcon={<ClearAllIcon />}
                    onClick={clearCart}
                    sx={{
                      borderColor: "#FF7043",
                      color: "#FF7043",
                      "&:hover": {
                        backgroundColor: "#FFEDE7",
                        borderColor: "#FF7043",
                      },
                    }}
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
                borderRadius: "8px",
                backgroundColor: "#3251A1",
                color: "white",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  marginBottom: "20px",
                }}
              >
                Order Summary
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  marginBottom: "10px",
                  fontWeight: "bold",
                }}
              >
                Total Items: {cart.length}
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  marginBottom: "20px",
                  fontWeight: "bold",
                }}
              >
                Total: RM{totalPrice.toFixed(2)}
              </Typography>
              <Button
                variant="contained"
                fullWidth
                disabled={cart.length === 0}
                onClick={handleCheckout}
                sx={{
                  backgroundColor: "#43A047",
                  color: "white",
                  padding: "10px 0",
                  "&:hover": { backgroundColor: "#3A943D" },
                }}
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
