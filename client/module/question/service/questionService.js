
var myApp = angular.module('questionService', []);
myApp.factory('questionService', function($http, $q){

    var questionFactory = {};
    questionFactory.addQuestion = function(parameter) {

        return $http.post('/api/question',parameter).then(function(data){
            return data;
        })
    }
    return questionFactory;
});