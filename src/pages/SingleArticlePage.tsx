import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, CircularProgress } from "@mui/material";
import axios from "axios";

interface Article {
  id: number;
  slug: string;
  title: string;
  category: string;
  content: string;
  image: string;
  created_at: string;
}

const SingleArticlePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    axios
      .get<Article>(`http://127.0.0.1:8000/api/articles/${slug}/`)
      .then((response) => {
        setArticle(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching article:", error);
        setError(true);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error || !article) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          textAlign: "center",
        }}
      >
        <Typography variant="h6" color="error">
          Failed to load the article. Please try again later.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        padding: "40px 20px",
        maxWidth: "800px",
        margin: "0 auto",
        borderRadius: "16px",
        boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Image Section */}
      {article.image && (
        <Box
          sx={{
            marginBottom: "20px",
            borderRadius: "16px",
            overflow: "hidden",
            maxHeight: "400px",
            maxWidth: "100%",
          }}
        >
          <img
            src={article.image}
            alt={article.title || "Article Image"}
            style={{
              width: "100%",
              height: "auto",
              objectFit: "cover",
              borderRadius: "16px",
            }}
          />
        </Box>
      )}

      {/* Title Section */}
      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
        sx={{
          textAlign: "center",
          marginBottom: "20px",
          color: "#3251A1",
        }}
      >
        {article.title}
      </Typography>

      {/* Metadata Section */}
      <Typography
        variant="body2"
        color="text.secondary"
        gutterBottom
        sx={{
          textAlign: "center",
          fontStyle: "italic",
        }}
      >
        {new Date(article.created_at).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </Typography>

      {/* Content Section */}
      {article.content ? (
        <Box
          sx={{
            typography: "body1",
            lineHeight: 1.8,
            marginTop: "20px",
            color: "#333",
          }}
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      ) : (
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ marginTop: "20px" }}
        >
          No content available for this article.
        </Typography>
      )}
    </Box>
  );
};

export default SingleArticlePage;
