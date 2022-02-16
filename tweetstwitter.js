// Search for Tweets within the past seven days
// https://developer.twitter.com/en/docs/twitter-api/tweets/search/quick-start/recent-search

import needle from "needle";

// The code below sets the bearer token from your environment variables
// To set environment variables on macOS or Linux, run the export command below from the terminal:
// export BEARER_TOKEN='YOUR-TOKEN'
const token = process.env.BEARER_TOKEN;

const endpointUrl = "https://api.twitter.com/2/tweets/search/recent";

export default async function getUsersTimeline() {
  console.log("Getting user twitter feed!");
  // Edit query parameters below
  // specify a search query, and any additional fields that are required
  // by default, only the Tweet ID and text fields are returned
  const params = {
    // 'query': '(from:tannerlinsley OR adamwathan OR wesbos OR benawad) -is:reply -is:retweet -is:quote ',
    query: "(from:tannerlinsley) -is:reply -is:retweet -is:quote ",
    "tweet.fields": "created_at,author_id",
    expansions: "attachments.media_keys",
    "media.fields": "preview_image_url,url",
  };

  const res = await needle("get", endpointUrl, params, {
    headers: {
      "User-Agent": "v2RecentSearchJS",
      authorization: `Bearer ${token}`,
    },
  });

  if (res.body) {
    return res.body;
  } else {
    throw new Error("Unsuccessful request");
  }
}

// (async () => {
//   try {
//     // Make request
//     const response = await getUsersTimeline();
//     console.dir(response, {
//       depth: null,
//     });
//   } catch (e) {
//     console.log(e);
//     process.exit(-1);
//   }
//   process.exit();
// })();
