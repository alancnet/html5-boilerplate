var app = angular.module('app', ['ngRoute']);
app
    // Provide depends as a factory that also returns a promise.
    .factory('depends', ["$q", function ($q) {
        return app.depends = function (dependencies, callback, error) {
            var deferred = $q.defer();
            depends(
                dependencies,
                function () {
                    deferred.resolve.apply(deferred, arguments);
                },
                function () {
                    deferred.reject.apply(deferred, arguments);
                }
            );
            if (callback || error) {
                deferred.promise.then(callback, error);
            }
            return deferred.promise;
        }
    }])
    .config( // Lazy loading components
    function ($controllerProvider, $provide, $compileProvider) {

        // Let's keep the older references.
        app._controller = app.controller;
        app._service = app.service;
        app._factory = app.factory;
        app._value = app.value;
        app._directive = app.directive;

        // Provider-based controller.
        app.controller = function (name, constructor) {

            $controllerProvider.register(name, constructor);
            return( this );

        };

        // Provider-based service.
        app.service = function (name, constructor) {

            $provide.service(name, constructor);
            return( this );

        };

        // Provider-based factory.
        app.factory = function (name, factory) {

            $provide.factory(name, factory);
            return( this );

        };

        // Provider-based value.
        app.value = function (name, value) {

            $provide.value(name, value);
            return( this );

        };

        // Provider-based directive.
        app.directive = function (name, factory) {

            $compileProvider.directive(name, factory);
            return( this );

        };

    }
)
    .config(['$controllerProvider', '$routeProvider', function ($controllerProvider, $routeProvider) {
        function resolve() {
            var files = [];
            for (var i = 0; i < arguments.length; i++) {
                files.push(arguments[i]);
            }
            return {
                depends: function () {
                    return app.depends(files);
                }
            };
        }

        $routeProvider.when("/other", {
            templateUrl: 'views/other/other.html',
            resolve: resolve('views/other/other.js')

        });
        $routeProvider.otherwise({
            templateUrl: 'views/home/home.html',
            controller: 'homeCtrl',
            resolve: resolve('views/home/home.js')
        });
    }])
    .controller("mainCtrl", ["$rootScope", "depends", function ($rootScope, require) {
        app.$rootScope = $rootScope;
        $rootScope.helloRoot = "Hello Root";
    }])
;
