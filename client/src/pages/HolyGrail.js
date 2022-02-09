import React, { useState, useEffect } from "react";

function HolyGrail() {
  return (
    <div style={{ backgroundColor: "#1976d2" }} className="Content">
      <div className="Center">
        <h2>My Personal List of ✨AMAZING✨ Articles & Tools</h2>
        <h2>Articles</h2>
        <ul style={{ textAlign: "left" }}>
          <li>
            <a target="_blank" href="https://flaviocopes.com/debugging/">
              Debugging JavaScript
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="https://hugodaniel.com/posts/using-just-an-index-to-develop-a-web-app/"
            >
              The Zen of index.html
            </a>
          </li>
          <li>
            <a target="_blank" href="https://jvns.ca/">
              A Cool Dev Doing Cool Things
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="https://jmmv.dev/2021/04/always-be-quitting.html"
            >
              Always Be Quitting
            </a>
          </li>
          <li>
            <a target="_blank" href="https://blog.jim-nielsen.com/">
              A Wise Designer Who Apparently Codes
            </a>
          </li>
        </ul>
        <h2>Tools</h2>
        <ul style={{ textAlign: "left" }}>
          <li>
            <a target="_blank" href="https://openbase.com/">
              Open Source Package Research Tool
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default HolyGrail;
