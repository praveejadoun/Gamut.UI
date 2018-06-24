app.controller('AccountDetailsController', function ($scope, $location, $window, $rootScope,$filter, userService,GeneralService,AccountDetailService,ShareData,blockUI) {
    $scope.userId = localStorage.getItem("userName");
    if($scope.userId == null){
        $location.path('/');
    }
    
    getAccountDetails()
    function getAccountDetails() {
        blockUI.start('Please wait...');
        $scope.customerId = localStorage.getItem("custId");
        var accountDetailsData = AccountDetailService.getAccountDetailsById($scope.customerId);
        
        accountDetailsData.then(function (response) {
            $scope.accountDetailsDataList = response.data;
            $scope.detailData = $scope.accountDetailsDataList.detailData;
            blockUI.stop();
        },function (errorresponse) {
            blockUI.stop();
            $scope.error = 'failure loading Financials Data', errorresponse;
        });
    } 
});