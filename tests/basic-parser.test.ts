import { parseCSV } from "../src/basic-parser";
import * as path from "path";

const PEOPLE_CSV_PATH = path.join(__dirname, "../data/people.csv");
const PLAYERS_CSV_PATH = path.join(__dirname, "../data/basketballplayers.csv");
const EMPTY_CSV_PATH = path.join(__dirname, "../data/empty.csv");

test("parseCSV yields arrays", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH, undefined)
  
  expect(results).toHaveLength(5);
  expect(results[0]).toEqual(["name", "age"]);
  expect(results[1]).toEqual(["Alice", "23"]);
  expect(results[2]).toEqual(["Bob", "thirty"]); // why does this work? :(, should ideally error with Zod
  expect(results[3]).toEqual(["Charlie", "25"]);
  expect(results[4]).toEqual(["Nim", "22"]);
});

test("parseCSV yields only arrays", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH, undefined)
  for(const row of results) {
    expect(Array.isArray(row)).toBe(true);
  }
});

test("parseCSV on normal cases", async () => {
  const playerResults = await parseCSV(PLAYERS_CSV_PATH, undefined)
  
  expect(playerResults).toHaveLength(11);
  expect(playerResults[0]).toEqual(["Name", "Number", "Place of Birth", "Email"]);
  expect(playerResults[1]).toEqual(["Derrick White", "9", "Colorado", "derrickwhite@yahoo.com"]); 
  expect(playerResults[2]).toEqual(["Jaylen Brown", "7", "California", "brown@gmail.com"]);
  expect(playerResults[7]).toEqual(["Earvin \"Magic\" Johnson", "32", "Michigan", "magic@gmail.com"]); // double quotes in name, works
});

test("parseCSV with comma", async () => {
  const playerResults = await parseCSV(PLAYERS_CSV_PATH, undefined)
  expect(playerResults[3]).toEqual(["Curry", "30", "Akron, Ohio", "stephcurry@gmail.com"]); // comma in place of birth, fails
});

test("parseCSV when making num a string", async () => {
  const playerResults = await parseCSV(PLAYERS_CSV_PATH, undefined)
  expect(playerResults[5]).toEqual(["Jordan", "23", "North Carolina", "micheal_jordan@yahoo.com"]); // number as string, fails
});

test("parseCSV when putting name in string", async () => {
  const playerResults = await parseCSV(PLAYERS_CSV_PATH, undefined)
  expect(playerResults[8]).toEqual(["easymoneysniper", "35", "D.C.", "kd@gmail.com"]); // name in quotes, fails
});

test("parseCSV with missing last value", async () => {
  const playerResults = await parseCSV(PLAYERS_CSV_PATH, undefined)
  expect(playerResults[9]).toEqual(["klay", "11", "L.A.", ""]); // row missing email, fails
});

test("parseCSV with extra last value", async () => {
  const playerResults = await parseCSV(PLAYERS_CSV_PATH, undefined)
  expect(playerResults[9]).toEqual(["klay", "11", "L.A.", "klay@gmail.com"]); // row has extra email, fails
});

test("parseCSV with empty file", async () => {
  const noResults = await parseCSV(EMPTY_CSV_PATH, undefined)
  expect(noResults).toHaveLength(0);
});


