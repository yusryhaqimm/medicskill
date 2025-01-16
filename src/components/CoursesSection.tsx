import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Snackbar,
  Alert,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

// Define the type for a course
interface Course {
  id: string;
  title: string;
  category: string;
  short_description: string;
  description: string;
  meta_description: string;
  image: string;
  instructor: {
    id: string;
    name: string;
  };
  sessions: {
    id: string;
    date: string;
    location: {
      id: string;
      name: string;
      address: string;
    };
    price: string;
    expired: boolean;
  }[];
  upcoming: boolean;
}

const placeholderImage = "/src/assets/courses.webp";

const CoursesSection = () => {
  const { isLoggedIn } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [filteredSessions, setFilteredSessions] = useState<Course["sessions"]>(
    []
  );
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [price, setPrice] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [visibleMessage, setVisibleMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchUpcomingCourses = async () => {
      try {
        const response = await axios.get<Course[]>(
          "http://127.0.0.1:8000/api/upcoming_courses/"
        );
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching upcoming courses:", error);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingCourses();
  }, []);

  const handleOpen = (course: Course) => {
    setSelectedCourse(course);

    if (course.sessions.length > 0) {
      const firstSession = course.sessions[0];
      const firstLocationId = firstSession.location.id;

      setSelectedLocation(firstLocationId);

      const filtered = course.sessions.filter(
        (session) => session.location.id === firstLocationId
      );
      setFilteredSessions(filtered);

      setSelectedSession(filtered[0]?.id || null);
      setPrice(filtered[0] ? parseFloat(filtered[0].price) : null);
    } else {
      setSelectedLocation(null);
      setFilteredSessions([]);
      setSelectedSession(null);
      setPrice(null);
    }

    setOpen(true);
  };

  const handleClose = () => {
    setSelectedCourse(null);
    setSelectedLocation(null);
    setFilteredSessions([]);
    setSelectedSession(null);
    setPrice(null);
    setOpen(false);
  };

  const handleLocationSelect = (locationId: string) => {
    setSelectedLocation(locationId);
    const filtered =
      selectedCourse?.sessions.filter(
        (session) => session.location.id === locationId
      ) || [];
    setFilteredSessions(filtered);
    setSelectedSession(null);
    setPrice(null);
  };

  const handleSessionSelect = (sessionId: string) => {
    const session = filteredSessions.find((s) => s.id === sessionId);
    if (session) {
      setSelectedSession(sessionId);
      setPrice(parseFloat(session.price)); // Convert price to number
    } else {
      setSelectedSession(null);
      setPrice(null);
    }
  };

  const handleConfirm = async () => {
    if (
      selectedCourse &&
      selectedLocation &&
      selectedSession &&
      price !== null
    ) {
      const cartItem = {
        course_id: selectedCourse.id,
        session_id: selectedSession,
        location_id: selectedLocation,
        quantity: 1,
        title: selectedCourse.title,
        location_name: selectedCourse.sessions.find(
          (s) => s.location.id === selectedLocation
        )?.location.name,
        date: selectedCourse.sessions.find((s) => s.id === selectedSession)
          ?.date,
        price,
      };

      if (isLoggedIn) {
        // Handle adding to backend cart for logged-in users
        try {
          const apiUrl = "http://127.0.0.1:8000/api/cart/";
          const headers = {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          };

          const response = await axios.post(apiUrl, cartItem, {
            headers,
            withCredentials: true,
          });

          console.log("Cart updated successfully:", response.data);
          setVisibleMessage(`Course "${selectedCourse.title}" added to cart!`);
        } catch (error: any) {
          const errorMessage =
            error.response?.data?.error || "Failed to add course to cart.";
          setVisibleMessage(errorMessage);
        }
      } else {
        // Handle adding to localStorage cart for guest users
        const guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]");
        guestCart.push(cartItem);
        localStorage.setItem("guestCart", JSON.stringify(guestCart));

        console.log("Guest cart updated:", guestCart);
        setVisibleMessage(
          `Course "${selectedCourse.title}" added to guest cart!`
        );
      }

      setSnackbarOpen(true);
      setTimeout(() => setVisibleMessage(null), 3000);

      handleClose();
    }
  };

  const handleSnackbarClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    setSnackbarOpen(false);
  };

  if (loading) {
    return (
      <Typography variant="h6" sx={{ textAlign: "center", marginTop: "20px" }}>
        Loading upcoming courses...
      </Typography>
    );
  }

  if (courses.length === 0) {
    return (
      <Typography variant="h6" sx={{ textAlign: "center", marginTop: "20px" }}>
        No upcoming courses available.
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        textAlign: "center",
        padding: "50px 0",
        backgroundColor: "#f9f9f9",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: "bold", marginBottom: "20px" }}
      >
        Upcoming Courses
      </Typography>

      <Swiper
        spaceBetween={30}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination]}
        style={{ padding: "20px 0" }}
      >
        {courses.map((course) => (
          <SwiperSlide key={course.id}>
            <Card
              sx={{
                maxWidth: 345,
                height: "400px", // Fixed card height
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between", // Ensures equal spacing between elements
                margin: "auto",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                transition: "0.3s",
                "&:hover": {
                  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                },
              }}
              onClick={() => handleOpen(course)}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "180px", // Fixed image height
                  overflow: "hidden",
                }}
              >
                <CardMedia
                  component="img"
                  image={course.image || placeholderImage}
                  alt={`Image for ${course.title}`}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>
              <CardContent
                sx={{
                  minHeight: "120px", // Ensures uniform card content height
                  maxHeight: "120px",
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitLineClamp: 3, // Limits to 3 lines
                  WebkitBoxOrient: "vertical",
                  textOverflow: "ellipsis",
                }}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                  }}
                >
                  {course.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 2, // Limits to 2 lines
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {course.short_description}
                </Typography>
              </CardContent>
              <Box sx={{ padding: "10px" }}>
                {course.sessions.length > 0 && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    }}
                  >
                    Next Session: {course.sessions[0].date} at{" "}
                    {course.sessions[0].location.name}
                  </Typography>
                )}
              </Box>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>

      <Button
        component={Link}
        to="/courses"
        variant="contained"
        color="success"
        sx={{ marginTop: "30px", textTransform: "none" }}
      >
        More Courses
      </Button>

      {/* Dialog for Course Details */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        {selectedCourse && (
          <>
            <DialogTitle>{selectedCourse.title}</DialogTitle>
            <DialogContent>
              <Box
                component="img"
                src={selectedCourse.image || placeholderImage}
                alt={selectedCourse.title}
                sx={{ width: "100%", maxWidth: "300px", margin: "0 auto" }}
              />
              <Typography variant="body1" sx={{ marginTop: "20px" }}>
                {selectedCourse.description}
              </Typography>

              <Box sx={{ marginTop: "20px" }}>
                <Typography variant="subtitle1">Select a Location:</Typography>
                <Box sx={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  {Array.from(
                    new Set(
                      selectedCourse.sessions.map(
                        (session) => session.location.id
                      )
                    )
                  ).map((locationId) => {
                    const location = selectedCourse.sessions.find(
                      (session) => session.location.id === locationId
                    )?.location;
                    return (
                      <Chip
                        key={locationId}
                        label={`${location?.name} (${location?.address})`}
                        color={
                          selectedLocation === locationId
                            ? "primary"
                            : "default"
                        }
                        onClick={() => handleLocationSelect(locationId)}
                        clickable
                      />
                    );
                  })}
                </Box>
              </Box>

              {selectedLocation && (
                <Box sx={{ marginTop: "20px" }}>
                  <Typography variant="subtitle1">Select a Session:</Typography>
                  <Box sx={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                    {filteredSessions.map((session) => (
                      <Chip
                        key={session.id}
                        label={session.date}
                        color={
                          selectedSession === session.id ? "primary" : "default"
                        }
                        onClick={() => handleSessionSelect(session.id)}
                        clickable
                      />
                    ))}
                  </Box>
                </Box>
              )}

              {price !== null ? (
                <Typography
                  variant="h6"
                  color="primary"
                  sx={{ marginTop: "20px" }}
                >
                  Price: RM {price.toFixed(2)}
                </Typography>
              ) : (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ marginTop: "20px" }}
                >
                  Select a location and session to view the price.
                </Typography>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="secondary">
                Cancel
              </Button>
              <Button
                onClick={handleConfirm}
                variant="contained"
                color="success"
                disabled={
                  !selectedLocation || !selectedSession || price === null
                }
              >
                Confirm
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Snackbar for Success Message */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          {visibleMessage || "Course added to cart!"}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CoursesSection;
