// src/pages/TrainersPage.tsx
import { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

// Placeholder trainer image
const trainerImage = "/src/assets/trainer.webp"; // Replace with your uploaded image path

// Sample trainer data
const trainers = Array.from({ length: 6 }, (_, index) => ({
  id: index + 1,
  name: `Trainer ${index + 1}`,
  specialization: "Blood Expert",
  fullBio: "Full bio and background",
}));

const TrainersPage = () => {
  const [selectedTrainer, setSelectedTrainer] = useState<
    (typeof trainers)[0] | null
  >(null);
  const [open, setOpen] = useState(false); // Track dialog state

  // Open the dialog with selected trainer details
  const handleOpen = (trainer: (typeof trainers)[0]) => {
    setSelectedTrainer(trainer);
    setOpen(true);
  };

  // Close the dialog
  const handleClose = () => {
    setSelectedTrainer(null);
    setOpen(false);
  };

  return (
    <Box sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundColor: "#4CAF50",
          padding: "50px 0",
          textAlign: "center",
        }}
      >
        <Typography variant="h3" sx={{ color: "white", fontWeight: "bold" }}>
          Meet Our Trainers
        </Typography>
      </Box>

      {/* Trainers Section */}
      <Container sx={{ padding: "50px 0" }}>
        <Box sx={{ textAlign: "center", marginBottom: "30px" }}>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            Trainers
          </Typography>
        </Box>

        {/* Trainers Grid */}
        <Grid container spacing={4}>
          {trainers.map((trainer) => (
            <Grid item xs={12} sm={6} md={3} key={trainer.id}>
              <Card
                sx={{ height: "100%", cursor: "pointer" }}
                onClick={() => handleOpen(trainer)}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={trainerImage}
                  alt={trainer.name}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {trainer.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {trainer.specialization}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Trainer Details Dialog */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        {selectedTrainer && (
          <>
            <DialogTitle>{selectedTrainer.name}</DialogTitle>
            <DialogContent>
              <Box
                component="img"
                src={trainerImage}
                alt={selectedTrainer.name}
                sx={{
                  width: "100%",
                  maxWidth: "300px",
                  margin: "0 auto",
                  display: "block",
                }}
              />
              <Typography
                variant="body1"
                gutterBottom
                sx={{ marginTop: "20px" }}
              >
                {selectedTrainer.fullBio}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Specialization: {selectedTrainer.specialization}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="secondary">
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default TrainersPage;
