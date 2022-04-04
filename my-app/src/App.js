import { Box, Grommet } from "grommet";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Calculator from "./components/calculator";

const theme = {
  global: {
    font: {
      family: "muli",
      size: "18px",
      height: "20px",
    },
    colors: {
      brand: "#FF9C2A",
    },
  },
};

function App() {
  return (
    <Grommet theme={theme}>
      <Calculator />
      <Box align="center" pad="medium">
        <iframe
          class="video"
          width="560"
          height="315"
          src="https://www.youtube.com/embed/af4ZGbif8EA"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowfullscreen="allowfullscreen"
        ></iframe>
      </Box>
    </Grommet>
  );
}

export default App;
