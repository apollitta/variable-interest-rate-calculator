describe('Variable Interest Rates tests', function () {

    beforeEach(angular.mock.module('interestEstimations'));

    var interestEstimationsController,
        scope;

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
        testGetInterestRate(0, 1);
        testGetInterestRate(999, 1);
        testGetInterestRate(1000, 2);
        testGetInterestRate(4999, 2);
        testGetInterestRate(5000, 3);
    });

    it('get future balances - lower interest rate', function () {
        for (var i = 1; i <= 5; i++) {
            testGetFutureBalance(500, 1, i);
        }
    });
    it('get future balances - middle interest rate', function () {
        for (var i = 1; i <= 5; i++) {
            testGetFutureBalance(1000, i);
        }
    });
    it('get future balances - upper interest rate', function () {
        for (var i = 1; i <= 5; i++) {
            testGetFutureBalance(5000, i);
        }
    });
    it('get future balances - lower/middle interest rate', function () {
        for (var i = 1; i <= 5; i++) {
            testGetFutureBalance(960, i);
        }
    });
    it('get future balances - middle/upper interest rate', function () {
        for (var i = 1; i <= 5; i++) {
            testGetFutureBalance(4800, i);
        }
    });

    function testGetInterestRate(balance, expectedInterestRate) {
        scope.interestRates = [{
            minBalance: 0,
            rate: 1,
            unconfirmedRate: 1
            }, {
            minBalance: 1000,
            rate: 2,
            unconfirmedRate: 2
            }, {
            minBalance: 5000,
            rate: 3,
            unconfirmedRate: 3
            }];

        expect(scope.getInterestRateForBalance(balance)).toEqual(expectedInterestRate);
    }

    function testGetFutureBalance(balance, numberOfYears) {

        scope.interestRates = [{
            minBalance: 0,
            rate: 1,
            unconfirmedRate: 1
            }, {
            minBalance: 1000,
            rate: 2,
            unconfirmedRate: 2
            }, {
            minBalance: 5000,
            rate: 3,
            unconfirmedRate: 3
            }];

        var futureBalance = balance;
        for (var i = 1; i <= numberOfYears; i++) {
            var expectedInterestRate = scope.getInterestRateForBalance(futureBalance);
            futureBalance *= (1 + expectedInterestRate / 100);
        }

        expect(scope.calculateEstimatedFutureBalance(balance, numberOfYears)).toEqual(futureBalance.toFixed(2));
    }
});
