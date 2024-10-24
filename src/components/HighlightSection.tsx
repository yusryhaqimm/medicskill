// src/components/HighlightSection.tsx
import { Box, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper/modules";

// Placeholder content
const highlights = [
  { type: "image", src: "/src/assets/highlight1.png", alt: "Highlight 1" },
  { type: "image", src: "/src/assets/highlight2.png", alt: "Highlight 2" },
  {
    type: "video",
    src: "/src/assets/highlight-video.mp4",
    alt: "Highlight Video",
  },
];

const HighlightSection = () => {
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
        {highlights.map((highlight, index) => (
          <SwiperSlide key={index}>
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
