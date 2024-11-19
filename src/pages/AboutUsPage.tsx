// src/pages/AboutUsPage.tsx
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Icon,
  Button,
} from "@mui/material";
import { School, LocalHospital, Star, People } from "@mui/icons-material";

const AboutUsPage = () => {
  return (
    <Box
      sx={{
        padding: "60px 20px",
        backgroundImage: "url('/src/assets/about-bg.jpg')", // Background image for aesthetics
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        color: "white",
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          textAlign: "center",
          padding: "40px",
          background: "rgba(0, 0, 0, 0.6)",
          borderRadius: "12px",
          marginBottom: "50px",
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        <Typography
          variant="h2"
          gutterBottom
          sx={{ fontWeight: "bold", marginBottom: "20px" }}
        >
          About MedicSkill
        </Typography>
        <Typography variant="h6">
          Empowering healthcare professionals through hands-on education and
          continuous learning. Join us on our mission to shape the future of
          healthcare with excellence and innovation.
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          sx={{ marginTop: "30px", fontWeight: "bold" }}
        >
          Learn More About Our Programs
        </Button>
      </Box>

      {/* Vision and Mission Section */}
      <Grid container spacing={6} sx={{ marginBottom: "60px" }}>
        <Grid item xs={12} md={6}>
          <Card
            elevation={4}
            sx={{
              backgroundColor: "#1E88E5",
              color: "white",
              borderRadius: "12px",
            }}
          >
            <CardContent sx={{ textAlign: "center", padding: "30px" }}>
              <Icon
                component={School}
                sx={{ fontSize: 60, color: "white", marginBottom: "10px" }}
              />
              <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
                Our Vision
              </Typography>
              <Typography variant="body1">
                To become the leading institution in healthcare education,
                setting global standards in skill-based learning while driving
                innovation and excellence for healthcare professionals
                worldwide.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card
            elevation={4}
            sx={{
              backgroundColor: "#43A047",
              color: "white",
              borderRadius: "12px",
            }}
          >
            <CardContent sx={{ textAlign: "center", padding: "30px" }}>
              <Icon
                component={LocalHospital}
                sx={{ fontSize: 60, color: "white", marginBottom: "10px" }}
              />
              <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
                Our Mission
              </Typography>
              <Typography variant="body1">
                To empower healthcare professionals through innovative training
                programs, fostering continuous development, and building a
                future where skill-based education meets healthcare challenges
                head-on.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Core Values Section */}
      <Box>
        <Typography
          variant="h3"
          sx={{ textAlign: "center", marginBottom: "40px", fontWeight: "bold" }}
        >
          Our Core Values
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card
              elevation={2}
              sx={{
                padding: "20px",
                backgroundColor: "#ffffffaa",
                textAlign: "center",
                borderRadius: "12px",
                transition: "transform 0.3s",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              <Icon
                component={Star}
                sx={{ fontSize: 50, color: "#1E88E5", marginBottom: "10px" }}
              />
              <Typography variant="h5" gutterBottom>
                Excellence
              </Typography>
              <Typography variant="body2">
                We strive to provide top-tier education and training to produce
                healthcare professionals who excel in their fields.
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card
              elevation={2}
              sx={{
                padding: "20px",
                backgroundColor: "#ffffffaa",
                textAlign: "center",
                borderRadius: "12px",
                transition: "transform 0.3s",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              <Icon
                component={People}
                sx={{ fontSize: 50, color: "#43A047", marginBottom: "10px" }}
              />
              <Typography variant="h5" gutterBottom>
                Innovation
              </Typography>
              <Typography variant="body2">
                We embrace new technologies and methodologies to deliver
                cutting-edge learning experiences.
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card
              elevation={2}
              sx={{
                padding: "20px",
                backgroundColor: "#ffffffaa",
                textAlign: "center",
                borderRadius: "12px",
                transition: "transform 0.3s",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              <Icon
                component={LocalHospital}
                sx={{ fontSize: 50, color: "#FF7043", marginBottom: "10px" }}
              />
              <Typography variant="h5" gutterBottom>
                Compassion
              </Typography>
              <Typography variant="body2">
                We believe in nurturing empathy and compassion in every
                healthcare professional we train.
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Call-to-Action Section */}
      <Box
        sx={{
          textAlign: "center",
          padding: "40px 20px",
          backgroundColor: "#1E88E5",
          color: "white",
          borderRadius: "12px",
          marginTop: "60px",
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
          Ready to Enhance Your Skills?
        </Typography>
        <Typography variant="body1" gutterBottom>
          Join us and become a part of the future of healthcare education.
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          sx={{ marginTop: "20px", fontWeight: "bold" }}
        >
          Explore Programs
        </Button>
      </Box>
    </Box>
  );
};

export default AboutUsPage;
