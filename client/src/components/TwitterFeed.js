import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

import {
  getMediaUrl,
  getUserTweets,
  getTwitterUserData,
} from "../utils/apis.js";

const TwitterFeed = ({ layout }) => {
  const [tweets, setTweets] = useState([]);
  const [tweetMedia, setTweetMedia] = useState([]);
  const [twitterUsersData, setTwitterUserData] = useState([]);

  useEffect(async () => {
    const tweetResponse = await getUserTweets();
    console.log({ tweetResponse });
    const twitterUser = await getTwitterUserData();
    setTwitterUserData(twitterUser.data);
    setTweets(tweetResponse.data);
    setTweetMedia(tweetResponse.includes.media);
  }, []);

  const getUserData = (tweet, field) => {
    const specificUser = twitterUsersData.filter(
      (user) => user.id == tweet.author_id
    );
    return specificUser[0][field];
  };

  const removeTwitterImageLink = (text) => {
    // IDK why but twitter adds a custom url for the image in a tweet. I am using the attachments to get the link. I decided to just remove the link.
    // I might want to just iterate over the string and if I find a t.co link, make it an image src or something idk.
    var cleanedURL = text.replace(/(?:https):\/\/(t.co)[\n\S]+/g, "");
    return cleanedURL;
  };

  return (
    <div
      style={{
        justifyContent: "center",
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      {tweets.length > 0 ? (
        tweets.map((tweet) => (
          <Card
            sx={{
              display: "flex",
              margin: "1%",
              padding: "1%",
              border: "solid rgb(239, 243, 244)",
              width: "30%",
              minWidth: "300px",
              textAlign: "left",
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
              <div style={{ width: "10vw" }}>
                <p style={{ whiteSpace: "normal" }}>
                  {removeTwitterImageLink(tweet.text)}
                </p>
              </div>
              {tweet.attachments && (
                <div style={{ textAlign: "left" }}>
                  <Zoom>
                    <CardMedia
                      component="img"
                      sx={{
                        height: 200,
                        width: 200,
                        margin: "1rem",
                        padding: "1rem 0 1rem 0",
                        border: ".1rem solid lightgrey",
                        borderRadius: "5px",
                        objectFit: "scale-down",
                      }}
                      src={getMediaUrl(tweetMedia, tweet.attachments)}
                    />
                  </Zoom>
                </div>
              )}
            </div>
          </Card>
        ))
      ) : (
        <div>No New Tweets This Week from Ben </div>
      )}
    </div>
  );
};

export default TwitterFeed;
