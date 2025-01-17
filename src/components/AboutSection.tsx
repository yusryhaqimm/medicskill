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
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end", // Align content to the right
        textAlign: "left",
        padding: "40px",
        color: "white",
      }}
    >
      <Box
        sx={{
          maxWidth: "450px",
          backgroundColor: "rgba(255, 255, 255, 0.9)", // Semi-transparent white background
          padding: "30px",
          borderRadius: "12px",
          marginRight: "60px",
          marginBottom: "60px", // Add margin from the right edge
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: "#3251A1",
            marginBottom: "20px",
          }}
        >
          About Medic Skill
        </Typography>

        <Typography
          variant="body1"
          paragraph
          sx={{
            color: "#555",
            lineHeight: 1.8,
            marginBottom: "20px",
          }}
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
          sx={{
            backgroundColor: "#3251A1",
            color: "white",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#27408B", // Slightly darker shade for hover
            },
          }}
        >
          Read More
        </Button>
      </Box>
    </Box>
  );
};

export default AboutSection;
