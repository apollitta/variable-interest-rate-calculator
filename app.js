var express = require('express');
var cfenv = require('cfenv');
var app = express();
module.exports = app;

function initDBConnection() {
    var vcapServices = JSON.parse(process.env.VCAP_SERVICES);

    var dbCredentials = {};
    if (vcapServices["cloudantNoSQLDB"]) {
        dbCredentials.host = vcapServices["cloudantNoSQLDB"][0].credentials.host;
        dbCredentials.url = vcapServices["cloudantNoSQLDB"][0].credentials.url;
    }
    cloudant = require('cloudant')(dbCredentials.url);
    db = cloudant.use("interest_rates");

}
initDBConnection();

//var Cloudant = require('cloudant');
//var cloudant = Cloudant("https://5b8d458c-d705-4fa3-8194-7c1ac1fccf2e-bluemix:e796ab9ce9dbed543ec0d23efc4b959544bd0bf2de6fc00b7aea3d14d8f7c7ad@5b8d458c-d705-4fa3-8194-7c1ac1fccf2e-bluemix.cloudant.com");
//var db = cloudant.db.use("interest_rates");

app.get("/rates", function (req, res) {
    var searchTerm = 'docType: "interestRate"';
    var searchTerms = {
        q: searchTerm,
        include_docs: true
    };

    db.search('interestRatesView', 'getCurrentInterestRates', searchTerms,
        function (err, body) {
            if (err) {
                res.status(err.statusCode).send(err.description);
            }
            res.status(200).send(body.rows[0].doc);
        });
});

app.use(express.static(__dirname + '/public'));
app.use("/node_modules", express.static(__dirname + '/node_modules'));
var appEnv = cfenv.getAppEnv();

app.listen(appEnv.port, '0.0.0.0', function () {
    console.log("server starting on " + appEnv.url);
});
