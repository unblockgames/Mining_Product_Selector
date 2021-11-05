import React from "react";
import { Box, RadioButtonGroup } from "grommet";

export const PlugQty = (props) => {
  return (
    <RadioButtonGroup
      name="plugQty"
      direction="row"
      options={[
        { label: "1 Plug", value: "1" },
        { label: "2 Plugs", value: "2" },
      ]}
      value={props.value}
      onChange={(e) => props.onChange(e)}
      {...props}
    />
  );
};

export const PlugType = (props) => {
  return (
    <RadioButtonGroup
      name="plugType"
      direction="row"
      options={[
        { label: "C13", value: "C13" },
        { label: "C19", value: "C19" },
      ]}
      value={props.value}
      onChange={(e) => props.onChange(e)}
      {...props}
    />
  );
};

export const Service = (props) => {
  return (
    <React.Fragment>
      <Box direction="row">
        <RadioButtonGroup
          name="serviceString"
          direction="column"
          pad="small"
          options={[
            {
              label: "Single Phase 120/240",
              value: "SinglePhase_240",
            },
            { label: "Three Phase 208", value: "ThreePhase_208" },
            { label: "Three Phase 240", value: "ThreePhase_240" },
            { label: "Three Phase 415", value: "ThreePhase_415" },
          ]}
          value={props.value}
          onChange={(e) => props.onChange(e)}
          {...props}
        />
        <RadioButtonGroup
          name="serviceString"
          direction="column"
          pad="small"
          options={[
            { label: "Three Phase 480", value: "ThreePhase_480" },
            {
              label: "ThreePhase_5000+",
              value: "Three_Phase_5000+",
            },
            { label: "IDK", value: "IDK_IDK" },
          ]}
          value={props.value}
          onChange={(e) => props.onChange(e)}
          {...props}
        />
      </Box>
    </React.Fragment>
  );
};
