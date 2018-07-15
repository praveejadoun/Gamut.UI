app.controller('DocumentsController', function ($scope, $location,toaster, $filter, $window, $rootScope,$filter, ModuleService, userService,GeneralService,DocumentService,ShareData,blockUI) {
    $scope.userId = localStorage.getItem("userName");
    if($scope.userId == null){
        $location.path('/');
    }

    var Currentdate = new Date().getTime(),previousDate = 1000 * 60 * 60 * 24 * 365 * 2,
    finalstartDate = new Date(Currentdate - previousDate);
    $scope.startDate = finalstartDate;
    $scope.endDate = new Date();

    getDocumentDetails()
    function getDocumentDetails() {
        blockUI.start('Please wait...');
        $scope.formatedStartDate = $filter('date')($scope.startDate, "dd-MM-yyyy");
        $scope.formatedendDateDate = $filter('date')($scope.endDate, "dd-MM-yyyy");
        $scope.customerId = localStorage.getItem("custId");
        var ViewDocumentDetailsData = DocumentService.getDocumentsByDate($scope.customerId, $scope.formatedStartDate, $scope.formatedendDateDate);
        
        ViewDocumentDetailsData.then(function (response) {
            $scope.ViewDocumentDetailsDataList = response.data;
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
        $scope.startDate = selectedYear.startDate;
        $scope.endDate = selectedYear.endDate;
    }

    $scope.saveData = function(id,cust_id, periodicity, documentType, submitted, submittedDate, deviationNoted, compiledDate, isChecked, monitorId, lastUpdatedBy, lastUpdatedOn,sortOn){
        var data = {
            "Id":id,
            "cust_id": cust_id,
            "periodicity": periodicity,
            "documentType": documentType,
            "submitted": submitted,
            "submittedDate": submittedDate,//$filter('date')(submittedDate, "dd-MM-yyyy"),
            "deviationNoted": deviationNoted,
            "compiledDate": compiledDate,//$filter('date')(compiledDate, "dd-MM-yyyy"),
            "isChecked": isChecked ? 1 : 0,
            "monitorId": monitorId,
            "lastUpdatedBy": lastUpdatedBy,
            "lastUpdatedOn": $filter('date')(new Date(), "dd-MM-yyyy"),
            "sortOn": sortOn
          }
          
        blockUI.start('Please wait...');
        var newsResponse = DocumentService.putDocuments(id, data);
        newsResponse.then(function (res) {
            toaster.pop('success', "success", "Saved Successfully");
            blockUI.stop();
        },
        function (error) {
            toaster.pop('error', "error", "Error while saving");
            $scope.error = 'Failure while saving data', error;
            blockUI.stop();
        });
    }

    getModuleDetails()
    function getModuleDetails() {
        blockUI.start('Please wait...');
        $scope.customerId = localStorage.getItem("custId");
        $scope.moduleName = "Documents"
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
            "moduleName": "Documents",
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