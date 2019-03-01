// This test file uses the tape testing framework.
// To learn more, go here: https://github.com/substack/tape
const { Config, Scenario } = require("@holochain/holochain-nodejs");
Scenario.setTape(require("tape"));

const dnaPath = "./dist/bundle.json";
const agentAlice = Config.agent("alice");
const dna = Config.dna(dnaPath);
const instanceAlice = Config.instance(agentAlice, dna);
const scenario = new Scenario([instanceAlice]);

scenario.runTape("description of example test", (t, { alice }) => {});
