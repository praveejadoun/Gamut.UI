app.controller('GeneralController', function ($scope, $location, $window, $rootScope,toaster, userService,GeneralService,ShareData,blockUI) {
    $scope.StudentID = 0;
    $scope.test = "General Controller";
    $scope.loginId = "admin";
    $scope.pwd = "";
    
    getGeneral();

    function getGeneral() {
        blockUI.start('Please wait...');
        $scope.customerId = localStorage.getItem("custId");
        var promiseGetGeneral = GeneralService.getGeneral($scope.customerId);
        //debugger;
        promiseGetGeneral.then(function (pl) {
            $scope.exLimitTotal = 0;
            $scope.exBalanceTotal = 0;
            $scope.exPosuresTotal = 0;
           var exposuresList = pl.data.exposures;
           for (var prop in exposuresList) {
            if (exposuresList.hasOwnProperty(prop)) { 
               
                var row = JSON.parse(JSON.stringify(exposuresList[prop]));
              
              $scope.exLimitTotal = parseInt($scope.exLimitTotal) + row.limit;
              $scope.exBalanceTotal = parseInt($scope.exBalanceTotal) + row.balance;
              $scope.exPosuresTotal = parseInt($scope.exPosuresTotal) + row.exposure;
            }
          }
         
           $scope.General = pl.data;
           blockUI.stop();

        },
            function (errorPl) {
                $scope.error = 'failure loading General Data', errorPl;
                blockUI.stop();
            });
    } 

    $scope.save = function () {
        blockUI.start('Please wait...');
        var promisePutStudent = GeneralService.put($scope.General.entData.cust_id, JSON.stringify($scope.General.entData));
        promisePutStudent.then(function (pl) {
            toaster.pop('success', "success", "Saved Successfully");
            blockUI.stop();
        },
            function (errorPl) {
                toaster.pop('error', "error", "Error while saving");
                $scope.error = 'Failure loading General', errorPl;
                blockUI.stop();
            });
    };

});