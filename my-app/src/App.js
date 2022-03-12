import { Grommet } from "grommet";
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
      brand:"#FF9C2A"
    }
  },
};

function App() {
  return (
    <Grommet theme={theme}>
      <Calculator />
    </Grommet>
  );
}

export default App;
