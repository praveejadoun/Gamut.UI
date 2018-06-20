app.controller('IntrestRateController',function($scope,$location, $window, $rootScope,intrestRateService,blockUI){

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
});