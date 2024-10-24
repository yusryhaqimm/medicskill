// src/components/CoursesSection.tsx
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link } from "react-router-dom";

// Placeholder image path
const courseImage = "/src/assets/courses.webp";

const courses = [
  {
    title: "Course 1",
    description: "Short description",
    price: "Price (if applicable)",
    reviews: "Ratings/Reviews",
  },
  {
    title: "Course 2",
    description: "Short description",
    price: "Price (if applicable)",
    reviews: "Ratings/Reviews",
  },
  {
    title: "Course 3",
    description: "Short description",
    price: "Price (if applicable)",
    reviews: "Ratings/Reviews",
  },
  {
    title: "Course 4",
    description: "Short description",
    price: "Price (if applicable)",
    reviews: "Ratings/Reviews",
  },
];

const CoursesSection = () => {
  return (
    <Box
      sx={{
        textAlign: "center",
        padding: "50px 0",
        backgroundColor: "#f9f9f9",
      }}
    >
      {/* Section Title */}
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: "bold", marginBottom: "20px" }}
      >
        Upcoming In October...
      </Typography>

      {/* Swiper Carousel */}
      <Swiper
        spaceBetween={30}
        slidesPerView={3}
        pagination={{ clickable: true }}
        style={{ padding: "20px 0" }}
      >
        {courses.map((course, index) => (
          <SwiperSlide key={index}>
            <Card
              sx={{
                maxWidth: 345,
                margin: "auto",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                transition: "0.3s",
                "&:hover": {
                  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              <CardMedia
                component="img"
                height="180"
                image={courseImage}
                alt={`Image for ${course.title}`}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {course.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {course.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {course.price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {course.reviews}
                </Typography>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* More Courses Button */}
      <Button
        component={Link}
        to="/courses"
        variant="contained"
        color="success"
        sx={{ marginTop: "30px", textTransform: "none" }}
      >
        More Courses
      </Button>
    </Box>
  );
};

export default CoursesSection;
