import React from "react";
import { Button, Box, TextInput } from "grommet";
import { PlugQty, PlugType } from "./Radio";
import Divider from "@material-ui/core/Divider";
import { Select } from "grommet";
import _ from "lodash";
import { getMiners } from "../miners";
import react from "react";

const Step1 = ({
  error,
  minerWatts,
  plugQty,
  plugType,
  selectedMiner,
  handleChange,
  selectMiner,
  handleSubmit,
}) => {
  return (
    <react.Fragment>
      <Box direction="row-responsive" justify="around" id="row1">
        <Box align="left" id="r1c1" width="250px">
          <h3>Miner Watts</h3>
          <TextInput
            name="minerWatts"
            onChange={handleChange}
            value={minerWatts}
          />
          {error && <div className="alert alert-danger">{error}</div>}
          <h3># Of Power Inputs</h3>
          <PlugQty value={plugQty} onChange={(e) => handleChange(e)} />
          <h3>Plug Type</h3>
          <PlugType value={plugType} onChange={(e) => handleChange(e)} />
        </Box>
        <Box direction="column" align="center" id="r1c2">
          <Divider
            orientation="verticle"
          />
          <h1>OR</h1>
          <Divider
            orientation="verticle"
          />
        </Box>
        <Box align="right" id="r1c3" width="250px">
          <h3>Choose from a list</h3>
          <Select
            options={_.map(getMiners(), "name")}
            value={selectedMiner}
            onChange={(e) => selectMiner(e)}
            dropHeight="small"
          />
        </Box>
      </Box>
      <Box id="row2">
        <Box align="center">
          <Button
            primary
            style={{ margin: "50px" }}
            size="large"
            label="Next"
            onClick={handleSubmit}
          />
        </Box>
      </Box>
    </react.Fragment>
  );
};

export default Step1;
