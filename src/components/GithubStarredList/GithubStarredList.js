import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";
import SearchBar from "components/SearchBar/SearchBar";
import GithubStarredUser from "components/GithubStarredList/GithubStarredUser/GithubStarredUser";
import "./GithubStarredList.css";

const GithubStarredList = ({
  githubResponse,
  isLoading,
  isError,
  loadMore,
}) => {
  const onNext = () => {
    loadMore?.();
  };

  return isError ? (
    <div className="error-message">
      Oops! An error occurred. Please try again later.
    </div>
  ) : isLoading ? (
    <Box className="progressBar">
      <CircularProgress />
    </Box>
  ) : (
    <div className="starred-users">
      <SearchBar githubResponse={githubResponse} />

      <InfiniteScroll
        dataLength={githubResponse?.items}
        next={onNext}
        hasMore={githubResponse?.incomplete_results}
        loader={
          <Box className="progressBar">
            <CircularProgress />
          </Box>
        }
      >
        <div className="starred-user-list">
          {githubResponse?.items?.map((item) => (
            <GithubStarredUser item={item} key={item.id} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default GithubStarredList;