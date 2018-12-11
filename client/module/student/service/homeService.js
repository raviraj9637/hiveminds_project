var myApp = angular.module('homeService', []);
myApp.factory('homeService', function($http, $q) {

    var homeFactory = {};

    homeFactory.home = function(parameter) {
        return $http.get('/api/question',parameter).then(function(data) {
            return data;
        })
    }
    return homeFactory;
});