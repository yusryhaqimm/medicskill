import { Box, Typography, Grid, Icon, Button } from "@mui/material";
import { School, LocalHospital, Star, People } from "@mui/icons-material";

const AboutUsPage = () => {
  return (
    <Box
      sx={{
        padding: "60px 20px",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          textAlign: "center",
          marginBottom: "60px",
        }}
      >
        <Typography
          variant="h3"
          sx={{ fontWeight: "bold", marginBottom: "20px", color: "#3251A1" }}
        >
          About MedicSkill
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "#555",
            lineHeight: 1.8,
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          Empowering healthcare professionals through hands-on education and
          continuous learning. Join us on our mission to shape the future of
          healthcare with excellence and innovation.
        </Typography>
      </Box>

      {/* Vision and Mission Section */}
      <Grid container spacing={4} sx={{ marginBottom: "60px" }}>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              padding: "40px",
              borderRadius: "8px",
              backgroundColor: "white",
              textAlign: "center",
              border: "1px solid #ddd",
            }}
          >
            <Icon
              component={School}
              sx={{
                fontSize: 60,
                color: "#3251A1",
                marginBottom: "20px",
              }}
            />
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", marginBottom: "20px" }}
            >
              Our Vision
            </Typography>
            <Typography variant="body2" sx={{ color: "#555", lineHeight: 1.6 }}>
              To become the leading institution in healthcare education, setting
              global standards in skill-based learning while driving innovation
              and excellence for healthcare professionals worldwide.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              padding: "40px",
              borderRadius: "8px",
              backgroundColor: "white",
              textAlign: "center",
              border: "1px solid #ddd",
            }}
          >
            <Icon
              component={LocalHospital}
              sx={{
                fontSize: 60,
                color: "#43A047",
                marginBottom: "20px",
              }}
            />
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", marginBottom: "20px" }}
            >
              Our Mission
            </Typography>
            <Typography variant="body2" sx={{ color: "#555", lineHeight: 1.6 }}>
              To empower healthcare professionals through innovative training
              programs, fostering continuous development, and building a future
              where skill-based education meets healthcare challenges head-on.
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {/* Core Values Section */}
      <Box sx={{ textAlign: "center", marginBottom: "60px" }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", marginBottom: "40px", color: "#3251A1" }}
        >
          Our Core Values
        </Typography>
        <Grid container spacing={4}>
          {[
            {
              icon: Star,
              title: "Excellence",
              description:
                "We strive to provide top-tier education and training to produce healthcare professionals who excel in their fields.",
              color: "#1E88E5",
            },
            {
              icon: People,
              title: "Innovation",
              description:
                "We embrace new technologies and methodologies to deliver cutting-edge learning experiences.",
              color: "#43A047",
            },
            {
              icon: LocalHospital,
              title: "Compassion",
              description:
                "We believe in nurturing empathy and compassion in every healthcare professional we train.",
              color: "#FF7043",
            },
          ].map((value, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Box
                sx={{
                  padding: "30px",
                  textAlign: "center",
                  borderRadius: "8px",
                  backgroundColor: "white",
                  border: "1px solid #ddd",
                }}
              >
                <Icon
                  component={value.icon}
                  sx={{
                    fontSize: 50,
                    color: value.color,
                    marginBottom: "20px",
                  }}
                />
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {value.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#555",
                    marginTop: "10px",
                    lineHeight: 1.6,
                  }}
                >
                  {value.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Call-to-Action Section */}
      <Box
        sx={{
          textAlign: "center",
          padding: "40px",
          backgroundColor: "#3251A1",
          color: "white",
          borderRadius: "8px",
        }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", marginBottom: "20px" }}
        >
          Ready to Enhance Your Skills?
        </Typography>
        <Typography
          variant="body2"
          sx={{ marginBottom: "20px", maxWidth: "600px", margin: "0 auto" }}
        >
          Join us and become a part of the future of healthcare education.
        </Typography>
        <Typography
          variant="body2"
          sx={{
            textAlign: "center",
            marginBottom: 2,
            color: "#555",
          }}
        ></Typography>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          sx={{
            fontWeight: "bold",
            backgroundColor: "red",
            "&:hover": { backgroundColor: "#d32f2f" },
          }}
        >
          Explore Programs
        </Button>
      </Box>
    </Box>
  );
};

export default AboutUsPage;
