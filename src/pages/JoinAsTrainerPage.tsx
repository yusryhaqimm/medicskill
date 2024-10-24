import { Box, Grid, Typography, TextField, Button } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";

const JoinAsTrainerPage = () => {
  return (
    <Box
      sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh", padding: "50px 0" }}
    >
      <Grid container spacing={4} justifyContent="center">
        {/* Left Section: Contact Information */}
        <Grid item xs={12} md={5}>
          <Typography variant="h3" gutterBottom>
            Be Part Of Us
          </Typography>
          <Typography variant="body1" gutterBottom>
            Sign up to become our trainer.
          </Typography>

          <Box sx={{ marginTop: "20px" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <EmailIcon sx={{ marginRight: "10px" }} />
              <Typography variant="body1">medicskill@synagene.com</Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <LocationOnIcon sx={{ marginRight: "10px" }} />
              <Typography variant="body1">
                Kelana Square, 403030 Petaling Jaya
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <PhoneIcon sx={{ marginRight: "10px" }} />
              <Typography variant="body1">+009920929929</Typography>
            </Box>
          </Box>
        </Grid>

        {/* Right Section: Contact Form */}
        <Grid item xs={12} md={5}>
          <form noValidate autoComplete="off">
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              required
              type="email"
            />
            <TextField
              label="Company"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Message"
              variant="outlined"
              fullWidth
              margin="normal"
              multiline
              rows={4}
            />

            <Button
              type="submit"
              variant="contained"
              color="success"
              fullWidth
              sx={{ marginTop: "20px", padding: "10px 0" }}
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
