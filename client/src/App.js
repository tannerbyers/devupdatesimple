import logo from "./logo.svg";
import "./App.css";
import ResponsiveAppBar from "./components/ResponsiveAppBar.js";
import TwitterFeed from "./components/TwitterFeed.js";
import RSSFeed from "./components/RSSFeed.js";
import ShowStories from "./components/ShowStories.js";

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
          <h3>Daily HN Content</h3>
          <div className="HNContainer">
            <ShowStories />
          </div>
        </div>
        <div className="Right">
          <h3>Recent Tweets</h3>
          <div className="TwitterContainer">
            <TwitterFeed />
          </div>
          <h3>Your News</h3>
          <div className="NewsContainer">
            <RSSFeed />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
