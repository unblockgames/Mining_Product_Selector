import React from "react";
import { Box } from "grommet";
import { getMiner } from "../miners";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";
import Joi from "joi";
import { getPdus } from "../pdus";
import { getPanels } from "../panels";

class Calculator extends React.Component {
  sqrt3 = 1.732;
  state = {
    step: 1,
    plugQty: "1",
    plugType: "C13",
    minerWatts: "",
    minerQty: undefined,
    electricalBudget: undefined,
    selectedMiner: "",
    serviceString: "",
    serviceVoltage: undefined,
    servicePhase: undefined,
    numberOfPdus: {},
    numberOfPanels: {},
    numberOfMinersPerPdu: undefined,
    splitters: undefined,
    pduCost: {},
    serviceAmps: undefined,
    serviceIDK: false,
    errors: {},
    totalPower: undefined,
    singlePhaseAmps: undefined,
  };
  schemaStep1 = Joi.object({
    minerWatts: Joi.number().integer().required().label("Miner Watts"),
  });
  schemaStep2 = Joi.object({
    minerQty: Joi.number().integer().required(),
    serviceString: Joi.string().required().label("Service"),
  }).messages({
    "object.missing": "You must fill out at least one of these fields.",
  });
  schemaStep3 = Joi.object({
    minerQty: Joi.number().integer().required().label("Miner Qty"),
    minerWatts: Joi.number().integer().required().label("Miner Watts"),
  });

  handleChange = async (e) => {
    let state = { ...this.state };
    state[e.target.name] = e.target.value;
    if (state.minerQty === "" && state.step < 3) state.minerQty = undefined;
    if (state.electricalBudget === "") state.electricalBudget = undefined;
    if (state.serviceAmps === "") state.serviceAmps = undefined;
    await this.setState(state);
    if (state.step === 3) this.handleSubmit();
  };
  selectMiner = (e) => {
    const selectedMiner = e.option;
    let state = { ...this.state };
    if (selectedMiner === "") return;
    else state.selectedMiner = selectedMiner;
    const { plugQty, plugType, minerWatts } = getMiner(selectedMiner)[0];
    state.plugQty = plugQty;
    state.plugType = plugType;
    state.minerWatts = minerWatts;
    this.setState(state);
  };
  handleSubmit = async () => {
    let step = this.state.step;
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    if (step < 3) step = step + 1;
    if (step === 3) {
      const state = this.calculate();
      state.step = 3;
      this.setState(state);
    } else this.setState({ step });
  };
  validate = () => {
    const errors = {};
    let error = {};
    if (this.state.step === 1)
      error = this.schemaStep1.validate({
        minerWatts: this.state.minerWatts,
      });
    if (this.state.step === 2)
      error = this.schemaStep2.validate({
        minerQty: this.state.minerQty,
        serviceString: this.state.serviceString,
      });
    if (this.state.step === 3)
      error = this.schemaStep3.validate({
        minerQty: this.state.minerQty,
        minerWatts: this.state.minerWatts,
      });
    if (error.error) {
      errors[
        error.error.details[0].path[0]
          ? error.error.details[0].path[0]
          : "general"
      ] = error.error.details[0].message;
    } else return null;
    return errors;
  };

  calculate = () => {
    const state = { ...this.state };
    //First check all variables to make sure they are valid
    //Convert serviceString into usable shit
    const serviceArray = state.serviceString.split("_");
    if (serviceArray[0] === "SinglePhase") state.servicePhase = 1;
    else if (serviceArray[0] === "ThreePhase") state.servicePhase = 3;
    else state.servicePhase = undefined;
    if (serviceArray[1] !== "IDK")
      state.serviceVoltage = parseInt(serviceArray[1]);
    else state.serviceVoltage = 240;

    state.singlePhaseAmps = this.calculateSinglePhaseAmps(
      state.minerQty,
      state.minerWatts,
      state.serviceVoltage
    );
    state.totalPower = Math.ceil(state.minerQty * state.minerWatts);

    const result = this.calculatePdu(
      state.minerWatts,
      state.minerQty,
      state.plugQty,
      state.plugType,
      state.serviceVoltage
    );
    state.numberOfPdus = result.numberOfPdus;
    state.pduCost = result.pduCost;
    state.splitters = result.splitters;
    state.numberOfMinersPerPdu = result.numberOfMinersPerPdu;
    const result2 = this.calculatePanel(
      state.numberOfPdus,
      state.splitters,
      state.minerQty,
      state.plugQty,
      state.minerWatts,
      state.serviceVoltage,
      state.numberOfMinersPerPdu
    );
    state.numberOfMinersPerPanel = result2.numberOfMinersPerPanel;
    state.numberOfPanels = result2.numberOfPanels;
    return state;
  };

  calculatePdu = (minerWatts, minerQty, plugQty, plugType, serviceVoltage) => {
    const numberOfPdus = {};
    const numberOfMinersPerPduPowerwise = {};
    const numberOfMinersPerPduPlugwise = {};
    const potentialAdditionalMinersPerPdu = {};
    const numberOfMinersPerPdu = {};
    const splitters = {};
    const continousLoadFactor = 0.8;
    const pduCost = {};
    const pdus = getPdus();
    let minerAmps;
    //calculate the number of pdus needed amps wise
    for (let pdu of pdus) {
      if (plugQty === "2")
        numberOfMinersPerPduPowerwise[pdu.name] =
          Math.floor(
            ((pdu.maxAmps *
              continousLoadFactor *
              (serviceVoltage < 240 ? serviceVoltage : 240)) /
              minerWatts) *
              2
          ) / 2;
      else
        numberOfMinersPerPduPowerwise[pdu.name] = Math.floor(
          (pdu.maxAmps *
            continousLoadFactor *
            (serviceVoltage < 240 ? serviceVoltage : 240)) /
            minerWatts
        );
      if (plugType === "C13") {
        //calculate whether or not splitters can be used...
        minerAmps =
          serviceVoltage < 240 ? minerWatts / serviceVoltage : minerWatts / 240;
        if (10 /*The max amperage of a C13 cable*/ / minerAmps >= 2) {
          //splitters can be used!
          potentialAdditionalMinersPerPdu[pdu.name] =
            numberOfMinersPerPduPowerwise[pdu.name] - pdu.plugQty;
          if (potentialAdditionalMinersPerPdu[pdu.name] >= pdu.plugQty)
            //Max it out ALL SPLITTERS GO
            numberOfMinersPerPduPlugwise[pdu.name] = pdu.plugQty * 2;
          else if (potentialAdditionalMinersPerPdu[pdu.name] >= 1)
            numberOfMinersPerPduPlugwise[pdu.name] =
              pdu.plugQty + potentialAdditionalMinersPerPdu[pdu.name];
        }
      }
      if (numberOfMinersPerPduPlugwise[pdu.name]) {
        //Plugs are the limiting Factor
        numberOfPdus[pdu.name] = Math.ceil(
          minerQty / numberOfMinersPerPduPlugwise[pdu.name]
        );
        splitters[pdu.name] =
          minerQty * plugQty - numberOfPdus[pdu.name] * pdu.plugQty;
        pduCost[pdu.name] = numberOfPdus[pdu.name] * pdu.cost; // + the cost of splitters if any
        numberOfMinersPerPdu[pdu.name] = numberOfMinersPerPduPlugwise[pdu.name];
      } else {
        //Power is the limiting factor
        numberOfPdus[pdu.name] = Math.ceil(
          minerQty / numberOfMinersPerPduPowerwise[pdu.name]
        );
        pduCost[pdu.name] = numberOfPdus[pdu.name] * pdu.cost;
        numberOfMinersPerPdu[pdu.name] =
          numberOfMinersPerPduPowerwise[pdu.name];
      }
    }
    return { numberOfPdus, splitters, pduCost, numberOfMinersPerPdu };
  };

  calculatePanel = (
    numberOfPdus,
    splitters,
    minerQty,
    plugQty,
    minerWatts,
    serviceVoltage,
    numberOfMinersPerPdu
  ) => {
    const panels = getPanels();
    const pdus = getPdus();
    const numberOfPanels = {};
    const numberOfMinersPerPanel = {};
    for (const panel of panels) {
      let panelsNeededByPduCount = Math.ceil(
        numberOfPdus[panel.pdus[0].name] / panel.pdus[0].count
      );
      let panelsNeededByPower = Math.ceil(
        (minerWatts * minerQty) /
          (serviceVoltage <= 240 ? serviceVoltage : 240) /
          panel.output.continuousSinglePhaseAmps
      );
      if (panelsNeededByPduCount >= panelsNeededByPower) {
        numberOfPanels[panel.name] = panelsNeededByPduCount;
      } else {
        numberOfPanels[panel.name] = panelsNeededByPower;
      }

      //Calculate capacity
      let numberOfMinersTemp1 = Math.floor(
        numberOfPanels[panel.name] *
          panel.pdus[0].count *
          numberOfMinersPerPdu[panel.pdus[0].name]
      );
      let numberOfMinersTemp2 = Math.floor(
        (numberOfPanels[panel.name] *
          panel.output.continuousSinglePhaseAmps *
          (serviceVoltage <= 240 ? serviceVoltage : 240)) /
          minerWatts
      );
      if (numberOfMinersTemp1 <= numberOfMinersTemp2)
        numberOfMinersPerPanel[panel.name] = numberOfMinersTemp1;
      else numberOfMinersPerPanel[panel.name] = numberOfMinersTemp2;

      //recalculate splitters
      if (splitters[panel.pdus[0].name])
        //if it was determined earlier that splitters could be used...
        splitters[panel.name + panel.pdus[0].name] =
          minerQty * plugQty -
          pdus.filter((p) => p.name === panel.pdus[0].name)[0].plugs.c13 *
            panel.pdus[0].count *
            numberOfPanels[panel.name];
    }
    return { numberOfPanels, numberOfMinersPerPanel };
  };

  calculateSinglePhaseAmps = (minerQty, minerWatts, serviceVoltage) => {
    if (serviceVoltage < 240) return (minerWatts / serviceVoltage) * minerQty;
    else return Math.ceil((minerWatts / 240) * minerQty);
  };

  render() {
    const {
      electricalBudget,
      errors,
      plugQty,
      plugType,
      selectedMiner,
      serviceString,
      serviceAmps,
      minerQty,
      minerWatts,
      step,
      serviceVoltage,
      servicePhase,
      numberOfMinersPerPdu,
      numberOfMinersPerPanel,
    } = this.state;
    return (
      <Box align="center">
        <Box
          id="calculator"
          width="1200px"
          margin="100px"
          round="20px"
          border={{
            color: "gray",
            size: "xsmall",
            style: "solid",
            side: "all",
          }}
        >
          {step === 1 ? (
            <h1 style={{ margin: "20px" }} align="center">
              Tell Us About Your Miners
            </h1>
          ) : step === 2 ? (
            <h1 style={{ margin: "20px" }} className="m-2" align="center">
              Miner and Service Info...
            </h1>
          ) : (
            <h1 style={{ margin: "20px" }} className="m-2" align="center">
              Results
            </h1>
          )}
          {errors.general && (
            <div className="alert alert-danger">{errors.general}</div>
          )}
          {step === 1 && (
            <Step1
              minerWatts={minerWatts}
              plugQty={plugQty}
              plugType={plugType}
              selectedMiner={selectedMiner}
              handleChange={this.handleChange}
              selectMiner={this.selectMiner}
              error={errors.minerWatts}
              handleSubmit={this.handleSubmit}
            />
          )}
          {step === 2 && (
            <Step2
              minerQty={minerQty}
              electricalBudget={electricalBudget}
              handleChange={this.handleChange}
              errors={errors}
              serviceString={serviceString}
              serviceAmps={serviceAmps}
              handleSubmit={this.handleSubmit}
            />
          )}
          {step === 3 && (
            <Step3
              {...this.state}
              minerQty={minerQty}
              minerWatts={minerWatts}
              electricalBudget={electricalBudget}
              handleChange={this.handleChange}
              errors={errors}
              serviceVoltage={serviceVoltage}
              servicePhase={servicePhase}
              numberOfMinersPerPdu={numberOfMinersPerPdu}
              numberOfMinersPerPanel={numberOfMinersPerPanel}
              plugType={plugType}
            />
          )}
        </Box>
      </Box>
    );
  }
}

export default Calculator;
