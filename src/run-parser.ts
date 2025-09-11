import { parseCSV } from "./basic-parser";

/*
  Example of how to run the parser outside of a test suite.
*/

const DATA_FILE = "./data/basketballplayers.csv"; // update with your actual file name

async function main() {
  // Because the parseCSV function needs to "await" data, we need to do the same here.
  const results = await parseCSV(DATA_FILE, undefined)

  for(const record of results)
    console.log(record)
}

main();