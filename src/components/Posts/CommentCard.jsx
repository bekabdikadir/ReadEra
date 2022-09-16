import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import { usePosts } from "../../context/PostsContextProvider";
import { useAuth } from "../../context/AuthContextProvider";

const theme = createTheme({
  palette: {
    primary: {
      main: "#121212",
    },
    secondary: {
      main: "#121212",
    },
  },
});

export default function OutlinedCard({ item, postId }) {
  const { deleteComment } = usePosts();
  const { user } = useAuth();

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography sx={{ fontSize: 16 }} color="black" gutterBottom>
            {item.user}
          </Typography>
          <Typography variant="body2">{item.comment}</Typography>
        </CardContent>
        <CardActions>
          <ThemeProvider theme={theme}>
            <Button
              className="add_comment_button"
              variant="outlined"
              color="secondary"
              onClick={() => deleteComment(postId, user.email, item.id)}
              sx={{
                fontSize: "12px",
                border: "none",
                width: "20%",
              }}
            >
              Delete
            </Button>
          </ThemeProvider>
        </CardActions>
      </Card>
    </Box>
  );
}
