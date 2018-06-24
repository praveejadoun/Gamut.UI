app.controller('ViewController', function ($scope, $location, $filter, $window, $rootScope,$filter, userService,GeneralService,WarningIndicatorsService,ShareData,blockUI) {
    $scope.userId = localStorage.getItem("userName");
    if($scope.userId == null){
        $location.path('/');
    }

    var Currentdate = new Date().getTime(),previousDate = 1000 * 60 * 60 * 24 * 365 * 2,
    finalstartDate = new Date(Currentdate - previousDate);
    $scope.startDate = finalstartDate;
    $scope.endDate = new Date();

    getViewDetails()
    function getViewDetails() {
        blockUI.start('Please wait...');
        $scope.formatedStartDate = $filter('date')($scope.startDate, "yyyy-MM-dd");
        $scope.formatedendDateDate = $filter('date')($scope.endDate, "yyyy-MM-dd");
        $scope.customerId = localStorage.getItem("custId");
        var ViewDetailsData = WarningIndicatorsService.getWarningIndicatorsById($scope.customerId);
        
        ViewDetailsData.then(function (response) {
            $scope.ViewDetailsDataList = response.data;
            $scope.ViewList = response.data.detailData;
            blockUI.stop();
        },function (errorresponse) {
            blockUI.stop();
            $scope.error = 'failure loading Financials Data', errorresponse;
        });
    } 

    $scope.getViewbyDate = function(){
        getViewDetails();
    }
});