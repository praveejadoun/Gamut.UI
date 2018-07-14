var app = angular.module("ApplicationModule", ["ngRoute", "ui.bootstrap",'angular.filter','toaster','blockUI']);

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
        templateUrl: 'Gamut.UI/Views/ManageData/Documents.html',
        controller: 'DocumentsController'
    }).when('/inspection',{
        templateUrl: 'Gamut.UI/Views/inspection.html',
        controller: 'InspectionController'
    }).when('/snapshot',{
        templateUrl: 'Gamut.UI/Views/snapshot.html',
        controller: 'SnapshotController'
    }).when('/SMA',{
        templateUrl: 'Gamut.UI/Views/SMA.html',
        controller: 'SMAController'
    }).when('/reports',{
        templateUrl: 'Gamut.UI/Views/reports.html',
        controller: 'ReportsController'
    }).when('/logs',{
        templateUrl: 'Gamut.UI/Views/activeLogs.html',
        controller: 'logsController'
    }).when('/login',{
        templateUrl: 'Gamut.UI/Views/Login.html',
        controller: 'AuthController'
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
    }).when('/financials',{
        templateUrl: 'Gamut.UI/Views/financials.html',
        controller: 'FinancialsController'
    }).when('/restucturing',{
        templateUrl: 'Gamut.UI/Views/restucturing.html',
        controller: 'RestucturingController'
    }).when('/accountDetails',{
        templateUrl: 'Gamut.UI/Views/accountDetails.html',
        controller: 'AccountDetailsController'
    }).when('/view',{
        templateUrl: 'Gamut.UI/Views/view.html',
        controller: 'ViewController'
    }).when('/news',{
        templateUrl: 'Gamut.UI/Views/news.html',
        controller: 'NewsController'
    }).when('/home',{
        templateUrl: 'Gamut.UI/Views/home.html',
        controller: 'HomeController'
    }).when('/misc',{
        templateUrl: 'Gamut.UI/Views/misc.html',
        controller: 'MiscController'
    }).otherwise({
        redirectTo: '/home'
    });
    
    // $locationProvider.html5Mode(true).hashPrefix('!')
    
}]).run(function($rootScope,customerService,blockUI,toaster,$route,$location){
  

//     if(localStorage.getItem("userName") == 0){
//       $rootScope.userId = localStorage.setItem("userId", "");
//    }

    if($rootScope.userId == null && localStorage.getItem("userName") == null){
        localStorage.setItem("userId",0);
        $rootScope.userId = 0;
        if( $rootScope.userId == null || $rootScope.userId == undefined){
            location.reload(true);
        }
    }else{
        $rootScope.userId = localStorage.getItem("userName");
    }
    
    //$rootScope.userId = localStorage.getItem("userName");

    if(localStorage.getItem("custId") == "" || localStorage.getItem("custId") == null || localStorage.getItem("custId") == undefined){
       localStorage.setItem("custId","Maruti");
        getcustomer('Maruti');
    }else{
        getcustomer(localStorage.getItem("custId"));
    }

    $rootScope.login = function(userName,password){
        if(userName == "admin" && password =="admin"){
            localStorage.setItem("userName", userName);
            $rootScope.userId = localStorage.getItem("userName");
        }
    }
    $rootScope.logout = function(){
        localStorage.setItem("userName", 0);
        $rootScope.userId = 0;
        location.reload(true);
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

