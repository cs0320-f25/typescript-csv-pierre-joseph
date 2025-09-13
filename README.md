# Sprint 1: TypeScript CSV

### Task B: Proposing Enhancement

- #### Step 1: Brainstorm on your own.
    1. Functionality: The CSV parser should understand how to deal with and not split up data which is in quotes
    2. Functionality: The CSV parser should be told whether or not they are column headers and deal with that accordingly
    3. Extensibility: There should be some type validation mechanism to check if the caller's csv data has the types that the caller desires. 
    4. Extensibility: The caller should be able to recieve some type of error handling feedback if their csv data is not in the proper format/types that they desire
    5. Extensibility: The caller should be able to recieve back their csv data in whatever format that they individually desire
    6. Extensibility: The caller should be able to specify whatever their delimiter is and shouldn't be limited to only commas

- #### Step 2: Use an LLM to help expand your perspective.

For my first prompt, I asked chatgpt about what specific improvements and features that I can add to my csv parser to help both users and developers. In the second prompt, I asked chatgpt about what specific edge cases I should consider when making a csv parser. Overall, the main results that chatgpt gave me in both scenarios consisted of similar suggestions such as dealing with quoted fields, delimiters, column headers, and empty values. However, for the first prompt targeted more at developers, I found chatgpt to expand a bit more on what developers might care about such as things like flexible API design and performance optimzations which seemed to be out of the scope of the enhancements that I find most useful to explore at the moment. 

- #### Step 3: Propose enhancements in your project README file.

    Include a list of the top 4 enhancements or edge cases you think are most valuable to explore in the next week’s sprint. Label them clearly by category (extensibility vs. functionality), and include whether they came from you, the LLM, or both. Describe these using the User Story format—see below for a definition. 
    1. Functionality: As a user of this csv parser, I can properly parse through my csv file containing data in double quotes, so that I can properly deal with data with commas and recieve accurate infomation from data in double quotes in my file. (came from both me and LLM)
    2. Functionality: As a user of this csv parser, I can properly specify whether or not I have a column header so that in the case where my csv file does contain a column header, the csv file does not return it as part of the data. (came from both me and LLM)
    3. Extensibility: As a user of this csv parser, I can properly specify what I want to deal with extra or missing data in my csv file (e.g. whether that be error/replace with ""/ skip row etc.) so that I have creative control over how extra or missing data is dealt with for my data (came from LLM)
    4. Extensibility: As an user of this csv parser, I can parse through my csv file of a custom delimiter (e.g. |, ;, or tab), so that I can parse through my different csv format types. (came from both me and LLM)

    Include your notes from above: what were your initial ideas, what did the LLM suggest, and how did the results differ by prompt? What resonated with you, and what didn’t? (3-5 sentences.) 

    Overall, chatgpt seemed to agree with most of my original ideas regarding which edge cases are most valuable to add to the parser was able to give me extra clarity on my thoughts. Overall, the LLM provided me ideas such as what to do regarding quoting rules, delimiters, empty values, headers, encodings, and malformed input. I found the LLM to be more useful and resonate more with me when I asked more about the specific user edge cases I should be considering, rather when I asked it about improvements for developer usability. 
    
### Design Choices

Whenever someone provided a csv file which did now meet the specified Zod Schema specification, I decided to return a list of errors (with custom SchemaError interface), containing a list of errors for every row in the csv file which did not meet the Schema. I decided to do this so that the caller knows everywhere their csv file fails their desired specification, so they can do something about it. 

### 1340 Supplement

- #### 1. Correctness
In order for an CSV parser to be correct it should:
    - Separate rows of a csv file based on newlines
    - Separate data in rows based on a specified delimiter (most commonly just a comma)
    - Keep the data in an csv intact and do not add/remove any csv data to the file
    - Return back a list containing the starting rows in the caller's desired row format
    - Give the caller a error or some type of feedback if starting csv file is not formatted as the caller desires

- #### 2. Random, On-Demand Generation

Random, on-demand test generation would heavily improve my testing since it would have gave me the opportunity to create tests for unexpected data. When writing a test suite, most people tend to uses tests containing the most expected cases or situations. However, if we were to test on code random, on-demand csv file generation, we would be forcing ourselves to test our csv parser on more unpredictable csv data. These wide variety of tests would help improve the probability that our csv parser returns to any given real world caller. In addition to this, this random, on-demand csv function would save us time, giving us the opportunity to test hundreds (if not more) csv files, in what would take an eternity to do manually. 

- #### 3. Overall experience, Bugs encountered and resolved
#### Errors/Bugs: 
I got some errors regarding types and the type checker, but I was able to fix this by ensuring that I wasn't assuming anything about the types of my variables in my csv parser function. 

#### Tests: 
Overall, I think that testing went quite well and I was able to test both the successes and the shortcomings of my csv parser function quite well. 
- Tested that parser yields arrays and only arrays which passed
- Tested that parser returns what is expected for well-formatted input
- Tested that parser works on empty csv file, file with just commas (no data)
- Tested that parser works with zod schema on valid formatted csv data
- Tested that parser returns a list of errors when csv file doesn't meet Zod specification
- Tested that parser fails to deal with quotes, newlines, and missing/additional csv data properly

#### How To…
- To test the csv parser, you can simply run 'npm test'
- To run the csv parser on a specific file, you can update DATA_FILE / define Zod schema in run-parser.ts and run  'npm run run' in the terminal

#### Team members and contributions (include cs logins):

#### Collaborators (cslogins of anyone you worked with on this project and/or generative AI): 
cslogins: zplunket

Used Chatgpt to ask and come up with possible enhancements for my csv parser during part B
https://chatgpt.com/share/68c4ea4c-3e60-800e-940f-2a4fff7ae5f3
https://chatgpt.com/share/68c4ec22-3b54-800e-827d-d6ec2bd1821f 

#### Total estimated time it took to complete project: 
6 hours

#### Link to GitHub Repo:  
https://github.com/cs0320-f25/typescript-csv-pierre-joseph 
