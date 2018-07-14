app.controller('Soc124Controller', function ($scope, $location, $window,toaster, $rootScope,$filter, ModuleService, userService,GeneralService,soc124Service,ShareData,blockUI) {
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
        $scope.formatedStartDate = $filter('date')($scope.startDate, "dd-MM-yyyy");
        $scope.formatedendDateDate = $filter('date')($scope.endDate, "dd-MM-yyyy");
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

    $scope.saveData = function(id,cust_id, sourceSystemId, approvalDate, via, approvalFor, isCompiled, followUpDate, compiledDate){
        var data = {
            "id":id,
            "cust_id": cust_id,
            "sourceSystemId": sourceSystemId,
            "approvalDate": approvalDate,//$filter('date')(approvalDate, "dd-MM-yyyy"),
            "via": via,
            "approvalFor": approvalFor,
            "isCompiled": isCompiled,
            "followUpDate": followUpDate,//$filter('date')(followUpDate, "dd-MM-yyyy"),
            "compiledDate": compiledDate//$filter('date')(compiledDate, "dd-MM-yyyy")
          }
          
        blockUI.start('Please wait...');
        var newsResponse = soc124Service.postSoc124Data(id, data);
        newsResponse.then(function (res) {
            toaster.pop('success', "success", "Saved Successfully");
            blockUI.stop();
        },
        function (errorres) {
            toaster.pop('error', "error", "Error while saving");
            $scope.error = 'Failure while saving data', errorres;
            blockUI.stop();
        });
    }

    getModuleDetails()
    function getModuleDetails() {
        blockUI.start('Please wait...');
        $scope.customerId = localStorage.getItem("custId");
        $scope.moduleName = "SOC124"
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
            "moduleName": "SOC124",
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