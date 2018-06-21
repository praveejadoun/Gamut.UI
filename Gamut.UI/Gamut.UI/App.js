﻿var app = angular.module("ApplicationModule", ["ngRoute", "ui.bootstrap",'angular.filter','toaster','blockUI']);

app.factory("ShareData", function () {
    return { value: 0 }
});

app.config(['$routeProvider', '$locationProvider','$httpProvider', function ($routeProvider, $locationProvider,$httpProvider) {
    //debugger;
    $routeProvider.when('/test',{
        templateUrl: 'ManageData/Soc124',
        controller: 'test'
    }).when('/add',{
        templateUrl: 'ManageData/AddNew',
        controller: 'AddController'
    }).when("/edit",{
        templateUrl: 'ManageData/Edit',
        controller: 'EditController'
    }).when('/delete',{
        templateUrl: 'ManageData/Delete',
        controller: 'DeleteController'
    }).when('/home',{
        templateUrl: 'Home/Index',
        controller: 'AddController'
    }).when('/general',{
        templateUrl: 'Gamut.UI/Views/ManageData/General.html',
        controller: 'GeneralController'
    }).when('/documents',{
        templateUrl: 'ManageData/Documents',
        controller: 'DocumentsController'
    }).when('/login',{
        templateUrl: 'Gamut.UI/Views/Login.html',
        controller: 'AuthController'
        //$location.path("Home/login")
        //redirectTo: 'Home/Login'
    }).when('/intrestRate',{
        templateUrl: 'Gamut.UI/Views/intrestRate.html',
        controller: 'IntrestRateController'
    }).when('/rating',{
        templateUrl: 'Gamut.UI/Views/rating.html',
        controller: 'RatingController'
    }).when('/security',{
        templateUrl: 'Gamut.UI/Views/security.html',
        controller: 'SecurityController'
    }).when('/soc124',{
        templateUrl: 'Gamut.UI/Views/ManageData/Soc124.html',
        controller: 'Soc124Controller'
    }).otherwise({
        redirectTo: '/'
    });
    
    // $locationProvider.html5Mode(true).hashPrefix('!')
    
}]).run(function($rootScope,customerService,blockUI,toaster,$route){
    
    if(localStorage.getItem("custId") == ""){
        getcustomer('Maruti');
    }else{
        getcustomer(localStorage.getItem("custId"));
    }

    function getcustomers() {
            blockUI.start('Please wait...');
            var customerList = customerService.getCustomerList();
            customerList.then(function (response) {
                $rootScope.customers = response.data;
                blockUI.stop();
            },function (errorresponse) {
                blockUI.stop();
                $rootScope.error = 'failure loading Customer Data', errorresponse;
            });
        }
        getcustomers();

        $rootScope.onSelect = function ($item, $model, $label) {
            $rootScope.$item = $item;
            $rootScope.custId = $rootScope.$item.cust_id;
            if($rootScope.custId != null){
                localStorage.setItem("custId",$rootScope.custId);
            }else{
                localStorage.setItem("custId","Maruti");
            }
            
            getcustomer($rootScope.$item.cust_id);
        };

        function getcustomer(Id){
            blockUI.start('Please wait...');
            var customerById = customerService.getCustomerById(Id);
            customerById.then(function (response) {
                $rootScope.customer = response.data;
                $route.reload();
                blockUI.stop();
            },function (errorresponse) {
                $rootScope.error = 'failure loading Customer By Id Data', errorresponse;
                blockUI.stop();
            });
        }
});