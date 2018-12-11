

angular.module('commentCtrl',['commentService'])
.controller('commentCtrl', commentCtrl);

function commentCtrl($scope,commentService,$state){
    $scope.postYourComment = function(){
        commentService.addComment($scope.formData).then(function(data){
            if(data.data.success){
                console.log('comment posted successfully');
                alert(data.data.msg);
                $state.go('login');
            }else{
                $state.go('login')
                console.log('error in input')
                // alert(data.data.msg);
            }
        })
    }
}