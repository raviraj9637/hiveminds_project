var myApp = angular.module('routerApp',['ui.router']);
myApp.config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/');

    $stateProvider
                .state('/',{
                    url:'/',
                    templateUrl: 'views/student/home.html',
                    controller:'homeCtrl'
                })
                .state('student',{
                    url:'/student',
                    templateUrl:'views/student/student.html',
                    controller:'studentCtrl'
                })
                .state('login',{
                    url:'/login',
                    templateUrl:'views/login/login.html',
                    controller:'loginCtrl'
                })
                .state('question',{
                    url:'/question',
                    templateUrl:'views/question/question.html',
                    controller:'questionCtrl'
                })
                .state('answer',{
                    url:'/answer',
                    templateUrl:'views/question/answer.html',
                    controller:'answerCtrl'
                })
                
})