var app = angular.module('interestEstimations', []);

app.controller('interestEstimationsController', function ($scope, $http) {

    $scope.balance = {};
    $scope.balance.value = 0;
    $scope.interestRates = [];

    $scope.getCurrentRates = function () {
        $http.get('/rates').then(function (res) {
            $scope.interestRates = res.data.interestRates;
            $scope.setUnconfirmedInterestRates();
        });
    };
    $scope.getCurrentRates();

    $scope.calculateEstimatedFutureBalance = function (balance, numberOfYears) {
        if (!$scope.isNumericInputValid(balance)) {
            return;
        }

        $scope.estimatedFutureBalance = balance;
        for (var i = 1; i <= numberOfYears; i++) {
            $scope.multiplier = 1 + Number($scope.getInterestRateForBalance($scope.estimatedFutureBalance)) / 100;
            $scope.estimatedFutureBalance *= $scope.multiplier;
        }

        return $scope.estimatedFutureBalance.toFixed(2);
    };

    $scope.getInterestRateForBalance = function (balance) {

        var rate = 0;
        $scope.interestRates.forEach(function (interestRate) {
            if (rate === 0 && balance >= interestRate.minBalance) {
                rate = interestRate.rate;
            }
        });
        return rate;
    };

    $scope.updateInterestRates = function () {
        $scope.interestRates.forEach(function (interestRate) {
            interestRate.rate = interestRate.unconfirmedRate;
        });
    };

    $scope.setUnconfirmedInterestRates = function () {
        $scope.interestRates.forEach(function (interestRate) {
            interestRate.unconfirmedRate = interestRate.rate;
        });
    };

    $scope.isNumericInputValid = function (input) {
        if (input < 0 || isNaN(input)) {
            return false;
        }
        return true;
    };
});
