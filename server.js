import express from "express";
import path from "path"

import { fileURLToPath } from 'url';
import { dirname } from 'path';

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

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, './client/build')));


// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get("/api/express_backend", (req, res) => {
  res.send({ express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" });
});

app.get("/api/recent_twitter_posts", async (req, res) => {
  try {
    // Make request. I'm commenting this out due to rate limitng suspension :c
    // const response = await getUsersTimeline();
    const response = recentTweetsMock;
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
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });
  
