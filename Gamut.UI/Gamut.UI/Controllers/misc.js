<<<<<<< HEAD
﻿app.controller('MiscController', function ($scope, $location, Upload, toaster , $filter, $window, $rootScope,$filter, userService, ModuleService, MiscService, ShareData, FileUpload, blockUI) {
=======
﻿app.controller('MiscController', function ($scope, $location, toaster , $filter, $window, $rootScope,$filter, userService, ModuleService, MiscService,ShareData,blockUI) {
>>>>>>> 871c7704fc674796e965ad2417c0fb6c9bbe5cc7
    $scope.userId = localStorage.getItem("userName");
    if($scope.userId == null){
        $location.path('/');
    }
    $scope.row = false;
    $scope.expRow = false;
    getMiscDetails()
    function getMiscDetails() {
        blockUI.start('Please wait...');
        $scope.customerId = localStorage.getItem("custId");
        var MiscDetailsData = MiscService.getMiscInformation($scope.customerId, $scope.userId);
        
        MiscDetailsData.then(function (response) {
            $scope.MiscDetailsDataList = response.data;
            $scope.miscAttachments = response.data.miscAttachments;
            $scope.miscExposures = response.data.miscExposures;
            $scope.customer_Id = response.data.miscExposures[0].cust_Id;
            blockUI.stop();
        },function (errorresponse) {
            blockUI.stop();
            $scope.error = 'failure loading Misc Data', errorresponse;
        });
    } 

    $scope.saveAttachmentData = function(attachmentDate,attachmentURL,comments,cust_Id,id,lastUpdatedBy,lastUpdatedOn){
        var data = {
            "id": id,
            "attachmentDate": $filter('date')(attachmentDate, "yyyy-MM-dd"),
            "cust_Id": cust_Id,
            "attachmentURL": attachmentURL,
            "comments": comments,
            "lastUpdatedBy": $scope.userId,
            "lastUpdatedOn": $filter('date')(new Date(), "yyyy-MM-dd")
          }
          
        blockUI.start('Please wait...');
        var saveAttachmentResponse = MiscService.putmiscAttachments(id, data);
        saveAttachmentResponse.then(function (res) {
            toaster.pop('success', "success", "Saved Successfully");
            blockUI.stop();
        },
        function (error) {
            toaster.pop('error', "error", "Error while saving");
            $scope.error = 'Failure while saving data', error;
            blockUI.stop();
        });
    }

    $scope.saveExposureData = function(balance,comments,cust_Id,exposure,facility,facilityType,id,sanctionLimit){
        var data = {
            "id": id,
            "cust_Id": cust_Id,
            "facilityType": facilityType,
            "facility": facility,
            "sanctionLimit": sanctionLimit,
            "balance": balance,
            "exposure": exposure,
            "comments": (comments == undefined || comments == null || comments == '')? '': comments,
            "lastUpdatedBy": $scope.userId,
            "lastUpdatedOn": $filter('date')(new Date(), "yyyy-MM-dd")
          }
          
        blockUI.start('Please wait...');
        var saveExposureResponse = MiscService.putmiscExposures(id, data);
        saveExposureResponse.then(function (res) {
            toaster.pop('success', "success", "Saved Successfully");
            blockUI.stop();
        },
        function (error) {
            toaster.pop('error', "error", "Error while saving");
            $scope.error = 'Failure while saving data', error;
            blockUI.stop();
        });
    }
    getModuleDetails();
    function getModuleDetails() {
        blockUI.start('Please wait...');
        $scope.customerId = localStorage.getItem("custId");
        $scope.moduleName = "Misc"
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
            "moduleName": "Misc",
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
            getModuleDetails();
            blockUI.stop();
        },
        function (error) {
            toaster.pop('error', "error", "Error while saving");
            $scope.error = 'Failure while saving data', error;
            blockUI.stop();
        });
    }

    $scope.addRow = function(){
        $scope.row = true;
    }

    $scope.addExpRow = function(){
        $scope.expRow = true;
    }

    $scope.saveNewExposureData = function(balance,comments,exposure,facility,facilityType,sanctionLimit){
        var data = {
            "id": "",
            "cust_Id": $scope.customer_Id,
            "facilityType": facilityType,
            "facility": facility,
            "sanctionLimit": sanctionLimit,
            "balance": balance,
            "exposure": exposure,
            "comments": (comments == undefined || comments == null || comments == '')? '': comments,
            "lastUpdatedBy": $scope.userId,
            "lastUpdatedOn": $filter('date')(new Date(), "yyyy-MM-dd")
          }
          
        blockUI.start('Please wait...');
        var saveExposureResponse = MiscService.postmiscExposures(data);
        saveExposureResponse.then(function (res) {
            toaster.pop('success', "success", "Saved Successfully");
            getMiscDetails();
            blockUI.stop();
        },
        function (error) {
            toaster.pop('error', "error", "Error while saving");
            $scope.error = 'Failure while saving data', error;
            blockUI.stop();
        });
    }

    $scope.saveNewAttachmentData = function(attachmentURL,comments){
        var data = {
            "id": "",
            "attachmentDate": $filter('date')(new Date(), "yyyy-MM-dd"),
            "cust_Id": $scope.customer_Id,
            "attachmentURL": attachmentURL,
            "comments": comments,
            "lastUpdatedBy": $scope.userId,
            "lastUpdatedOn": $filter('date')(new Date(), "yyyy-MM-dd")
          }
          
        blockUI.start('Please wait...');
        var saveAttachmentResponse = MiscService.postmiscAttachments(data);
        saveAttachmentResponse.then(function (res) {
            getMiscDetails();
            toaster.pop('success', "success", "Saved Successfully");
            blockUI.stop();
        },
        function (error) {
            toaster.pop('error', "error", "Error while saving");
            $scope.error = 'Failure while saving data', error;
            blockUI.stop();
        });
    }
<<<<<<< HEAD

    $scope.uploadFile = function(file){
        blockUI.start('Please wait...');
        var saveNewAttachment = FileUpload.postFile(file);
        saveNewAttachment.then(function (res) {
            getMiscDetails();
            toaster.pop('success', "success", "Saved Successfully");
            blockUI.stop();
        },
        function (error) {
            toaster.pop('error', "error", "Error while saving");
            $scope.error = 'Failure while saving data', error;
            blockUI.stop();
        });
    }
=======
>>>>>>> 871c7704fc674796e965ad2417c0fb6c9bbe5cc7
});