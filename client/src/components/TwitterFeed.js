import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {
  getMediaUrl,
  getUserTweets,
  getTwitterUserData,
} from "../utils/apis.js";

const TwitterFeed = ({ layout }) => {
  const [tweets, setTweets] = useState([]);
  const [tweetMedia, setTweetMedia] = useState([]);
  const [twitterUsersData, setTwitterUserData] = useState([]);
  const theme = useTheme();

  useEffect(async () => {
    const tweetResponse = await getUserTweets();
    const twitterUser = await getTwitterUserData();
    setTwitterUserData(twitterUser.data);
    setTweets(tweetResponse.data);
    setTweetMedia(tweetResponse.includes.media);
  }, []);

  const getUserData = (tweet, field) => {
    const specificUser = twitterUsersData.filter(
      (user) => user.id == tweet.author_id
    );
    console.log(specificUser[0][field]);
    return specificUser[0][field];
  };

  const removeTwitterImageLink = (text) => {
    // IDK why but twitter adds a custom url for the image in a tweet. I am using the attachments to get the link. I decided to just remove the link.
    // I might want to just iterate over the string and if I find a t.co link, make it an image src or something idk.
    const stringArray = text.split(" ");
    const result = stringArray.filter((word) => word.indexOf("t.co") === -1);

    return result.join(" ");
  };

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
        ? tweets.map((tweet) => (
            <Card
              sx={{
                display: "flex",
                margin: "1%",
                padding: "5%",
              }}
            >
              <div style={{ paddingRight: "5%" }}>
                <img src={getUserData(tweet, "profile_image_url")} />
              </div>
              <div>
                <div
                  style={{
                    display: "flex",
                    color: "black",
                    minWidth: "20vw",
                  }}
                >
                  <b>{getUserData(tweet, "name")}</b>
                  <p style={{ color: "grey", paddingLeft: "2%" }}>
                    @{getUserData(tweet, "username")}
                  </p>
                </div>
                <p>{removeTwitterImageLink(tweet.text)}</p>
                {tweet.attachments && (
                  <CardMedia
                    component="img"
                    sx={{ width: 151 }}
                    src={getMediaUrl(tweetMedia, tweet.attachments)}
                  />
                )}
              </div>
            </Card>
          ))
        : tweets.map((tweet) => (
            <Card
              sx={{
                display: "flex",
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
