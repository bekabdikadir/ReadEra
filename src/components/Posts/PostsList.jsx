import React, { useEffect, useState } from "react";
import PostCard from "./PostsCard";
import { usePosts } from "../../context/PostsContextProvider";
import Filtration from "./Filtration";
import { useSearchParams } from "react-router-dom";
import Pagination from "@mui/material/Pagination";

import "../../style/posts/PostsList.css";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { createTheme, ThemeProvider } from "@mui/material/styles";

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

const PostsList = () => {
  const { posts, getPosts } = usePosts();

  useEffect(() => {
    getPosts();
  }, []);

  // Serach Logic start

  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("q") || "");

  useEffect(() => {
    setSearchParams({
      q: search,
    });
  }, [search]);

  useEffect(() => {
    getPosts();
    setPage(1); // pagination при условии поиска продукта
  }, [searchParams]);

  // Search logic end

  // Pagination logic start

  const [page, setPage] = useState(1);
  const itemsOnPage = 6;

  const count = Math.ceil(posts.length / itemsOnPage);

  const handlePage = (e, page) => {
    setPage(page);
  };

  const currentData = () => {
    const begin = (page - 1) * itemsOnPage;
    const end = begin + itemsOnPage;
    return posts.slice(begin, end);
  };

  //  Pagination logic end

  const [active, setActive] = useState(false);

  const handleActive = () => {
    setActive(!active);
  };

  return (
    <>
      <div className="list__container">
        <div
          className={
            active ? "list__filter-block active" : "list__filter-block"
          }
          onClick={(e) => e.stopPropagation()}
        >
          <Filtration search={search} setSearch={setSearch} />
        </div>
        <div className="list__btn-block">
          <ThemeProvider theme={theme}>
            <Button
              className="list__btn"
              variant="outlined"
              color="secondary"
              onClick={() => handleActive()}
            >
              Filtration
            </Button>
          </ThemeProvider>
        </div>
        <div className="list__posts-block">
          {posts ? (
            currentData().map((item) => (
              <div className="card" key={item.id}>
                <PostCard item={item} />
              </div>
            ))
          ) : (
            <h2> loading</h2>
          )}
          <Pagination
            className="list__pagination"
            count={count}
            page={page}
            onChange={handlePage}
          />
        </div>
      </div>
    </>
  );
};

export default PostsList;
