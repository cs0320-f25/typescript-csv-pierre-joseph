import { parseCSV } from "../src/basic-parser";
import * as path from "path";

const PEOPLE_CSV_PATH = path.join(__dirname, "../data/people.csv");
const PLAYERS_CSV_PATH = path.join(__dirname, "../data/basketballplayers.csv");

test("parseCSV yields arrays", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH)
  
  expect(results).toHaveLength(5);
  expect(results[0]).toEqual(["name", "age"]);
  expect(results[1]).toEqual(["Alice", "23"]);
  expect(results[2]).toEqual(["Bob", "thirty"]); // why does this work? :(
  expect(results[3]).toEqual(["Charlie", "25"]);
  expect(results[4]).toEqual(["Nim", "22"]);
});

test("parseCSV yields only arrays", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH)
  for(const row of results) {
    expect(Array.isArray(row)).toBe(true);
  }
});

test("basketballplayers", async () => {
  const playerResults = await parseCSV(PLAYERS_CSV_PATH)
  
  expect(playerResults).toHaveLength(6);
  expect(playerResults[0]).toEqual(["Name", "Number", "Place of Birth", "Email"]);
  expect(playerResults[1]).toEqual(["Derrick White", "9", "Colorado", "derrickwhite@yahoo.com"]); 
  expect(playerResults[2]).toEqual(["Jaylen Brown", "7", "California", "brownn@gmail.com"]); 
  expect(playerResults[3]).toEqual(["Curry", "30", "Akron, Ohio", "stephcurry@gmail.com"]); // comma in place of birth
  expect(playerResults[4]).toEqual(["LeBron", "23", "Ohio", "notavalidemailbron"]); // invalid email
  expect(playerResults[5]).toEqual(["Jayson Tatum", "zero", "St. Louis", "jaysontatum@gmail.com"]); // number as word
});
