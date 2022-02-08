import logo from "./logo.svg";
import "./App.css";
import ResponsiveAppBar from "./components/ResponsiveAppBar.js";
import TwitterFeed from "./components/TwitterFeed.js";
import RSSFeed from "./components/RSSFeed.js";
import ShowStories from "./components/ShowStories.js";
import Button from "@mui/material/Button";
import React, { useState, useEffect } from "react";

function App() {
  const [layout, setLayout] = useState("default");

  const setLayoutPermanent = (layout) => {
    // setter
    localStorage.setItem("layout", layout);
    setLayout(layout);
  };

  useEffect(() => {
    const loadedLayout = localStorage.getItem("layout");
    if (loadedLayout) {
      setLayout(loadedLayout);
    }
  }, []);
  return (
    <div className="App">
      <ResponsiveAppBar />
      <Button onClick={() => setLayoutPermanent("default")} variant="outlined">
        Default
      </Button>
      <Button onClick={() => setLayoutPermanent("minimal")} variant="outlined">
        Minimal
      </Button>
      <div className="Content">
        {layout == "default" ? (
          <>
            <div className="Left">
              <div className="HNContainer">
                <h3
                  style={{
                    width: "80%",
                    margin: "10px auto",
                    padding: "10px",
                    textAlign: "left",
                  }}
                >
                  Daily HN Content
                </h3>
                <ShowStories layout={layout} />
              </div>
            </div>
            <div className="Right">
              <div className="NewsContainer">
                <h3
                  style={{
                    width: "80%",
                    margin: "10px auto",
                    padding: "10px",
                    textAlign: "left",
                  }}
                >
                  Your News
                </h3>

                <RSSFeed layout={layout} />
              </div>
              <div className="TwitterContainer">
                <h3
                  style={{
                    width: "80%",
                    margin: "10px auto",
                    padding: "10px",
                    textAlign: "left",
                  }}
                >
                  Recent Tweets
                </h3>
                <TwitterFeed layout={layout} />
              </div>
            </div>
          </>
        ) : (
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div>
              <ShowStories layout={layout} />
            </div>
            <div>
              <TwitterFeed layout={layout} />
            </div>
            <div style={{ width: "30vw" }}>
              <RSSFeed layout={layout} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
