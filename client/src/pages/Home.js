import "../App.css";
import ResponsiveAppBar from "../components/ResponsiveAppBar.js";
import TwitterFeed from "../components/TwitterFeed.js";
import RSSFeed from "../components/RSSFeed.js";
import ShowStories from "../components/ShowStories.js";
import Button from "@mui/material/Button";
import React, { useState, useEffect } from "react";

function Home() {
  const [layout, setLayout] = useState("default");
  const [HNCategory, setHNCategory] = useState("top");

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
  {
    /* <Button onClick={() => setLayoutPermanent("default")} variant="outlined">
        Default
      </Button>
      <Button onClick={() => setLayoutPermanent("minimal")} variant="outlined">
        Minimal
      </Button> */
  }
  return (
    <div style={{ backgroundColor: "#1976d2" }} className="Content">
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
              <Button variant="outlined" onClick={() => setHNCategory("top")}>
                top
              </Button>
              <Button variant="outlined" onClick={() => setHNCategory("new")}>
                latest
              </Button>
              <Button variant="outlined" onClick={() => setHNCategory("best")}>
                best
              </Button>
              <ShowStories type={HNCategory} layout={layout} />
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
  );
}

export default Home;
