describe('Variable Interest Rates tests', function () {

    beforeEach(angular.mock.module('interestEstimations'));

    var interestEstimationsController,
        scope;

    var testData = [[{
            minBalance: 5000,
            rate: 3,
            unconfirmedRate: 3
            }, {
            minBalance: 1000,
            rate: 2,
            unconfirmedRate: 2
            }, {
            minBalance: 0,
            rate: 1,
            unconfirmedRate: 1
            }],
                   [{
            minBalance: 5000,
            rate: 10,
            unconfirmedRate: 10
            }, {
            minBalance: 1000,
            rate: 20,
            unconfirmedRate: 20
            }, {
            minBalance: 0,
            rate: 30,
            unconfirmedRate: 30
            }]];

    beforeEach(inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();
        interestEstimationsController = $controller('interestEstimationsController', {
            $scope: scope
        });
    }));

    it('is input valid', function () {
        expect(scope.isNumericInputValid(-1)).toEqual(false);
        expect(scope.isNumericInputValid(1)).toEqual(true);
        expect(scope.isNumericInputValid("test")).toEqual(false);
    });

    it('get interest rate for balances', function () {

        for (var j = 0; j < testData.length; j++) {
            testGetInterestRate(0, testData[j][2].rate, testData[j]);
            testGetInterestRate(999, testData[j][2].rate, testData[j]);
            testGetInterestRate(1000, testData[j][1].rate, testData[j]);
            testGetInterestRate(4999, testData[j][1].rate, testData[j]);
            testGetInterestRate(5000, testData[j][0].rate, testData[j]);
        }
    });

    it('get future balances - lower interest rate', function () {
        for (var j = 0; j < testData.length; j++) {
            for (var i = 1; i <= 5; i++) {
                testGetFutureBalance(500, i, testData[j]);
            }
        }
    });
    it('get future balances - middle interest rate', function () {
        for (var j = 0; j < testData.length; j++) {
            for (var i = 1; i <= 5; i++) {
                testGetFutureBalance(1000, i, testData[j]);
            }
        }
    });
    it('get future balances - upper interest rate', function () {
        for (var j = 0; j < testData.length; j++) {
            for (var i = 1; i <= 5; i++) {
                testGetFutureBalance(5000, i, testData[j]);
            }
        }
    });
    it('get future balances - lower/middle interest rate', function () {
        for (var j = 0; j < testData.length; j++) {
            for (var i = 1; i <= 5; i++) {
                testGetFutureBalance(960, i, testData[j]);
            }
        }
    });
    it('get future balances - middle/upper interest rate', function () {
        for (var j = 0; j < testData.length; j++) {
            for (var i = 1; i <= 5; i++) {
                testGetFutureBalance(4800, i, testData[j]);
            }
        }
    });

    function testGetInterestRate(balance, expectedInterestRate, interestRates) {
        scope.interestRates = interestRates;

        expect(scope.getInterestRateForBalance(balance)).toEqual(expectedInterestRate);
    }

    function testGetFutureBalance(balance, numberOfYears, interestRates) {
        scope.interestRates = interestRates;

        var futureBalance = balance;
        for (var i = 1; i <= numberOfYears; i++) {
            var expectedInterestRate = scope.getInterestRateForBalance(futureBalance);
            futureBalance *= (1 + expectedInterestRate / 100);
        }

        expect(scope.calculateEstimatedFutureBalance(balance, numberOfYears)).toEqual(futureBalance.toFixed(2));
    }
});
