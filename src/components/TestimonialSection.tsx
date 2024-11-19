// src/components/TestimonialSection.tsx
import { Box, Typography, Avatar, Card, CardContent } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

// Testimonial Data
const testimonials = [
  {
    quote:
      "This course changed my career! The trainers were exceptional and the content was easy to follow.",
    name: "John Doe",
    media: "/src/assets/testimonial1.png", // Replace with your image or video path
    type: "image", // Specify the media type: "image" or "video"
  },
  {
    quote:
      "Thanks to the hands-on training, I was able to immediately apply what I learned at work.",
    name: "Jane Smith",
    media: "/src/assets/testimonial2.mp4", // Replace with your image or video path
    type: "video", // Specify the media type
  },
  {
    quote:
      "The community and support I received from the trainers were invaluable!",
    name: "Robert Johnson",
    media: "/src/assets/testimonial3.png", // Replace with your image or video path
    type: "image", // Specify the media type
  },
];

const TestimonialSection = () => {
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
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <Card
              sx={{
                maxWidth: 600,
                margin: "auto",
                padding: "20px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                textAlign: "left",
                borderRadius: "8px",
              }}
            >
              <CardContent>
                <Typography variant="body1" paragraph>
                  "{testimonial.quote}"
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "20px 0",
                  }}
                >
                  {/* Conditionally Render Media */}
                  {testimonial.type === "image" ? (
                    <Avatar
                      src={testimonial.media}
                      alt={testimonial.name}
                      sx={{ width: 200, height: 200 }}
                      variant="rounded"
                    />
                  ) : (
                    <video
                      src={testimonial.media}
                      controls
                      style={{
                        width: "100%",
                        maxHeight: "200px",
                        borderRadius: "8px",
                      }}
                    />
                  )}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "20px",
                  }}
                >
                  <Avatar
                    src={testimonial.type === "image" ? testimonial.media : ""}
                    alt={testimonial.name}
                    sx={{ width: 50, height: 50, marginRight: "15px" }}
                  />
                  <Typography variant="subtitle1" fontWeight="bold">
                    {testimonial.name}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default TestimonialSection;
