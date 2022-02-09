import moment from "moment";
import Parser from "rss-parser";

import { readFile } from "fs/promises";
const feeds = JSON.parse(
  await readFile(new URL("./feeds.json", import.meta.url))
);
// TODO go through this link and add more rss feeds: "https://github.com/impressivewebs/frontend-feeds"
function requestBlogs(urls) {
  const parser = new Parser({
    timeout: 20000,
  });
  const year = moment({ hour: 0, minute: 0, seconds: 0 }).add(-365, "days");
  const today = moment({ hour: 0, minute: 0, seconds: 0 });
  return urls.map((url, i) => {
    return new Promise((resolve, reject) => {
      try {
        parser
          .parseURL(url)
          .then((feed) => {
            console.log(feed.items);
            const blogs = feed.items
              .map((item) => ({
                baseUrl: urls[i],
                title: item.title,
                link: item.link,
                content: item.content || item["content:encoded"],
                pubDate: new Date(item.pubDate),
              }))
              .filter((item) => year < item.pubDate && today > item.pubDate);

            resolve(blogs);
          })
          .catch((error) => {
            console.error(url, error);
            resolve([]);
          });
      } catch (error) {
        console.log(error);
        reject([]);
      }
    });
  });
}

export default function getRSSFeeds(categroy = "en") {
  return Promise.all(requestBlogs(feeds[categroy])).then((blogs) => {
    return blogs
      .reduce((current, all) => [...current, ...all], [])
      .filter((blog, index, array) => {
        return array.findIndex((item) => item.title === blog.title) === index;
      });
  });
}
