app.controller('InspectionController', function ($scope, $location, $filter, $window, $rootScope,$filter, userService,GeneralService,InspectionService,ShareData,blockUI) {
    $scope.userId = localStorage.getItem("userName");
    if($scope.userId == null){
        $location.path('/');
    }

    var Currentdate = new Date().getTime(),previousDate = 1000 * 60 * 60 * 24 * 365 * 2,
    finalstartDate = new Date(Currentdate - previousDate);
    $scope.startDate = finalstartDate;
    $scope.endDate = new Date();

    getInspectionDetails()
    function getInspectionDetails() {
        blockUI.start('Please wait...');
        $scope.formatedStartDate = $filter('date')($scope.startDate, "dd-MM-yyyy");
        $scope.formatedendDateDate = $filter('date')($scope.endDate, "dd-MM-yyyy");
        $scope.customerId = localStorage.getItem("custId");
        var ViewInspectionDetailsData = InspectionService.getInspectionsByDate($scope.customerId, $scope.formatedStartDate, $scope.formatedendDateDate);
        
        ViewInspectionDetailsData.then(function (response) {
            $scope.ViewInspectionDetailsDataList = response.data;
            $scope.group = response.data.entData;
            $scope.financialYear = response.data.finYears;
            blockUI.stop();
        },function (errorresponse) {
            blockUI.stop();
            $scope.error = 'failure loading Document Data', errorresponse;
        });
    } 

    $scope.getViewDocumentbyDate = function(){
        getDocumentDetails();
    }

    $scope.selectFyName = function(selectedYear){
        console.log(selectedYear);
    }
});