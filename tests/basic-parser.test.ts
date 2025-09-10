import { parseCSV } from "../src/basic-parser";
import * as path from "path";

const PEOPLE_CSV_PATH = path.join(__dirname, "../data/people.csv");
const PLAYERS_CSV_PATH = path.join(__dirname, "../data/basketballplayers.csv");

test("parseCSV yields arrays", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH)
  
  expect(results).toHaveLength(5);
  expect(results[0]).toEqual(["name", "age"]);
  expect(results[1]).toEqual(["Alice", "23"]);
  expect(results[2]).toEqual(["Bob", "thirty"]); // why does this work? :(, should ideally error with Zod
  expect(results[3]).toEqual(["Charlie", "25"]);
  expect(results[4]).toEqual(["Nim", "22"]);
});

test("parseCSV yields only arrays", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH)
  for(const row of results) {
    expect(Array.isArray(row)).toBe(true);
  }
});

test("starting parseCSV currently fails with basketball player edge cases", async () => {
  const playerResults = await parseCSV(PLAYERS_CSV_PATH)
  
  expect(playerResults).toHaveLength(11);
  expect(playerResults[0]).toEqual(["Name", "Number", "Place of Birth", "Email"]);
  expect(playerResults[1]).toEqual(["Derrick White", "9", "Colorado", "derrickwhite@yahoo.com"]); 
  expect(playerResults[2]).toEqual(["Jaylen Brown", "7", "California", "brown@gmail.com"]);
  expect(playerResults[7]).toEqual(["Earvin \"Magic\" Johnson", "32", "Michigan", "magic@gmail.com"]); // double quotes in name, works
  expect(playerResults[4]).toEqual(["LeBron", "23", "Ohio", "notavalidemailbron"]); // invalid email, should ideally error with Zod
  expect(playerResults[6]).toEqual(["Jayson Tatum", "zero", "St. Louis", "jaysontatum@gmail.com"]); // number as word, should ideally error with Zod

  expect(playerResults[3]).toEqual(["Curry", "30", "Akron, Ohio", "stephcurry@gmail.com"]); // comma in place of birth, fails
  expect(playerResults[5]).toEqual(["Jordan", "23", "North Carolina", "micheal_jordan@yahoo.com"]); // number as string, fails
  expect(playerResults[8]).toEqual(["easymoneysniper", "35", "D.C", "kd@gmail.com"]); // name in quotes, fails
  expect(playerResults[9]).toEqual(["klay", "11", "L.A.", ""]); // row missing email, fails
  expect(playerResults[9]).toEqual(["klay", "11", "L.A.", "klay@gmail.com"]); // row has extra email, fails
});
