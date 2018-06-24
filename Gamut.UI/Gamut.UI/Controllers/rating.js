app.controller('RatingController',function($scope,$location,$filter, $window, $rootScope,ratingService,blockUI){
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
});