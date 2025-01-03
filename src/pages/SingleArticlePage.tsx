import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";

interface Article {
  id: number;
  slug: string;
  date: string;
  category: string;
  title: string;
  description?: string; // Mark description as optional
  image: string;
}

const ArticlesPage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get<Article[]>("http://127.0.0.1:8000/api/articles/")
      .then((response) => {
        console.log("API Response:", response.data); // Debug API response
        setArticles(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching articles:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box
      sx={{
        padding: "20px",
        minHeight: "100vh",
        backgroundColor: "#f9f9f9",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
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
          Latest Blog Posts
        </Typography>
        <Button variant="contained" color="error" size="large">
          See All Blog Posts
        </Button>
      </Box>

      {/* Article List */}
      <Grid container spacing={4}>
        {articles.map((article) => (
          <Grid item xs={12} sm={6} md={4} key={article.id}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                borderRadius: "8px",
                overflow: "hidden",
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={article.image}
                alt={article.title}
                sx={{ objectFit: "cover" }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  gutterBottom
                >
                  {article.date} | {article.category}
                </Typography>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  component={Link}
                  to={`/articles/${article.slug}`}
                  sx={{
                    textDecoration: "none",
                    color: "inherit",
                    "&:hover": { color: "primary.main" },
                  }}
                >
                  {article.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ marginTop: "10px" }}
                >
                  {article.description
                    ? article.description.substring(0, 100)
                    : "No description available."}
                </Typography>
              </CardContent>
              <Box sx={{ padding: "10px 16px" }}>
                <Button
                  component={Link}
                  to={`/articles/${article.slug}`}
                  variant="outlined"
                  color="primary"
                  fullWidth
                >
                  Read More
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ArticlesPage;
