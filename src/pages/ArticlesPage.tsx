// src/pages/ArticlesPage.tsx
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";

// Sample Data for Large Articles
const articles = [
  {
    id: 1,
    date: "24-10-2024",
    category: "Healthcare Innovation",
    title: "How AI is Transforming Medical Training and Diagnostics",
    description:
      "Artificial Intelligence is changing the way healthcare professionals are trained with simulation-based learning and diagnostic tools.",
    image: "/src/assets/blog2.webp", // Replace with your image path
  },
  {
    id: 2,
    date: "18-10-2024",
    category: "Skill Development",
    title: "Why Hands-on Skills are Essential in Medical Training",
    description:
      "Medical education programs need to focus on hands-on skill development to enhance practical learning and improve patient care.",
    image: "/src/assets/blog.webp", // Replace with your image path
  },
];

// Sample Data for Smaller Articles List
const smallArticles = [
  {
    id: 3,
    date: "10-10-2024",
    category: "Public Health",
    title: "How Digital Platforms Boost Health Awareness Campaigns",
    image: "/src/assets/blog.webp", // Replace with your image path
  },
  {
    id: 4,
    date: "02-10-2024",
    category: "Telemedicine",
    title: "How Telemedicine is Closing the Healthcare Access Gap",
    image: "/src/assets/blog.webp", // Replace with your image path
  },
  {
    id: 5,
    date: "27-09-2024",
    category: "Medical Research",
    title: "Latest Advances in Medical Research and Technology",
    image: "/src/assets/blog.webp", // Replace with your image path
  },
  {
    id: 6,
    date: "15-09-2024",
    category: "Mental Health",
    title: "The Importance of Mental Health Awareness in Medicine",
    image: "/src/assets/blog.webp", // Replace with your image path
  },
];

const ArticlesPage = () => {
  return (
    <Box
      sx={{ padding: "20px", minHeight: "100vh", backgroundColor: "#f9f9f9" }}
    >
      {/* Title Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          Our Latest Blog Posts
        </Typography>
        <Button variant="contained" color="error" size="large">
          See All Blog Posts
        </Button>
      </Box>

      <Grid container spacing={4}>
        {/* Left Section: Two Large Articles */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={4}>
            {articles.map((article) => (
              <Grid item xs={12} sm={6} key={article.id}>
                <Card sx={{ height: "100%" }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={article.image}
                    alt={article.title}
                  />
                  <CardContent>
                    <Typography variant="subtitle2" color="text.secondary">
                      {article.date} | {article.category}
                    </Typography>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      {article.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {article.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Right Section: Smaller Articles List */}
        <Grid item xs={12} md={4}>
          <Grid container direction="column" spacing={2}>
            {smallArticles.map((article) => (
              <Grid item key={article.id}>
                <Card sx={{ display: "flex", alignItems: "center" }}>
                  <CardMedia
                    component="img"
                    image={article.image}
                    alt={article.title}
                    sx={{ width: "80px", height: "80px" }}
                  />
                  <CardContent sx={{ flex: 1 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      {article.date} | {article.category}
                    </Typography>
                    <Typography variant="body2" fontWeight="bold">
                      {article.title}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ArticlesPage;
