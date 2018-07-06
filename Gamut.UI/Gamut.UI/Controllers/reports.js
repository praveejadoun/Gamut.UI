/// <reference path="inspection.js" />
app.controller('ReportsController', function ($scope, $location, $filter, $window, $rootScope,$filter, userService,GeneralService,ReportService,ShareData,blockUI) {
    $scope.userId = localStorage.getItem("userName");
    if($scope.userId == null){
        $location.path('/');
    }

    var Currentdate = new Date().getTime(),previousDate = 1000 * 60 * 60 * 24 * 365 * 2,
    finalstartDate = new Date(Currentdate - previousDate);
    $scope.startDate = finalstartDate;
    $scope.endDate = new Date();
    $scope.selectedRelatedTo = 'SO/C124';
    $scope.selectedStatus = 'Rectified';

    getReportsDetails();
    function getReportsDetails() {
        blockUI.start('Please wait...');
        $scope.formatedStartDate = $filter('date')($scope.startDate, "dd-MM-yyyy");
        $scope.formatedendDateDate = $filter('date')($scope.endDate, "dd-MM-yyyy");
        $scope.customerId = localStorage.getItem("custId");
        var ViewReportDetailsData = ReportService.getReports($scope.customerId, $scope.selectedRelatedTo, $scope.selectedStatus, $scope.formatedStartDate, $scope.formatedendDateDate);
        
        ViewReportDetailsData.then(function (response) {
            $scope.reports = response.data;
            blockUI.stop();
        },function (errorresponse) {
            blockUI.stop();
            $scope.error = 'failure loading Reports Data', errorresponse;
        });
    } 

    $scope.ViewReports = function(){
        getReportsDetails();
    }
});