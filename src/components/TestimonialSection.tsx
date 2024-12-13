// src/components/TestimonialSection.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

// Define TypeScript interface for Testimonial
interface Testimonial {
  id: number;
  media: string;
}

const TestimonialSection: React.FC = () => {
  // State to store testimonials
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  // State for loading and error handling
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch testimonials on component mount
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        // Adjust the URL to match your Django backend endpoint
        const response = await axios.get(
          "http://127.0.0.1:8000/api/homepage/testimonials/"
        );

        // Log the response to understand its structure
        console.log("API Response:", response.data);

        // Extract testimonials, handling different possible response structures
        const testimonialsData = response.data.results || response.data || [];

        setTestimonials(testimonialsData);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to fetch testimonials");
        setIsLoading(false);
        console.error("Error fetching testimonials:", err);
      }
    };

    fetchTestimonials();
  }, []);

  // Loading and error states
  if (isLoading) {
    return (
      <Box sx={{ textAlign: "center", padding: "50px 0" }}>
        <Typography variant="h6">Loading testimonials...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: "center", padding: "50px 0", color: "error.main" }}>
        <Typography variant="h6">{error}</Typography>
      </Box>
    );
  }

  // Check if testimonials is empty
  if (testimonials.length === 0) {
    return (
      <Box sx={{ textAlign: "center", padding: "50px 0" }}>
        <Typography variant="h6">No testimonials available</Typography>
      </Box>
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
        Testimonials
      </Typography>

      {/* Swiper Carousel */}
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        navigation
        modules={[Pagination, Navigation]}
        style={{ padding: "20px 0", maxWidth: "800px", margin: "auto" }}
      >
        {testimonials.map((testimonial) => (
          <SwiperSlide key={testimonial.id}>
            {/* Determine media type and render accordingly */}
            {testimonial.media.toLowerCase().match(/\.(mp4|webm|ogg)$/) ? (
              <video
                src={testimonial.media}
                controls
                style={{
                  width: "100%",
                  maxHeight: "500px",
                  objectFit: "contain",
                }}
              />
            ) : (
              <img
                src={testimonial.media}
                alt="Testimonial"
                style={{
                  width: "100%",
                  maxHeight: "500px",
                  objectFit: "contain",
                }}
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default TestimonialSection;
