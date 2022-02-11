import React, { useState, useEffect } from "react";

function About() {
  return (
    <div style={{ backgroundColor: "#1976d2" }} className="Content">
      <div style={{ padding: "2%", textAlign: "left" }} className="Center">
        <h2>Why does this website exist?</h2>
        <p>
          I wanted a website that keeps frontend developers up to date, didn't have ads, and was a nice format, so I
          made one
        </p>
        <h2>I found a bug or have a feature request!?</h2>
        <p>
          Message me on{" "}
          <a style={{ color: "blue" }} href="https://twitter.com/TannerByers7">
            twitter
          </a>{" "}
          or shoot me an email at programtanner@gmail.com{" "}
        </p>

        <h2>Why doesn't this work on mobile?</h2>
        <p>
          I use this on my pc to get news updates in the morning. I don't think
          all the content on a small screen would be worth the effort to
          make this website "responsive".
        </p>
        <h2>Current beliefs that affect the website?</h2>
        <p>
          I try to avoid any news website that has political or adjective heavy
          titles. This is for my personal sanity and I don't expect most users
          to feel the same. I will by default not block these types of websites
          but will provide features for users to block them in the future.
        </p>
        <h2>Who are you?</h2>
        <p>
          I'm{" "}
          <a style={{ color: "blue" }} href="https://twitter.com/TannerByers7">
            Tanner Byers
          </a>{" "}
          and coding is something I enjoy being good at.
        </p>
      </div>
    </div>
  );
}

export default About;
