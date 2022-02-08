import axios from 'axios';
import { BASE_API_URL } from './constants.js';

const getStory = async (id) => {
  try {
    const story = await axios.get(`${BASE_API_URL}/item/${id}.json`);
    return story;
  } catch (error) {
    console.log('Error while getting a story.');
  }
};

export const getStories = async (type) => {
  try {
    const { data: storyIds } = await axios.get(
      `${BASE_API_URL}/${type}stories.json`
    );
    const stories = await Promise.all(storyIds.slice(0, 30).map(getStory));
    return stories;
  } catch (error) {
    console.log('Error while getting list of stories.');
  }
};

export const getMediaUrl = (tweetMediaGiven, attachments) => {
  for (let i = 0; i < tweetMediaGiven.length; i++) {
    if (tweetMediaGiven[i].media_key == attachments.media_keys[0]) {
      if (tweetMediaGiven[i].preview_image_url) {
        return tweetMediaGiven[i].preview_image_url;
      }
      return tweetMediaGiven[i].url;
    }
  }
};


export const getUserTweets = async () => {
  const response = await fetch("/api/recent_twitter_posts");
  const body = await response.json();

  if (response.status !== 200) {
    throw Error(body.message);
  }
  return body;
};


export const getTwitterUserData = async () => {
  const response = await fetch("/api/twitter_user");
  const body = await response.json();

  if (response.status !== 200) {
    throw Error(body.message);
  }
  return body;
};
