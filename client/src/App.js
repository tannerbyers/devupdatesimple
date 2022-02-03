import logo from "./logo.svg";
import "./App.css";
import ResponsiveAppBar from "./components/ResponsiveAppBar.js";
import TwitterFeed from "./components/TwitterFeed.js";
import RSSFeed from "./components/RSSFeed.js";
import ShowStories from "./components/ShowStories.js"

function App() {
  // fetching the GET route from the Express server which matches the GET route from server.js
  const callBackendAPI = async () => {
    const response = await fetch("/api/twitter_id");
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    console.log(body);
  };

  return (
    <div className="App">
      <ResponsiveAppBar />
      <div className="Content">
        <div className="Left">
          <div className="HNContainer">
          <p>Hacker News Content</p>
          <ShowStories />
          </div>
        </div>
        <div className="Right">
          <div className="TwitterContainer">
            <p>Twitter Feed</p>
            <TwitterFeed />
          </div>
          <div className="NewsContainer">
            <p>Specific News</p>
            <RSSFeed />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
