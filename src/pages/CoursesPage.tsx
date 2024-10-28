// src/pages/CoursesPage.tsx
import { useState } from "react";
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
} from "@mui/material";
import { useCart } from "../context/CartContext"; // Import CartContext

// Placeholder course image path
const courseImage = "/src/assets/courses.webp";

// Define the Course type
type Course = {
  id: number;
  title: string;
  description: string;
  trainer: string;
  price: number;
  availableDates: string[];
};

// Sample course data
const courses: Course[] = Array.from({ length: 8 }, (_, index) => ({
  id: index + 1,
  title: `Course ${index + 1}`,
  description: "This is a short description of the course.",
  trainer: `Trainer ${index + 1}`,
  price: 100 + index * 50, // Price as a number
  availableDates: ["12/10/2024", "14/10/2024", "16/10/2024", "20/10/2024"],
}));

const CoursesPage = () => {
  const { addCourse } = useCart(); // Access the cart context
  const [searchTerm, setSearchTerm] = useState(""); // Track the search term
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null); // Track the selected course
  const [selectedDate, setSelectedDate] = useState<string | null>(null); // Track the selected date
  const [open, setOpen] = useState(false); // Control the dialog state
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Control the Snackbar

  // Handle opening the dialog with course details
  const handleOpen = (course: Course) => {
    setSelectedCourse(course);
    setOpen(true);
  };

  // Handle closing the dialog and reset state
  const handleClose = () => {
    setSelectedCourse(null);
    setSelectedDate(null);
    setOpen(false);
  };
  //samole test
  // Handle selecting a date
  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
  };

  // Handle Snackbar close
  const handleSnackbarClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  // Handle confirming the course selection and adding it to the cart
  const handleConfirm = () => {
    if (selectedCourse && selectedDate) {
      addCourse({
        ...selectedCourse,
        date: selectedDate,
      }); // Add course to the cart with the selected date
      setSnackbarOpen(true); // Show snackbar notification
      handleClose(); // Close the dialog
    }
  };

  return (
    <Box
      sx={{ padding: "20px", backgroundColor: "#f5f5f5", minHeight: "100vh" }}
    >
      {/* Title */}
      <Typography variant="h3" gutterBottom sx={{ textAlign: "center" }}>
        Our Courses
      </Typography>

      {/* Search Bar */}
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

      {/* Courses Grid */}
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
                  image={courseImage}
                  alt={course.title}
                />
                <CardContent>
                  <Typography variant="h6">{course.title}</Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {course.description}
                  </Typography>
                  <Typography variant="subtitle2">
                    Trainer: {course.trainer}
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

      {/* Course Details Dialog */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        {selectedCourse && (
          <>
            <DialogTitle sx={{ backgroundColor: "#4CAF50", color: "white" }}>
              {selectedCourse.title}
            </DialogTitle>
            <DialogContent>
              <Box
                component="img"
                src={courseImage}
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
                Trainer: {selectedCourse.trainer}
              </Typography>
              <Typography variant="body2" color="primary" gutterBottom>
                RM {selectedCourse.price}
              </Typography>

              {/* Available Dates */}
              <Box
                sx={{
                  display: "flex",
                  gap: "10px",
                  marginTop: "20px",
                  flexWrap: "wrap",
                }}
              >
                {selectedCourse.availableDates.map((date) => (
                  <Chip
                    key={date}
                    label={date}
                    color={selectedDate === date ? "primary" : "default"}
                    onClick={() => handleDateSelect(date)}
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
                disabled={!selectedDate} // Disable if no date is selected
              >
                Confirm
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Snackbar Notification */}
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
          Course successfully added to cart!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CoursesPage;
