app.controller('RatingController',function($scope,$location, $window, $rootScope,ratingService,blockUI){

	getRatingData();
	$scope.cssClass = "tabledata";
	$scope.hideButton = false;
	$scope.showButton = true;

    function getRatingData() {
		blockUI.start('Please wait...');
		var ratingData = ratingService.getRatingList();
        
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
});