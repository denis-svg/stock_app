import React, { useEffect, useState } from "react";
import {
  Container,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  Grid,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ProtectedRoute from "./ProtectedRoute";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";

const CommentsSection = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [refresh, setRefresh] = useState(true);
  const commentsPerPage = 5;
  useEffect(() => {
    fetchComments();
  }, [currentPage, refresh]);

  const fetchComments = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/v1/comment?page=${currentPage}`,
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch comments");
      }
      const data = await response.json();
      setPages(Math.ceil(data.count / commentsPerPage));
      setComments(data.results);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleNewCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handlePostComment = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await fetch("http://127.0.0.1:8000/api/v1/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          content: newComment,
        }),
      });
      if (!response.ok) {
        console.log(response);
        throw new Error("Failed to post comment");
      }
      const data = await response.json();
      setComments([data, ...comments]);
      setNewComment("");
      setRefresh(!refresh);
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  const handleDeleteComment = async (id) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      await fetch(`http://127.0.0.1:8000/api/v1/comment/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setRefresh(!refresh);
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleNextPage = () => {
    if (currentPage + 1 <= pages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h4" gutterBottom>
          Comments
        </Typography>
        <IconButton component={Link} to="/">
          <HomeIcon />
        </IconButton>
      </Box>
      <Box sx={{ mt: 4 }}>
        <List>
          {comments.map((comment) => (
            <ListItem key={comment.id} sx={{ display: "flex" }}>
              <ListItemText
                primary={comment.content}
                secondary={
                  <Typography variant="body2" color="text.secondary">
                    - {comment.author}
                  </Typography>
                }
              />
              <ProtectedRoute>
                <IconButton
                  aria-label="delete"
                  onClick={() => handleDeleteComment(comment.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </ProtectedRoute>
            </ListItem>
          ))}
        </List>
        <Grid container justifyContent="space-between">
          <Button
            variant="contained"
            color="primary"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button variant="contained" color="primary" onClick={handleNextPage}>
            Next
          </Button>
        </Grid>
      </Box>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Add a Comment
        </Typography>
        <TextField
          label="New Comment"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={newComment}
          onChange={handleNewCommentChange}
          sx={{ mb: 2 }}
        />
        <ProtectedRoute>
          <Button
            variant="contained"
            color="primary"
            onClick={handlePostComment}
          >
            Post Comment
          </Button>
        </ProtectedRoute>
      </Box>
    </Container>
  );
};

export default CommentsSection;
