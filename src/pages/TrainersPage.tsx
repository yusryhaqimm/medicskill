// src/pages/TrainersPage.tsx
import { useState, useEffect } from "react";
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
  CircularProgress,
} from "@mui/material";
import { fetchTrainers, Trainer } from "../api/trainers"; // Import API calls

const fallbackTrainerImage = "/trainer.webp"; // Ensure this is in the public folder

const TrainersPage = () => {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch trainers on component mount
  useEffect(() => {
    const loadTrainers = async () => {
      try {
        const data = await fetchTrainers(); // Fetch trainers using the API function
        console.log("Fetched Trainers:", data); // Debug fetched data
        setTrainers(data);
      } catch (error) {
        console.error("Error fetching trainers:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTrainers();
  }, []);

  // Handle opening the trainer dialog
  const handleOpen = (trainer: Trainer) => {
    setSelectedTrainer(trainer);
    setOpen(true);
  };

  // Handle closing the trainer dialog
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

        {/* Show loading spinner */}
        {loading ? (
          <Box sx={{ textAlign: "center", padding: "50px 0" }}>
            <CircularProgress />
          </Box>
        ) : (
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
                    image={trainer.image || fallbackTrainerImage} // Backend image or fallback
                    alt={trainer.name}
                  />
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {trainer.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {trainer.short_description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      {/* Trainer Details Dialog */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        {selectedTrainer && (
          <>
            <DialogTitle>{selectedTrainer.name}</DialogTitle>
            <DialogContent>
              <Box
                component="img"
                src={selectedTrainer.image || fallbackTrainerImage} // Backend image or fallback
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
                {selectedTrainer.description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Specialization: {selectedTrainer.short_description}
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
