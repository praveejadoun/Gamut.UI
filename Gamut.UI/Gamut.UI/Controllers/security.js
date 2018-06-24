app.controller('SecurityController',function($scope,$location, $window, $rootScope,securityService,blockUI){
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
			$scope.group = response.data;
			blockUI.stop();
        },function (errorresponse) {
			$scope.error = 'failure loading Rating Data', errorresponse;
			blockUI.stop();
        });
	}
});