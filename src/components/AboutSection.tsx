import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const AboutSection = () => {
  return (
    <Box
      sx={{
        position: "relative",
        height: "auto",
        background: "linear-gradient(135deg, #6a11cb, #2575fc)", // Gradient background
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 20px",
        overflow: "hidden",
      }}
    >
      {/* Animated Ambulance */}
      <Box
        sx={{
          position: "absolute",
          bottom: "20px",
          width: "120px",
          height: "60px",
          backgroundColor: "#fff",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          animation: "drive 5s linear infinite", // Continuous animation
          "@keyframes drive": {
            "0%": {
              transform: "translateX(-150%)",
            },
            "100%": {
              transform: "translateX(150%)",
            },
          },
        }}
      >
        {/* Dark Blue Section on Top of the Van */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "20px",
            backgroundColor: "#3251A1", // Dark blue color
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
          }}
        />

        {/* Text on the Ambulance */}
        <Typography
          variant="caption"
          sx={{
            position: "absolute",
            top: "25px", // Adjusted to fit below the dark blue section
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "0.6rem",
            fontWeight: "bold",
            color: "#d32f2f", // Red color for visibility
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
        >
          MedicSkills on the go
        </Typography>

        {/* Wheels */}
        <Box
          sx={{
            position: "absolute",
            bottom: "-10px",
            left: "20px",
            width: "20px",
            height: "20px",
            backgroundColor: "#000",
            borderRadius: "50%",
            boxShadow: "inset 0 0 5px rgba(0, 0, 0, 0.5)",
            animation: "wheel-spin 1s linear infinite",
            "@keyframes wheel-spin": {
              "0%": {
                transform: "rotate(0deg)",
              },
              "100%": {
                transform: "rotate(360deg)",
              },
            },
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: "-10px",
            right: "20px",
            width: "20px",
            height: "20px",
            backgroundColor: "#000",
            borderRadius: "50%",
            boxShadow: "inset 0 0 5px rgba(0, 0, 0, 0.5)",
            animation: "wheel-spin 1s linear infinite",
          }}
        />
      </Box>

      {/* Content Box */}
      <Box
        sx={{
          maxWidth: "600px",
          textAlign: "center",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
          backgroundColor: "rgba(255, 255, 255, 0.9)", // Slightly transparent background
          zIndex: 1, // Lower z-index to ensure the ambulance is visible
          marginBottom: "100px", // Added margin to avoid overlapping with the ambulance
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
          About MedicSkills
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
          At MedicSkills, we are committed to providing top-notch medical
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
            padding: "10px 20px",
            fontSize: "16px",
            "&:hover": {
              backgroundColor: "#27408B",
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
