
angular.module('studentCtrl',['studentService'])
    .controller('studentCtrl', studentCtrl);

    function studentCtrl($scope,studentService,$state){
        $scope.name='vikram';
        $scope.addStudent = function(){
            studentService.saveStudent($scope.formData).then(function(data){
                if(data.data.success){
                    console.log('User Registered Successfully')
                    alert(data.data.msg);
                    $state.go('login');
                }else{
                    console.log('Invalid Input')
                    alert(data.data.msg);
                }
            })
        }
    }