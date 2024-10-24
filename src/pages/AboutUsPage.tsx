// src/pages/AboutUsPage.tsx
import {
  Box,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  Icon,
} from "@mui/material";
import { School, LocalHospital } from "@mui/icons-material";

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
      <Typography
        variant="h2"
        gutterBottom
        sx={{ textAlign: "center", fontWeight: "bold", marginBottom: "40px" }}
      >
        About MedicSkill
      </Typography>

      <Typography
        variant="h5"
        sx={{
          textAlign: "center",
          marginBottom: "60px",
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        Empowering healthcare professionals through hands-on education and
        continuous learning. Join us on our mission to shape the future of
        healthcare with excellence and innovation.
      </Typography>

      {/* Vision and Mission Section */}
      <Grid container spacing={6}>
        {/* Vision Section */}
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

        {/* Mission Section */}
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
      <Box sx={{ marginTop: "60px" }}>
        <Typography
          variant="h3"
          sx={{ textAlign: "center", marginBottom: "20px", fontWeight: "bold" }}
        >
          Our Core Values
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper
              elevation={2}
              sx={{
                padding: "20px",
                backgroundColor: "#ffffffaa",
                textAlign: "center",
                borderRadius: "8px",
              }}
            >
              <Typography variant="h5" gutterBottom>
                Excellence
              </Typography>
              <Typography variant="body2">
                We strive to provide top-tier education and training to produce
                healthcare professionals who excel in their fields.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper
              elevation={2}
              sx={{
                padding: "20px",
                backgroundColor: "#ffffffaa",
                textAlign: "center",
                borderRadius: "8px",
              }}
            >
              <Typography variant="h5" gutterBottom>
                Innovation
              </Typography>
              <Typography variant="body2">
                We embrace new technologies and methodologies to deliver
                cutting-edge learning experiences.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper
              elevation={2}
              sx={{
                padding: "20px",
                backgroundColor: "#ffffffaa",
                textAlign: "center",
                borderRadius: "8px",
              }}
            >
              <Typography variant="h5" gutterBottom>
                Compassion
              </Typography>
              <Typography variant="body2">
                We believe in nurturing empathy and compassion in every
                healthcare professional we train.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AboutUsPage;
