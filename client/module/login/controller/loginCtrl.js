
angular.module('loginCtrl',['loginService'])
.controller('loginCtrl', loginCtrl);

function loginCtrl($scope,loginService,$state){
    $scope.login = function(){
        loginService.userlogin($scope.formData).then(function(data){
            if(data.data.success){
                console.log('User is logged successfully');
                alert(data.data.msg)
                $state.go('/');
            }else{
                console.log('Invalid Input');
                alert(data.data.msg);
            }
        })
    }
}