// src/pages/HomePage.tsx
import { Container, Box } from "@mui/material";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import HowItWork from "../components/HowItWork";
import CoursesSection from "../components/CoursesSection";
import TrainersSection from "../components/TrainersSection";
import HighlightSection from "../components/HighlightSection";
import TestimonialSection from "../components/TestimonialSection";
import ClientSection from "../components/ClientSection";

const HomePage = () => {
  return (
    <Box sx={{ width: "100%", padding: "0", margin: "0" }}>
      {/* Full-width Hero Section */}
      <Box sx={{ width: "100%" }}>
        <HeroSection />
      </Box>

      {/* Centered Content inside a Container */}
      <Container maxWidth="lg">
        <AboutSection />
        <HowItWork />
        <CoursesSection />
        <TrainersSection />
        <HighlightSection />
        <TestimonialSection />
        <ClientSection />
      </Container>
    </Box>
  );
};

export default HomePage;
