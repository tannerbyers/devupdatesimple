import express from "express";
import path from "path";
import { createClient } from "redis";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;
import getUsersTimeline from "./tweetstwitter.js";
import getRSSFeeds from "./rssfeed.js";

import { readFile } from "fs/promises";
const recentTweetsMock = JSON.parse(
  await readFile(new URL("./recentTweetsMock.json", import.meta.url))
);

const twitterUserMock = JSON.parse(
  await readFile(new URL("./twitterUserMock.json", import.meta.url))
);

const client = createClient({
  url: 'redis://:pd34953aa7ac8a2f38128bf7a1b27c3397720a97493ee933ac46ab909a19354ef@ec2-54-164-85-38.compute-1.amazonaws.com:16099'
});

client.on("connect", function () {
  console.log("Connected to Redis!");
});

client.on("error", (err) => console.log("Redis Client Error", err));

await client.connect();
const response = await getUsersTimeline();
console.log({ response });
client.set("recent_tweets", JSON.stringify(response), {
  EX: 60,
});

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "./client/build")));

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`));

app.get("/api/recent_twitter_posts", async (req, res) => {
  try {
    // Make request. I'm commenting this out due to rate limitng suspension :c
    // const response = await getUsersTimeline();
    //const response = recentTweetsMock;

    const test = await client.get("recent_tweets");
    res.send(JSON.parse(test));
  } catch (e) {
    console.log(e);
    res.send(
      "Sorry. Some intern tripped on our api cord to twitter. We'll get it fixed up in a jiffy!"
    );
    process.exit(-1);
  }
});

app.get("/api/twitter_user", async (req, res) => {
  try {
    // Make request. I'm commenting this out due to rate limitng suspension :c
    // const response = await getUsersTimeline();
    const response = twitterUserMock;
    res.send(response);
  } catch (e) {
    console.log(e);
    res.send(
      "Sorry. Some intern tripped on our api cord to twitter. We'll get it fixed up in a jiffy!"
    );
    process.exit(-1);
  }
});

app.get("/api/rss_feed", async (req, res) => {
  try {
    // Make request. I'm commenting this out due to rate limitng suspension :c
    // const response = await getUsersTimeline();
    const response = await getRSSFeeds();
    res.send(response);
  } catch (e) {
    console.log(e);
    res.send(
      "Sorry. Some intern tripped on our api cord to twitter. We'll get it fixed up in a jiffy!"
    );
    process.exit(-1);
  }
});

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});
