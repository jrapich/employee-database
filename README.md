  # employee-database
  <img src="./badge.svg">
  
  ## Description
  This project will allow you to view and manage the database of a pretend company. It is stored and accessed via SQL. You will be able to see a list of employees, a list of all roles in the company, and departments. You will also be able to  add new entries to these lists as well.    
  
  This project was quite challenging for me as I have yet to truly  comprehend SQL. it took me a while and lots of googling to figure out the correct syntax and formatting to send SQL queries correctly. I was able to figure it out mostly after lots of trial and error.  
  
  I also had significant difficulty with js code on this assignment. At one point I was stuck so hard on the inquirer prompt dropping without waiting for user input. It turns out it was some kind of issue with bash running on windows, as soon as I cloned the repo and tried it on my linux PC, it worked with no issues! I've since moved all my development files for this class to my linux PC, possibly for good. 
  
  I also had significant issues with JS scope it seems. I feel now that the scope inside .then() is very limiting as there were several cases where I could not use data at all  that were in the scope of a .then(). THis caused lots of headache and I shelved some cool features I wanted to add due to these issues so I could complete the assignment in the spare time I had. 

  ## Table of Contents
- [employee-database](#employee-database)
  - [Description](#description)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Tests](#tests)
  - [Credits](#credits)
  - [Contributing](#contributing)
  - [Questions?](#questions)
  - [License](#license)

  ## Installation
  This app requires `node.js` to function. Necessary npm packages required are also:

  `inquirer v8.2.4`

  `dotenv`

  `mysql2`

  `console-table-printer` 
     
  To install these, first install node and npm, and run 

  `npm install` 

  and the necessary dependencies will be installed.     
  
  It is also necessary to create your own .env file for the environment variables necessary. 
  Proper syntax for that file will be: 

  `DB_NAME=""`

  `DB_USER=""`

  `DB_PASSWORD=""`    
  
  /lib/query.js will use this to log into SQL to make the appropriate queries.   
  
  `MySQL Server` and `MySQL Shell` also required, of course.      
  
  To set up and seed the database with the proper data, simply log into mysql shell and source the following files in order:    

  `db/schema.sql`  

   `db/seeds.sql` 

  ## Usage
  TO run the employee database manager, with everything installed, simply run 

  `node index.js`   

  You will then be greeted with a list of prompts to choose from. Choose an option and follow the necessary prompts to view the relevant information or and some to the database. 
  
  To exit the app, select the `Exit` option.

  Link to project repository: [https://github.com/jrapich/employee-database](https://github.com/jrapich/employee-database)

  ## Tests
  no tests needed

  ## Credits
  No other contributors.  
  
  Special thanks to fellow students Brian Whistler, PJ Rassmussen, MiloMiller, Mr.Polkadots in our studygroup discord server for help and assistance debugging when I was stuck a few times. 

  ## Contributing
  How to contribute:

  Please reach out to me at jeremysr@protonmail.com or make a pull request at 

  [https://github.com/jrapich/employee-database](https://github.com/jrapich/employee-database)

  ## Questions?
  Any further questions, comments, or bug reports, can be sent to me at: 

  jeremysr@protonmail.com

  https://www.github.com/jrapich

  ## License
  This project protected under MIT License.

  All rights reserved. See /LICENSE for more information.

  