app.controller('RatingController',function($scope,$location,$filter,  toaster, $window, $rootScope, ModuleService, ratingService,blockUI){
	$scope.userId = localStorage.getItem("userName");
    if($scope.userId == null){
        $location.path('/');
    }
	getRatingData();
	$scope.cssClass = "tabledata";
	$scope.hideButton = false;
	$scope.showButton = true;
	$scope.customerId = localStorage.getItem("custId");
    
    var Currentdate = new Date().getTime(),previousDate = 1000 * 60 * 60 * 24 * 365 * 2,
    finalstartDate = new Date(Currentdate - previousDate);
    $scope.startDate = finalstartDate;
    $scope.endDate = new Date();

    function getRatingData() {
		blockUI.start('Please wait...');
		$scope.formatedStartDate = $filter('date')($scope.startDate, "yyyy-MM-dd");
        $scope.formatedendDateDate = $filter('date')($scope.endDate, "yyyy-MM-dd");
        $scope.customerId = localStorage.getItem("custId");
		var ratingData = ratingService.getRatingById($scope.customerId);
        
        ratingData.then(function (response) {
			$scope.ratingList = response.data;
			blockUI.stop();
        },function (errorresponse) {
			$scope.error = 'failure loading Rating Data', errorresponse;
			blockUI.stop();
        });
	}

	$scope.removeClass= function(){
		blockUI.start('Please wait...');
		$scope.cssClass = "";
		$scope.showButton = false;
		$scope.hideButton = true;
		blockUI.stop();
	}

	$scope.addClass= function(){
		blockUI.start('Please wait...');
		$scope.cssClass = "tabledata";
		$scope.showButton = true;
		$scope.hideButton = false;
		blockUI.stop();
	}

	$scope.getRatingDataByDate= function(){
		getRatingData();
	}

	getModuleDetails()
    function getModuleDetails() {
        blockUI.start('Please wait...');
        $scope.customerId = localStorage.getItem("custId");
        $scope.moduleName = "Rating"
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
            "moduleName": "Rating",
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