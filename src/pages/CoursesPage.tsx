import React, { useEffect, useState } from "react";
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
  Grow,
} from "@mui/material";
import { useCart } from "../context/CartContext"; // Import CartContext
import axios from "axios"; // Import Axios for API calls

type Course = {
  id: string;
  title: string;
  short_description: string;
  description: string;
  instructor: {
    id: string;
    name: string;
  };
  price: number;
  image: string | null;
  available_dates: { id: string; date: string }[];
};

const CoursesPage = () => {
  const { addCourse } = useCart();
  const [searchTerm, setSearchTerm] = useState("");
  const [courses, setCourses] = useState<Course[]>([]); // Dynamic courses
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [visibleMessage, setVisibleMessage] = useState<string | null>(null);

  // Fetch courses from backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/courses/");
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const handleOpen = (course: Course) => {
    setSelectedCourse(course);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedCourse(null);
    setSelectedDate(null);
    setOpen(false);
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
  };

  const handleSnackbarClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    setSnackbarOpen(false);
  };

  const handleConfirm = () => {
    if (selectedCourse && selectedDate) {
      addCourse({
        ...selectedCourse,
        date: selectedDate,
      });
      setVisibleMessage(
        `Course "${selectedCourse.title}" on ${selectedDate} added to cart!`
      );
      setSnackbarOpen(true);
      setTimeout(() => setVisibleMessage(null), 3000);
      handleClose();
    }
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
      <Grid container spacing={4}>
        {courses
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
                  } // Use backend image or fallback
                  alt={course.title}
                />
                <CardContent>
                  <Typography variant="h6">{course.title}</Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {course.short_description}
                  </Typography>
                  <Typography variant="subtitle2">
                    Trainer: {course.instructor.name}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="primary"
                    sx={{ marginTop: "8px" }}
                  >
                    RM {course.price}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        {selectedCourse && (
          <>
            <DialogTitle sx={{ backgroundColor: "#4CAF50", color: "white" }}>
              {selectedCourse.title}
            </DialogTitle>
            <DialogContent>
              <Box
                component="img"
                src={
                  selectedCourse.image ||
                  "http://127.0.0.1:8000/media/default-course.jpg"
                } // Use backend image or fallback
                alt={selectedCourse.title}
                sx={{
                  width: "100%",
                  maxWidth: "300px",
                  margin: "0 auto",
                  display: "block",
                }}
              />
              <Typography variant="body1" sx={{ marginTop: "20px" }}>
                {selectedCourse.description}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Trainer: {selectedCourse.instructor.name}
              </Typography>
              <Typography variant="body2" color="primary" gutterBottom>
                RM {selectedCourse.price}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: "10px",
                  marginTop: "20px",
                  flexWrap: "wrap",
                }}
              >
                {selectedCourse.available_dates.map((date) => (
                  <Chip
                    key={date.id}
                    label={date.date}
                    color={selectedDate === date.date ? "primary" : "default"}
                    onClick={() => handleDateSelect(date.date)}
                    clickable
                    sx={{ cursor: "pointer" }}
                  />
                ))}
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="secondary">
                Cancel
              </Button>
              <Button
                onClick={handleConfirm}
                variant="contained"
                color="success"
                disabled={!selectedDate}
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

      {visibleMessage && (
        <Grow in={true} timeout={500}>
          <Box
            sx={{
              position: "fixed",
              top: "30%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              padding: "20px",
              backgroundColor: "#4CAF50",
              color: "white",
              borderRadius: "8px",
              textAlign: "center",
              boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
            }}
          >
            <Typography variant="h6">{visibleMessage}</Typography>
          </Box>
        </Grow>
      )}
    </Box>
  );
};

export default CoursesPage;
