<h1>Investment Calculator</h1>

I have created an investment calculator application using the following information:

<h2>Summary</h2>

As a bank clerk, I'd like to provide accurate interest rate estimations to my customers so that they can make the correct decision on their investments

<h2>Acceptance Criteria</h2>

1. Is the interest rate 1% for balances less than 1000
2. Is the interest rate 2% for balances equal to or more than 1000 and less than 5000
3. Is the interest rate 3% for balances more than 5000
4. Can I handle 0 and negative values
5. Can I vary the interest rate.

<h2>Back of card (Technical Constraints):</h2>

- <b>Doesn't necessarily need a flashy UI (can be simple)</b>
- Use an appropriate language/framework for the job role that you are applying for. If you are applying for a front end development role
then we expect that you write a web application, however if you are purely a backend developer, we will accept the application running
from the terminal, as well as from tests.
- With the exception of testing, Minimise the use of external frameworks.
- Use best in industry agile engineering practices. Ensure that your code is well tested.

<h1>Instructions</h1>

My application is running on an IBM Bluemix server and can be viewed at investmentcalculator.mybluemix.net.
Otherwise you can start a local server in order to run this application. Do this as follows:

1. Download an install node.js from https://nodejs.org.
2. Take a copy of the code. Now open command prompt and locate to the root folder.
3. Run the command ‘npm install’ to install required node modules locally.
4. Run the command ‘grunt run’ to start the local server.
5. Go to the URL written in the command prompt (e.g. http://localhost:6001) and you will be directed to the webpage.

<h4>Front-end</h4>
- The index file is located at public/index.html.
- I have used angularJS to implement the functionality alongside a UI using the bootstrap framework.

<h4>Back-end</h4>
- The interest rates are stored in a NoSQL database, with the 'express' node module used to create a simple API to retrieve this data.
- The logon credentials for the database are stored locally in vcap_services.txt. To make the logon details secure, I can add 'vcap_services.txt' to the .gitignore file, meaning this file would not be committed. The vcap_services are stored securely with the application on bluemix, so we don't need to push up the file.

<h4>Testing/Build</h4>
- I have used grunt to automate processes. You can minify css/js files if required, or check quality of the javascript code using ‘grunt jshint’. You can also run Mocha unit tests using the command ‘grunt test’ from the command line in the public folder. This will run a test against the db data being pulled down.
- For the front end I have used Karma and Jasmine to run tests against the angular code I have written. The tests can be run with ‘karma start karma.conf.js --single-run’ in the root folder of the project.
