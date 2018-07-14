app.controller('GeneralController', function ($scope, $location, $window, $rootScope,$filter,toaster, ModuleService, userService,GeneralService,ShareData,blockUI) {
   $scope.userId = localStorage.getItem("userName");
    if($scope.userId == null){
        location.reload(true);
    }
    $scope.StudentID = 0;
    $scope.test = "General Controller";
    $scope.loginId = "admin";
    $scope.pwd = "";
    
    getGeneral();

    function getGeneral() {
        blockUI.start('Please wait...');
        $scope.customerId = localStorage.getItem("custId");
        var promiseGetGeneral = GeneralService.getGeneral($scope.customerId);
        //debugger;
        promiseGetGeneral.then(function (pl) {
            $scope.exLimitTotal = 0;
            $scope.exBalanceTotal = 0;
            $scope.exPosuresTotal = 0;
           var exposuresList = pl.data.exposures;
           $scope.entData= pl.data.entData;
           for (var prop in exposuresList) {
            if (exposuresList.hasOwnProperty(prop)) { 
               
                var row = JSON.parse(JSON.stringify(exposuresList[prop]));
              
              $scope.exLimitTotal = parseInt($scope.exLimitTotal) + row.limit;
              $scope.exBalanceTotal = parseInt($scope.exBalanceTotal) + row.balance;
              $scope.exPosuresTotal = parseInt($scope.exPosuresTotal) + row.exposure;
            }
          }
         
           $scope.General = pl.data;
           blockUI.stop();

        },
            function (errorPl) {
                toaster.pop('error', "error", "Error while loading General Data");
                $scope.error = 'failure loading General Data', errorPl;
                blockUI.stop();
            });
    } 

    $scope.save = function () {
        blockUI.start('Please wait...');
        var promisePutStudent = GeneralService.put($scope.General.entData.cust_id, JSON.stringify($scope.General.entData));
        promisePutStudent.then(function (pl) {
            toaster.pop('success', "success", "Saved Successfully");
            blockUI.stop();
        },
            function (errorPl) {
                toaster.pop('error', "error", "Error while saving");
                $scope.error = 'Failure loading General', errorPl;
                blockUI.stop();
            });
    };

    getModuleDetails()
    function getModuleDetails() {
        blockUI.start('Please wait...');
        $scope.customerId = localStorage.getItem("custId");
        $scope.moduleName = "General"
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
            "moduleName": "General",
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