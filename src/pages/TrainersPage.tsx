import {
  Box,
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
import { useState, useEffect } from "react";
import { fetchTrainers, Trainer } from "../api/trainers";

const fallbackTrainerImage = "/trainer.webp"; // Ensure this is in the public folder

const TrainersPage = () => {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTrainers = async () => {
      try {
        const data = await fetchTrainers();
        setTrainers(data);
      } catch (error) {
        console.error("Error fetching trainers:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTrainers();
  }, []);

  const handleOpen = (trainer: Trainer) => {
    setSelectedTrainer(trainer);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedTrainer(null);
    setOpen(false);
  };

  return (
    <Box sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      {/* Trainers Section */}
      <Container sx={{ padding: "50px 20px" }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "40px",
            color: "#3251A1",
          }}
        >
          Our Expert Trainers
        </Typography>

        {loading ? (
          <Box sx={{ textAlign: "center", padding: "50px 0" }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "30px",
            }}
          >
            {trainers.map((trainer) => (
              <Card
                key={trainer.id}
                sx={{
                  borderRadius: "12px",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
                  },
                  cursor: "pointer",
                }}
                onClick={() => handleOpen(trainer)}
              >
                <Box
                  sx={{
                    width: "100%",
                    height: "200px",
                    overflow: "hidden",
                    borderTopLeftRadius: "12px",
                    borderTopRightRadius: "12px",
                  }}
                >
                  <CardMedia
                    component="img"
                    image={trainer.image || fallbackTrainerImage}
                    alt={trainer.name}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      color: "#3251A1",
                      textAlign: "center",
                      marginBottom: "10px",
                    }}
                  >
                    {trainer.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ textAlign: "center" }}
                  >
                    {trainer.short_description}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </Container>

      {/* Trainer Details Dialog */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        {selectedTrainer && (
          <>
            <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>
              {selectedTrainer.name}
            </DialogTitle>
            <DialogContent sx={{ textAlign: "center" }}>
              <Box
                component="img"
                src={selectedTrainer.image || fallbackTrainerImage}
                alt={selectedTrainer.name}
                sx={{
                  width: "70%",
                  maxWidth: "300px",
                  margin: "0 auto",
                  display: "block",
                  borderRadius: "8px",
                }}
              />
              <Typography
                variant="body1"
                sx={{ marginTop: "20px", marginBottom: "10px" }}
              >
                {selectedTrainer.description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Specialization: {selectedTrainer.short_description}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleClose}
                sx={{
                  color: "#777",
                  "&:hover": { color: "#3251A1" },
                }}
              >
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
