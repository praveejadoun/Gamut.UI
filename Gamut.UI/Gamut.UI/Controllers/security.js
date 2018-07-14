app.controller('SecurityController',function($scope,$location, $window, $rootScope,$filter, toaster,ModuleService, ModuleService, securityService,blockUI){
	$scope.userId = localStorage.getItem("userName");
    if($scope.userId == null){
        $location.path('/');
    }
	$scope.primary = [];
	$scope.collateral = [];
	$scope.others = [];
	$scope.newData =[];

	getSecurityData();

    function getSecurityData() {
		blockUI.start('Please wait...');
		$scope.customerId = localStorage.getItem("custId");
		var securityData = securityService.getSecurityById($scope.customerId);
        
        securityData.then(function (response) {
			$scope.securityList = response.data;
            $scope.group = response.data.entData;
            $scope.gurantors = response.data.gurantors;
			blockUI.stop();
        },function (errorresponse) {
			$scope.error = 'failure loading Rating Data', errorresponse;
			blockUI.stop();
        });
	}

	getModuleDetails()
    function getModuleDetails() {
        blockUI.start('Please wait...');
        $scope.customerId = localStorage.getItem("custId");
        $scope.moduleName = "Security"
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
            "moduleName": "Security",
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