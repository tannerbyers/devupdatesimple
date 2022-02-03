import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const getRSSFeed = async () => {
  const response = await fetch("/api/rss_feed");
  const body = await response.json();

  if (response.status !== 200) {
    throw Error(body.message);
  }
  return body;
};

const RSSFeed = () => {
  const [RSS, setRSS] = useState([]);
  const theme = useTheme();

  useEffect(async () => {
    const response = await getRSSFeed();
    console.log({ response });
    setRSS(response);
  }, []);

  return (
    <div>
      {RSS.map((article) => (
        <div>
          <CardContent>
            <Typography variant="h5" component="div">
              {article.title}
            </Typography>
            <Typography variant="body2">
              <span>
                <span
                  dangerouslySetInnerHTML={{
                    __html: article.content.slice(0, 400),
                  }}
                />
                <b>...</b>
              </span>
            </Typography>
          </CardContent>
          <CardActions>
            <Button target="_blank" href={article.link} size="small">
              Learn More
            </Button>
          </CardActions>
        </div>
      ))}
    </div>
  );
};

export default RSSFeed;
