import React from "react";
import { timeSinceDate } from "../utils/utils";

const Link = ({ url, title, bold }) => {
  return (
    <>
      {bold ? (
        <b>
          <a href={url} target="_blank" rel="noreferrer">
            {title}
          </a>
        </b>
      ) : (
        <a
          style={{ color: "grey" }}
          href={url}
          target="_blank"
          rel="noreferrer"
        >
          {title}
        </a>
      )}
    </>
  );
};
const Story = ({ story: { id, by, title, kids, time, url, score } }) => {
  return (
    <div className="story">
      <b
        style={{
          display: "flex",
          marginRight: "1rem",
          borderRadius: "10px",
          textAlign: "center",
          justifyContent: "center",
          color: "#1976d2",
        }}
      >
        {score}
      </b>
      <div>
        <div className="story-title">
          <Link bold url={url} title={title} />
          <Link
            url={url}
            title={" (" + (url?.split("/")[2] || "hackernews.com") + ")"}
          />
          <span>
            <a href="#">...</a>
          </span>
        </div>
        <div className="story-info">
          <span>
            by{" "}
            <Link
              url={`https://news.ycombinator.com/user?id=${by}`}
              title={by}
            />
          </span>
          |<span>{timeSinceDate(new Date(time * 1000))}</span>|
          <span>
            <Link
              url={`https://news.ycombinator.com/item?id=${id}`}
              title={`${kids && kids.length > 0 ? kids.length : 0} comments`}
            />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Story;
