import { parseCSV } from "../src/basic-parser";
import * as path from "path";
import { z, ZodType } from "zod";

const PEOPLE_CSV_PATH = path.join(__dirname, "../data/people.csv");
const PLAYERS_CSV_PATH = path.join(__dirname, "../data/basketballplayers.csv");
const IVYS_CSV_PATH = path.join(__dirname, "../data/ivys.csv");
const IPHONES_CSV_PATH = path.join(__dirname, "../data/iphones.csv");
const EMPTY_CSV_PATH = path.join(__dirname, "../data/empty.csv");
const NODATA_CSV_PATH = path.join(__dirname, "../data/nodata.csv");
const NEWLINE_CSV_PATH = path.join(__dirname, "../data/newline.csv");

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

test("parseCSV on normal cases", async () => {
  const playerResults = await parseCSV(PLAYERS_CSV_PATH)
  
  expect(playerResults).toHaveLength(11);
  expect(playerResults[0]).toEqual(["Name", "Number", "Place of Birth", "Email"]);
  expect(playerResults[1]).toEqual(["Derrick White", "9", "Colorado", "derrickwhite@yahoo.com"]); 
  expect(playerResults[2]).toEqual(["Jaylen Brown", "7", "California", "brown@gmail.com"]);
  expect(playerResults[7]).toEqual(["Earvin \"Magic\" Johnson", "32", "Michigan", "magic@gmail.com"]); // double quotes in name, works
});

test("parseCSV with empty file", async () => {
  const noResults = await parseCSV(EMPTY_CSV_PATH)
  expect(noResults).toHaveLength(0);
});

test("parseCSV with file with no data", async () => {
  const noData = await parseCSV(NODATA_CSV_PATH)
  expect(noData).toHaveLength(1);
  expect(noData[0]).toEqual(["", "", "", "", ""]); // row just contains no data
});

test("parseCSV with comma", async () => {
  const playerResults = await parseCSV(PLAYERS_CSV_PATH)
  expect(playerResults[3]).toEqual(["Curry", "30", "Akron, Ohio", "stephcurry@gmail.com"]); // comma in place of birth, fails
});

test("parseCSV when making num a string", async () => {
  const playerResults = await parseCSV(PLAYERS_CSV_PATH)
  expect(playerResults[5]).toEqual(["Jordan", "23", "North Carolina", "micheal_jordan@yahoo.com"]); // number as string, fails
});

test("parseCSV when putting name in string", async () => {
  const playerResults = await parseCSV(PLAYERS_CSV_PATH)
  expect(playerResults[8]).toEqual(["easymoneysniper", "35", "D.C.", "kd@gmail.com"]); // name in quotes, fails
});

test("parseCSV with missing last value", async () => {
  const playerResults = await parseCSV(PLAYERS_CSV_PATH)
  expect(playerResults[9]).toEqual(["klay", "11", "L.A.", ""]); // row missing email, fails
});

test("parseCSV with extra last value", async () => {
  const playerResults = await parseCSV(PLAYERS_CSV_PATH)
  expect(playerResults[9]).toEqual(["klay", "11", "L.A.", "klay@gmail.com"]); // row has extra email, fails
});

test("parseCSV with csv data containing newline", async () => {
  const results = await parseCSV(NEWLINE_CSV_PATH) 
  expect(results[0]).toEqual(["I am just a boy", "5"]); 
  expect(results[1]).toEqual(["Hello World", "2"]); 
  expect(results[2]).toEqual(["This goes onto \na newline", "2"]); // row goes onto a new line, fails
});

// Testing csv parsing with schema

const CollegeRowSchema = z.tuple([z.string(), z.string(), z.coerce.number(), z.coerce.number()])
                         .transform( tup => ({name: tup[0], state: tup[1], staff: tup[2], year: tup[3]}) );

test("parseCSV with zod on valid ivy colleges", async () => {
  const collegeResults = await parseCSV(IVYS_CSV_PATH, CollegeRowSchema)
  expect(collegeResults).toHaveLength(8);
  expect(collegeResults[0]).toEqual({ name: "Brown University", state: "RI", staff: 736, year: 1764 });
  expect(collegeResults[1]).toEqual({name: "Columbia University", state: "NY", staff: 4370, year: 1754});
  expect(collegeResults[2]).toEqual({ name: "Cornell University", state: "NY", staff: 2908, year: 1865 }); 
  expect(collegeResults[3]).toEqual({ name: "Dartmouth College", state: "NH", staff: 943, year: 1769 });
  expect(collegeResults[4]).toEqual({ name: "Harvard University", state: "MA", staff: 4671, year: 1636 });
  expect(collegeResults[5]).toEqual({ name: "University of Pennsylvania", state: "PA", staff: 4464, year: 1740 });
  expect(collegeResults[6]).toEqual({ name: "Princeton University", state: "NJ", staff: 1172, year: 1746 });
  expect(collegeResults[7]).toEqual({name: "Yale University", state: "CT", staff: 4140, year: 1701});
});

const PersonRowSchema = z.tuple([z.string(), z.coerce.number()])
                         .transform( tup => ({name: tup[0], age: tup[1]}) );

test("parseCSV with zod on not valid people csv", async () => {
  const peopleResults = await parseCSV(PEOPLE_CSV_PATH, PersonRowSchema)
  expect(peopleResults).toHaveLength(2);
  expect(peopleResults[0]).toEqual({
    error: "Schema Validation Failure", row: "name,age",
    messages: ["Col: 1, Invalid input: expected number, received NaN"]
  });
  expect(peopleResults[1]).toEqual({
    error: "Schema Validation Failure", row: "Bob,thirty",
    messages: ["Col: 1, Invalid input: expected number, received NaN"]
  });
});


const IphoneRowSchema = z.tuple([z.string(), z.coerce.number(), z.coerce.number()])
                         .transform( tup => ({name: tup[0], year: tup[1], price: tup[2]}) );

test("parseCSV with zod on not valid iPhone csv", async () => {
  const iphoneResults = await parseCSV(IPHONES_CSV_PATH, IphoneRowSchema)
  expect(iphoneResults).toHaveLength(2);
  expect(iphoneResults[0]).toEqual({
    error: "Schema Validation Failure", row: "iPhone 15, 799",
    messages: ["Col: 2; Invalid input: expected number, received NaN"]
  });
  expect(iphoneResults[1]).toEqual({
    error: "Schema Validation Failure", row: "iPhone X, 2017, nine hundred ninety nine",
    messages: ["Col: 2; Invalid input: expected number, received NaN"]
  });
});

