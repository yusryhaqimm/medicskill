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
import { Navigation, Pagination } from "swiper/modules"; // Import Swiper modules
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

// Define the type for a trainer
interface Trainer {
  id: string;
  name: string;
  short_description: string;
  description: string;
  image: string | null;
  bio: string;
}

// Placeholder image for trainers without an image
const placeholderImage = "/src/assets/trainer.webp";

const TrainersSection = () => {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await axios.get<Trainer[]>(
          "http://127.0.0.1:8000/api/trainers/"
        );
        setTrainers(response.data);
      } catch (error) {
        console.error("Error fetching trainers:", error);
        setTrainers([]); // Fallback to empty array
      } finally {
        setLoading(false);
      }
    };

    fetchTrainers();
  }, []);

  if (loading) {
    return (
      <Typography variant="h6" sx={{ textAlign: "center", marginTop: "20px" }}>
        Loading trainers...
      </Typography>
    );
  }

  if (trainers.length === 0) {
    return (
      <Typography variant="h6" sx={{ textAlign: "center", marginTop: "20px" }}>
        No trainers available.
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
        navigation // Enable navigation arrows
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination]}
        style={{ padding: "20px 0" }}
      >
        {trainers.map((trainer) => (
          <SwiperSlide key={trainer.id}>
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
                image={trainer.image || placeholderImage}
                alt={`Image of ${trainer.name}`}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {trainer.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {trainer.short_description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {trainer.bio}
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
