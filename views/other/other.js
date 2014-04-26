depends(["directives/appDirective/appDirective.js"], function() {
    angular.module('app')
    .controller('otherCtrl', ['$scope', function($scope) {
        $scope.helloWorld = 'Lazy Loaded!';
    }]);
});
