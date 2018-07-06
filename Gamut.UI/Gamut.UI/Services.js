
app.service("GeneralService", function ($http) {
    //debugger;
    //Read all Records
    this.URLprefix = "http://gamut.somee.com";
    localStorage.setItem("APIUrl","http://gamut.somee.com/api");

    this.getGenerals = function () {

        return $http.get(this.URLprefix + "/api/GeneralAPI");
    };

    //Fundction to Read General by custId
    this.getGeneral = function (Id) {
        return $http.get(this.URLprefix + "/api/GeneralAPI/" + Id);
    };

    //Function to create new General
    this.post = function (General) {
        var request = $http({
            method: "post",
            url: this.URLprefix + "/api/GeneralAPI",
            data: General
        });
        return request;
    };

    //Edit General By CustId 
    this.put = function (Id, General) {
        var request = $http({
            method: "put",
            url: this.URLprefix + "/api/GeneralAPI/" + Id,
            data: General
        });
        return request;
    };

    //Delete General By CustId
    this.delete = function (Id) {
        var request = $http({
            method: "delete",
            url: this.URLprefix + "/api/GeneralAPI/" + Id
        });
        return request;
    };
});




app.service('userService', function () {

    var userList;// = [];

    //alert('serice');

    this.addUser = function (newObj) {
        //  alert('serice adduser');
        console.log("called addUser");
        userList = newObj;//.push(newObj);
        console.log("userList AFTER ADD::" + userList);
    };


    this.getUsers = function () {
        //console.log("called getUsers" + userList + " >>");
        return userList;
    };

});

//Intrest Rate Service API
app.service('intrestRateService', function ($http) {
   this.getintrestRate= function (Id) {
    return $http.get("http://gamut.somee.com/api/InterestCust/"+Id);
    };
    this.putintrestRate= function (Id, data) {
        return $http.put("http://gamut.somee.com/api/Interest/"+Id, data);
    };
});

//Customer Service API
app.service('customerService', function ($http) {
    this.getCustomerList= function () {
     return $http.get("http://gamut.somee.com/api/Customer");
     };
     this.getCustomerById= function (Id) {
        return $http.get("http://gamut.somee.com/api/Customer/"+ Id);
        };
 });

 //rating Service API
app.service('ratingService', function ($http) {
    this.getRatingList= function () {
     return $http.get("http://gamut.somee.com/api/RatingAPI");
     };
     this.getRatingById= function (Id) {
        return $http.get("http://gamut.somee.com/api/RatingCust/"+ Id);
        };
 });

//security Service API
app.service('securityService', function ($http) {
    this.getSecurityList= function () {
     return $http.get("http://gamut.somee.com/api/Security");
     };
     this.getSecurityById= function (Id) {
        return $http.get(localStorage.getItem("APIUrl")+"/Security/"+ Id);
        };
 });
 
//Soc124 Service API
app.service('soc124Service', function ($http) {
     this.getSoc124ByDate= function (Id, startDate, endDate) {
        return $http.get("http://gamut.somee.com/api/Soc124ByDate/"+ Id +"/"+ startDate + "/"+ endDate);
        };

     this.postSoc124Data= function (Id, data) {
        return $http.put("http://gamut.somee.com/api/Soc124API/"+ Id , data);
        };
 });

 //Financials Service API
app.service('FinancialService', function ($http) {
    this.getFinancialsById= function (Id) {
       return $http.get("http://gamut.somee.com/api/FinancialResultAPI/"+ Id);
    };

    this.getFinancialsByTrendz= function (Id,trendz) {
        return $http.get("http://gamut.somee.com/api/FinancialResultAPI/"+ Id +"?resTypeId=" + trendz);
    };
});

//Restucturing Service API
app.service('RestucturingService', function ($http) {
    this.getRestucturingById= function (Id) {
       return $http.get("http://gamut.somee.com/api/Restucturing/"+ Id);
    };
});

//Account Details Service API
app.service('AccountDetailService', function ($http) {
    this.getAccountDetailsById= function (Id) {
       return $http.get("http://gamut.somee.com/api/AccountDetails/"+ Id);
    };
});

//View Service API
app.service('WarningIndicatorsService', function ($http) {
    this.getWarningIndicatorsByDate= function (Id, startDate, endDate) {
       return $http.get("http://gamut.somee.com/api/WarningIndicatorsByDate/"+ Id +"/"+ startDate + "/"+ endDate);
    };
});

//News Service API
app.service('NewsService', function ($http) {
    this.getNewsById = function (Id) {
       return $http.get("http://gamut.somee.com/api/News/"+ Id );
    };

    this.putNewsById = function (Id, newsobj) {
        return $http.put("http://gamut.somee.com/api/News/"+ Id , newsobj);
     };
});

//Document Service API
app.service('DocumentService', function ($http) {
    this.getDocumentsByDate= function (Id, startDate, endDate) {
        return $http.get("http://gamut.somee.com/api/CustDocument/"+ Id +"?fromDate="+startDate +"&toDate="+endDate);
     };
     this.putDocuments= function (Id, data) {
        return $http.put("http://gamut.somee.com/api/CustDocument/"+ Id, data);
     };
});

//inspection Service API
app.service('InspectionService', function ($http) {
    this.getInspectionsByDate= function (Id, startDate, endDate) {
        return $http.get("http://gamut.somee.com/api/Inspection/"+ Id +"?fromDate="+startDate +"&toDate="+endDate);
     };
     this.putInspections= function (Id, data) {
        return $http.put("http://gamut.somee.com/api/Inspection/"+ Id, data);
     };
});

//Snapshot Service API
app.service('SnapshotService', function ($http) {
    this.getSnapshotsByDate= function (Id, startDate, endDate) {
        return $http.get("http://gamut.somee.com/api/Snapshot/"+ Id +"?fromDate="+startDate +"&toDate="+endDate);
     };
});

//SMA Service API
app.service('SMAService', function ($http) {
    this.getSMAByDate= function (Id, startDate, endDate) {
        return $http.get("http://gamut.somee.com/api/SMACompilation/"+ Id +"?fromDate="+startDate +"&toDate="+endDate);
     };
});

//Reports Service API
app.service('ReportService', function ($http) {
    this.getReports= function (Id, status, relatedTo, startDate, endDate) {
        return $http.get("http://gamut.somee.com/api/ReportData/"+ Id +"?status="+status+"&relatedTo="+relatedTo+"&fromDate="+startDate +"&toDate="+endDate);
     };
});

//activeLogs Service API
app.service('LogsService', function ($http) {
    this.getactiveLogs= function (Id, logType, startDate, endDate) {
        return $http.get("http://gamut.somee.com/api/ActivityLog/"+Id+"?logType="+logType+"&fromDate="+startDate+"&toDate="+endDate);
     };
});


 //Financials Service API
 app.service("FinancialsService", function ($http) {
    //debugger;
    //Read all Records
    this.URLprefix = "http://gamut.somee.com";

    this.getFinancials = function () {

        return $http.get(this.URLprefix + "/api/Soc124Api");
    };

    this.getCustomers = function () {
        return $http.get(this.URLprefix + "/api/customer");
    };

    //Fundction to Read General by custId
    this.getSoc124 = function (Id) {
        return $http.get(this.URLprefix + "/api/Soc124Api/" + Id);
    };

    this.getFinancialFilter = function(params){
        console.log(params);
        return $http.get(this.URLprefix + "/api/Soc124ByDate/"+params.cust_id+"/"+params.from_date+"/"+params.to_date);
    }

    //Function to create new General
    this.post = function (Financial) {
        var request = $http({
            method: "post",
            url: this.URLprefix + "/api/Soc124Api",
            data: Financial
        });
        return request;
    };

    //Edit General By CustId 
    this.put = function (Id, Financial) {
        var request = $http({
            method: "put",
            url: this.URLprefix + "/api/Soc124Api/" + Id,
            data: Financial
        });
        return request;
    };

    //Delete General By CustId
    this.delete = function (Id) {
        var request = $http({
            method: "delete",
            url: this.URLprefix + "/api/Soc124Api/" + Id
        });
        return request;
    };
});










