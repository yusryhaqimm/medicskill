import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
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
        padding: "50px 20px",
        backgroundColor: "#f5f5f5",
      }}
    >
      {/* Section Title */}
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: "bold",
          marginBottom: "40px",
          color: "#3251A1",
          textTransform: "uppercase",
        }}
      >
        Our Trainers
      </Typography>

      {/* Swiper Carousel */}
      <Swiper
        spaceBetween={30}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination]}
        style={{ padding: "20px 0" }}
        breakpoints={{
          320: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {trainers.map((trainer) => (
          <SwiperSlide key={trainer.id}>
            <Card
              sx={{
                maxWidth: 345,
                margin: "auto",
                borderRadius: "12px",
                border: "1px solid #ddd",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "200px",
                  overflow: "hidden",
                  borderTopLeftRadius: "12px",
                  borderTopRightRadius: "12px",
                }}
              >
                <CardMedia
                  component="img"
                  image={trainer.image || placeholderImage}
                  alt={`Image of ${trainer.name}`}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>
              <CardContent>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    fontWeight: "bold",
                    color: "#3251A1",
                    textAlign: "center",
                  }}
                >
                  {trainer.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="#555"
                  paragraph
                  sx={{ textAlign: "center", marginBottom: "10px" }}
                >
                  {trainer.short_description}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ textAlign: "center" }}
                >
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
        sx={{
          marginTop: "30px",
          backgroundColor: "#3251A1",
          color: "white",
          textTransform: "none",
          padding: "10px 20px",
          "&:hover": {
            backgroundColor: "#27408B",
          },
        }}
      >
        View More
      </Button>
    </Box>
  );
};

export default TrainersSection;
