import * as fs from "fs";
import * as readline from "readline";
import { ZodType } from "zod";

interface SchemaError {
  error: "Schema Row Mismatch"
  row: string 
}

/**
 * This is a JSDoc comment. Similar to JavaDoc, it documents a public-facing
 * function for others to use. Most modern editors will show the comment when 
 * mousing over this function name. Try it in run-parser.ts!
 * 
 * File I/O in TypeScript is "asynchronous", meaning that we can't just
 * read the file and return its contents. You'll learn more about this 
 * in class. For now, just leave the "async" and "await" where they are. 
 * You shouldn't need to alter them.
 * 
 * @param path The path to the file being loaded.
 * @returns a "promise" to produce a 2-d array of cell values
 * 
 * The function accepts a Zod Schema defining the necessary structure
 * of a CSV row (undefined if not given as a parameter)
 */
export async function parseCSV<T>(path: string, schema?: ZodType<T> | undefined): Promise<T[] | string[][] | SchemaError[]> {
  // This initial block of code reads from a file in Node.js. The "rl"
  // value can be iterated over in a "for" loop. 
  const fileStream = fs.createReadStream(path);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity, // handle different line endings
  });
  
  // Create an empty array to hold the results
  let result = []
  
  // We add the "await" here because file I/O is asynchronous. 
  // We need to force TypeScript to _wait_ for a row before moving on. 
  // More on this in class soon!
  if (schema) {
    let errors: SchemaError[] = []
    for await (const line of rl) {
      const cur_line = line.split(",").map((v) => v.trim());
      const parseResult = schema.safeParse(cur_line);
        if (parseResult.success) {
          result.push(parseResult.data);
        } else {
          errors.push({ error: "Schema Row Mismatch", row: line })
        }
    }

    if (errors.length > 0) {
      return errors
    } else {
      return result
    }
    
  } else {
    for await (const line of rl) {
      const cur_line = line.split(",").map((v) => v.trim());
      result.push(cur_line);
    }

    return result
  }
}