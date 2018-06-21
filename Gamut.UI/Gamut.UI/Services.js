﻿
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
45
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
        return $http.get("http://gamut.somee.com/api/RatingAPI/"+ Id);
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









