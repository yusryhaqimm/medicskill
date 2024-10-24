// src/components/ClientSection.tsx
import { Box, Typography } from "@mui/material";

// Client logos data
const logos = [
  { src: "/src/assets/msl.png", alt: "MSL Logo" },
  { src: "/src/assets/segi.png", alt: "SEGI Logo" },
  { src: "/src/assets/nexus.png", alt: "Nexus Logo" },
  { src: "/src/assets/synapse.png", alt: "Synapse Logo" },
  { src: "/src/assets/Taylors.png", alt: "Taylors Logo" },
];

const ClientSection = () => {
  return (
    <Box
      sx={{
        textAlign: "center",
        padding: "50px 0",
        backgroundColor: "#f9f9f9",
        overflow: "hidden", // Hide overflow to keep only the scroll area visible
      }}
    >
      {/* Section Title */}
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: "bold", marginBottom: "30px" }}
      >
        Trusted By
      </Typography>

      {/* Scrolling Wrapper */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
          animation: "scroll 20s linear infinite", // Continuous scroll animation
          "&:hover": {
            animationPlayState: "paused", // Pause on hover for UX improvement
          },
        }}
      >
        {logos.concat(logos).map((logo, index) => (
          <Box
            key={index}
            component="img"
            src={logo.src}
            alt={logo.alt}
            sx={{
              width: "150px",
              height: "auto",
              margin: "0 30px",
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ClientSection;
