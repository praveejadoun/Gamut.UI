app.controller('RestucturingController', function ($scope, $location, $window, $rootScope,$filter, toaster, userService, ModuleService, GeneralService,RestucturingService,ShareData,blockUI) {
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
            // if($scope.selecteRestructured == "yes"){
            //     $scope.selecteRestructured = $scope.dropDown[0];
            // }else{
            //     $scope.selecteRestructured = $scope.dropDown[1];
            // }
            // if($scope.selecteRescheduled == "yes"){
            //     $scope.selecteRescheduled = $scope.dropDown[0];
            // }else{
            //     $scope.selecteRescheduled = $scope.dropDown[1];
            // }
            blockUI.stop();
        },function (errorresponse) {
            blockUI.stop();
            $scope.error = 'failure loading Financials Data', errorresponse;
        });
    } 

    getModuleDetails()
    function getModuleDetails() {
        blockUI.start('Please wait...');
        $scope.customerId = localStorage.getItem("custId");
        $scope.moduleName = "Restucturing"
        var ModuleDetailsData = ModuleService.getModule($scope.customerId, $scope.moduleName);
        
        ModuleDetailsData.then(function (response) {
            $scope.ModuleDetailsDataList = response.data;
            blockUI.stop();
        },function (errorresponse) {
            blockUI.stop();
            $scope.error = 'failure loading Score Data', errorresponse;
        });
    } 

    $scope.SaveModuleData = function(){
        var data = {
            "id": $scope.ModuleDetailsDataList[0].id,
            "cust_Id": $scope.ModuleDetailsDataList[0].cust_Id,
            "moduleName": "Restucturing",
            "observationNotes": $scope.ModuleDetailsDataList[0].ObservationNotes,
            "communicatedTo": $scope.ModuleDetailsDataList[0].CommunicatedTo,
            "responceReceived": $scope.ModuleDetailsDataList[0].responceReceived,
            "followupDate": $filter('date')($scope.ModuleDetailsDataList[0].FollowupDate, "yyyy-MM-dd"),
            "lastUpdateBy": $scope.userId,
            "lastUpdatedOn": $filter('date')(new Date(), "yyyy-MM-dd")
          }
        blockUI.start('Please wait...');
        var SaveModulesData = ModuleService.putModule($scope.ModuleDetailsDataList[0].id, data);
        
        SaveModulesData.then(function (res) {
            toaster.pop('success', "success", "Saved Successfully");
            blockUI.stop();
        },
        function (error) {
            toaster.pop('error', "error", "Error while saving");
            $scope.error = 'Failure while saving data', error;
            blockUI.stop();
        });
    }
});