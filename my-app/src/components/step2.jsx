import React from "react";
import react from "react";
import { Box, Button, TextInput } from "grommet";
import Divider from "@material-ui/core/Divider";
import { Service } from "./radio";

const Step2 = ({
  errors,
  minerQty,
  handleChange,
  serviceString,
  serviceAmps,
  handleSubmit,
}) => {
  return (
    <react.Fragment>
      <Box direction="row-responsive" justify="around" id="row1">
        <Box align="left" id="r1c1" width="250px">
          <h3>Miner Qty</h3>
          <TextInput name="minerQty" onChange={handleChange} value={minerQty} />
          {errors.minerQty && (
            <div className="alert alert-danger">{errors.minerQty}</div>
          )}
        </Box>
        <Box direction="column" align="center" id="r1c2">
          <Divider
            orientation="verticle"
            style={{ height: "100%", width: "1px" }}
          />
        </Box>
        <Box align="left" id="r1c3" width="500px">
          <h3>Service</h3>
          <Service value={serviceString} onChange={(e) => handleChange(e)} />
          {errors.serviceString && (
            <div className="alert alert-danger">{errors.serviceString}</div>
          )}
          {/* <Box>
        <h3>Service Amps Available</h3>
        <p>(leave blank if unknown)</p>
        <TextInput
          name="serviceAmps"
          onChange={handleChange}
          value={serviceAmps}
        />
        {errors.serviceAmps && (
          <div className="alert alert-danger">{errors.serviceAmps}</div>
        )}
        </Box> */}
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

export default Step2;
