// src/components/HowItWork.tsx
import { Box, Grid, Typography } from "@mui/material";

const HowItWork = () => {
  const steps = [
    { id: "01", title: "Browse Available Courses" },
    { id: "02", title: "Register and Secure Your Seat" },
    { id: "03", title: "Attend The Training" },
    { id: "04", title: "Get Your Certificate" },
  ];

  return (
    <Box
      sx={{
        textAlign: "center",
        padding: "50px 0",
        backgroundColor: "#f5f5f5",
      }}
    >
      {/* Section Title */}
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: "bold", marginBottom: "30px" }}
      >
        How it Work
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {steps.map((step, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Box
              sx={{
                position: "relative",
                height: "200px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: index === 0 ? "white" : "transparent",
                borderRadius: "8px",
                overflow: "hidden",
                boxShadow:
                  index === 0 ? "0 4px 8px rgba(0, 0, 0, 0.1)" : "none",
                "&:hover": {
                  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              {/* Number as Background */}
              <Typography
                variant="h1"
                component="div"
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  fontSize: "150px",
                  fontWeight: "bold",
                  color: "rgba(0, 0, 0, 0.1)",
                  zIndex: 1, // Background Layer
                }}
              >
                {step.id}
              </Typography>

              {/* Overlayed Text */}
              <Typography
                variant="h6"
                component="div"
                sx={{
                  position: "relative",
                  zIndex: 2, // Foreground Layer
                  fontWeight: "600",
                }}
              >
                {step.title}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HowItWork;
