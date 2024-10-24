// src/components/Footer.tsx
import { Box, Grid, Typography, Link, IconButton } from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";

// Placeholder image path
const logo = "/src/assets/mslogo.png";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#f9f9f9",
        padding: "40px 0",
        borderTop: "1px solid #e0e0e0",
      }}
    >
      <Grid container spacing={4} justifyContent="center">
        {/* Left Section - Logo and Social Icons */}
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
            >
              <Facebook />
            </IconButton>
            <IconButton
              component="a"
              href="https://twitter.com"
              target="_blank"
              aria-label="Twitter"
            >
              <Twitter />
            </IconButton>
            <IconButton
              component="a"
              href="https://instagram.com"
              target="_blank"
              aria-label="Instagram"
            >
              <Instagram />
            </IconButton>
            <IconButton
              component="a"
              href="https://linkedin.com"
              target="_blank"
              aria-label="LinkedIn"
            >
              <LinkedIn />
            </IconButton>
          </Box>
        </Grid>

        {/* Center Section - Navigation Links */}
        <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
          <Typography variant="h6" gutterBottom>
            ABOUT
          </Typography>
          <Box>
            {[
              "About Us",
              "Courses",
              "Trainers",
              "Pre-enroll",
              "Contact",
              "Partnerships",
            ].map((item, index) => (
              <Link
                key={index}
                href="#"
                underline="none"
                sx={{ display: "block", color: "inherit", marginBottom: "8px" }}
              >
                {item}
              </Link>
            ))}
          </Box>
        </Grid>

        {/* Right Section - Social Media Follow Links */}
        <Grid
          item
          xs={12}
          md={4}
          sx={{ textAlign: { xs: "center", md: "right" } }}
        >
          <Typography variant="h6" gutterBottom>
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
                    color: "inherit",
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
          borderTop: "1px solid #e0e0e0",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Copyright © {new Date().getFullYear()} All rights reserved Medicskill
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
