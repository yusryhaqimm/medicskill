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
        padding: "50px 20px",
        backgroundColor: "#f5f5f5",
      }}
    >
      {/* Section Title */}
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: "#3251A1",
          marginBottom: "40px",
        }}
      >
        How It Works
      </Typography>

      {/* Steps */}
      <Grid container spacing={4} justifyContent="center">
        {steps.map((step, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Box
              sx={{
                textAlign: "center",
                borderRadius: "12px",
                padding: "30px",
                backgroundColor: "white",
                border: "1px solid #ddd",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                height: "250px", // Ensures all boxes are the same height
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              {/* Step Number */}
              <Box
                sx={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  backgroundColor: "#3251A1",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  fontSize: "20px",
                  marginBottom: "20px",
                }}
              >
                {step.id}
              </Box>

              {/* Step Title */}
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "600",
                  color: "#555",
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
