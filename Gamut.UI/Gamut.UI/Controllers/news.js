app.controller('NewsController', function ($scope, $location, $filter, toaster, $window, $rootScope,$filter, userService, ModuleService, GeneralService,NewsService,ShareData,blockUI) {
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
        $scope.Type = $scope.Typeof;
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

    $scope.saveData = function(informedTo, comments, newsID,cust_id,heading,url,source,updatedDate,id){
        var data = {
            "comments": comments,
            "cust_id": cust_id,
            "heading": heading,
            "informedTo": informedTo,
            "newsID": newsID,
            "source": source,
            "url":url,
            "updateDate":updatedDate
        }

        blockUI.start('Please wait...');
        var newsResponse = NewsService.putNewsById(newsID, data);
        newsResponse.then(function (res) {
            toaster.pop('success', "success", "Saved Successfully");
            blockUI.stop();
        },
        function (errorres) {
            toaster.pop('error', "error", "Error while saving");
            $scope.error = 'Failure while saving news data', errorres;
            blockUI.stop();
        });

        getModuleDetails()
    function getModuleDetails() {
        blockUI.start('Please wait...');
        $scope.customerId = localStorage.getItem("custId");
        $scope.moduleName = "News"
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
            "moduleName": "News",
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
    }
});