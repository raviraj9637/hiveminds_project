
var myApp = angular.module('commentService', []);
myApp.factory('commentService', function($http, $q){

    var commentFactory = {};

    commentFactory.addComment = function(parameter){

        return $http.post('/api/question/comment',parameter).then(function(data){
            return data;
        })
    }

    return commentFactory;
});