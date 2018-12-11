
var myApp = angular.module('loginService', []);
myApp.factory('loginService', function($http, $q){

    var loginFactory = {};

    loginFactory.userlogin = function(parameter){
        return $http.post('/api/auth/login',parameter).then(function(data){
            return data;
        })
    }

    return loginFactory;
});