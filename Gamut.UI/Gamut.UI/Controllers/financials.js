app.controller('FinancialsController', function ($scope, $location, $window, $rootScope,$filter, toaster, ModuleService, userService,GeneralService,FinancialService,ShareData,blockUI) {
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

    $scope.getFinDatabyName = function(selectFynType){
        blockUI.start('Please wait...');
        $scope.customerId = localStorage.getItem("custId");
        var financialTypeData = FinancialService.getFinancialsByTrendz($scope.customerId, selectFynType.typeID);
        
        financialTypeData.then(function (response) {
            $scope.financialTypeDataList = response.data.financialResult;
            $scope.Quater = response.data.resQuar;
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
        $scope.moduleName = "Financial"
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
            "moduleName": "Financial",
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