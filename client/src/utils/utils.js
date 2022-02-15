import {
  Nodedotjs,
  Bootstrap,
  V8,
  ReactJs,
  Googlechrome,
  Google,
  WThreeC,
  Sass,
  Twitter,
} from "@icons-pack/react-simple-icons";

export const timeSinceDate = (date) => {
  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    if (Math.floor(interval) == 1) {
      return Math.floor(interval) + " year ago";
    }
    return Math.floor(interval) + " years ago";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    if (Math.floor(interval) == 1) {
      return Math.floor(interval) + " month ago";
    }
    return Math.floor(interval) + " months ago";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    if (Math.floor(interval) == 1) {
      return Math.floor(interval) + " day ago";
    }
    return Math.floor(interval) + " days ago";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    if (Math.floor(interval) == 1) {
      return Math.floor(interval) + " hour ago";
    }
    return Math.floor(interval) + " hours ago";
  }
  interval = seconds / 60;
  if (interval > 1) {
    if (Math.floor(interval) == 1) {
      return Math.floor(interval) + " minute ago";
    }
    return Math.floor(interval) + " minutes ago";
  }
  if (Math.floor(seconds) == 1) {
    return Math.floor(seconds) + " second ago";
  }
  return Math.floor(seconds) + " seconds ago";
};

export const convertHTMLToPlain = (html) => {
  // Create a new div element
  var tempDivElement = document.createElement("div");

  // Set the HTML content with the given value
  tempDivElement.innerHTML = html;

  // Retrieve the text property of the element
  return tempDivElement.textContent || tempDivElement.innerText || "";
}


export const GetIconWithURL = ({ url }) => {
  switch (url) {
    case "https://blog.twitter.com/engineering/en_us/blog.rss":
      return (
        <div>
          <Twitter
            style={{ paddingRight: ".5rem" }}
            color="#1DA1F2"
            size={30}
          />
        </div>
      );
    case "https://sass-lang.com/feed.xml":
      return (
        <div>
          <Sass style={{ paddingRight: ".5rem" }} color="#CC6699" size={30} />
        </div>
      );
    case "https://nodejs.org/en/feed/blog.xml":
      return (
        <div>
          <Nodedotjs
            style={{ paddingRight: ".5rem" }}
            color="#339933"
            size={30}
          />
        </div>
      );
    case "https://blog.getbootstrap.com/feed.xml":
      return (
        <div>
          <Bootstrap
            style={{ paddingRight: ".5rem" }}
            color="#7952B3"
            size={30}
          />
        </div>
      );

    case "https://www.w3.org/blog/news/feed":
      return (
        <div>
          <WThreeC
            style={{ paddingRight: ".5rem" }}
            color="#005A9C"
            size={30}
          />
        </div>
      );

    case "https://developers.google.com/web/fundamentals/rss.xml":
      return (
        <div>
          <Google style={{ paddingRight: ".5rem" }} color="#4285F4" size={30} />
        </div>
      );

    case "https://blog.google/products/chrome/rss/":
      return (
        <div>
          <Googlechrome
            style={{ paddingRight: ".5rem" }}
            color="#4285F4"
            size={30}
          />
        </div>
      );

    case "https://reactjs.org/feed.xml":
      return (
        <div>
          <ReactJs
            style={{ paddingRight: ".5rem" }}
            color="#61DAFB"
            size={30}
          />
        </div>
      );

    case "https://v8.dev/blog.atom":
      return (
        <div>
          <V8 style={{ paddingRight: ".5rem" }} color="#4B8BF5" size={30} />
        </div>
      );

    default:
      return <>Default</>;
  }
};

export const calculateReadTime = (content) => {
  const textContent = convertHTMLToPlain(content);
  const WPS = 275 / 60;

  var images = 0;
  const regex = /\w/;

  let words = textContent.split(" ").filter((word) => {
    if (word.includes("<img")) {
      images += 1;
    }
    return regex.test(word);
  }).length;

  var imageAdjust = images * 4;
  var imageSecs = 0;
  var imageFactor = 12;

  while (images) {
    imageSecs += imageFactor;
    if (imageFactor > 3) {
      imageFactor -= 1;
    }
    images -= 1;
  }

  const minutes = Math.ceil(((words - imageAdjust) / WPS + imageSecs) / 60);

  return minutes;
}