// src/pages/JoinAsTrainerPage.tsx
import { Box, Grid, Typography, TextField, Button } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";

const JoinAsTrainerPage = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
        padding: "40px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Grid container spacing={6} maxWidth="lg">
        {/* Left Section: Contact Information */}
        <Grid item xs={12} md={5}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              marginBottom: "20px",
              color: "#3251A1",
            }}
          >
            Be Part of Us
          </Typography>
          <Typography
            variant="body1"
            sx={{ marginBottom: "30px", color: "#555" }}
          >
            Sign up to become one of our trainers. Share your expertise and help
            us empower healthcare professionals.
          </Typography>

          <Box sx={{ marginBottom: "20px" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: "15px",
                color: "#3251A1",
              }}
            >
              <EmailIcon sx={{ marginRight: "10px" }} />
              <Typography variant="body1">medicskill@synagene.com</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: "15px",
                color: "#3251A1",
              }}
            >
              <LocationOnIcon sx={{ marginRight: "10px" }} />
              <Typography variant="body1">
                Kelana Square, 403030 Petaling Jaya
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                color: "#3251A1",
              }}
            >
              <PhoneIcon sx={{ marginRight: "10px" }} />
              <Typography variant="body1">+009920929929</Typography>
            </Box>
          </Box>
        </Grid>

        {/* Right Section: Contact Form */}
        <Grid item xs={12} md={7}>
          <form
            noValidate
            autoComplete="off"
            style={{
              backgroundColor: "white",
              borderRadius: "16px",
              padding: "30px",
              boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                marginBottom: "20px",
                color: "#3251A1",
                fontWeight: "bold",
              }}
            >
              Join Our Team
            </Typography>

            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              margin="normal"
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#3251A1" },
                  "&:hover fieldset": { borderColor: "red" },
                  "&.Mui-focused fieldset": { borderColor: "#3251A1" },
                },
              }}
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              required
              type="email"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#3251A1" },
                  "&:hover fieldset": { borderColor: "red" },
                  "&.Mui-focused fieldset": { borderColor: "#3251A1" },
                },
              }}
            />
            <TextField
              label="Company"
              variant="outlined"
              fullWidth
              margin="normal"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#3251A1" },
                  "&:hover fieldset": { borderColor: "red" },
                  "&.Mui-focused fieldset": { borderColor: "#3251A1" },
                },
              }}
            />
            <TextField
              label="Message"
              variant="outlined"
              fullWidth
              margin="normal"
              multiline
              rows={4}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#3251A1" },
                  "&:hover fieldset": { borderColor: "red" },
                  "&.Mui-focused fieldset": { borderColor: "#3251A1" },
                },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                marginTop: "20px",
                padding: "10px 0",
                backgroundColor: "#3251A1",
                color: "white",
                borderRadius: "8px",
                fontSize: "16px",
                "&:hover": { backgroundColor: "red" },
              }}
            >
              Submit
            </Button>
          </form>
        </Grid>
      </Grid>
    </Box>
  );
};

export default JoinAsTrainerPage;
