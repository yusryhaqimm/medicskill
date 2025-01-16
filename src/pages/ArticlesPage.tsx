// src/pages/ArticlesPage.tsx
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
  description?: string; // Optional description field
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
        padding: "40px 20px",
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
          borderBottom: "2px solid #3251A1",
          paddingBottom: "10px",
        }}
      >
        <Typography variant="h4" fontWeight="bold" color="#3251A1">
          Latest Blog Posts
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#3251A1",
            color: "white",
            "&:hover": { backgroundColor: "red" },
          }}
          size="large"
        >
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
                boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.1)",
                borderRadius: "16px",
                overflow: "hidden",
                transition: "transform 0.2s",
                "&:hover": { transform: "scale(1.02)" },
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={article.image}
                alt={article.title}
                sx={{ objectFit: "cover" }}
              />
              <CardContent sx={{ flexGrow: 1, padding: "16px" }}>
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
                    color: "#3251A1",
                    "&:hover": { color: "red" },
                  }}
                >
                  {article.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ marginTop: "10px" }}
                >
                  {article.description?.substring(0, 100) ||
                    "No description available."}
                </Typography>
              </CardContent>
              <Box sx={{ padding: "16px" }}>
                <Button
                  component={Link}
                  to={`/articles/${article.slug}`}
                  variant="contained"
                  fullWidth
                  sx={{
                    backgroundColor: "#3251A1",
                    color: "white",
                    "&:hover": { backgroundColor: "red" },
                  }}
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
