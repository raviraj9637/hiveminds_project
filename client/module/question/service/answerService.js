var myApp = angular.module('answerService', []);
myApp.factory('answerService', function($http, $q){

    var answerFactory = {};

    answerFactory.comment = function(parameter){

        return $http.post('/api/question/answers',parameter).then(function(data){
            return data;
        })
    }

    return answerFactory;
});