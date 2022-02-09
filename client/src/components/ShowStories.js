import React from "react";
import Story from "./Story";
import useDataFetcher from "../hooks/dataFetcher";

const ShowStories = ({ type, layout }) => {
  const { isLoading, stories } = useDataFetcher(type ? type : "top");

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <React.Fragment>
      {stories.map(
        ({ data: story }) => story && <Story key={story.id} story={story} />
      )}
    </React.Fragment>
  );
};

export default ShowStories;
