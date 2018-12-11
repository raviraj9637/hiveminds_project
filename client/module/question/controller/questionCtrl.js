
angular.module('questionCtrl',['questionService'])
.controller('questionCtrl', questionCtrl);

function questionCtrl($scope,questionService,$state){
    $scope.postQuestion = function(){
        questionService.addQuestion($scope.formData).then(function(data){
            if(data.data.success){
                console.log('question posted successfully');
                alert(data.data.msg);
                $state.go('/');
            }else{
                console.log('error in input')
                alert(data.data.msg);
            }
        })
    }
}