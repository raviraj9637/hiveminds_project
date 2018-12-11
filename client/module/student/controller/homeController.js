
angular.module('homeCtrl',['homeService'])
    .controller('homeCtrl', homeCtrl);

    function homeCtrl($scope,homeService,$state){
        $scope.homepage = function(){
            homeService.home($scope.formData).then(function(data){
                $scope.allquestions= data.data;
                // $scope.myData = JSON.stringify($scope.allquestions);
            })
        }
    }

