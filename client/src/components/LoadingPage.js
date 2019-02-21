import React from "react";
import loadingGif from "../assets/playstation.gif";

const loadingContainer = {
  display: "flex",
  justifyContent: "center",
  backgroundColor: "rgb(11, 89, 181)",
  padding: "0",
  margin: "0",
  height: "100%",
  position: "absolute",
  top: 0,
  zIndex: -100,
  width: "-webkit-fill-available"
};

const LoadingPage = () => {
  return (
    <div style={loadingContainer}>
      <img
        src={loadingGif}
        width="800px"
        height="600px"
        alt="loading games..."
      />
    </div>
  );
};

export default LoadingPage;
