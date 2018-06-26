app.controller('NewsController', function ($scope, $location, $filter, toaster, $window, $rootScope,$filter, userService,GeneralService,NewsService,ShareData,blockUI) {
    $scope.userId = localStorage.getItem("userName");
    if($scope.userId == null){
        $location.path('/');
    }

    var Currentdate = new Date().getTime(),previousDate = 1000 * 60 * 60 * 24 * 365 * 2,
    finalstartDate = new Date(Currentdate - previousDate);
    $scope.startDate = finalstartDate;
    $scope.endDate = new Date();

    getNewsDetails()
    function getNewsDetails() {
        blockUI.start('Please wait...');
        $scope.formatedStartDate = $filter('date')($scope.startDate, "dd-MM-yyyy");
        $scope.formatedendDateDate = $filter('date')($scope.endDate, "dd-MM-yyyy");
        $scope.customerId = localStorage.getItem("custId");
        var newsDetailsData = NewsService.getNewsById($scope.customerId);
        
        newsDetailsData.then(function (response) {
            $scope.newsDetailsDataList = response.data;
            blockUI.stop();
        },function (errorresponse) {
            blockUI.stop();
            $scope.error = 'failure loading News Data', errorresponse;
        });
    } 

    $scope.getNewsbyDate = function(){
        getViewDetails();
    }

    $scope.saveData = function(StepsInitiated, informedTo, comments, newsID,cust_id,heading,url,source){
        var data = {
            "comments": comments,
            "cust_id": cust_id,
            "heading": heading,
            "informedTo": informedTo,
            "newsID": newsID,
            "source": source,
            "url":url,
            "StepsInitiated": StepsInitiated
        }

        blockUI.start('Please wait...');
        var newsResponse = NewsService.putNewsById(localStorage.getItem("custId"), data);
        newsResponse.then(function (res) {
            toaster.pop('success', "success", "Saved Successfully");
            blockUI.stop();
        },
        function (errorres) {
            toaster.pop('error', "error", "Error while saving");
            $scope.error = 'Failure while saving news data', errorres;
            blockUI.stop();
        });
    }
});