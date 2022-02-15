import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import {
  timeSinceDate,
  GetIconWithURL,
  calculateReadTime,
} from "../utils/utils.js";

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
      {layout == "default"
        ? RSS.sort(function (a, b) {
            // Sort by most recent Published Date
            return new Date(b.pubDate) - new Date(a.pubDate);
          }).map((article) => (
            <a href={article.link} target="_blank">
              <Card
                style={{
                  border: "solid rgb(239, 243, 244)",
                  margin: "1%",
                  textAlign: "left",
                  padding: "2%",
                }}
              >
                <p style={{ float: "right", paddingRight: "5%" }}>
                  {timeSinceDate(new Date(article.pubDate))}
                </p>
                <h4 style={{ display: "flex" }}>
                  <GetIconWithURL url={article.baseUrl} />
                  {article.title}
                </h4>
                <p style={{ fontSize: ".8rem", paddingTop: ".3rem" }}>
                  {`${calculateReadTime(article.content)} minute read`}
                </p>
              </Card>
            </a>
          ))
        : RSS.map((article) => (
            <div
              style={{
                margin: "3%",
                textAlign: "left",
                borderBottom: "solid .5 #828282",
              }}
            >
              <a href={article.link}>
                <tr>{article.title}</tr>
                <tr>{article.link.split("/")[2]}</tr>
              </a>
            </div>
          ))}
    </div>
  );
};

export default RSSFeed;
