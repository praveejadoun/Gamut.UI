app.controller('SMAController', function ($scope, $location, $filter, $window, $rootScope,$filter, userService,GeneralService,SMAService,ShareData,blockUI) {
    $scope.userId = localStorage.getItem("userName");
    if($scope.userId == null){
        $location.path('/');
    }

    var Currentdate = new Date().getTime(),previousDate = 1000 * 60 * 60 * 24 * 365 * 2,
    finalstartDate = new Date(Currentdate - previousDate);
    $scope.startDate = finalstartDate;
    $scope.endDate = new Date();

    getSMADetails();
    function getSMADetails() {
        blockUI.start('Please wait...');
        $scope.formatedStartDate = $filter('date')($scope.startDate, "dd-MM-yyyy");
        $scope.formatedendDateDate = $filter('date')($scope.endDate, "dd-MM-yyyy");
        $scope.customerId = localStorage.getItem("custId");
        var ViewSMADetailsData = SMAService.getSMAByDate($scope.customerId, $scope.formatedStartDate, $scope.formatedendDateDate);
        
        ViewSMADetailsData.then(function (response) {
            //$scope.ViewSMADetailsDataDataList = response.data.entData;
            $scope.sMAHistories = response.data.sMAHistories;
            $scope.output = response.data.entData;
            blockUI.stop();
        },function (errorresponse) {
            blockUI.stop();
            $scope.error = 'failure loading Document Data', errorresponse;
        });
    } 

    $scope.getViewSMAbyDate = function(){
        getSMADetails();
    }
});