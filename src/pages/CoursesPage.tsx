import React from "react";
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

const courseImage = "/src/assets/courses.webp";

type Course = {
  id: number;
  title: string;
  description: string;
  trainer: string;
  price: number;
  availableDates: string[];
};

const courses: Course[] = Array.from({ length: 8 }, (_, index) => ({
  id: index + 1,
  title: `Course ${index + 1}`,
  description: "This is a short description of the course.",
  trainer: `Trainer ${index + 1}`,
  price: 100 + index * 50,
  availableDates: ["12/10/2024", "14/10/2024", "16/10/2024", "20/10/2024"],
}));

const CoursesPage = () => {
  const { addCourse } = useCart();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedCourse, setSelectedCourse] = React.useState<Course | null>(
    null
  );
  const [selectedDate, setSelectedDate] = React.useState<string | null>(null);
  const [open, setOpen] = React.useState(false);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [visibleMessage, setVisibleMessage] = React.useState<string | null>(
    null
  );

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
    if (reason === "clickaway") {
      return;
    }
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
                disabled={!selectedDate}
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
          {visibleMessage || "Course added to cart!"}
        </Alert>
      </Snackbar>

      {/* Visible Pop-Up Notification */}
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
