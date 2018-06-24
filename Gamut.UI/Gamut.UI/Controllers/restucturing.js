app.controller('RestucturingController', function ($scope, $location, $window, $rootScope,$filter, userService,GeneralService,RestucturingService,ShareData,blockUI) {
    $scope.userId = localStorage.getItem("userName");
    if($scope.userId == null){
        $location.path('/');
    }

    $scope.dropDown = ["Yes", "No"];
   
    getRestucturing()
    function getRestucturing() {
        blockUI.start('Please wait...');
        $scope.customerId = localStorage.getItem("custId");
        var restucturingData = RestucturingService.getRestucturingById($scope.customerId);
        
        restucturingData.then(function (response) {
            $scope.restucturingDataList = response.data;
            $scope.detailData = response.data.detailData;
            $scope.endDateData = response.data.entData;
            $scope.selecteRestructured = response.data.entData.accountRestructured;
            $scope.selecteRescheduled = response.data.entData.accountRescheduled;
            if($scope.selecteRestructured == "yes"){
                $scope.selecteRestructured = $scope.dropDown[0];
            }else{
                $scope.selecteRestructured = $scope.dropDown[1];
            }
            if($scope.selecteRescheduled == "yes"){
                $scope.selecteRescheduled = $scope.dropDown[0];
            }else{
                $scope.selecteRescheduled = $scope.dropDown[1];
            }
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