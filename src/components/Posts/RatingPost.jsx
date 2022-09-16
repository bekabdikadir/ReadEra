import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

import { usePosts } from "../../context/PostsContextProvider";
import { useAuth } from "../../context/AuthContextProvider";

export default function BasicRating({ post }) {
  const { rating, getRating, postRating } = usePosts();
  const { user } = useAuth();

  const [postRate, setPostRate] = useState(rating);

  useEffect(() => {
    getRating(post.id);
  }, []);

  useEffect(() => {
    console.log(rating);
    setPostRate(rating);
  }, [rating]);

  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
      }}
    >
      <Typography component="legend">Raiting</Typography>
      <Rating
        name="simple-controlled"
        value={postRate}
        onChange={(event, newValue) => {
          postRating(post.id, user.email, newValue);
        }}
      />
    </Box>
  );
}
