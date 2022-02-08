import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { getMediaUrl, getUserTweets } from "../utils/apis.js";

const TwitterFeed = ({ layout }) => {
  const [tweets, setTweets] = useState([]);
  const [tweetMedia, setTweetMedia] = useState([]);
  const theme = useTheme();

  useEffect(async () => {
    const tweetResponse = await getUserTweets();
    console.log(tweetResponse.includes.media);

    setTweets(tweetResponse.data);
    setTweetMedia(tweetResponse.includes.media);
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
      {tweets &&
        tweets.map((tweet) => (
          <Card
            sx={{
              display: "flex",
              color: "#1DA1F2",
              borderBottomColor: "rgb(239, 243, 244)",
              border: "solid rgb(239, 243, 244)",
              margin: "1%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                paddingRight: "2%",
              }}
            >
              <CardContent sx={{ flex: "1 0 auto" }}>
                <Typography component="div" variant="p">
                  {tweet.text}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  {tweet.id}
                </Typography>
              </CardContent>
            </Box>
            {tweet.attachments && (
              <Button
                onClick={(event) => {
                  console.log(event);
                }}
              >
                <CardMedia
                  component="img"
                  sx={{ width: 151 }}
                  src={getMediaUrl(tweetMedia, tweet.attachments)}
                />
              </Button>
            )}
          </Card>
        ))}
    </div>
  );
};

export default TwitterFeed;
