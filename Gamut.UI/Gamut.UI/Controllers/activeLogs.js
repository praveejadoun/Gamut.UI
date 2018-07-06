app.controller('logsController', function ($scope, $location, $filter, $window, $rootScope,$filter, userService,GeneralService,LogsService,ShareData,blockUI) {
    $scope.userId = localStorage.getItem("userName");
    if($scope.userId == null){
        $location.path('/');
    }

    $scope.selectedLogType = "Communication";
    var Currentdate = new Date().getTime(),previousDate = 1000 * 60 * 60 * 24 * 365 * 2,
    finalstartDate = new Date(Currentdate - previousDate);
    $scope.startDate = finalstartDate;
    $scope.endDate = new Date();

    getActiveLogDetails();
    function getActiveLogDetails() {
        blockUI.start('Please wait...');
        $scope.formatedStartDate = $filter('date')($scope.startDate, "dd-MM-yyyy");
        $scope.formatedendDateDate = $filter('date')($scope.endDate, "dd-MM-yyyy");
        $scope.customerId = localStorage.getItem("custId");
        var ViewActiveLogDetailsData = LogsService.getactiveLogs($scope.customerId,$scope.selectedLogType, $scope.formatedStartDate, $scope.formatedendDateDate);
        
        ViewActiveLogDetailsData.then(function (response) {
           $scope.activeLog = response.data;
            blockUI.stop();
        },function (errorresponse) {
            blockUI.stop();
            $scope.error = 'failure loading Active Log Data', errorresponse;
        });
    } 

    $scope.getActiveLogs = function(){
        console.log($scope.selectedLogType)
        getActiveLogDetails();
    }
});