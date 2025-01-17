import { Box, Grid, Typography, Link, IconButton, Button } from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";

// Placeholder image path
const logo = "/src/assets/mslogo.png";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#3251A1",
        padding: "40px 20px",
        color: "white",
      }}
    >
      <Grid container spacing={4} justifyContent="center">
        {/* Left Section - Logo and Description */}
        <Grid
          item
          xs={12}
          md={4}
          sx={{ textAlign: { xs: "center", md: "left" } }}
        >
          <Box
            component="img"
            src={logo}
            alt="Medicskill Logo"
            sx={{ width: "150px", marginBottom: "10px" }}
          />
          <Typography variant="body2" sx={{ marginBottom: "10px" }}>
            Automate your entire healthcare hiring, onboarding, and compliance
            with a true technology platform.
          </Typography>
          <Box>
            <IconButton
              component="a"
              href="https://facebook.com"
              target="_blank"
              aria-label="Facebook"
              sx={{ color: "white" }}
            >
              <Facebook />
            </IconButton>
            <IconButton
              component="a"
              href="https://twitter.com"
              target="_blank"
              aria-label="Twitter"
              sx={{ color: "white" }}
            >
              <Twitter />
            </IconButton>
            <IconButton
              component="a"
              href="https://instagram.com"
              target="_blank"
              aria-label="Instagram"
              sx={{ color: "white" }}
            >
              <Instagram />
            </IconButton>
            <IconButton
              component="a"
              href="https://linkedin.com"
              target="_blank"
              aria-label="LinkedIn"
              sx={{ color: "white" }}
            >
              <LinkedIn />
            </IconButton>
          </Box>
        </Grid>

        {/* Center Section - Navigation Links */}
        <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
            Quick Links
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Button
              component={RouterLink}
              to="/about-us"
              color="inherit"
              sx={{
                textTransform: "none",
                color: "white",
                justifyContent: "center",
              }}
            >
              About Us
            </Button>
            <Button
              component={RouterLink}
              to="/courses"
              color="inherit"
              sx={{
                textTransform: "none",
                color: "white",
                justifyContent: "center",
              }}
            >
              Courses Offered
            </Button>
            <Button
              component={RouterLink}
              to="/articles"
              color="inherit"
              sx={{
                textTransform: "none",
                color: "white",
                justifyContent: "center",
              }}
            >
              Articles
            </Button>
            <Button
              component={RouterLink}
              to="/trainers"
              color="inherit"
              sx={{
                textTransform: "none",
                color: "white",
                justifyContent: "center",
              }}
            >
              Trainers
            </Button>
            <Button
              component={RouterLink}
              to="/contact-us/inquiries"
              color="inherit"
              sx={{
                textTransform: "none",
                color: "white",
                justifyContent: "center",
              }}
            >
              Contact Us
            </Button>
          </Box>
        </Grid>

        {/* Right Section - Follow Us Links */}
        <Grid
          item
          xs={12}
          md={4}
          sx={{ textAlign: { xs: "center", md: "right" } }}
        >
          <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
            Follow Us
          </Typography>
          <Box>
            {["Facebook", "Twitter", "Instagram", "LinkedIn"].map(
              (platform, index) => (
                <Link
                  key={index}
                  href={`https://${platform.toLowerCase()}.com`}
                  target="_blank"
                  underline="none"
                  sx={{
                    display: "block",
                    color: "white",
                    marginBottom: "8px",
                  }}
                >
                  {platform}
                </Link>
              )
            )}
          </Box>
        </Grid>
      </Grid>

      {/* Copyright Section */}
      <Box
        sx={{
          textAlign: "center",
          marginTop: "30px",
          paddingTop: "10px",
          borderTop: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        <Typography variant="body2" color="white">
          Copyright © {new Date().getFullYear()} All rights reserved Medicskill
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
