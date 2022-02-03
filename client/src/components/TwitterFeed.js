import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const getUserTweets = async () => {
  const response = await fetch("/api/recent_twitter_posts");
  const body = await response.json();

  if (response.status !== 200) {
    throw Error(body.message);
  }
  return body;
};

const getMediaUrl = (tweetMediaGiven, attachments) => {
  for (let i = 0; i < tweetMediaGiven.length; i++) {
    if (tweetMediaGiven[i].media_key == attachments.media_keys[0]) {
      console.log("image found");
      console.log(tweetMediaGiven[i]);
      console.log(tweetMediaGiven[i].preview_image_url);

      if (tweetMediaGiven[i].preview_image_url) {
        return tweetMediaGiven[i].preview_image_url;
      }
      return tweetMediaGiven[i].url;
    }
  }
};

const TwitterFeed = () => {
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
    <>
      {tweets &&
        tweets.map((tweet) => (
          <Card
            sx={{
              display: "flex",
              color: "#1DA1F2",
              borderBottomColor: "rgb(239, 243, 244)",
              border: "solid rgb(239, 243, 244)",
              margin: "1%"
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
    </>
  );
};

export default TwitterFeed;
