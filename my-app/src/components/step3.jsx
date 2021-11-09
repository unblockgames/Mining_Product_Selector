import React from "react";
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Grid,
  Heading,
  Image,
  Text,
  TextInput,
} from "grommet";
import { getPanel } from "../panels";
import react from "react";
import { getPdus } from "../pdus";

const handleAddToCart = (id, qty) => {
  const urlBase =
    "https://asic-mining-panels.myshopify.com/cart/" + id + ":" + qty;
  window.open(urlBase, "_blank").focus();
};

const Step3 = (props) => {
  props.log();
  let panelsToDisplay = [];
  let pdusToDisplay = getPdus().filter((p) => p.name.includes(props.plugType));
  for (const panel in props.numberOfPanels) {
    panelsToDisplay.push(getPanel(panel)[0]);
  }
  if (props.servicePhase === 1)
    //Display only Single Phase options
    panelsToDisplay = panelsToDisplay.filter((p) => p.input.phase === 1);
  else if (props.serviceVoltage <= 240)
    panelsToDisplay = panelsToDisplay.filter((p) => p.input.maxVoltage <= 240);
  else if (props.serviceVoltage === 480)
    panelsToDisplay = panelsToDisplay.filter((p) => p.input.maxVoltage === 480);
  else if (props.serviceVoltage === 415)
    panelsToDisplay = panelsToDisplay.filter((p) => p.input.maxVoltage === 415);
  return (
    <react.Fragment>
      <Box direction="row" justify="center" id="step3row1">
        <Box pad="small">
          <h3>Miner Qty</h3>
          <TextInput
            name="minerQty"
            onChange={props.handleChange}
            value={props.minerQty}
          />
          {props.errors.minerQty && (
            <div className="alert alert-danger">{props.errors.minerQty}</div>
          )}
        </Box>
        <Box pad="small">
          <h3>Miner Watts</h3>
          <TextInput
            name="minerWatts"
            onChange={props.handleChange}
            value={props.minerWatts}
          />
          {props.errors.minerWatts && (
            <div className="alert alert-danger">{props.errors.minerWatts}</div>
          )}
        </Box>
        <Box pad="small">
          <h3>Plug Type - {props.plugType}</h3>
        </Box>
        {props.numberOfPdus["50A_240V_PDU"] === Infinity ? (
          <Box>
            <p>
              Whoops! It looks like your Miner is a bit unique... But don't
              worry!
              <br />
              No Matter the situation, We will get you powered up. Contact us.
            </p>
          </Box>
        ) : (
          ""
        )}
      </Box>
      <Box pad="small" id="row2">
        <Grid columns="small" gap="small">
          {pdusToDisplay.map((pdu) => (
            <Card
              className="product"
              width="250px"
              height="500px"
              onClick={() => console.log("Clicked!")}
              style={{ justifySelf: "center" }}
            >
              <CardHeader justify="end">
                <span class="badge bg-danger">
                  QTY {props.numberOfPdus[pdu.name]}
                </span>
              </CardHeader>
              <CardBody>
                <Image
                  width="200px"
                  height="200px"
                  alignSelf="center"
                  src={pdu.image}
                />
                <Box pad="small" alignSelf="center">
                  <Heading level="4">{pdu.displayName}</Heading>
                  <Text>
                    <sup>$</sup>
                    {pdu.cost.toFixed(2).toLocaleString(undefined)}
                    /ea
                  </Text>
                </Box>
                <Grid pad="xsmall" columns={["3/4", "flex"]}>
                  <Text size="xsmall" alignSelf="start">
                    {/* 0,0 */}
                    Cost for {props.numberOfPdus[pdu.name]} PDU(s)
                  </Text>
                  <Text size="xsmall">
                    {/* 0,1 */}
                    <sup>$</sup>
                    {props.pduCost[pdu.name]
                      .toFixed(2)
                      .toLocaleString(undefined)}
                  </Text>
                  <Text size="xsmall" alignSelf="start">
                    Total Miners Supported
                  </Text>
                  {/* 1,0 */}
                  <Text size="xsmall">
                    {/* 1,1 */}
                    {Math.floor(
                      props.numberOfPdus[pdu.name] *
                        props.numberOfMinersPerPdu[pdu.name]
                    )}
                  </Text>
                  {props.splitters[pdu.name] ? (
                    <react.Fragment>
                      <Text size="xsmall" alignSelf="start">
                        Splitters Needed
                      </Text>
                      {/* 2,0 */}
                      <Text size="xsmall">{props.splitters[pdu.name]}</Text>
                      {/* 2,1 */}
                    </react.Fragment>
                  ) : (
                    ""
                  )}
                </Grid>
              </CardBody>
              <CardFooter
                direction="row"
                justify="evenly"
                height="100px"
                gap="none"
              >
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ width: "45%" }}
                  onClick={() =>
                    handleAddToCart(pdu.shopifyId, props.numberOfPdus[pdu.name])
                  }
                >
                  Buy
                </button>
                <button
                  onClick={() => {
                    window.open(pdu.specSheetUrl, "_blank").focus();
                  }}
                  className="btn btn-secondary"
                  style={{ width: "45%" }}
                >
                  Specs
                </button>
              </CardFooter>
            </Card>
          ))}
          {panelsToDisplay.map((panel) => (
            <Card
              className="product"
              width="250px"
              height="500px"
              onClick={() => console.log("Clicked!")}
              style={{ justifySelf: "center" }}
            >
              <CardHeader justify="end">
                <span class="badge bg-danger">
                  QTY {props.numberOfPanels[panel.name]}
                </span>
              </CardHeader>
              <CardBody>
                <Image
                  width="200px"
                  height="200px"
                  alignSelf="center"
                  src={panel.image}
                />
                <Box wrap="anywhere" pad="small" alignSelf="center">
                  <Heading level="4">{panel.name.replaceAll("_", " ")}</Heading>
                  <Text>
                    <sup>$</sup>
                    {panel.cost.toFixed(2).toLocaleString(undefined)}
                    /ea
                  </Text>
                </Box>
                <Grid pad="xsmall" columns={["3/4", "flex"]}>
                  <Text size="xsmall" alignSelf="start">
                    {/* 0,0 */}
                    Cost for {props.numberOfPanels[panel.name]} Panel(s)
                  </Text>
                  <Text size="xsmall">
                    {/* 0,1 */}
                    <sup>$</sup>
                    {(props.numberOfPanels[panel.name] * panel.cost)
                      .toFixed(2)
                      .toLocaleString(undefined)}
                  </Text>
                  <Text size="xsmall" alignSelf="start">
                    Total Miners Supported
                  </Text>
                  {/* 1,0 */}
                  <Text size="xsmall">
                    {/* 1,1 */}{" "}
                    {/* TODO: I THINK THIS CONTAINS AN ERROR. NEED TO CALCULATE MINERS PER PANEL AND SEND HERE AND OUTPUT THAT NUMBER ERROR ERROR ERROR!!!!!!!!!!*/}
                    {props.numberOfMinersPerPanel[panel.name]}
                    {/* TODO: I THINK THIS CONTAINS AN ERROR. NEED TO CALCULATE MINERS PER PANEL AND SEND HERE AND OUTPUT THAT NUMBER ERROR ERROR ERROR!!!!!!!!!!*/}
                  </Text>
                  {props.splitters[panel.name + panel.pdus[0].name] > 0 ? (
                    <react.Fragment>
                      <Text size="xsmall" alignSelf="start">
                        Splitters Needed
                      </Text>
                      {/* 2,0 */}
                      <Text size="xsmall">
                        {props.splitters[panel.name + panel.pdus[0].name]}
                      </Text>
                      {/* 2,1 */}
                    </react.Fragment>
                  ) : (
                    ""
                  )}
                </Grid>
              </CardBody>
              <CardFooter
                direction="row"
                justify="evenly"
                height="100px"
                gap="none"
              >
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ width: "45%" }}
                  onClick={() =>
                    handleAddToCart(
                      panel.shopifyId,
                      props.numberOfPanels[panel.name]
                    )
                  }
                >
                  Buy
                </button>
                <button
                  onClick={() => {
                    window.open(panel.specSheetUrl, "_blank").focus();
                  }}
                  className="btn btn-secondary"
                  style={{ width: "45%" }}
                >
                  Specs
                </button>
              </CardFooter>
            </Card>
          ))}
        </Grid>
      </Box>
    </react.Fragment>
  );
};

export default Step3;
