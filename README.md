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

- #### Step 3: Propose enhancements in your project README file.

    Include a list of the top 4 enhancements or edge cases you think are most valuable to explore in the next week’s sprint. Label them clearly by category (extensibility vs. functionality), and include whether they came from you, the LLM, or both. Describe these using the User Story format—see below for a definition. 
    1. Functionality: As a user of this csv parser, I can properly parse through my csv file containing data in double quotes, so that I can properly deal with data with commas and recieve accurate infomation from my file. (came from both me and LLM)
    2. Functionality: As a user of this csv parser, I can properly specify whether or not I have a column header so that in the case where my csv file does contain a column header, the csv file does not return it as part of the data. (came from both me and LLM)
    3. Extensibility: As a user of this csv parser, I can properly specify what I want to deal with extra or missing data in my csv file (e.g. whether that be error/replace with ""/ skip row etc.) so that I have creative control over how extra or missing data is dealt with for my data (came from LLM)
    4. Extensibility: As an user of this csv parser, I can parse through my csv file of a custom delimiter (e.g. | or ;), so that I can parse through my different csv format types. (came from both me and LLM)

    Include your notes from above: what were your initial ideas, what did the LLM suggest, and how did the results differ by prompt? What resonated with you, and what didn’t? (3-5 sentences.) 

    Overall, chatgpt seemed to agree with most of my original ideas regarding which edge cases are most valuable to add to the parser was able to give me extra clarity on my thoughts. Overall, the LLM provided me ideas such as what to do regarding quoting rules, delimiters, empty values, headers, encodings, and malformed input. I found the LLM to be more useful and resonate more with me when I asked more about the specific user edge cases I should be considering, rather when I asked it about improvements for developer usability. 
    
### Design Choices

### 1340 Supplement

- #### 1. Correctness

- #### 2. Random, On-Demand Generation

- #### 3. Overall experience, Bugs encountered and resolved
#### Errors/Bugs:
#### Tests:
#### How To…

#### Team members and contributions (include cs logins):

#### Collaborators (cslogins of anyone you worked with on this project and/or generative AI):
#### Total estimated time it took to complete project:
#### Link to GitHub Repo:  
