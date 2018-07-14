app.controller('InspectionController', function ($scope, $location, toaster , $filter, $window, $rootScope,$filter,ModuleService, userService,GeneralService,InspectionService,ShareData,blockUI) {
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
        $scope.startDate = selectedYear.startDate;
        $scope.endDate = selectedYear.endDate;
    }
    $scope.ViewReports = function () {
        alert('test');
            
        getInspectionDetails();
    }

    $scope.saveData = function(id, cust_Id,auditType, code, comments, inspectionStatus, followUpDate, compiledDate, lastUpdatedBy){
        var data = {
            "id":id,
            "cust_Id": cust_Id,
            "auditType": auditType,
            "code": code,
            "comments": comments,
            "inspectionStatus": inspectionStatus,
            "followUpDate": followUpDate,//$filter('date')(followUpDate, "dd-MM-yyyy"),
            "compiledDate": compiledDate,//$filter('date')(compiledDate, "dd-MM-yyyy"),
            "lastUpdatedBy": lastUpdatedBy,
            "lastUpdatedOn": $filter('date')(new Date(), "dd-MM-yyyy")
          }
          console.log(data);
        blockUI.start('Please wait...');
        var newsResponse = InspectionService.putInspections(id, data);
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
        $scope.moduleName = "Inspection"
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
            "moduleName": "Inspection",
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