
angular.module('answerCtrl',['answerService'])
.controller('answerCtrl', answerCtrl);

function answerCtrl($scope,answerService,$state){
    $scope.postComment = function(){
        answerService.comment($scope.formData).then(function(data){
            if(data.data.success){
                console.log('answer posted successfully');
                alert(data.data.msg);
                $state.go('/');
            }else{
                console.log('invalid input')
                alert('Invalid input');
            }
        })
    }
}