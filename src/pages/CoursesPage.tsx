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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useCart } from "../context/CartContext";
import axios from "axios";

type Course = {
  id: string;
  title: string;
  short_description: string;
  description: string;
  instructor: {
    id: string;
    name: string;
  };
  image: string | null;
  available_dates: {
    id: string;
    date: string;
    pricing: {
      id: string;
      location: {
        id: string;
        name: string;
        address: string;
      };
      price: number;
    }[];
  }[];
};

const CoursesPage = () => {
  const { addCourse } = useCart();
  const [searchTerm, setSearchTerm] = useState("");
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [pricingOptions, setPricingOptions] = useState<
    Course["available_dates"][number]["pricing"]
  >([]);
  const [price, setPrice] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [visibleMessage, setVisibleMessage] = useState<string | null>(null);

  // Fetch courses from the backend
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
    setSelectedLocation(null);
    setPricingOptions([]);
    setPrice(null);
    setOpen(false);
  };

  const handleDateSelect = (dateId: string) => {
    setSelectedDate(dateId);
    setSelectedLocation(null);
    setPrice(null);

    const selectedDate = selectedCourse?.available_dates.find(
      (date) => date.id === dateId
    );

    if (selectedDate) {
      setPricingOptions(selectedDate.pricing);
    } else {
      console.error("No pricing available for the selected date.");
    }
  };

  const handleLocationSelect = (locationId: string) => {
    setSelectedLocation(locationId);

    const selectedPricing = pricingOptions.find(
      (pricing) => pricing.location.id === locationId
    );

    if (selectedPricing) {
      setPrice(Number(selectedPricing.price)); // Ensure price is a number
    } else {
      console.error("Selected location does not have a pricing entry.");
      setPrice(null);
    }
  };

  const handleConfirm = () => {
    if (selectedCourse && selectedDate && selectedLocation && price !== null) {
      addCourse({
        ...selectedCourse,
        date: selectedDate,
        location: selectedLocation,
        price,
      });
      setVisibleMessage(
        `Course "${selectedCourse.title}" added to cart with date and location!`
      );
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
                  }
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
                }
                alt={selectedCourse.title}
                sx={{
                  width: "100%",
                  maxWidth: "300px",
                  margin: "20px auto",
                  display: "block",
                  borderRadius: "8px",
                }}
              />
              <Typography variant="body1" sx={{ marginTop: "20px" }}>
                {selectedCourse.description}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Trainer: {selectedCourse.instructor.name}
              </Typography>
              <Box sx={{ marginTop: "20px" }}>
                <Typography variant="subtitle1">Select a Session:</Typography>
                <Box sx={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  {selectedCourse.available_dates.map((date) => (
                    <Chip
                      key={date.id}
                      label={date.date}
                      color={selectedDate === date.id ? "primary" : "default"}
                      onClick={() => handleDateSelect(date.id)}
                      clickable
                      sx={{ cursor: "pointer" }}
                    />
                  ))}
                </Box>
              </Box>

              {pricingOptions.length > 0 && (
                <Box sx={{ marginTop: "20px" }}>
                  <Typography variant="subtitle1">
                    Select a Location:
                  </Typography>
                  <FormControl fullWidth>
                    <InputLabel id="location-label">Location</InputLabel>
                    <Select
                      labelId="location-label"
                      value={selectedLocation || ""}
                      onChange={(e) => handleLocationSelect(e.target.value)}
                    >
                      {pricingOptions.map((pricing) => (
                        <MenuItem key={pricing.id} value={pricing.location.id}>
                          {pricing.location.name} ({pricing.location.address})
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              )}

              {price !== null && typeof price === "number" ? (
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
                  Select a location to view the price.
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
                disabled={!selectedDate || !selectedLocation || price === null}
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
