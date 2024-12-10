import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper/modules";
import axios from "axios";

// Define the type for highlight items
type HighlightItem = {
  id: number;
  type: "image" | "video"; // Either "image" or "video"
  src: string; // Media URL
  alt: string; // Alt text for images or description for videos
};

const HighlightSection = () => {
  const [highlights, setHighlights] = useState<HighlightItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHighlights = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/homepage/highlights/"
        );
        const data = response.data.map((item: any) => ({
          id: item.id,
          type: item.media.endsWith(".mp4") ? "video" : "image",
          src: item.media,
          alt: item.title || "Highlight", // Default alt text if not provided
        }));
        setHighlights(data);
      } catch (error) {
        console.error("Error fetching highlights:", error);
        setHighlights([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHighlights();
  }, []);

  if (loading) {
    return <div>Loading highlights...</div>;
  }

  if (highlights.length === 0) {
    return <div>No highlights available.</div>;
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
        Highlights
      </Typography>

      {/* Swiper Carousel */}
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination]}
        style={{ padding: "20px 0", maxWidth: "800px", margin: "auto" }}
      >
        {highlights.map((highlight) => (
          <SwiperSlide key={highlight.id}>
            {highlight.type === "image" ? (
              <img
                src={highlight.src}
                alt={highlight.alt}
                style={{ width: "100%", height: "auto", borderRadius: "8px" }}
              />
            ) : (
              <video
                src={highlight.src}
                controls
                style={{ width: "100%", height: "auto", borderRadius: "8px" }}
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default HighlightSection;
