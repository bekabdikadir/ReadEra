import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

import SearchIcon from "@mui/icons-material/Search";

import { usePosts } from "../../context/PostsContextProvider";

import "../../style/posts/PostsList.css";

import InputBase from "@mui/material/InputBase";

export default function SelectedListItem({ setSearch, search }) {
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const { fetchByParams } = usePosts();

  const genres = [
    "Adventure",
    "Classic",
    "Drama",
    "Detective",
    "Fairytale",
    "Fantasy",
    "Horror",
    "Poetry",
    "Romance",
    "Science",
  ];

  return (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <List
        component="nav"
        aria-label="main mailbox folders"
        // sx={{ boxShadow: "5px 5px 29px 2px rgba(34, 60, 80, 0.2)" }}
      >
        <ListItem className="filtration__list_item">
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <SearchIcon />
        </ListItem>
        <Divider />
        <ListItemButton
          selected={selectedIndex === 0}
          onClick={(event) => {
            handleListItemClick(event, 0);
            fetchByParams("type", "All");
          }}
          className="filtration__list_item"
        >
          <ListItemText primary="All" />
        </ListItemButton>
        {genres.map((item, index) => (
          <ListItemButton
            key={index}
            selected={selectedIndex === index + 1}
            onClick={(event) => {
              handleListItemClick(event, index + 1);
              fetchByParams("type", item);
            }}
            className="filtration__list_item"
          >
            <ListItemText primary={item} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}
