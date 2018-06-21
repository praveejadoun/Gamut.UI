app.controller('AuthController', function ($scope, $location, $window, $rootScope, userService,GeneralService,ShareData) {
    $scope.StudentID = 0;
    $scope.test = "General Controller";
    $scope.loginId = "admin";
    $scope.pwd = "";
    $scope.id = 1;
    
    getGeneral();

    function getGeneral() {
        if($window.localStorage.getItem($scope.id) == "false")
        {
            $window.localStorage.clear();
            var landingUrl = "http://" + $window.location.host + "/Gamut.UI/views/home/login.html" ;
            $window.location.href = landingUrl;        
        }
		
        ShareData.value = 'jpmc';
        var promiseGetGeneral = GeneralService.getGeneral(ShareData.value);
       
        promiseGetGeneral.then(function (pl) {
            $scope.General = pl.data;
        },
            function (errorPl) {
                $scope.error = 'failure loading General Data', errorPl;
            });
    } 

    $scope.save = function () {
        var promisePutStudent = GeneralService.put($scope.General.entData.cust_id, JSON.stringify($scope.General.entData));
        promisePutStudent.then(function (pl) {
            alert('Saved Successfully');
        },
            function (errorPl) {
                $scope.error = 'Failure loading General', errorPl;
            });
    };

});