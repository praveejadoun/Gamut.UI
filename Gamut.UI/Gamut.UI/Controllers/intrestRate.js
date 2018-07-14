app.controller('IntrestRateController',function($scope,$location,toaster,$filter, $window, $rootScope, ModuleService, intrestRateService,blockUI){
	$scope.userId = localStorage.getItem("userName");
    if($scope.userId == null){
        $location.path('/');
    }
	$scope.cashCredit = [];
	$scope.termLoan = [];
	$scope.pcl = [];
	$scope.newData =[];
	
	getintrestRates();

    function getintrestRates() {
		blockUI.start('Please wait...');
		$scope.customerId = localStorage.getItem("custId");
        var intrestRateData = intrestRateService.getintrestRate($scope.customerId);
        
        intrestRateData.then(function (response) {
			$scope.intRateData = response.data;
			$scope.group = response.data.entData;
			blockUI.stop();
        },function (errorresponse) {
			blockUI.stop();
            $scope.error = 'failure loading intrest Rate Data', errorresponse;
        });
	}

	$scope.saveData = function(id,cust_id, accountNo, accountType, roi, asperID, dated, schemeType, followUpDate, compiledDate, source){
        var data = {
            "Id":id,
            "cust_Id": cust_id,
			"accountNo": accountNo,
			"accountType": accountType,
			"roi": roi,
			"asperID": asperID,
			"dated": dated,//$filter('date')(dated, "dd-MM-yyyy"),
			"schemeType": schemeType,
            "followUpDate": followUpDate,//$filter('date')(followUpDate, "dd-MM-yyyy"),
            "compiledDate": compiledDate,//$filter('date')(compiledDate, "dd-MM-yyyy"),
			"source": source
		  }
          
        blockUI.start('Please wait...');
        var newsResponse = intrestRateService.putintrestRate(id, data);
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
        $scope.moduleName = "Interest"
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
            "moduleName": "Interest",
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