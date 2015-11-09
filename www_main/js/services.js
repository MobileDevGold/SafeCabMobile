angular.module('safecab.services', ['ionic', 'ngAnimate'])
.factory('FriendService', function($q, $timeout) {
  // Some fake testing data
  var friends = [];

  return {
    all: function() {
      var deferred = $q.defer();
      $timeout(function() {
        deferred.resolve(friends);
      }, 1000);
      return deferred.promise;
    },
    allSync : function($http,$scope) {
    	var temp_st_FriendSea_Para = st_FriendSea_Para;
        temp_st_FriendSea_Para.PersonId = getLocalStorageData("PersonId");
        temp_st_FriendSea_Para.EmergencyContact = null;
        var data = GLOB_ConvertDataDBCompit(temp_st_FriendSea_Para,"st_FriendSea");
		$http.post("http://safecabmobilewebservice.azurewebsites.net/api/Service",data)
		  	.success(function(response) {
		  		friends.length = 0;
		  		GLOB_Friend_Data.length = 0;
		  		var tempFriendData = JSON.parse(response);
		  		if(tempFriendData.length > 0){
		  			for(i = 0;i<tempFriendData.length;i++){	
		  				var FullName = tempFriendData[i].FullName;
		  				var FriendId = tempFriendData[i].FriendId;
		  				var Telephone = tempFriendData[i].Telephone;
		  				var Rating = tempFriendData[i].Rating;
		  				var tempdata = {
		  					  id: FriendId,
						      title: FullName,
						      birth: FullName,
						      description: "Hi " + FullName,
						      name: FullName,
						      rating: Rating,
							  img: ImageWebServicesUrl + FriendId
		  				};
		  				friends.push(tempdata);
		  				GLOB_Friend_Data.push(tempdata);
		  			}
		  		}
		  	});
      return friends;
    },  
    get: function(friendId) {
      // Simple index lookup
      for(var i=0, l = friends.length; i < l; i++) {
        if(friends[i].id == friendId) {
          return friends[i];
        }
      }
    }
  }
})
.factory('PlacesService', function($q, $timeout) {
 return {
    GetAllPlaces: function($scope,$http,$ionicLoading) {
    var deferred = $q.defer();
	var temp_st_PersonPointOfInterest = st_EntityPointOfInterestSea_Para;
    temp_st_PersonPointOfInterest.PersonId = getLocalStorageData("PersonId");
    $ionicLoading.show({template: 'Loading...'});
	var data = GLOB_ConvertDataDBCompit(temp_st_PersonPointOfInterest,"st_EntityPointOfInterestSea");
	var promise = $http.post("http://safecabmobilewebservice.azurewebsites.net/api/Service",data)
		.success(function(resPOIData) {
			$ionicLoading.hide();
		 //return places;
	});	
	return promise;
	
	}
}
})
.factory('FavouritesService', function($q, $timeout) {
 return {
	 GetAllFavourites: function($scope,$http,$ionicLoading) {
    var deferred = $q.defer();
    var temp_st_PassengerFavouriteSea_Para = st_PassengerFavouriteSea_Para;
    temp_st_PassengerFavouriteSea_Para.PersonId = getLocalStorageData("PersonId");
    $ionicLoading.show({template: 'Loading...'});
	var data = GLOB_ConvertDataDBCompit(temp_st_PassengerFavouriteSea_Para,"st_PassengerFavouriteSea");
	var promise = $http.post("http://safecabmobilewebservice.azurewebsites.net/api/Service",data)
		.success(function(resPOIData) {
			$ionicLoading.hide();
		 //return places;
	});	
	return promise;
	
	}
}
})
.factory('BookingList', function($q, $timeout) {
 return {
    GetAllBookings: function($scope,$http,$ionicLoading) {
    var deferred = $q.defer();
	//
	    var FullName = getLocalStorageData("FullName");
	    var EmailAddress = getLocalStorageData("EmailAddress");
	    var tempCurrentDate = new Date();
	    var temp_custom_kendo_grid_fromdate = new Date(tempCurrentDate.setDate(tempCurrentDate.getDate() - 2));
	    var temp_custom_kendo_grid_Todate = new Date();
	    var tempd = currentFromDate();
	    tempToDate = new Date();
	    var strTempToDate = tempToDate.getFullYear() + "/" + (tempToDate.getMonth() + 1) + "/" + tempToDate.getDate();
	    var temp_st_BookingSea_Para = st_BookingSea_Para;
	    temp_st_BookingSea_Para.PersonId = getLocalStorageData("PersonId");
	    temp_st_BookingSea_Para.ValidFrom = temp_custom_kendo_grid_fromdate;
	    temp_st_BookingSea_Para.ValidTo = strTempToDate;

    $ionicLoading.show({template: 'Loading...'});
	var data = GLOB_ConvertDataDBCompit(temp_st_BookingSea_Para,"st_BookingSea");
	var promise = $http.post("http://safecabmobilewebservice.azurewebsites.net/api/Service",data)
		.success(function(resPOIData) {
			$ionicLoading.hide();
	});	
	return promise;
	
	}
}
})
.factory('MessageData', function($q, $timeout) {
 return {
    GetAllMessages: function($scope,$http,$ionicLoading) {
    var deferred = $q.defer();
	    var temp_st_ChatSea_Para = st_ChatSea_Para;
	    temp_st_ChatSea_Para.PersonId = getLocalStorageData("PersonId");

    $ionicLoading.show({template: 'Loading...'});
	var data = GLOB_ConvertDataDBCompit(temp_st_ChatSea_Para,"st_ChatSea");
	var promise = $http.post("http://safecabmobilewebservice.azurewebsites.net/api/Service",data)
		.success(function(resMessage) {
			$ionicLoading.hide();
	});	
	return promise;
	
	}
}
})


