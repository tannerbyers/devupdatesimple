import { useState, useCallback } from "react";
import { Controlled as ControlledZoom } from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import Card from "@mui/material/Card";
import { timeSinceDate, GetIconWithURL } from "../utils/utils.js";

const Article = ({ article }) => {
  const [isZoomed, setIsZoomed] = useState(false);

  const handleImgLoad = useCallback(() => {
    setIsZoomed(true);
  }, []);

  const handleZoomChange = useCallback((shouldZoom) => {
    setIsZoomed(shouldZoom);
  }, []);

  if (article.content.length < 5000) {
    return (
      <ControlledZoom
        onClick={handleImgLoad}
        isZoomed={isZoomed}
        onZoomChange={handleZoomChange}
        scrollableEl={true}
      >
        <Card
          style={{
            border: "solid rgb(239, 243, 244)",
            margin: "1%",
            textAlign: "left",
            padding: "2%",
            width: "30vw",
          }}
        >
          <div className={isZoomed && "zoomed"}>
            <p style={{ float: "right", paddingRight: "5%" }}>
              {timeSinceDate(new Date(article.pubDate))}
            </p>
            <h4 style={{ display: "flex" }}>
              <GetIconWithURL url={article.baseUrl} />
              {article.title}
            </h4>
            <p>{Math.ceil(article.content.length / 4 / 60)} minute read</p>
            <div
              className={isZoomed ? "show" : "noshow"}
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </div>
        </Card>
      </ControlledZoom>
    );
  } else {
    return <></>;
  }
  //else {
  //     return (
  //       <Card
  //         style={{
  //           border: "solid rgb(239, 243, 244)",
  //           margin: "1%",
  //           textAlign: "left",
  //           padding: "2%",
  //         }}
  //       >
  //         <a target="_blank" href={article.link}>
  //           <p style={{ float: "right", paddingRight: "5%" }}>
  //             {timeSinceDate(new Date(article.pubDate))}
  //           </p>
  //           <h4 style={{ display: "flex" }}>
  //             <GetIconWithURL url={article.baseUrl} />
  //             {article.title}
  //           </h4>
  //           <p>{article.content.length}</p>
  //           <div
  //             className={isZoomed ? "show" : "noshow"}
  //             dangerouslySetInnerHTML={{ __html: article.content }}
  //           />
  //         </a>
  //       </Card>
  //     );
  //   }
};

export default Article;
