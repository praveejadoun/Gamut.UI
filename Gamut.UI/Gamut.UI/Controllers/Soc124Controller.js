app.controller('Soc124Controller', function ($scope, $location, $window,toaster, $rootScope,$filter, userService,GeneralService,soc124Service,ShareData,blockUI) {
    $scope.userId = localStorage.getItem("userName");
    if($scope.userId == null){
        $location.path('/');
    }
    $scope.customerId = localStorage.getItem("custId");
    
    var Currentdate = new Date().getTime(),previousDate = 1000 * 60 * 60 * 24 * 365 * 2,
    finalstartDate = new Date(Currentdate - previousDate);
    $scope.startDate = finalstartDate;
    $scope.endDate = new Date();
    
    getSoc124();
    function getSoc124() {
        blockUI.start('Please wait...');
        $scope.formatedStartDate = $filter('date')($scope.startDate, "dd-MM-yyyy");
        $scope.formatedendDateDate = $filter('date')($scope.endDate, "dd-MM-yyyy");
        $scope.customerId = localStorage.getItem("custId");
        var soc124Data = soc124Service.getSoc124ByDate($scope.customerId, $scope.formatedStartDate, $scope.formatedendDateDate);
        
        soc124Data.then(function (response) {
            $scope.soc124DataList = response.data;
            blockUI.stop();
        },function (errorresponse) {
            blockUI.stop();
            $scope.error = 'failure loading Soc124 Data', errorresponse;
        });
    } 

    $scope.getSoc124byDate = function(){
        getSoc124();
    }

    $scope.saveData = function(id,cust_id, sourceSystemId, approvalDate, via, approvalFor, isCompiled, followUpDate, compiledDate){
        var data = {
            "id":id,
            "cust_id": cust_id,
            "sourceSystemId": sourceSystemId,
            "approvalDate": $filter('date')(approvalDate, "dd-MM-yyyy"),
            "via": via,
            "approvalFor": approvalFor,
            "isCompiled": isCompiled,
            "followUpDate": $filter('date')(followUpDate, "dd-MM-yyyy"),
            "compiledDate": $filter('date')(compiledDate, "dd-MM-yyyy")
          }
          
        blockUI.start('Please wait...');
        var newsResponse = soc124Service.postSoc124Data(id, data);
        newsResponse.then(function (res) {
            toaster.pop('success', "success", "Saved Successfully");
            blockUI.stop();
        },
        function (errorres) {
            toaster.pop('error', "error", "Error while saving");
            $scope.error = 'Failure while saving data', errorres;
            blockUI.stop();
        });
    }
});