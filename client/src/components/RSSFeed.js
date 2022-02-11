import React, { useEffect, useState, useCallback } from "react";
import Article from "./Article.js";

const getRSSFeed = async () => {
  const response = await fetch("/api/rss_feed");
  const body = await response.json();
  if (response.status !== 200) {
    throw Error(body.message);
  }
  return body;
};

const RSSFeed = ({ layout }) => {
  const [RSS, setRSS] = useState([]);

  useEffect(async () => {
    const response = await getRSSFeed();
    setRSS(response);
  }, []);

  return (
    <div
      style={{
        width: "80%",
        margin: "10px auto",
        padding: "10px",
        textAlign: "left",
      }}
    >
      {RSS.sort(function (a, b) {
        // Sort by most recent Published Date
        return new Date(b.pubDate) - new Date(a.pubDate);
      }).map((article) => (
        <Article article={article} />
      ))}
    </div>
  );
};

export default RSSFeed;
