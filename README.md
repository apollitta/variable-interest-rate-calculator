Overview - Variable Interest Rates

- To gain access to the code, please accept the email invite to the project on hub.jazz.net I have sent you. Once you have access, you can run ‘git clone https://hub.jazz.net/git/apollitt/investmentCalculator' to clone the code.

- You can see my application running on investmentcalculator.mybluemix.net.
Otherwise you can start a local server in order to run this application. Do this as follows:
1. Download an install node.js from https://nodejs.org.
2. Now open a command prompt and locate to the public folder.
3. Run the command ‘npm install’.
4. Run the command ‘grunt run’ to start the local server.
5. Go to the URL written in the command prompt (e.g. http://localhost:6001) and you will be directed to the webpage.

Front-end
- The index file is located at public/index.html.
- I have used angularJS to implement the functionality alongside a UI using the bootstrap framework.
- Users are able to enter a balance, and are shown future balances. By clicking the ‘view Interest Rates’ button, users can change interest rates, and see updated results.

Back-end
- I have used node.js and express alongside a Cloudant database to store and retrieve the interest rates.

Testing/Build
- I have used grunt to automate processes. You can minify css/js files if required, or check quality of the javascript code using ‘grunt jshint’. You can also run Mocha unit tests using the command ‘grunt test’ from the command line in the public folder. This will run a test against the db data being pulled down.
- For the front end I have used Karma and Jasmine to run tests against the angular code I have written. This can be run with ‘karma start karma.conf.js --single-run’.

