import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContextProvider";
import { usePosts } from "../../context/PostsContextProvider";
import "../../style/posts/PostCard.css";

// like
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

import TurnedInSharpIcon from "@mui/icons-material/TurnedInSharp";
import TurnedInNotSharpIcon from "@mui/icons-material/TurnedInNotSharp";

import CommentSharpIcon from "@mui/icons-material/CommentSharp";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard({ item }) {
  const [expanded, setExpanded] = React.useState(false);

  const navigate = useNavigate();

  const { deletePost, togleLike, togleSelected } = usePosts();
  const { user } = useAuth();

  const [like, setLike] = React.useState(false);
  const [likesLength, setLikesLength] = React.useState(0);

  const handleLike = () => {
    togleLike(item.id, user.email);
    setLike(!like);
  };

  const [selected, setSelected] = React.useState(false);

  const handleSelected = () => {
    togleSelected(item.id, user.email);
    setSelected(!selected);
  };

  React.useEffect(() => {
    if (item.likes.some((item) => item.user === user.email)) {
      setLike(true);
    }
    if (item.selected.some((item) => item === user.email)) {
      setSelected(true);
    }
  }, []);

  React.useEffect(() => {
    setLikesLength(item.likes.length);
  }, [item.likes]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  //   Dropdown menu

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe"></Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon
              id="demo-positioned-button"
              aria-controls={open ? "demo-positioned-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            />
          </IconButton>
        }
        title={item.title}
        subheader={item.date}
      />
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={() => navigate(`/detail/${item.id}`)}>
          Details
        </MenuItem>
        <MenuItem onClick={() => navigate(`/edit/${item.id}`)}>Edit</MenuItem>
        <MenuItem onClick={() => deletePost(item.id)}>Delete</MenuItem>
      </Menu>
      <CardMedia
        component="img"
        height="194"
        image={item.image}
        alt="No connect"
        className="card__img"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Genre of the book: {item.type}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={() => handleLike()}>
          {like ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          {likesLength ? likesLength : ""}
        </IconButton>
        <IconButton aria-label="save" onClick={() => handleSelected()}>
          {selected ? <TurnedInSharpIcon /> : <TurnedInNotSharpIcon />}
        </IconButton>
        <IconButton
          aria-label="comment"
          onClick={() => navigate(`/detail/${item.id}`)}
        >
          <CommentSharpIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{item.desc}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
