angular.module('app')
.directive('appDirective', [function() {
    return {
        restrict: 'E',
        scope: true,
        templateUrl: 'directives/appDirective/appDirective.html',
        link: function($scope, $element, attrs) {
            $scope.helloWorld = "Lazy Loaded Directive";
        }
    }
    }]);
