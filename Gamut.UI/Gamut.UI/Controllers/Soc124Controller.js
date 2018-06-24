app.controller('Soc124Controller', function ($scope, $location, $window, $rootScope,$filter, userService,GeneralService,soc124Service,ShareData,blockUI) {
    $scope.userId = localStorage.getItem("userName");
    if($scope.userId == null){
        $location.path('/');
    }
    $scope.customerId = localStorage.getItem("custId");
    
    var Currentdate = new Date().getTime(),previousDate = 1000 * 60 * 60 * 24 * 365 * 2,
    finalstartDate = new Date(Currentdate - previousDate);
    $scope.startDate = finalstartDate;
    $scope.endDate = new Date();
    
    getSoc124();
    function getSoc124() {
        blockUI.start('Please wait...');
        $scope.formatedStartDate = $filter('date')($scope.startDate, "yyyy-MM-dd");
        $scope.formatedendDateDate = $filter('date')($scope.endDate, "yyyy-MM-dd");
        $scope.customerId = localStorage.getItem("custId");
        var soc124Data = soc124Service.getSoc124ByDate($scope.customerId, $scope.formatedStartDate, $scope.formatedendDateDate);
        
        soc124Data.then(function (response) {
            $scope.soc124DataList = response.data;
            blockUI.stop();
        },function (errorresponse) {
            blockUI.stop();
            $scope.error = 'failure loading Soc124 Data', errorresponse;
        });
    } 

    $scope.getSoc124byDate = function(){
        getSoc124();
    }
});