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
    <Box sx={{ width: "100%", padding: 0, margin: 0 }}>
      {/* Full-width Hero Section */}
      <Box sx={{ width: "100%" }}>
        <HeroSection />
      </Box>

      {/* Centered Content inside a Container */}
      <Container maxWidth="lg" sx={{ padding: "40px 0" }}>
        {/* About Section */}
        <AboutSection />
        {/* How It Works Section */}
        <HowItWork />
        {/* Courses Section */}
        <CoursesSection />
        {/* Trainers Section */}
        <TrainersSection />
        {/* Highlights Section */}
        <HighlightSection />
        {/* Testimonials Section */}
        <TestimonialSection />
        {/* Clients Section */}
        <ClientSection />
      </Container>
    </Box>
  );
};

export default HomePage;
