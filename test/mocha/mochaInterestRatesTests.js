var assert = require("assert"),
    request = require("supertest"),
    app = require("../../app.js"),
    chai = require("chai");

describe('Interest rates', function () {

    this.timeout(10000);

    it('retreive current interest rates', function (done) {
        request(app).get('/rates')
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    done(err);
                    return;
                }

                var rates = res.body.interestRates;
                for (var i = 0; i < rates.length; i++) {
                    chai.assert.isNumber(rates[i].rate, 'The rate has not been stored as a numerical value');
                    chai.assert.operator(rates[i].rate, '>=', 0, 'The rate should not be negative');
                    chai.assert.isNumber(rates[i].minBalance, 'The minimum balance to receive interest has not been stored as a numerical value');
                    chai.assert.operator(rates[i].minBalance, '>=', 0, 'The minimum balance to receive interest should not be negative');
                }
                done();
            });
    });
});
