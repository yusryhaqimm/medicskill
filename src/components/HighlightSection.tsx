import { useEffect, useState } from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
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
  const theme = useTheme();

  // Responsive breakpoints
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between("sm", "md"));

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

  // Determine max height based on screen size
  const getMaxHeight = () => {
    if (isSmallScreen) return "300px";
    if (isMediumScreen) return "500px";
    return "600px";
  };

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
        sx={{
          fontWeight: "bold",
          marginBottom: "20px",
          color: "#3251A1",
        }}
      >
        Highlights
      </Typography>

      {/* Swiper Carousel */}
      <Box
        sx={{
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          px: { xs: 2, sm: 4, md: 6 },
        }}
      >
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          modules={[Navigation, Pagination]}
          style={{
            padding: "20px 0",
            width: "100%",
          }}
        >
          {highlights.map((highlight) => (
            <SwiperSlide
              key={highlight.id}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  maxWidth: "1000px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {highlight.type === "image" ? (
                  <img
                    src={highlight.src}
                    alt={highlight.alt}
                    style={{
                      width: "100%",
                      maxHeight: getMaxHeight(),
                      objectFit: "contain",
                      borderRadius: "8px",
                    }}
                  />
                ) : (
                  <video
                    src={highlight.src}
                    controls
                    style={{
                      width: "100%",
                      maxHeight: getMaxHeight(),
                      objectFit: "contain",
                      borderRadius: "8px",
                    }}
                  />
                )}
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
};

export default HighlightSection;
