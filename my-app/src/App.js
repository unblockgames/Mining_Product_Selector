import { Grommet } from "grommet";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Calculator from "./components/calculator";

const theme = {
  global: {
    font: {
      family: "Roboto",
      size: "18px",
      height: "20px",
    },
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
