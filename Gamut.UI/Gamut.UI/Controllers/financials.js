app.controller('FinancialsController', function ($scope, $location, $window, $rootScope,$filter, userService,GeneralService,FinancialService,ShareData,blockUI) {
    $scope.userId = localStorage.getItem("userName");
    if($scope.userId == null){
        $location.path('/');
    }
    
    getFinancials()
    function getFinancials() {
        blockUI.start('Please wait...');
        $scope.customerId = localStorage.getItem("custId");
        var financialsData = FinancialService.getFinancialsById($scope.customerId);
        
        financialsData.then(function (response) {
            $scope.financialsDataList = response.data;
            blockUI.stop();
        },function (errorresponse) {
            blockUI.stop();
            $scope.error = 'failure loading Financials Data', errorresponse;
        });
    } 

    // $scope.getSoc124byDate = function(){
    //     getSoc124();
    // }
});