// src/components/TrainersSection.tsx
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
import "swiper/css/pagination";
import { Link } from "react-router-dom";

// Placeholder image path
const trainerImage = "/src/assets/trainer.webp";

const trainers = [
  {
    name: "Trainer 1",
    bio: "Name and short bio snippet",
    specialization: "Specialization and courses they teach",
  },
  {
    name: "Trainer 2",
    bio: "Name and short bio snippet",
    specialization: "Specialization and courses they teach",
  },
  {
    name: "Trainer 3",
    bio: "Name and short bio snippet",
    specialization: "Specialization and courses they teach",
  },
  {
    name: "Trainer 4",
    bio: "Name and short bio snippet",
    specialization: "Specialization and courses they teach",
  },
];

const TrainersSection = () => {
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
        Our Trainers
      </Typography>

      {/* Swiper Carousel */}
      <Swiper
        spaceBetween={30}
        slidesPerView={3}
        pagination={{ clickable: true }}
        style={{ padding: "20px 0" }}
      >
        {trainers.map((trainer, index) => (
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
                image={trainerImage}
                alt={`Image of ${trainer.name}`}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {trainer.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {trainer.bio}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {trainer.specialization}
                </Typography>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* View More Button */}
      <Button
        component={Link}
        to="/trainers"
        variant="contained"
        color="success"
        sx={{ marginTop: "30px", textTransform: "none" }}
      >
        View More
      </Button>
    </Box>
  );
};

export default TrainersSection;
