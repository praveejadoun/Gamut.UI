app.controller('SecurityController',function($scope,$location, $window, $rootScope,securityService,blockUI){
	$scope.primary = [];
	$scope.collateral = [];
	$scope.others = [];
	$scope.newData =[];

	getSecurityData();

    function getSecurityData() {
		blockUI.start('Please wait...');
		var securityData = securityService.getSecurityList();
        
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