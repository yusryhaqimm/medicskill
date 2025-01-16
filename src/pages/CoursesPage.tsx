import {
  Box,
  Grid,
  TextField,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Chip,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

type Course = {
  id: string;
  title: string;
  category: string;
  short_description: string;
  description: string;
  instructor: {
    id: string;
    name: string;
  };
  image: string | null;
  sessions: Session[];
};

type Session = {
  id: string;
  date: string;
  location: {
    id: string;
    name: string;
    address: string;
  };
  price: string;
};

const CoursesPage = () => {
  const { isLoggedIn } = useAuth();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [filteredSessions, setFilteredSessions] = useState<Session[]>([]);
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [price, setPrice] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [visibleMessage, setVisibleMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch all courses on component mount
  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const response = await axios.get<Course[]>(
          "http://127.0.0.1:8000/api/courses/"
        );
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
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
      setPrice(parseFloat(session.price));
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
        title: selectedCourse.title, // Add course title for guest display
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

  return (
    <Box
      sx={{ padding: "20px", backgroundColor: "#f5f5f5", minHeight: "100vh" }}
    >
      <Typography variant="h3" gutterBottom sx={{ textAlign: "center" }}>
        Our Courses
      </Typography>
      <Box
        sx={{ display: "flex", justifyContent: "center", marginBottom: "30px" }}
      >
        <TextField
          variant="outlined"
          placeholder="Search Courses"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: "50%" }}
        />
      </Box>
      {loading ? (
        <Box
          sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={4}>
          {courses.length === 0 ? (
            <Typography
              variant="body1"
              sx={{ textAlign: "center", width: "100%" }}
            >
              No courses available at the moment.
            </Typography>
          ) : (
            courses
              .filter((course) =>
                course.title.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((course) => (
                <Grid item xs={12} sm={6} md={3} key={course.id}>
                  <Card
                    sx={{ cursor: "pointer", height: "100%" }}
                    onClick={() => handleOpen(course)}
                  >
                    <CardMedia
                      component="img"
                      height="140"
                      image={
                        course.image ||
                        "http://127.0.0.1:8000/media/default-course.jpg"
                      }
                      alt={course.title}
                    />
                    <CardContent>
                      <Typography variant="h6">{course.title}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {course.short_description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))
          )}
        </Grid>
      )}

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        {selectedCourse && (
          <>
            <DialogTitle sx={{ backgroundColor: "#3251A1", color: "white" }}>
              {selectedCourse.title}
            </DialogTitle>
            <DialogContent>
              <Box
                component="img"
                src={
                  selectedCourse.image ||
                  "http://127.0.0.1:8000/media/default-course.jpg"
                }
                alt={selectedCourse.title}
                sx={{
                  width: "100%",
                  maxWidth: "300px",
                  margin: "0 auto",
                  display: "block",
                  borderRadius: "8px",
                }}
              />
              <Typography variant="body1" sx={{ marginTop: "20px" }}>
                {selectedCourse.description}
              </Typography>
              <Typography variant="subtitle1" sx={{ marginTop: "20px" }}>
                Select a Location:
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: "10px",
                  flexWrap: "wrap",
                  marginTop: "10px",
                }}
              >
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
                        selectedLocation === locationId ? "primary" : "default"
                      }
                      onClick={() => handleLocationSelect(locationId)}
                      clickable
                    />
                  );
                })}
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

              {price !== null && (
                <Typography
                  variant="h6"
                  color="primary"
                  sx={{ marginTop: "20px" }}
                >
                  Price: RM {price.toFixed(2)}
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
                disabled={!selectedLocation || !selectedSession}
              >
                Confirm
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

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

export default CoursesPage;
