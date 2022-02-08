import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { timeSince } from "../utils/utils.js";

const getRSSFeed = async () => {
  const response = await fetch("/api/rss_feed");
  const body = await response.json();
  if (response.status !== 200) {
    throw Error(body.message);
  }
  return body;
};

function convertToPlain(html) {
  // Create a new div element
  var tempDivElement = document.createElement("div");

  // Set the HTML content with the given value
  tempDivElement.innerHTML = html;

  // Retrieve the text property of the element
  return tempDivElement.textContent || tempDivElement.innerText || "";
}

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
                  maxHeight: "10vh",
                  border: "solid rgb(239, 243, 244)",
                  margin: "1%",
                  paddingLeft: "5%",
                  textAlign: "left",
                }}
              >
                <p style={{ float: "right", paddingRight: "5%" }}>
                  {timeSince(new Date(article.pubDate))}
                </p>
                <h4>{article.title}</h4>
                {/* <div style={{ fontSize: ".9rem" }}>
                  {convertToPlain(article.content).slice(0, 180) + "..."}
                </div> */}
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
