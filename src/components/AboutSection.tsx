// src/components/AboutSection.tsx
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const AboutSection = () => {
  return (
    <Box
      sx={{
        position: "relative",
        height: "400px",
        backgroundImage: `url('/src/assets/medic-skill-bg.jpg')`, // Replace with your image path
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        color: "white", // Default color for all text inside the Box
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "40px 20px",
      }}
    >
      <Box
        sx={{
          maxWidth: "380px",
          padding: "8px",
          borderRadius: "8px",
          marginLeft: "350px",
          marginBottom: "80px",
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{ marginBottom: "20px" }}
          style={{ color: "#3251A1" }}
        >
          About Medic Skill
        </Typography>

        <Typography
          variant="body1"
          paragraph
          sx={{ marginBottom: "20px" }}
          style={{ color: "#3251A1" }}
        >
          At Medic Skill, we are committed to providing top-notch medical
          education and hands-on skill-based training. Our mission is to empower
          healthcare professionals and students with the knowledge and skills
          they need to excel in their careers.
        </Typography>

        <Button
          component={Link}
          to="/about-us"
          variant="contained"
          color="primary"
          sx={{ textTransform: "none" }}
        >
          Read More
        </Button>
      </Box>
    </Box>
  );
};

export default AboutSection;
