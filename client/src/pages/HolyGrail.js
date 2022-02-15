import React, { useState, useEffect } from "react";

function HolyGrail() {
  return (
    <div style={{ backgroundColor: "rgb(14,20,10)" }} className="Content">
      <div className="Center">
        <h2>My Personal List of ✨AMAZING✨ Articles & Tools</h2>
        <h2>Articles or Bloggers</h2>
        <div style={{ textAlign: "left", paddingLeft: "1rem" }}>
          <p>
            <a target="_blank" href="https://flaviocopes.com/debugging/">
              Debugging JavaScript
            </a>
          </p>
          <p>
            <a
              target="_blank"
              href="https://hugodaniel.com/posts/using-just-an-index-to-develop-a-web-app/"
            >
              The Zen of index.html
            </a>
          </p>
          <p>
            <a target="_blank" href="https://jvns.ca/">
              A Cool Dev Doing Cool Things
            </a>
          </p>
          <p>
            <a
              target="_blank"
              href="https://jmmv.dev/2021/04/always-be-quitting.html"
            >
              Always Be Quitting
            </a>
          </p>
          <p>
            <a target="_blank" href="https://blog.jim-nielsen.com/">
              A Wise Designer Who Apparently Codes
            </a>
          </p>
          <p>
            <a target="_blank" href="https://codingmynewlife.com/">
              My Mediocre blog
            </a>
          </p>
        </div>
        <h2>Tools</h2>
        <div style={{ textAlign: "left", paddingLeft: "1rem" }}>
          <p>
            <a target="_blank" href="https://openbase.com/">
              Open Source Package Research Tool
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default HolyGrail;
