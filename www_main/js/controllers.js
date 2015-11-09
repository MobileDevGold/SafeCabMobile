/** zheng start **/
angular.module('safecab.controllers', ['mobiscroll-image', 'mobiscroll-datetime', 'ionic.rating','google.places'])

/** zheng end **/
.controller('FavouritesCtrl', function($scope, $ionicModal, $timeout, $ionicLoading, $compile,$ionicLoading,$window,$http,FavouritesService,$location ) {
	$scope.FavouritesData = [];
	FavouritesService.GetAllFavourites($scope,$http,$ionicLoading).then(function(promise) {
			 if(promise["statusText"] == "OK" && promise["status"] == 200){
				 var tempFavouritesData = JSON.parse(promise["data"]);
				 if(tempFavouritesData.length > 0){
				 		var tempData = {
				 				businessname: tempFavouritesData[i].BusinessName,
				 		        drivername: tempFavouritesData[i].DriverName,
				 		        favouriteId: tempFavouritesData[i].BusinessId,
				 		        driverId: tempFavouritesData[i].DriverId,
				 		        businessId: tempFavouritesData[i].BusinessId,
				 		        Longitude: tempFavouritesData[i].Longitude,
				 		        Latitude: tempFavouritesData[i].Latitude,
				 		        img: ImageWebServicesUrl +tempFavouritesData[i].BusinessId +tempFavouritesData[i].DriverId
				 		};
				 		$scope.FavouritesData.push(tempData);
				 	}
				 }
		})
})
.controller('PlacesCtrl', function($scope, $ionicModal, $timeout, $ionicLoading, $compile,$ionicLoading,$window,$http,PlacesService,$location ) {
	$scope.PlacesData = [];
	PlacesService.GetAllPlaces($scope,$http,$ionicLoading).then(function(promise) {
			 if(promise["statusText"] == "OK" && promise["status"] == 200){
				 var tempPlacesData = JSON.parse(promise["data"]);
				 if(tempPlacesData.length > 0){
				 	for(i = 0;i<tempPlacesData.length;i++){	
				 		var tempData = {
				 				POILbl:tempPlacesData[i]["PointOfInterest"],
				 				POIId:tempPlacesData[i]["EntityPointOfInterestId"]
				 		};
				 		$scope.PlacesData.push(tempData);
				 	}
				 }
		}
		  });
})

.controller('SOSController', function($scope, $ionicModal, $timeout, $ionicLoading, $compile,$ionicLoading,$window,$http,$location ) {
	$scope.ShowSOSEmergencyContactDiv = function (){
		var DivTrackingCotent = $('.DivSOSEmergencyContact').html();
	    var tempEmergencyContactDiv = "";
	    var tempPersonContact = st_FriendSea_Para;
	    {
	        tempPersonContact.PersonId = getLocalStorageData("PersonId");
	        tempPersonContact.EmergencyContact = 1;
	    };
	    //
	    var data = GLOB_ConvertDataDBCompit(tempPersonContact,"st_FriendSea");
		$ionicLoading.show({template: 'Loading...'});
			$http.post("http://safecabmobilewebservice.azurewebsites.net/api/Service",data)
			.success(function(resFriendList) {
				$ionicLoading.hide();
				resFriendList = JSON.parse(resFriendList);
				//alert(resFriendList.length + " : "+JSON.stringify(resFriendList));
				if (resFriendList.length != 0) {
	                $.each(resFriendList, function (index, key) {
	                    var tempChkFriendId = "0_0_" + resFriendList[index].FriendId + "_0_0";
	                    var CallerId = GLOB_CURRENT_BusinessId + "_" + GLOB_CURRENT_DriverId + "_" +  getLocalStorageData("PersonId") + "_0_0";
	                    var ReceiverId = tempChkFriendId;
	                    var FromPhone = CurrentUserFullDetails["Telephone"];
	                    var ToPhone = resFriendList[index].Telephone;
	                    var tempFriendName = resFriendList[index].FullName;
	                    $(".DivPersonTrackingFriendList").append("<input type='button' id='" + tempChkFriendId + "' onclick=javascript:TwilioConferenceCall('" + CallerId + "','" + ReceiverId + "','" + FromPhone + "','" + ToPhone + "') class='btnyellow EmergencyContactCheckbox' style='margin:3px 0px !important;width:98%;' value=" + tempFriendName + " /></br>");
	                });
	            }
	            else
	                $(".DivPersonTrackingFriendList").append('No any Emergency Contacts...');
	            	$(".DivSOSParentPopUp").find('.DivSOSMainScreen').hide("slide", { direction: "left" }, 500, function () {
	                $(".DivSOSEmergencyContact").css('display', 'inline-block');
	                $(".DivSOSParentPopUp").find('.DivSOSEmergencyContact').show("slide", { direction: "right" }, 500);
	            });
				
			});
	}
	$scope.SendSOSMessageFromSOSWindow = function() {
	    var tempMessage = $("#textareaSOSChatMessage").val();
	    if (tempMessage.length > 2) {
	        $("#textareaSOSChatMessage").removeClass('error');
	        alert(tempMessage);
	    }
	    else
	        $("#textareaSOSChatMessage").addClass('error');


	}
	//Person SOS tracking START
	$scope.PersonSOSTracking = function (){
		GLOB_map.panTo(new google.maps.LatLng(currentGeoLatitude, currentGeoLongitude));
        var tempTrackingDescription = "SOS Personal Tracking"; //$("#txtPersonTrackingCabDescription").val();
        var locationTrackingStart = st_LocationTrackingIns_Para;
        locationTrackingStart.BusinessId = GLOB_CURRENT_BusinessId;
        locationTrackingStart.DriverId = GLOB_CURRENT_DriverId;
        locationTrackingStart.PersonId = getLocalStorageData("PersonId");
        locationTrackingStart.BookingId = 0;
        locationTrackingStart.TrackingDescription = tempTrackingDescription;
        locationTrackingStart.Longitude = currentGeoLongitude;
        locationTrackingStart.Latitude = currentGeoLatitude;
        var data = GLOB_ConvertDataDBCompit(locationTrackingStart,"st_LocationTrackingIns");
		$ionicLoading.show({template: 'Loading...'});
			$http.post("http://safecabmobilewebservice.azurewebsites.net/api/Service",data)
			.success(function(resLocationTracking) {
				$ionicLoading.hide();
				 	var tempIds = GLOB_CURRENT_BusinessId + "_" + GLOB_CURRENT_DriverId + "_" + getLocalStorageData("PersonId") + "_0_0";
	                var tempPinChangeImg = DomainName + "/Data/Images/Map_pins/Person_Tracking.png";
	                alert("Now you are tracking....");
	                GLOB_IS_LOCATION_TRACKING_CONTINUE = true;
	                $(".btnStopTracking").show();
	                $(".btnStartTracking").hide();
	                $(".ImgSOSPerson").attr('onclick', 'javascript:OpenSOSPersonTrackingFileUploadOptions()').css('cursor', 'pointer');
	                markersArray[tempIds].setAnimation(google.maps.Animation.BOUNCE);
	                $scope.closeSOS();	                
	                markersArray[tempIds].setIcon(tempPinChangeImg);
	                flagPassengerTrack = true;
			});
	}
	//Person SOS tracking END
	
	//Person SOS STOP tracking START
		$scope.PersonSOSStopTracking = function (){
			var getCurrentUserData = CurrentUserFullDetails;
		    var tempPersonId = getLocalStorageData("PersonId");
		    var locationTrackingStart = st_LocationTrackingIns_Para;
		    locationTrackingStart.PersonId = tempPersonId;
		    locationTrackingStart.TimedOut = true;
		    //
		    var data = GLOB_ConvertDataDBCompit(locationTrackingStart,"st_LocationTrackingIns");
			$ionicLoading.show({template: 'Loading...'});
				$http.post("http://safecabmobilewebservice.azurewebsites.net/api/Service",data)
				.success(function(resLocationTracking) {
					$ionicLoading.hide();
					var tempPinChangeImg = DomainName + "/Data/Images/Map_pins/person-orange_mini.png";
		            alert("Tracking is finished....");
		            var tempIds = GLOB_CURRENT_BusinessId + "_" + GLOB_CURRENT_DriverId + "_" + tempPersonId + "_0_0";
		            markersArray[tempIds].setAnimation(null);
		            markersArray[tempIds].setIcon(tempPinChangeImg);
		            flagPassengerTrack = false;
		            GLOB_IS_LOCATION_TRACKING_CONTINUE = false;
		            
		            //set SOS Track me button & remove Stop Tracking button 
		            HideTrackingButton();
				});
		    //
		}
	//Person SOS STOP tracking END
})
.controller('MessageDataCtrl', function($scope, $ionicModal, $timeout, $ionicLoading, $compile,$ionicLoading,$window,$http,MessageData,$location ) {
	$scope.SendMessage = function () {
			var tempPersonId =getLocalStorageData("PersonId");
	        var tempChatMessage = $("#textareaReplytext").val();
	        var ChatThreadId = $(".hiddenChatThreadId").val();
	        var tempSenderBusinessId = $("#SenderBusinessId").val();
	        var tempSenderBusinessContactId = $("#SenderBusinessContactId").val();
	        var tempSenderDriverId = $("#SenderDriverId").val();
	        var tempSenderPersonId = $("#SenderPersonId").val();
	        var tempSenderBookingId = $("#SenderBookingId").val();
	        var tempSenderAdvertId = $("#SenderAdvertId").val();
	        var temp_st_ChatIns_Para = st_ChatIns_Para;
            temp_st_ChatIns_Para.ChatThreadId = ChatThreadId;
            temp_st_ChatIns_Para.BusinessId = parseInt(tempSenderBusinessId) == 0 ? null : tempSenderBusinessId;
            temp_st_ChatIns_Para.BusinessContactId = parseInt(tempSenderBusinessContactId) == 0 ? null : tempSenderBusinessContactId;
            temp_st_ChatIns_Para.DriverId = parseInt(tempSenderDriverId) == 0 ? null : tempSenderDriverId;
            temp_st_ChatIns_Para.PersonId = parseInt(tempSenderPersonId) == 0 ? null : tempSenderPersonId;
            temp_st_ChatIns_Para.BookingId = parseInt(tempSenderBookingId) == 0 ? null : tempSenderBookingId;
            temp_st_ChatIns_Para.AdvertId = parseInt(tempSenderAdvertId) == 0 ? null : tempSenderAdvertId;
            temp_st_ChatIns_Para.SenderPersonId = getLocalStorageData("PersonId") == 0 ? null : getLocalStorageData("PersonId");
            temp_st_ChatIns_Para.SenderBusinessId = 0 == 0 ? null : 0;
            temp_st_ChatIns_Para.SenderDriverId = 0 == 0 ? null : 0;
            temp_st_ChatIns_Para.Chat = tempChatMessage;
            console.log(JSON.stringify(temp_st_ChatIns_Para));
	        var data = GLOB_ConvertDataDBCompit(temp_st_ChatIns_Para,"st_ChatIns");
			$ionicLoading.show({template: 'Loading...'});
  			$http.post("http://safecabmobilewebservice.azurewebsites.net/api/Service",data)
  			.success(function(resChat) {
  				$ionicLoading.hide();  		
  					alert("Your message has been sent successfully.");
  			});
  			
	}
	
})
.controller('MessageCtrl', function($scope, $ionicModal, $timeout, $ionicLoading, $compile,$ionicLoading,$window,$http,MessageData,$location ) {
	$scope.MessageData = [];
	MessageData.GetAllMessages($scope,$http,$ionicLoading).then(function(promise) {
			 if(promise["statusText"] == "OK" && promise["status"] == 200){
				 var tempMessageData = JSON.parse(promise["data"]);
				 if(tempMessageData.length > 0){
				 	for(i = 0;i<tempMessageData.length;i++){	
				 		var tempData = {
				 				text:tempMessageData[i]["Chat"],
				 				SenderBusinessId:tempMessageData[i]["SenderBusinessId"],
				 				SenderDriverId: tempMessageData[i]["SenderDriverId"],
				 				SenderPersonId:tempMessageData[i]["SenderPersonId"],
				 				SenderBookingId:tempMessageData[i]["SenderBookingId"],
				 				SenderAdvertId:tempMessageData[i]["SenderAdvertId"],
				 				SenderBusinessContactId:tempMessageData[i]["SenderBusinessContactId"],
				 				ChatThreadId:tempMessageData[i]["ChatThreadId"],
				 				PersonImage:ImageWebServicesUrl + tempMessageData[i]["SenderBusinessId"] + "_" + tempMessageData[i]["SenderDriverId"] + "_" + tempMessageData[i]["SenderPersonId"] + "_" + tempMessageData[i]["SenderBookingId"]
				 		};
				 		$scope.MessageData.push(tempData);
				 	}
				 }
		}
		  });
	$scope.ShowMessageReplyScreen = function (SenderBusinessId,SenderDriverId,SenderPersonId,SenderBookingId ,SenderAdvertId ,SenderBusinessContactId ,ChatThreadId) {
			var temp_st_ChatSea_Para = st_ChatSea_Para;
			temp_st_ChatSea_Para.SenderBusinessId =  null;
			temp_st_ChatSea_Para.SenderBusinessContactId =  null;
			temp_st_ChatSea_Para.SenderDriverId = null;
			temp_st_ChatSea_Para.SenderPersonId =  null;
			temp_st_ChatSea_Para.SenderBookingId =  null;
			temp_st_ChatSea_Para.SenderAdvertId =  null;
			temp_st_ChatSea_Para.BusinessId =  null;
			temp_st_ChatSea_Para.BusinessContactId =  null;
			temp_st_ChatSea_Para.DriverId =  null;
			temp_st_ChatSea_Para.PersonId =  null;
			temp_st_ChatSea_Para.BookingId =  null;
			temp_st_ChatSea_Para.AdvertId =  null;
			temp_st_ChatSea_Para.ValidFrom =  null;
			temp_st_ChatSea_Para.ValidTo =  null;
		    temp_st_ChatSea_Para.ChatThreadId = ChatThreadId;
		    if (getLocalStorageData("PersonId") != 0) {
		        temp_st_ChatSea_Para.PersonId = getLocalStorageData("PersonId");
		    }
		    console.log(JSON.stringify(temp_st_ChatSea_Para));
		    var data = GLOB_ConvertDataDBCompit(temp_st_ChatSea_Para,"st_ChatSea");
			$ionicLoading.show({template: 'Loading...'});
  			$http.post("http://safecabmobilewebservice.azurewebsites.net/api/Service",data)
  			.success(function(tempResChat) {
  				tempResChat = JSON.parse(tempResChat);
  				
  					$ionicLoading.hide();  			
  					if (tempResChat != null) {
  		                $(".DivUserPerviousMessages").html('');
  		                $(".DivUserPerviousMessages").append(getPerviousMessageData(tempResChat));
  		              $(".hiddenChatThreadId").val(ChatThreadId);
  			        $("#SenderBusinessId").val(SenderBusinessId);
  			        $("#SenderBusinessContactId").val(SenderBusinessContactId);
  			        $("#SenderDriverId").val(SenderDriverId);
  			        $("#SenderPersonId").val(SenderPersonId);
  			        $("#SenderBookingId").val(SenderBookingId);
  			        $("#SenderAdvertId").val(SenderAdvertId);
  		            }
  					
  			});
		    
		
	}
})

.controller('BookinglistCtrl', function($scope, $ionicModal, $timeout, $ionicLoading, $compile,$ionicLoading,$window,$http,BookingList,$location ) {
	$scope.BookingData = [];
	var tempBookingData = [];
	$ionicLoading.show({template: 'Loading...'});
	BookingList.GetAllBookings($scope,$http,$ionicLoading).then(function(promise) {
			 if(promise["statusText"] == "OK" && promise["status"] == 200){
				 var tempBookingListData = JSON.parse(promise["data"]);
				 Temp_GLOB_BookingData =tempBookingListData; 
				 //$(".DivBookingData").html('');
				 if(tempBookingListData.length > 0){
				 	for(i = 0;i<tempBookingListData.length;i++){	
				 		var tempData = {
				 				address: $.mobiscroll.formatDate('dd M yyyy h:ii A', new Date(Date.parse(tempBookingListData[i].RequiredDate + " " + tempBookingListData[i].RequiredTime))),
				 				BookingId : tempBookingListData[i].BookingId,
				 				BookingImageId :ImageWebServicesUrl +tempBookingListData[i].BusinessId 
				 		};
				 		tempBookingData.push(tempData);
				 		//$(".DivBookingData").append("<img style='width:35px;height:35px;' src='"+tempData.BookingImageId+"' /><span>'"+tempData.address+"'</span><div class='clear'></div>");
				 	}
				 }
		}
			 $ionicLoading.hide();
		  });
	
	setTimeout(function (){
		$scope.BookingData = tempBookingData;
	},500);
	$scope.rate = 1;
	$scope.myRate = 0;


    $scope.ShowCabListMap = function (){	
    	console.log(JSON.stringify(GLOB_MAPPINGSEA_PARA));
    	$scope.QuoteData = [];
    	var TempData = {"RequestorBusinessId":0,"RequestorDriverId":0,"RequestorPersonId":"1","RequestorBookingId":0,"BusinessId":0,"DriverId":0,"PersonId":"1","BookingId":0,"Longitude":"-0.332438000000006","Latitude":"52.022583000000004","Accuracy":0,"POVLongitude":-0.33243800000002466,"POVLatitude":52.022583000000004,"NorthEastLongitude":-0.18000269726564966,"NorthEastLatitude":52.0823307439586,"SouthWestLongitude":-0.48487330273439966,"SouthWestLatitude":51.962755338171,"RequiredDateTime":null,"FemaleDriverRequired":false,"DisabledAccessRequired":false,"TimeAdjustment":0,"FavouritesOnly":false,"VehicleTypesRequired":255,"MaxEstimatedCost":0,"RegistrationTypesRequired":7,"NumberRequired":20,"PusherAware":1};
	  	var data = GLOB_ConvertDataDBCompit(GLOB_MAPPINGSEA_PARA,"St_MappingSea");
	  	$http.post("http://safecabmobilewebservice.azurewebsites.net/api/Service",data)
	  	.success(function(resMappingData) {
	  			resMappingData = JSON.parse(resMappingData);
	  			var tempEntityType_16_Data =$.grep(resMappingData,function(e){return e.EntityType == 16});
	  			GLOB_TEMP_QUOTE_LIST_DATA = tempEntityType_16_Data; 
	  			if(tempEntityType_16_Data.length > 0){
	  				$.each(tempEntityType_16_Data,function(index,key){
	  					var tempData = {
	  						BusinessId :tempEntityType_16_Data[index].BusinessId,
	  						DriverId :tempEntityType_16_Data[index].DriverId,
	  						PersonId :tempEntityType_16_Data[index].PersonId,
	  						BookingId :tempEntityType_16_Data[index].BookingId,
	  						Longitude :tempEntityType_16_Data[index]["Longitude"],
	  						Latitude :tempEntityType_16_Data[index]["Latitude"],
	  						Distance :tempEntityType_16_Data[index]["Distance"],
	  						JourneyDistance :tempEntityType_16_Data[index]["JourneyDistance"],
	  						EntityType :tempEntityType_16_Data[index]["EntityType"],
	  						EntityStatus :tempEntityType_16_Data[index]["EntityStatus"],
	  						EntityTitle :tempEntityType_16_Data[index]["EntityTitle"],
	  						Rating :tempEntityType_16_Data[index]["Rating"],
	  						LastLocated :tempEntityType_16_Data[index]["LastLocated"],
	  						EstimatedCost :tempEntityType_16_Data[index]["EstimatedCost"],
	  						BookingImage: ImageWebServicesUrl + tempEntityType_16_Data[index].BusinessId +"_"+ tempEntityType_16_Data[index].DriverId
	  					};
	  					$scope.QuoteData.push(tempData);
	  				});
	  			}
	  	});
    	$(".DivBookingDetailView").hide("slide", { direction: "left" }, 500, function () {
  		  $(".DivMainBookingList").find('.DivQuoteList').show("slide", { direction: "right" }, 500);});
    }
    
    $scope.BackToBookingDescriptionPage = function (){	
    	$(".DivQuoteList").hide("slide", { direction: "right" }, 500, function () {
    		  $(".DivMainBookingList").find('.DivBookingDetailView').show("slide", { direction: "left" }, 500);});
    }
    
    $scope.onQuoteBookingEdit = function (BusinessId,BookingId,PersonId,DriverId){
    	var tempData12 = $.grep(GLOB_TEMP_QUOTE_LIST_DATA,function(e){return e.BusinessId == BusinessId});
    	var temp_st_PinDetailSea_Para = st_PinDetailSea_Para;
        temp_st_PinDetailSea_Para.BusinessId = BusinessId;
        temp_st_PinDetailSea_Para.DriverId = DriverId;
        temp_st_PinDetailSea_Para.PersonId = PersonId;
        temp_st_PinDetailSea_Para.BookingId = BookingId;
        temp_st_PinDetailSea_Para.RequestorBusinessId = 0 ;
        temp_st_PinDetailSea_Para.RequestorDriverId = 0;
        temp_st_PinDetailSea_Para.RequestorPersonId = PersonId;
        temp_st_PinDetailSea_Para.RequestorBookingId = 0;// GLOB_MAPPINGSEA_PARA.BookingId;
        //GLOB_SBPARADEBUGGER(temp_st_PinDetailSea_Para);
        var data = GLOB_ConvertDataDBCompit(temp_st_PinDetailSea_Para,"st_PinDetailSea");
	  	$http.post("http://safecabmobilewebservice.azurewebsites.net/api/Service",data)
	  	.success(function(resPinDetailsData) {
	  		var singleMappingSea = JSON.parse(resPinDetailsData);
	  		singleMappingSea = singleMappingSea[0];
	  		var tempEntity_Type_16_data = $(".DivQuoteData").html();
	  		var tempBusinessId = tempData12[0]["BusinessId"];
	  		var tempDriverId = tempData12[0]["DriverId"];
	  		var tempPersonId = tempData12[0]["PersonId"];
	  		var tempBookingId = tempData12[0]["BookingId"];
	  		var tempEntityTitle = tempData12[0]["EntityTitle"];
	  		tempEntity_Type_16_data = tempEntity_Type_16_data.replace(/{Booking_Status_16_Booking_BUSINESSID}/g,tempBusinessId);
	  		tempEntity_Type_16_data = tempEntity_Type_16_data.replace(/{Booking_Status_16_Booking_DRIVERID}/g,tempDriverId);
	  		tempEntity_Type_16_data = tempEntity_Type_16_data.replace(/{BUSINESSBOOKING_16_COMMENTCOUNT}/g,tempData12[0]["CommentCount"]);
	  		
	  		tempEntity_Type_16_data = tempEntity_Type_16_data.replace(/{Booking_Status_16_Booking_PERSONID}/g,tempPersonId);
	  		tempEntity_Type_16_data = tempEntity_Type_16_data.replace(/{Booking_Status_16_Booking_BOOKINGID}/g,tempBookingId);
	  		tempEntity_Type_16_data = tempEntity_Type_16_data.replace(/{Booking_Status_16_Booking_VEHICLETYPE}/g,singleMappingSea.VehicleTypes);
	  		tempEntity_Type_16_data = tempEntity_Type_16_data.replace(/{BUSINESSBOOKING_16_CABIMG}/g,ImageWebServicesUrl + tempBusinessId + "_"+tempDriverId);
	  		tempEntity_Type_16_data = tempEntity_Type_16_data.replace(/{LAT}/g,tempData12[0]["Latitude"]);
	  		tempEntity_Type_16_data = tempEntity_Type_16_data.replace(/{LNG}/g,tempData12[0]["Longitude"]);
	  		tempEntity_Type_16_data = tempEntity_Type_16_data.replace(/{BUSINESSBOOKINGTITLE}/g,tempEntityTitle);
	  		tempEntity_Type_16_data = tempEntity_Type_16_data.replace(/{BUSINESSBOOKING_16_RATING}/g,tempData12[0]["Rating"]);
	  		tempEntity_Type_16_data = tempEntity_Type_16_data.replace(/{BUSINESSBOOKING_Inner_16_CABIMG}/g,ImageWebServicesUrl + tempBusinessId + "_"+tempDriverId);
	  		tempEntity_Type_16_data = tempEntity_Type_16_data.replace(/{BUSINESSBOOKING_16_TELEPHONE}/g,GLOB_GetTelePhoneNumber(singleMappingSea.EntityTelephone));
	  		if (singleMappingSea.EntityTelephone.substr(0, 2) == '91' || singleMappingSea.EntityTelephone.substr(0, 2) == '44')
	  			tempEntity_Type_16_data = tempEntity_Type_16_data.replace(/{BUSINESSBOOKING_16_COUNTRYIMG}/g, GetCountryFlagFromCountryCode(singleMappingSea.EntityTelephone.substr(0, 2)));
	  		
	  		tempEntity_Type_16_data = tempEntity_Type_16_data.replace(/{BUSINESSBOOKING_16_RATING}/g,tempData12[0]["Rating"]);
	  		tempEntity_Type_16_data = tempEntity_Type_16_data.replace(/{BUSINESSBOOKING_16_BUSINESSREQUIREDDATETIME}/g,singleMappingSea.RequiredDateTime);
	  		tempEntity_Type_16_data = tempEntity_Type_16_data.replace(/{BUSINESSBOOKING_16_BUSINESSFROMADDRESS}/g,singleMappingSea.StartAddress);
	  		tempEntity_Type_16_data = tempEntity_Type_16_data.replace(/{BUSINESSBOOKING_16_BUSINESSTOADDRESS}/g,singleMappingSea.EndAddress);
	  		tempEntity_Type_16_data = tempEntity_Type_16_data.replace(/{BUSINESSBOOKING_16_BUSINESSNOTES}/g,singleMappingSea.BookingNotes);
	  		tempEntity_Type_16_data = tempEntity_Type_16_data.replace(/{BUSINESSBOOKING_16_BUSINESSESTIMATEDCOST}/g,singleMappingSea.ActualCost);
	  		var tempStatus = 0,tempBookingTextColor = "orange", tempBtnBookingStatusDisplay = "block";
	  		var tempBookingEntityStatus = parseInt(singleMappingSea.EntityStatus);
	  		if (tempPersonId > 0)
	  	        tempStatus = undefined;
	  		if (tempBookingEntityStatus != 0) {
	  	        tempStatus = GetVehicleTypeFromBinaryValue(tempBookingEntityStatus);
	  	        tempStatus = $(tempStatus).last()[0];
	  	    }
	  		if (tempPersonId > 0 ) {

                tempBtnBookingStatusDisplay = "none";
                tempDisplayContent = 'block';
                tempBookingText = FUN_GLOB_GET_PASSENGER_BOOKING_STATUS_VALUE_FROM_ENTITY_STATUS(tempStatus);
                if (singleMappingSea.QuoteOnly == true) {
                	tempEntity_Type_16_data = tempEntity_Type_16_data.replace(/{BUSINESSBOOKING_16_BOOKING_DISPLAY_REQUEST_PICK_UP_BTN}/g, 'show');
                    tempBookingText = "Quote";
                    tempDisplayContent = "none";
                }
                else
                	tempEntity_Type_16_data = tempEntity_Type_16_data.replace(/{BUSINESSBOOKING_16_BOOKING_DISPLAY_REQUEST_PICK_UP_BTN}/g, 'hide');

                tempEntity_Type_16_data = tempEntity_Type_16_data.replace(/{BUSINESSBOOKING_16_BOOKING_STATUS_DISPLAY}/g, tempDisplayContent);
                tempEntity_Type_16_data = tempEntity_Type_16_data.replace(/{BUSINESSBOOKING_16_BOOKING_STATUS_TEXT}/g, tempBookingText);
                tempEntity_Type_16_data = tempEntity_Type_16_data.replace(/{BUSINESSBOOKING_16_BOOKING_STATUS_TEXT_COLOR}/g, tempBookingTextColor);
            }
	  	tempEntity_Type_16_data = tempEntity_Type_16_data.replace(/{BUSINESSBOOKING_16_BOOKING_STATUS_BTN_DISPLAY}/g, tempBtnBookingStatusDisplay);
	  	
	  		var tempImgDisabledAccess = singleMappingSea.DisabledAccess == true ? "on" : "off";
	  	    var tempImgFemaleDriver = singleMappingSea.FemaleDrivers == true ? "on" : "off";
	  	    tempDisabledAccess = DomainNameSource + "/images/New_bits/disabled_access_" + tempImgDisabledAccess + ".png";
	  	    tempFemaleDriver = DomainNameSource + "/images/New_bits/female_driver_" + tempImgFemaleDriver + ".png";
	  		tempEntity_Type_16_data = tempEntity_Type_16_data.replace(/{BUSINESSBOOKING_16_BUSINESSREDISABLEDACCESSIMG}/g, tempDisabledAccess);
	  		tempEntity_Type_16_data = tempEntity_Type_16_data.replace(/{BUSINESSBOOKING_16_BUSINESSREFEMALEDRIVERIMG}/g, tempFemaleDriver);
	  		var tempDisplayVehicleType = 'hide', tempBookingVehicleType = "";
            if (singleMappingSea.VehicleTypes != 0) {
                tempDisplayVehicleType = 'show';
                tempBookingVehicleType = DomainName + "/DATA/images/cab_images/" + $.grep(CONF_CARTYPES, function (e) { return e.value == singleMappingSea.VehicleTypes })[0]["Image"];
            }
	  		tempEntity_Type_16_data = tempEntity_Type_16_data.replace(/{BUSINESSBOOKING_16_BOOKING_STATUS_VEHICLETYPE}/g, tempBookingVehicleType);
	  		tempEntity_Type_16_data = tempEntity_Type_16_data.replace(/{BUSINESSBOOKING_16_BOOKING_STATUS_VEHICLETYPE_CSS}/g, tempDisplayVehicleType);
	  		
	  		$(".DivAppendChildData").html(tempEntity_Type_16_data);
	  		setTimeout(function (){
	  			$scope.opentempPinPopUpE1();
	  		},100);
			
	  	});
    }
   
    $scope.rate = 7;
    $scope.max = 10;
    $scope.isReadonly = false;

    $scope.hoveringOver = function(value) {
      $scope.overStar = value;
      $scope.percent = 100 * (value / $scope.max);
    };

    $scope.ratingStates = [
      {stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle'},
      {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
      {stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle'},
      {stateOn: 'glyphicon-heart'},
      {stateOff: 'glyphicon-off'}
    ];
    
    $scope.$watch('rate', function(value) {
      console.log(value);
    });
    
    $scope.$watch('x', function(value) {
      console.log(value);
    });
    
      $scope.$watch('y', function(value) {
      console.log(value);
    });
    
	$scope.SavePassengerFeedbackData = function (){
		var tempPassengerCost  = $(".txtPassengerCost").val();
		var tempDriverRatings  = "2"//$("#DriverRating").val() ;
		var tempDriverFeedback  =  $('#txtBookingDriverNote').val() ;
		var txtActualCost = $("#hiddenBusinessBookingActualCost").val();  //Booking Estimated/Actucal Cost cost
	    var tempEstimatedCost = $("#hiddenBusinessBookingEstimatedCost").val();  //Booking Estimated cost
		var tempRequiredCost = txtActualCost; 
        if (txtActualCost < 0)
            tempRequiredCost = txtActualCost; //actual Cost 
        if (parseFloat(tempPassengerCost) < 9999.99) {
            if (parseFloat(tempPassengerCost) >= parseFloat(tempRequiredCost)) {
                $(".DivDisplayBookingHistoryDataErrorMessage").hide();
                var tempDriverBookingData = st_DriverBookingIns_Para;
                tempDriverBookingData.BusinessId = GLOB_MAPPINGSEA_PARA.BusinessId;
                tempDriverBookingData.DriverId = GLOB_MAPPINGSEA_PARA.DriverId;
                tempDriverBookingData.PersonId = getLocalStorageData("PersonId");
                tempDriverBookingData.BookingId = GLOB_MAPPINGSEA_PARA.BookingId;
                tempDriverBookingData.VehicleType = GLOB_MAPPINGSEA_PARA.VehicleTypesRequired;
                tempDriverBookingData.PassengerCost = tempPassengerCost;
                tempDriverBookingData.DriverNote = tempDriverFeedback;
                tempDriverBookingData.DriverRating = tempDriverRatings;
                tempDriverBookingData.PassengerNote = null;
                tempDriverBookingData.PassengerRating = null;
                tempDriverBookingData.Status = null;
                var data = GLOB_ConvertDataDBCompit(tempDriverBookingData,"st_DriverBookingIns");
                //console.log(JSON.stringify(tempDriverBookingData));
				$ionicLoading.show({template: 'Loading...'});
	  			$http.post("http://safecabmobilewebservice.azurewebsites.net/api/Service",data)
	  			.success(function(tempDriverBookingData) {
	  					alert("Your Feedback saved successfully..");
	  					$ionicLoading.hide();
	  			});
            }
            else {
                alert("Please enter a value greater than equal  " + tempRequiredCost).show();
            }
        }
        else {
            alert("Please enter a value less then 9999.99");
        }
		
	}
	
	$scope.DisplayBookingFeedbackDiv = function (objBookingData){
		var tempDriverBookingSelPara = {
	            PersonId: objBookingData.PersonId,
	            BookingId: objBookingData.BookingId,
	            BusinessId: objBookingData.BusinessId,
	            DriverId: objBookingData.DriverId
	        };
				var data = GLOB_ConvertDataDBCompit(tempDriverBookingSelPara,"st_DriverBookingSel");
				$ionicLoading.show({template: 'Loading...'});
	  			$http.post("http://safecabmobilewebservice.azurewebsites.net/api/Service",data)
	  			.success(function(tempDriverBookingData) {
	  				$ionicLoading.hide();
	  				tempDriverBookingData =  JSON.parse(tempDriverBookingData);
	                tempDriverBookingData = tempDriverBookingData[0];
	                $(".txtBookingExpectedCost").html(parseFloat(tempDriverBookingData["EstimatedCost"]).toFixed(2));
	                if (tempDriverBookingData["EstimatedCost"] == "" || tempDriverBookingData["EstimatedCost"] == null)
	                    $(".txtBookingExpectedCost").html("0.00");
	                switch (parseInt(objBookingData.EntityStatus)) {
	                    case 1:
	                    case 4:
	                    case 5:
	                        $(".Div_Picked_and_Noshow").show();
	                        break;
	                    case 9:
	                    case 8:
	                    case 13:
	                        $(".Div_Arrived").show();
	                        break;
	                    case 25:
	                    case 16:
	                    case 29:
	                    case 65:
	                    case 69:
	                        {
	                            if (objBookingData.EntityStatus == 65 || objBookingData.EntityStatus == 69 && tempDriverBookingData["PassengerFeedbackComplete"] == false)
	                                $(".DivBookingNonShow").show();
	                            ISPassengerCostAdded = false;
	                            var tempPassengerCost = 0;
	                            $("#hiddenBusinessBookingEstimatedCost").val(tempDriverBookingData["EstimatedCost"]);
	                            $("#hiddenBusinessBookingActualCost").val(0);
	                            if (objBookingData.EntityStatus == 25 || objBookingData.EntityStatus == 29) {
	                                $(".DivBookingFeedBack").show();
	                                $("#txtBookingPassengerCost,#txtBookingDriverNote").val('');
	                                //ReCreateFeedbackRatingStuff();
	                            }
	                            if (tempDriverBookingData["PassengerCost"] == 0 || tempDriverBookingData["PassengerCost"] == null) {
	                                if (tempDriverBookingData["ActualCost"] == 0 || tempDriverBookingData["ActualCost"] == null) {
	                                    if (tempDriverBookingData["EstimatedCost"] == 0) {
	                                        tempPassengerCost = parseFloat(tempDriverBookingData["EstimatedCost"]).toFixed(2);
	                                        $("#txtBookingPassengerCost").val(parseFloat(tempDriverBookingData["EstimatedCost"]).toFixed(2));
	                                    }
	                                }
	                                else {
	                                    tempPassengerCost = parseFloat(tempDriverBookingData["ActualCost"]).toFixed(2);
	                                    $("#hiddenBusinessBookingActualCost").val(parseFloat(tempDriverBookingData["ActualCost"]).toFixed(2));
	                                    $("#txtBookingPassengerCost").val(parseFloat(tempDriverBookingData["ActualCost"]).toFixed(2));
	                                }
	                            }
	                            else {
	                                tempPassengerCost = parseFloat(tempDriverBookingData["PassengerCost"]).toFixed(2);
	                                $("#txtBookingPassengerCost").val(parseFloat(tempDriverBookingData["PassengerCost"]).toFixed(2));
	                                ISPassengerCostAdded = true;
	                            }
	                            $("#txtBookingDriverNote,#txtBookingNonShowDriverNote").val(tempDriverBookingData["DriverNote"]);
	                            $(".DivBookingFeedbackReadonlyData").hide();
	                            var tempIsRatingenable = false;
	                            if (tempDriverBookingData["PassengerFeedbackComplete"] == true) {
	                                $(".DivBookingFeedbackReadonlyData").show();
	                                $(".DivBookingFeedBack").hide();
	                                $(".divBookingFeedbackReadonlyCost").html(tempPassengerCost);
	                                $(".divBookingFeedbackReadonlyRating").html();
	                                $(".divBookingFeedbackReadonlyFeedback").html(tempDriverBookingData["DriverNote"] == '' || tempDriverBookingData["DriverNote"] == null ? "No feedback for this booking...." : tempDriverBookingData["DriverNote"]);
	                                tempIsRatingenable = true;
	                                $("#btnSaveBookingFeedBackDetails").hide();

	                            }
	                            if (tempDriverBookingData["DriverRating"] > 0) {
	                            		
	                            }

	                        }
	                        $(".DivBookingList").hide("slide", { direction: "left" }, 500, function () {
	                        	 $(".btnQuoteList").css("display","none");
	                     	    if (objBookingData["QuoteOnly"] == true) {
	                     	        $(".btnQuoteList").css("display","block !important");
	                     	    }
	                     	    else
	                     	    {
	                     	    	$(".btnQuoteList").css("display","none !important");
	                     	        //HideBookingGridViewData();
	                     	    }
	                    		  $(".DivMainBookingList").find('.DivBookingDetailView').show("slide", { direction: "right" }, 500);});
	                        break;
	                }
	        });
	}
	 $scope.onBookingEdit = function(BookingId) {
		 
		 var tempPassengerBookingData = $.grep(Temp_GLOB_BookingData, function (e) { return parseInt(e.BookingId) == parseInt(BookingId); });
		 if (getLocalStorageData('PersonId') > 0)
             //GLOB_MarkerBookingStart.setPosition(new google.maps.LatLng(tempPassengerBookingData[0]["StartLatitude"], tempPassengerBookingData[0]["StartLongitude"]));
         if (tempPassengerBookingData[0]["EndLatitude"] != 0 || tempPassengerBookingData[0]["EndLongitude"] != 0) {
             //GLOB_MarkerBookingEnd.setPosition(new google.maps.LatLng(tempPassengerBookingData[0]["EndLatitude"], tempPassengerBookingData[0]["EndLongitude"]));
             GLOB_TEMP_BOOKING_END_PIN_ADDRESS = tempPassengerBookingData[0]["EndAddress"];
         }
         else {
             //GLOB_MarkerBookingEnd.setPosition(new google.maps.LatLng(0.0, 0.0));
             GLOB_TEMP_BOOKING_END_PIN_ADDRESS = "Tell Driver";
         }
         var temp_st_BookingSel_Para = st_BookingSel_Para;
         temp_st_BookingSel_Para.PersonId = getLocalStorageData('PersonId');
         temp_st_BookingSel_Para.BookingId = BookingId;
         	var data = GLOB_ConvertDataDBCompit(temp_st_BookingSel_Para,"st_BookingSel");
         	$ionicLoading.show({template: 'Loading...'});
 	  		$http.post("http://safecabmobilewebservice.azurewebsites.net/api/Service",data)
 	  		.success(function(resBookingSelData) {
 	  			$ionicLoading.hide();
 	  			var tempBookingSeldata = JSON.parse(resBookingSelData);
 	  			SetPassengerBookingDivContent(tempBookingSeldata[0]);
 	  		});
		 
		  };
		   
		  $scope.BackToBookingPage = function() {
			  $(".DivBookingDetailView").hide("slide", { direction: "right" }, 500, function () {
				  $(".DivMainBookingList").find('.DivBookingList').show("slide", { direction: "left" }, 500);});
		  }
		  
		$scope.ShowBookingHistoryMap = function() {
		    	var earl = 'templates/login.html';
			    $location.path(earl);
		}
		$scope.CallPickedUp = function (){
			var tempDriverBookingData = st_DriverBookingIns_Para;
	        tempDriverBookingData.BusinessId = GLOB_MAPPINGSEA_PARA.BusinessId;
	        tempDriverBookingData.DriverId = GLOB_MAPPINGSEA_PARA.DriverId;
	        tempDriverBookingData.PersonId = getLocalStorageData("PersonId");
	        tempDriverBookingData.BookingId = GLOB_MAPPINGSEA_PARA.BookingId;
	        tempDriverBookingData.VehicleType = GLOB_MAPPINGSEA_PARA.VehicleTypesRequired;
	        tempDriverBookingData.PassengerNote = null;
	        tempDriverBookingData.PassengerRating = null;
	        tempDriverBookingData.DriverNote = null;
	        tempDriverBookingData.DriverRating = null;
	        tempDriverBookingData.ActualCost = 0;
	        tempDriverBookingData.PassengerCost = 0;
	        tempDriverBookingData.Status = '8';
	        var data = GLOB_ConvertDataDBCompit(tempDriverBookingData,"st_DriverBookingIns");
	        console.log(JSON.stringify(tempDriverBookingData));
		 	$ionicLoading.show({template: 'Loading...'});
		 	$http.post("http://safecabmobilewebservice.azurewebsites.net/api/Service",data)
 	  		.success(function(tempResultAddFavourites) {
 	  			$ionicLoading.hide();
 	  			alert("Your are now tracking..");
 	  			$(".Div_Picked_and_Noshow").hide();
 	  			$(".Div_Arrived").show();
 	  		});
		}
		$scope.CallNowShow = function (){
			var tempDriverBookingData = st_DriverBookingIns_Para;
	        tempDriverBookingData.BusinessId = GLOB_MAPPINGSEA_PARA.BusinessId;
	        tempDriverBookingData.DriverId = GLOB_MAPPINGSEA_PARA.DriverId;
	        tempDriverBookingData.PersonId = getLocalStorageData("PersonId");
	        tempDriverBookingData.BookingId = GLOB_MAPPINGSEA_PARA.BookingId;
	        tempDriverBookingData.VehicleType = GLOB_MAPPINGSEA_PARA.VehicleTypesRequired;
	        tempDriverBookingData.PassengerNote = null;
	        tempDriverBookingData.PassengerRating = null;
	        tempDriverBookingData.DriverNote = null;
	        tempDriverBookingData.DriverRating = null;
	        tempDriverBookingData.ActualCost = 0;
	        tempDriverBookingData.PassengerCost = 0;
	        tempDriverBookingData.Status = '64';
	        var data = GLOB_ConvertDataDBCompit(tempDriverBookingData,"st_DriverBookingIns");
		 	$ionicLoading.show({template: 'Loading...'});
		 	$http.post("http://safecabmobilewebservice.azurewebsites.net/api/Service",data)
 	  		.success(function(tempResultAddFavourites) {
 	  			$ionicLoading.hide();
 	  			$(".Div_Picked_and_Noshow").hide();
 	  			$(".DivBookingNonShow").show();
 	  		});
		}
		
		$scope.CallArrived = function (){
			var tempDriverBookingData = st_DriverBookingIns_Para;
	        tempDriverBookingData.BusinessId = GLOB_MAPPINGSEA_PARA.BusinessId;
	        tempDriverBookingData.DriverId = GLOB_MAPPINGSEA_PARA.DriverId;
	        tempDriverBookingData.PersonId = getLocalStorageData("PersonId");
	        tempDriverBookingData.BookingId = GLOB_MAPPINGSEA_PARA.BookingId;
	        tempDriverBookingData.VehicleType = GLOB_MAPPINGSEA_PARA.VehicleTypesRequired;
	        tempDriverBookingData.PassengerNote = null;
	        tempDriverBookingData.PassengerRating = null;
	        tempDriverBookingData.DriverNote = null;
	        tempDriverBookingData.DriverRating = null;
	        tempDriverBookingData.ActualCost = 0;
	        tempDriverBookingData.PassengerCost = 0;
	        tempDriverBookingData.Status = '16';
	        var data = GLOB_ConvertDataDBCompit(tempDriverBookingData,"st_DriverBookingIns");
	        
		 	$ionicLoading.show({template: 'Loading...'});
		 	$http.post("http://safecabmobilewebservice.azurewebsites.net/api/Service",data)
 	  		.success(function(tempResultAddFavourites) {
 	  			$ionicLoading.hide();
	 	  		 alert("Your journey Is completed..");
	             $(".Div_Arrived").hide();
	             $(".DivBookingFeedBack").css('display', 'inline');
	             $("#txtBookingPassengerCost,#txtBookingDriverNote").val('');
 	  		});
		}
		$scope.FavouritesOperation = function(BusinessId, DriverId, Timeout, RegistrationType, FavouritesLbl) {
	    	 var tempTimeOut = parseInt(Timeout);
	 	    var temp_st_PassengerFavouriteIns_Para = st_PassengerFavouriteIns_Para;
	 	    temp_st_PassengerFavouriteIns_Para.PersonId = getLocalStorageData("PersonId");
	 	    temp_st_PassengerFavouriteIns_Para.BusinessId = BusinessId;
	 	    temp_st_PassengerFavouriteIns_Para.DriverId = DriverId;
	 	    temp_st_PassengerFavouriteIns_Para.TimedOut = tempTimeOut;
	 	   var data = GLOB_ConvertDataDBCompit(temp_st_PassengerFavouriteIns_Para,"st_PassengerFavouriteIns");
	 	   $ionicLoading.show({template: 'Loading...'});
	 	   if (tempTimeOut == 0) {
	 	  		$http.post("http://safecabmobilewebservice.azurewebsites.net/api/Service",data)
	 	  		.success(function(tempResultAddFavourites) {
	 	  			$ionicLoading.hide();
		                if (tempResultAddFavourites != null && tempResultAddFavourites != "") {
		                    //GLOB_ArrayFavouritesMarkers.push(BusinessId + "_" + DriverId);
		                    $('.btnBookingHistoryDivFavourites').attr('value', 'Remove Favourite');
		                    alert("Added to your favourite list");
		                    /*if (markersArray[BusinessId + "_0_0_0_0"] != undefined) {
		                        var tempFavouritePinImage = "favourite_silver.png";
		                        if (RegistrationType == 4)
		                            tempFavouritePinImage = "favourite_orange.png";
		                        var tempFavouritePinImg = DomainName + "/DATA/Images/Map_pins/" + tempFavouritePinImage;
		                        markersArray[BusinessId + "_0_0_0_0"].setIcon(tempFavouritePinImg);
		                    }*/

		                }
		            });
		    }
		    else {
		    	$http.post("http://safecabmobilewebservice.azurewebsites.net/api/Service",data)
	 	  		.success(function(tempResultAddFavourites) {
	 	  				$ionicLoading.hide();
		                $('.btnBookingHistoryDivFavourites').attr('value', 'Add to Favourites');
		                alert(FavouritesLbl + " Removed from your favourite list");
		                /*
		                 	for (var i = 0; i < GLOB_ArrayFavouritesMarkers.length; i++) {
		                    	if (GLOB_ArrayFavouritesMarkers[i] == BusinessId + "_" + DriverId)
		                        GLOB_ArrayFavouritesMarkers.splice(i, BusinessId + "_" + DriverId);
		                	}
		                 	if (markersArray[BusinessId + "_0_0_0_0"] != undefined) {
		                    	var tempFavouritePinImage = "favourite_silver.png";
		                    	if (RegistrationType == 4)
		                        tempFavouritePinImage = "favourite_orange.png";
		                    	var tempFavouritePinImg = DomainName + "/DATA/Images/Map_pins/" + tempFavouritePinImage;
		                    	markersArray[BusinessId + "_0_0_0_0"].setIcon(tempFavouritePinImg);
		               }*/
		            });
		    }
	}
		
})

.controller('CabNowCtrl', function($scope, $ionicModal, $timeout, $ionicLoading, $compile,$ionicLoading,$window,$http ,$location) {
	$(".DivCabNowError,.DivCabNowData").hide();
	if(getLocalStorageData("PersonId") != undefined && parseInt(getLocalStorageData("PersonId")) > 0){
  		loadBookingPinsIntoMap();
  		$(".DivCabNowData").show();
	}
	else
	{
		$(".DivCabNowError").show();
		$(".DivCabNowData").hide();
  	}
	
	var ISStartAddressValid = true, ISEndAddressValid = true;
	//loadMap(currentGeoLatitude,currentGeoLongitude);	
    $("#txtBusinessVanityPagefromAddress").val(window.localStorage.getItem("Address"));
    $("#hiddenFromStartlat").val(currentGeoLatitude);
    $("#hiddenFromStartlng").val(currentGeoLongitude);
    $("#seleBusinessVanityPagePassengersType").val(CONF_CARTYPES[1]["Title"]);
    $scope.BookingDateTime = new Date();
    //$("#txtAddBookingDateTime").val();
    
    //validate from & to address via address api service 
    $scope.ValidAddress = function(Data){
    	
     	$ionicLoading.show({template: 'Loading...'});
     	var tempData ="";
     	if(Data == '1')
     		tempData = $("#txtBusinessVanityPagefromAddress").val();
     	else
     		tempData = $("#txtBusinessVanityPageToAddress").val();	
      	if(tempData.toString().length < 3)
      		return ;
        var url  = "https://external.safecab.com/ValidationService.svc/GeoCode/" + tempData + "/GB";
      	$http.get(url).
    	  success(function(data, status, headers, config) {
    	  	$ionicLoading.hide();
    	  	var tempResult = data;
    	  	if(tempResult["Status"] == "ok"){

    	  		var tempBookingLat = tempResult["GeoCodeList"][0]["Latitude"];
                var tempBookingLng = tempResult["GeoCodeList"][0]["Longitude"];
    	  		if(Data == '1'){
	  					$("#txtBusinessVanityPagefromAddress").css('border','1px solid black');
	  					ISStartAddressValid = true;
	  	                $("#hiddenFromStartlat").val(tempBookingLat);
	  	                $("#hiddenFromStartlng").val(tempBookingLng);
    	  		}
    	  		else{
    	  			$("#txtBusinessVanityPageToAddress").css('border','1px solid black');
    	  			ISEndAddressValid = true;
                    $("#hiddenEndlat").val(tempBookingLat);
                    $("#hiddenEndlng").val(tempBookingLng);
    	  			
    	  	}
                
    	  	}else
    	  		{
    	  			
    	  			if(Data == '1'){
    	  				$("#txtBusinessVanityPagefromAddress").css('border','1px solid red');
    	  				ISStartAddressValid = false;
    	  			}
    	  			else{
    	  				$("#txtBusinessVanityPageToAddress").css('border','1px solid red');
    	  				ISEndAddressValid = false;
    	  			}
    	  		}
    	  }).
    	  error(function(data, status, headers, config) {
    		  $ionicLoading.hide();
    		  if(Data == '1'){
	  				$("#txtBusinessVanityPagefromAddress").css('border','1px solid red');
	  				ISStartAddressValid = false;
	  			}
	  			else{
	  				$("#txtBusinessVanityPageToAddress").css('border','1px solid red');
	  				ISEndAddressValid = false;
	  			}
    	  	  
    	  });

      }
    	//get combine places data from db
    $scope.DisplayBusinesBookingPlacesPopUp = function (ClickedFromId) {
    	var tempBusinessBookingPOIList = [];
    	$(".seleBusinesBookingPOIAddress").html("");
        var temp_st_CombinedPointOfInterestSea_Para = st_CombinedPointOfInterestSea_Para;
        temp_st_CombinedPointOfInterestSea_Para.BusinessId = 0;
        temp_st_CombinedPointOfInterestSea_Para.DriverId = 0;
        temp_st_CombinedPointOfInterestSea_Para.PersonId = getLocalStorageData("PersonId");
        temp_st_CombinedPointOfInterestSea_Para.Longitude = currentGeoLongitude;
        temp_st_CombinedPointOfInterestSea_Para.Latitude = currentGeoLatitude;
        var data = GLOB_ConvertDataDBCompit(temp_st_CombinedPointOfInterestSea_Para,"st_CombinedPointOfInterestSea");
        $ionicLoading.show({template: 'Loading...'});
	  	$http.post("http://safecabmobilewebservice.azurewebsites.net/api/Service",data)
	  	.success(function(resCombinedPOIData) {
	  		$ionicLoading.hide();
	  		resCombinedPOIData = JSON.parse(resCombinedPOIData);
	  		tempBusinessBookingPOIList.length = 0;
            $.each(resCombinedPOIData, function (index, key) {
                var tempVehicleOptions = '<option value=' + resCombinedPOIData[index]["PointOfInterestId"] + '>' + resCombinedPOIData[index]["PointOfInterest"] + '</option>';
                $(".seleBusinesBookingPOIAddress").append(tempVehicleOptions);
                var tempPOIData = {
                    PointOfInterestId: resCombinedPOIData[index].PointOfInterestId,
                    PointOfInterestAddress: resCombinedPOIData[index].PointOfInterestAddress,
                    PointOfInterest: resCombinedPOIData[index].PointOfInterest,
                    Longitude: resCombinedPOIData[index].Longitude,
                    Latitude: resCombinedPOIData[index].Latitude
                }
                tempBusinessBookingPOIList.push(tempPOIData);
            });
            ShowBusinessBookingPOIPopUp(ClickedFromId);
	  	});
        
    }
    
    $scope.AddBookingData = function () {
    	var tempBookingDateTime = $("#txtAddBookingDateTime").val();
    	var tempPassengersType =  parseInt($("#seleBusinessVanityPagePassengersType").val());
    	var tempFromStartlat = $("#hiddenFromStartlat").val();
    	var tempFromStartlng = $("#hiddenFromStartlng").val();
    	var tempfromAddress = $("#txtBusinessVanityPagefromAddress").val();
    	var tempEndLat = $("#hiddenEndlat").val();
    	var tempEndLng = $("#hiddenEndlng").val();
    	var temptoAddress = $("#txtBusinessVanityPageToAddress").val();
    	var tempFeedBack = $("#textareaFeedBack").val();
    	//
	    	var booking = st_BookingIns_Para;
	        booking.PersonId = getLocalStorageData("PersonId");
	        booking.FullName = 'deepal';
	        booking.Telephone = '910000002005';
	        booking.EmailAddress = 'deepal.emiprotech@gmail.com';
	        booking.StartAddress = tempfromAddress;
	        booking.StartLatitude = tempFromStartlat;
	        booking.StartLongitude = tempFromStartlng;
	        booking.EndAddress = temptoAddress;
	        booking.EndLatitude = tempEndLat;
	        booking.EndLongitude = tempEndLng;
	        booking.BookingNotes = tempFeedBack;
	        booking.RequiredDateTime = tempBookingDateTime;
	        booking.BikeRequired = tempPassengersType == 1 ? '1' : '0';
	        booking.CarRequired = tempPassengersType == 2 ? '1' : '0';
	        booking.HighTopRequired = tempPassengersType == 4 ? '1' : '0';
	        booking.PeopleCarrierRequired = tempPassengersType == 8 ? '1' : '0';
	        booking.MiniBusRequired = tempPassengersType == 16 ? '1' : '0';
	        booking.LimoRequired = tempPassengersType == 32 ? '1' : '0';
	        booking.DisabledAccess = false;
	        booking.FemaleDriver = false;
	        booking.QuoteOnly = false;
	        booking.BusinessId = 0;
	        booking.DriverId = 0;
	        booking.Country = "IN";
	        booking.Bookingautoconnect = false;
	        booking.Bookingautoconnect = GetUserCurrentAccuracy();
	        var data = GLOB_ConvertDataDBCompit(booking,"st_BookingIns");
	        if (ISStartAddressValid == true && ISEndAddressValid == true) {
	        $ionicLoading.show({template: 'Loading...'});
		  	$http.post("http://safecabmobilewebservice.azurewebsites.net/api/Service",data)
		  	.success(function(resBookingData) {
		  		if(parseInt(resBookingData) > 0){
		  				alert('New booking has been requested.');
		  				$ionicLoading.hide();
		  				GLOB_MAPPINGSEA_PARA.Longitude = FromAddresslng;
                        GLOB_MAPPINGSEA_PARA.Latitude = FromAddresslat;
                        GLOB_MAPPINGSEA_PARA.PersonId = booking.PersonId;
                        GLOB_MAPPINGSEA_PARA.BookingId = resBooking;
                        if (FromAddresslat == currentGeoLatitude && FromAddresslng == currentGeoLongitude)
                            GLOB_MAPPINGSEA_PARA.Accuracy = currentGeoAccuracy;
                        //var earl = '/map.html';
                	    //$location.path(earl);
                	    //$scope.loadMap( booking.StartLatitude,booking.StartLongitude);
                       
		  		}
		  		else
		  				alert('Problem while booking..');
		  		$("#frmBooking")[0].reset();
                $("#chkFemaleDriver,#chkDisableAccess").attr('checked', false);
                var tempcDate = currentFromDate();
                $("#txtAddBookingDateTime").val(tempcDate.split(',')[1]);
                $("#seleBusinessVanityPagePassengersType").val(2);
                $("#txtBusinessVanityPagefromAddress").val(getLocalStorageData("Address"));
                $("#hiddenFromStartlng").val(currentGeoLongitude);
                $("#hiddenFromStartlat").val(currentGeoLatitude);
		  		$ionicLoading.hide();
		  	});
	        }
	        else{
	        	alert('Enter valid address');
	        }
	        	
		  	
    }
   
    $scope.AddBookingQuoteNowData = function () {
    	var tempBookingDateTime = $("#txtAddBookingDateTime").val();
    	var tempPassengersType =  parseInt($("#seleBusinessVanityPagePassengersType").val());
    	var tempFromStartlat = $("#hiddenFromStartlat").val();
    	var tempFromStartlng = $("#hiddenFromStartlng").val();
    	var tempfromAddress = $("#txtBusinessVanityPagefromAddress").val();
    	var tempEndLat = $("#hiddenEndlat").val();
    	var tempEndLng = $("#hiddenEndlng").val();
    	var temptoAddress = $("#txtBusinessVanityPageToAddress").val();
    	var tempFeedBack = $("#textareaFeedBack").val();
    	//
	    	var booking = st_BookingIns_Para;
	        booking.PersonId = getLocalStorageData("PersonId");
	        booking.FullName = 'deepal';
	        booking.Telephone = '910000002005';
	        booking.EmailAddress = 'deepal.emiprotech@gmail.com';
	        booking.StartAddress = tempfromAddress;
	        booking.StartLatitude = tempFromStartlat;
	        booking.StartLongitude = tempFromStartlng;
	        booking.EndAddress = temptoAddress;
	        booking.EndLatitude = tempEndLat;
	        booking.EndLongitude = tempEndLng;
	        booking.BookingNotes = tempFeedBack;
	        booking.RequiredDateTime = tempBookingDateTime;
	        booking.BikeRequired = tempPassengersType == 1 ? '1' : '0';
	        booking.CarRequired = tempPassengersType == 2 ? '1' : '0';
	        booking.HighTopRequired = tempPassengersType == 4 ? '1' : '0';
	        booking.PeopleCarrierRequired = tempPassengersType == 8 ? '1' : '0';
	        booking.MiniBusRequired = tempPassengersType == 16 ? '1' : '0';
	        booking.LimoRequired = tempPassengersType == 32 ? '1' : '0';
	        booking.DisabledAccess = false;
	        booking.FemaleDriver = false;
	        booking.QuoteOnly = true;
	        booking.BusinessId = 0;
	        booking.DriverId = 0;
	        booking.Country = "IN";
	        booking.Bookingautoconnect = false;
	        booking.Bookingautoconnect = GetUserCurrentAccuracy();
	        var data = GLOB_ConvertDataDBCompit(booking,"st_BookingIns");
	        $ionicLoading.show({template: 'Loading...'});
		  	$http.post("http://safecabmobilewebservice.azurewebsites.net/api/Service",data)
		  	.success(function(resBookingData) {
		  		if(parseInt(resBookingData) > 0){
		  				alert('New Quote has been requested.');
		  			  var temp_st_BookingSel_Para = st_BookingSel_Para;
		  	         temp_st_BookingSel_Para.PersonId = getLocalStorageData('PersonId');
		  	         temp_st_BookingSel_Para.BookingId = resBookingData;
		  	         	var data = GLOB_ConvertDataDBCompit(temp_st_BookingSel_Para,"st_BookingSel");
		  	         	$ionicLoading.show({template: 'Loading...'});
		  	 	  		$http.post("http://safecabmobilewebservice.azurewebsites.net/api/Service",data)
		  	 	  		.success(function(resBookingSelData) {
		  	 	  			$ionicLoading.hide();
		  	 	  			var tempBookingSeldata = JSON.parse(resBookingSelData);
		  	 	  			SetPassengerBookingDivContent(tempBookingSeldata[0]);
		  	 	  			var earl = 'templates/Booking.html';
	                	    $location.path(earl);
		  	 	  		});
		  		}
		  		else
		  				alert('Problem while booking..');
		  		$("#frmBooking")[0].reset();
                $("#chkFemaleDriver,#chkDisableAccess").attr('checked', false);
                var tempcDate = currentFromDate();
                $("#txtAddBookingDateTime").val(tempcDate.split(',')[1]);
                $("#seleBusinessVanityPagePassengersType").val(2);
                $("#txtBusinessVanityPagefromAddress").val(getLocalStorageData("Address"));
                $("#hiddenFromStartlng").val(currentGeoLongitude);
                $("#hiddenFromStartlat").val(currentGeoLatitude);
		  		$ionicLoading.hide();
		  	});
    }
    $scope.genders = ['male', 'female','1','2'];
  
})

.controller('PINE1Controller', function($scope, $ionicModal, $timeout, $ionicLoading, $compile,$ionicLoading,$window,$http ) {
	
	
	
	$scope.DisplayBookingPickUpPopUp = function (){
	    //get POI combine data START //
		$('.DivBookingPopUpInner').css('height', 'auto');
var temp_st_CombinedPointOfInterestSea_Para = st_CombinedPointOfInterestSea_Para;
	    temp_st_CombinedPointOfInterestSea_Para.PersonId = getLocalStorageData("PersonId");
	    temp_st_CombinedPointOfInterestSea_Para.Longitude = GLOB_map.getCenter().lng();
	    temp_st_CombinedPointOfInterestSea_Para.Latitude = GLOB_map.getCenter().lat();
	    //get POI combine data END //
	    var data = GLOB_ConvertDataDBCompit(temp_st_CombinedPointOfInterestSea_Para,"st_CombinedPointOfInterestSea");
 	   	$ionicLoading.show({template: 'Loading...'});
 	  	$http.post("http://safecabmobilewebservice.azurewebsites.net/api/Service",data)
 	  	.success(function(tempPOI) {
 	  			tempPOI = JSON.parse(tempPOI);
 	  			$ionicLoading.hide();
 	  			$('.selePersonPOI').html('');
	            $.each(tempPOI, function (key, value) {
	                var tempPOIlatlng = tempPOI[key]["Longitude"] + ":" + tempPOI[key]["Latitude"] + ":" + tempPOI[key]["PointOfInterestId"];
	                $('.selePersonPOI').append('<option value=' + tempPOIlatlng + '>' + tempPOI[key]["PointOfInterest"] + '</option>');
	            });
	            setTimeout(function (){
	            $('.DivParentPopUpDescription').hide("slide", { direction: "left" }, 500, function () { 
	            	$(".DivBooking > .DivBookingPopUp > .DivBookingPopUpInner").css("display", "inline-block");
	            $('.BusinessInfowindow').find('.DivBooking > .DivBookingPopUp').show("slide", { direction: "right" }, 500); });
	            },500);
 	  	});
	}
	
	$scope.ConfirmLocation = function (){
		 var tempPersonId = getLocalStorageData("PersonId");
		    var tempTrackingDescription = $(".DivAppendChildData").find("#txtPersonTrackingCabDescription").val();
		    var locationTrackingStart = st_LocationTrackingIns_Para;
		    locationTrackingStart.BusinessId = 0;
		    locationTrackingStart.DriverId = 0;
		    locationTrackingStart.PersonId = tempPersonId;
		    locationTrackingStart.BookingId = 0;
		    locationTrackingStart.TrackingDescription = tempTrackingDescription;
		    locationTrackingStart.Longitude = currentGeoLongitude;
		    locationTrackingStart.Latitude = currentGeoLatitude;
		    //
		    var data = GLOB_ConvertDataDBCompit(locationTrackingStart,"st_LocationTrackingIns");
	         	$ionicLoading.show({template: 'Loading...'});
	 	  		$http.post("http://safecabmobilewebservice.azurewebsites.net/api/Service",data)
	 	  		.success(function(resLocationTracking) {
	 	  			  $ionicLoading.hide();
		 	  		  var tempPinChangeImg = DomainName + "/Data/Images/Map_pins/Person_Tracking.png";
	                  GLOB_IS_LOCATION_TRACKING_CONTINUE = true;
	                  alert("Now you are tracking....");
	                  if (markersArray["0_0_" + tempPersonId + "_0_0"] != undefined) {
	                      markersArray["0_0_" + tempPersonId + "_0_0"].setIcon(tempPinChangeImg);
	                      flagPassengerTrack = true;
	                  }
	                  $.each(markersArray, function (key, index) {
	                      if (markersArray[key] != undefined) {
	                          markersArray[key].setAnimation(null);  
	                      }
	                  });
	 	  		});
	}
	
	$scope.BookingBusiness16BookingData = function (BusinessId,DriverId,BookingId) {
		var tempData12 = $.grep(GLOB_TEMP_QUOTE_LIST_DATA,function(e){return e.BusinessId == BusinessId && e.DriverId == DriverId });
		tempData12 = tempData12[0];
		var temp_st_DriverBookingIns_Para = st_DriverBookingIns_Para;
        temp_st_DriverBookingIns_Para.BusinessId = tempData12.BusinessId;
        temp_st_DriverBookingIns_Para.DriverId = tempData12.DriverId;
        temp_st_DriverBookingIns_Para.PersonId = tempData12.PersonId;
        temp_st_DriverBookingIns_Para.BookingId = tempData12.BookingId;
        temp_st_DriverBookingIns_Para.QuoteOnly = false;
        temp_st_DriverBookingIns_Para.Status = 0;
        temp_st_DriverBookingIns_Para.ActualCost = 0;
        temp_st_DriverBookingIns_Para.PassengerCost = 0;
        temp_st_DriverBookingIns_Para.PassengerNote = null;
        temp_st_DriverBookingIns_Para.PassengerRating = null;
        temp_st_DriverBookingIns_Para.DriverNote = null;
        temp_st_DriverBookingIns_Para.DriverRating = null;
        temp_st_DriverBookingIns_Para.Bookingautoconnect = false;
        temp_st_DriverBookingIns_Para.Bookingautoconnect = GetUserCurrentAccuracy();
        var data = GLOB_ConvertDataDBCompit(temp_st_DriverBookingIns_Para,"st_DriverBookingIns");
	  	$http.post("http://safecabmobilewebservice.azurewebsites.net/api/Service",data)
	  	.success(function(resBookingData) {
	  		$ionicLoading.hide();
	  			alert(JSON.stringify(resBookingData));
	  	});
	  			
	}

	$scope.GetBusinessCommetns = function (BusinessId, DriverId) {
		$ionicLoading.show({template: 'Loading...'});
			var personId = getLocalStorageData("PersonId");
		    var temp_st_RatingSel_Para = st_RatingSel_Para;
		    temp_st_RatingSel_Para.BusinessId = BusinessId;
		    temp_st_RatingSel_Para.DriverId = DriverId;
		    temp_st_RatingSel_Para.PassengerView = 1;
		    temp_st_RatingSel_Para.PersonId = 0;
		    temp_st_RatingSel_Para.BookingId = 0;
		    console.log(JSON.stringify(temp_st_RatingSel_Para));
		    var data = GLOB_ConvertDataDBCompit(temp_st_RatingSel_Para,"st_RatingSel");
		  	$http.post("http://safecabmobilewebservice.azurewebsites.net/api/Service",data)
		  	.success(function(resPersonComment) {
		  			var tempRatingData = JSON.parse(resPersonComment);
		  			$ionicLoading.hide();
		  			$(".DivUserCommentsInner").html(DisplayCommentsDiv(tempRatingData));
		  			$('.DivParentPopUpDescription').hide("slide", { direction: "left" }, 500, function () {
		  				$('.BusinessInfowindow').find('.DivBusinessComments > .DivUserComments').show("slide", { direction: "right" }, 500);
		  			});
		  	});
		   
	   }
		$scope.SendChatMessage = function (BusinessId, DriverId) {
			$ionicLoading.show({template: 'Loading...'});
			$(".textareaChattext").css('border','1px solid #894d05');
		    var personId = getLocalStorageData("PersonId");
		    var ChatMessage = $(".DivAppendChildData").find('.textareaChattext').val();//$scope.test.TextareContactUsMessage;
		    var temp_st_ChatIns_Para = st_ChatIns_Para;
		    temp_st_ChatIns_Para.SenderPersonId = 0;
		    temp_st_ChatIns_Para.SenderBusinessId = 0;
		    temp_st_ChatIns_Para.SenderDriverId = 0;
		    if (personId > 0)
		        temp_st_ChatIns_Para.SenderPersonId = personId;
		    temp_st_ChatIns_Para.BusinessId = BusinessId;
		    temp_st_ChatIns_Para.DriverId = DriverId;
		    temp_st_ChatIns_Para.Chat = ChatMessage;
		    //alert(JSON.stringify(temp_st_ChatIns_Para));
		    if (ChatMessage.length > 0) {
		    	$ionicLoading.show({template: 'Loading...'});
		    	 var data = GLOB_ConvertDataDBCompit(temp_st_ChatIns_Para,"st_ChatIns");
				  	$http.post("http://safecabmobilewebservice.azurewebsites.net/api/Service",data)
				  	.success(function(resPersonComment) {
				  		$ionicLoading.hide();
				  		alert("Your message has been sent successfully.");
				  	});
		    }
		    else {
		    	$(".textareaChattext").css('border','1px solid red');
		    }
			   
	   }
		
		//Send Message to Business/Driver From Entity Type 16 -> Contact us page start
		$scope.Send_16_ChatMessage = function (BusinessId,DriverId, PersonId) {
			
			$("#textareaPassengerContactChattext").css('border','1px solid #894d05');
		    var personId = getLocalStorageData("PersonId");
		    var ChatMessage = $(".DivAppendChildData").find('#textareaPassengerContactChattext').val();//$scope.test.TextareContactUsMessage;
		    var temp_st_ChatIns_Para = st_ChatIns_Para;
		    temp_st_ChatIns_Para.SenderPersonId = 0;
		    temp_st_ChatIns_Para.SenderBusinessId = 0;
		    temp_st_ChatIns_Para.SenderDriverId = 0;
		    if (personId > 0)
		        temp_st_ChatIns_Para.SenderPersonId = personId;
		    temp_st_ChatIns_Para.BusinessId = BusinessId;
		    temp_st_ChatIns_Para.DriverId = DriverId;
		    temp_st_ChatIns_Para.Chat = ChatMessage;
		    if (ChatMessage.length > 0) {
		    	$ionicLoading.show({template: 'Loading...'});
		    	 var data = GLOB_ConvertDataDBCompit(temp_st_ChatIns_Para,"st_ChatIns");
				  	$http.post("http://safecabmobilewebservice.azurewebsites.net/api/Service",data)
				  	.success(function(resPersonComment) {
				  		$ionicLoading.hide();
				  		alert("Your message has been sent successfully.");
				  	});
		    }
		    else {
		    	$("#textareaPassengerContactChattext").css('border','1px solid red');
		    }
			   
	   }
		//Send Message to Business/Driver From Entity Type 16 -> Contact us page end
		$scope.CabAddtoFavourites = function(BusinessId, DriverId, Timeout, RegistrationType, FavouritesLbl){
			var tempFavouritesLbl = FavouritesLbl;
			if( FavouritesLbl == '0')
				tempFavouritesLbl = $(".DivAppendChildData").find(".DivInfoBoxTitleContentText").html();
			var tempTimeOut = parseInt(Timeout);
			if($(".DivAppendChildData").find('.btnPassengerFavourites').attr('value') == 'Remove Favourite' )
				tempTimeOut = 1;
			else
				tempTimeOut = 0;
	 	    var temp_st_PassengerFavouriteIns_Para = st_PassengerFavouriteIns_Para;
	 	    temp_st_PassengerFavouriteIns_Para.PersonId = getLocalStorageData("PersonId");
	 	    temp_st_PassengerFavouriteIns_Para.BusinessId = BusinessId;
	 	    temp_st_PassengerFavouriteIns_Para.DriverId = DriverId;
	 	    temp_st_PassengerFavouriteIns_Para.TimedOut = tempTimeOut;
	 	   var data = GLOB_ConvertDataDBCompit(temp_st_PassengerFavouriteIns_Para,"st_PassengerFavouriteIns");
	 	   $ionicLoading.show({template: 'Loading...'});
	 	   if (tempTimeOut == 0) {
	 	  		$http.post("http://safecabmobilewebservice.azurewebsites.net/api/Service",data)
	 	  		.success(function(tempResultAddFavourites) {
	 	  			$ionicLoading.hide();
		                if (tempResultAddFavourites != null && tempResultAddFavourites != "") {
		                    GLOB_ArrayFavouritesMarkers.push(BusinessId + "_" + DriverId);
		                    $(".DivAppendChildData").find('.btnPassengerFavourites').attr('value', 'Remove Favourite');
		                    if (markersArray[BusinessId + "_0_0_0_0"] != undefined) {
		                        var tempFavouritePinImage = "favourite_silver.png";
		                        if (RegistrationType == 4)
		                            tempFavouritePinImage = "favourite_orange.png";
		                        var tempFavouritePinImg = DomainName + "/DATA/Images/Map_pins/" + tempFavouritePinImage;
		                        markersArray[BusinessId + "_0_0_0_0"].setIcon(tempFavouritePinImg);
		                    }

		                }
		            });
		    }
		    else {
		    	$http.post("http://safecabmobilewebservice.azurewebsites.net/api/Service",data)
	 	  		.success(function(tempResultAddFavourites) {
	 	  				$ionicLoading.hide();
	 	  				$(".DivAppendChildData").find('.btnPassengerFavourites').attr('value', 'Add to Favourites');
		                 	for (var i = 0; i < GLOB_ArrayFavouritesMarkers.length; i++) {
		                    	if (GLOB_ArrayFavouritesMarkers[i] == BusinessId + "_" + DriverId)
		                        GLOB_ArrayFavouritesMarkers.splice(i, BusinessId + "_" + DriverId);
		                	}
		                 	if (markersArray[BusinessId + "_0_0_0_0"] != undefined) {
		                    	var tempFavouritePinImage = "sillver_pin.png";
		                    	if (RegistrationType == 4)
		                        tempFavouritePinImage = "orange_pin.png";
		                    	var tempFavouritePinImg = DomainName + "/DATA/Images/Map_pins/" + tempFavouritePinImage;
		                    	markersArray[BusinessId + "_0_0_0_0"].setIcon(tempFavouritePinImg);
		               }
		            });
		    }
		}
		
		//Person Comments related stuff start
		$scope.GetPersonComments = function (){
		    var temp_st_RatingSel_Para = st_RatingSel_Para;
		    temp_st_RatingSel_Para.BusinessId = 0;
		    temp_st_RatingSel_Para.DriverId = 0;
		    if (getLocalStorageData("PersonId") > 0)
		        temp_st_RatingSel_Para.PersonId = getLocalStorageData("PersonId");
		    	var data = GLOB_ConvertDataDBCompit(temp_st_RatingSel_Para,"st_RatingSel");
		 	   	$ionicLoading.show({template: 'Loading...'});
		 	  	$http.post("http://safecabmobilewebservice.azurewebsites.net/api/Service",data)
		 	  	.success(function(resPersonData) {
		 	  	  $ionicLoading.hide();
		 	  	  resPersonData = JSON.parse(resPersonData);
		 	  	 if (resPersonData != null)
		                $(".DivUserCommentsInner").html(DisplayCommentsDiv(resPersonData));
		 	  	 $(".DivUserCommentsInner").append("<a href='javascript:void(0);' onclick='javascript:ClosePersonCommentsWindow();' class='linkCancelPopup' style='float:right !important;'>Cancel</a><div class='clear'></div>");
		            $('.DivParentPopUpDescription').hide("slide", { direction: "left" }, 500, function () {
		                $('.PersonBusinessInfowindow').find('.DivPersonComments > .DivUserComments').css('display', 'inline-block');
		                $('.PersonBusinessInfowindow').find('.DivPersonComments > .DivUserComments').show("slide", { direction: "right" }, 500);
		            });
		 	  	});
		}
		//Person Comments related stuff End
		

		 //Save Place Book screen pin data
		 	$scope.SavePlaceInstantBookNow = function (){
		 		var getCurrentUserData = CurrentUserFullDetails;
		 	    var personId = getLocalStorageData("PersonId");
		 	    var fullName = getLocalStorageData("FullName");
		 	    var telePhone = getLocalStorageData("Telephone");
		 	    var emailAddress = getLocalStorageData("EmailAddress");
		 	    var toAddress = $(".DivAppendChildData").find(".btnPlaceToLocation").val();
		 	    var tempToAddressLatLng = $.grep(GLOB_POI_COMBINE_BOOKING_DATA, function (e) { return e.PointOfInterest.toString() == toAddress.toString() }); //get lat & lng from the global array
		 	    var toAddressLng = tempToAddressLatLng[0]["Longitude"];
		 	    var toAddressLat = tempToAddressLatLng[0]["Latitude"];
		 	    var FromAddress = "";
		 	    if (GLOB_Places_ISFrom_btn_click == true)
		 	        FromAddress = $(".DivAppendChildData").find(".btnUserFromLocaiton").val();
		 	    else
		 	        FromAddress = $(".DivAppendChildData").find(".lblUserFromLocation").html();
		 	    var BusinessBookingNotes = $(".DivAppendChildData").find(".txtPlaceNotes").val();
		 	    var FromAddressLat, FromAddressLng;
		 	    if (GLOB_Places_ISFrom_btn_click == true) {
		 	        var tempFromAddressLatLng = $.grep(GLOB_POI_COMBINE_BOOKING_DATA, function (e) { return e.PointOfInterest.toString() == FromAddress.toString() }); //get lat & lng from the global array
		 	        FromAddressLng = tempFromAddressLatLng[0]["Longitude"];
		 	        FromAddressLat = tempFromAddressLatLng[0]["Latitude"];
		 	    }

		 	    else {
		 	        FromAddressLat = currentGeoLatitude;
		 	        FromAddressLng = currentGeoLongitude;
		 	    }
		 	    var carType = 2;//$(".hiddenBusinessCarType").val();
		 	    var businessId = '0';
		 	    var driverId = '0';
		 	    var tempCurrentDate = $(".DivAppendChildData").find(".btnPlaceCabDatePopUP").val();
		 	    var booking = st_BookingIns_Para;
		 	    booking.PersonId = personId;
		 	    booking.FullName = fullName;
		 	    booking.Telephone = telePhone;
		 	    booking.EmailAddress = emailAddress;
		 	    booking.StartAddress = FromAddress;
		 	    booking.StartLatitude = FromAddressLat;
		 	    booking.StartLongitude = FromAddressLng;
		 	    booking.EndAddress = toAddress;
		 	    booking.EndLatitude = toAddressLat;
		 	    booking.EndLongitude = toAddressLng;
		 	    booking.BookingNotes = BusinessBookingNotes;
		 	    booking.RequiredDateTime = tempCurrentDate;
		 	    booking.BikeRequired = carType == 1 ? '1' : '0';
		 	    booking.CarRequired = carType == 2 ? '1' : '0';
		 	    booking.HighTopRequired = carType == 4 ? '1' : '0';
		 	    booking.PeopleCarrierRequired = carType == 8 ? '1' : '0';
		 	    booking.MiniBusRequired = carType == 16 ? '1' : '0';
		 	    booking.LimoRequired = carType == 32 ? '1' : '0';
		 	    booking.DisabledAccess = false;
		 	    booking.FemaleDriver = false;
		 	    booking.QuoteOnly = false;
		 	    booking.BusinessId = 0;
		 	    booking.DriverId = 0;
		 	    booking.Country = GLOB_COUNTRYCODE;
		 	    booking.Bookingautoconnect = false;
		 	    booking.Bookingautoconnect = GetUserCurrentAccuracy();
		 	    booking.EndPointOfInterestId = 0;
		 	    booking.StartPointOfInterestId = 0;
		 	    var data = GLOB_ConvertDataDBCompit(booking,"st_BookingIns");
		 	   	$ionicLoading.show({template: 'Loading...'});
		 	  	$http.post("http://safecabmobilewebservice.azurewebsites.net/api/Service",data)
		 	  	.success(function(resBooking) {
		 	  			$ionicLoading.hide();
		 	  			alert("New booking has been requested.");
		 	  			var temp_st_BookingSel_Para = st_BookingSel_Para;
			            temp_st_BookingSel_Para.PersonId = personId;
			            temp_st_BookingSel_Para.BookingId = resBooking;
				            var data1 = GLOB_ConvertDataDBCompit(temp_st_BookingSel_Para,"st_BookingSel");
					 	   	$ionicLoading.show({template: 'Loading...'});
					 	  	$http.post("http://safecabmobilewebservice.azurewebsites.net/api/Service",data1)
					 	  	.success(function(resBookingSelData) {
					 	  		$ionicLoading.hide();
			                    //resBookingSelData[0].BookingDateTime = resBookingSelData[0]["RequiredDate"] + " " + resBookingSelData[0]["RequiredTime"];
			                    GLOB_MAPPINGSEA_PARA.Accuracy = currentGeoAccuracy;
			                    //$scope.loadMap(currentGeoLatitude, currentGeoLongitude);
			                    $scope.closetempPinPopUpE1();
					 	  	});
		 	  	});
		    }
		 //
		//Save Cab Pin popup data START
		 $scope.SaveCabInstantBookNow = function (){
			 var getCurrentUserData = CurrentUserFullDetails;
		 	    var personId = getLocalStorageData("PersonId").toString().replace(/\"/,'');
		 	    var fullName = getLocalStorageData("FullName").toString().replace(/\"/,'');
		 	    var telePhone = getLocalStorageData("Telephone").toString().replace(/\"/,'');
		 	    var emailAddress = getLocalStorageData("EmailAddress").toString().replace(/\"/,'');
		 	    var toAddress = $(".DivAppendChildData").find(".btnPersonToLocation").val();
		 	    var tempToAddressLatLng = $.grep(GLOB_POI_COMBINE_BOOKING_DATA, function (e) { return e.PointOfInterest.toString() == toAddress.toString() }); //get lat & lng from the global array
		 	    var toAddressLng = $(".DivAppendChildData").find(".hiddenToAddressLng").val();//tempToAddressLatLng[0]["Longitude"];
		 	    var toAddressLat = $(".DivAppendChildData").find(".hiddenToAddressLat").val();//tempToAddressLatLng[0]["Latitude"];
		 	    var FromAddress = getLocalStorageData("Address").toString().replace(/\"/,'');
		 	    var BusinessBookingNotes = $(".DivAppendChildData").find(".txtNotes").val();
		 	    var FromAddressLat, FromAddressLng;
		 	        FromAddressLat = currentGeoLatitude;
		 	        FromAddressLng = currentGeoLongitude;
		 	    if(toAddress == "Will tell driver"){
		 	    	toAddressLng = "0.00";
		 	    	toAddressLat = "0.00";
		 	    }
		 	    var carType = 2;//$(".hiddenBusinessCarType").val();
		 	    var businessId = '0';
		 	    var driverId = '0';
		 	    var tempCurrentDate = $(".DivAppendChildData").find(".btnCabDatePopUP").val();
		 	    var booking = st_BookingIns_Para;
		 	    booking.PersonId = personId;
		 	    booking.FullName = fullName;
		 	    booking.Telephone = telePhone;
		 	    booking.EmailAddress = emailAddress;
		 	    booking.StartAddress = FromAddress;
		 	    booking.StartLatitude = FromAddressLat;
		 	    booking.StartLongitude = FromAddressLng;
		 	    booking.EndAddress = toAddress;
		 	    booking.EndLatitude = toAddressLat;
		 	    booking.EndLongitude = toAddressLng;
		 	    booking.BookingNotes = BusinessBookingNotes;
		 	    booking.RequiredDateTime = tempCurrentDate;
		 	    booking.BikeRequired = carType == 1 ? '1' : '0';
		 	    booking.CarRequired = carType == 2 ? '1' : '0';
		 	    booking.HighTopRequired = carType == 4 ? '1' : '0';
		 	    booking.PeopleCarrierRequired = carType == 8 ? '1' : '0';
		 	    booking.MiniBusRequired = carType == 16 ? '1' : '0';
		 	    booking.LimoRequired = carType == 32 ? '1' : '0';
		 	    booking.DisabledAccess = false;
		 	    booking.FemaleDriver = false;
		 	    booking.QuoteOnly = false;
		 	    booking.BusinessId = 0;
		 	    booking.DriverId = 0;
		 	    booking.Country = GLOB_COUNTRYCODE;
		 	    booking.Bookingautoconnect = false;
		 	    booking.Bookingautoconnect = GetUserCurrentAccuracy();
		 	    booking.EndPointOfInterestId = 0;
		 	    booking.StartPointOfInterestId = 0;
		 	    var data = GLOB_ConvertDataDBCompit(booking,"st_BookingIns");
		 	   	$ionicLoading.show({template: 'Loading...'});
		 	  	$http.post("http://safecabmobilewebservice.azurewebsites.net/api/Service",data)
		 	  	.success(function(resBooking) {
		 	  			$ionicLoading.hide();
		 	  			alert("New booking has been requested.");
		 	  			var temp_st_BookingSel_Para = st_BookingSel_Para;
			            temp_st_BookingSel_Para.PersonId = personId;
			            temp_st_BookingSel_Para.BookingId = resBooking;
				            var data1 = GLOB_ConvertDataDBCompit(temp_st_BookingSel_Para,"st_BookingSel");
					 	   	$ionicLoading.show({template: 'Loading...'});
					 	  	$http.post("http://safecabmobilewebservice.azurewebsites.net/api/Service",data1)
					 	  	.success(function(resBookingSelData) {
					 	  		$ionicLoading.hide();
			                    //resBookingSelData[0].BookingDateTime = resBookingSelData[0]["RequiredDate"] + " " + resBookingSelData[0]["RequiredTime"];
			                    GLOB_MAPPINGSEA_PARA.Accuracy = currentGeoAccuracy;
			                    //$scope.loadMap(currentGeoLatitude, currentGeoLongitude);
			                    $scope.closetempPinPopUpE1();
					 	  	});
		 	  	});
		 }
		//Save Cab Pin popup data END	
		//Get Person Emergency COntact list start
		$scope.ShowPersonEmergencyContactDiv = function (IsPersonPin){
			 var DivTrackingCotent = $('.DivPersonTrackingEmerencyContact').html();
			    var tempEmergencyContactDiv = "";
			    var tempPersonContact = st_FriendSea_Para;
			    {
			        tempPersonContact.PersonId = getLocalStorageData("PersonId");
			        tempPersonContact.EmergencyContact = 1;
			    };
				    var data = GLOB_ConvertDataDBCompit(tempPersonContact,"st_FriendSea");
			 	   	$ionicLoading.show({template: 'Loading...'});
			 	  	$http.post("http://safecabmobilewebservice.azurewebsites.net/api/Service",data)
			 	  	.success(function(resFriendList) {
			 	  		$ionicLoading.hide();
			 	  		resFriendList = JSON.parse(resFriendList);
			 	  	 if (resFriendList.length != 0) {
			                $.each(resFriendList, function (index, key) {
			                    var tempChkFriendId = "0_0_" + resFriendList[index].FriendId;
			                    var CallerId = GLOB_CURRENT_BusinessId + "_" + GLOB_CURRENT_DriverId + "_" + GLOB_CURRENT_PersonId;
			                    var ReceiverId = tempChkFriendId;
			                    var FromPhone = CurrentUserFullDetails["Telephone"];
			                    var ToPhone = resFriendList[index].Telephone;
			                    tempEmergencyContactDiv += "<input type='button' id='" + tempChkFriendId + "' onclick=javascript:TwilioConferenceCall('" + CallerId + "','" + ReceiverId + "','" + FromPhone + "','" + ToPhone + "') class='btnyellow EmergencyContactCheckbox' style='margin:3px 0px !important;width:98%;' value=" + resFriendList[index].FullName + " /></br>";

			                });
			            }
			            else
			                tempEmergencyContactDiv += 'No any Emergency Contacts...';
			            $(".DivPopTitle").find(".DivPersonTrackingFriendList,.DivPersonFriendList").html(tempEmergencyContactDiv);
			            if(IsPersonPin == 1){
			            	$(".DivParentPopUpDescription").hide("slide", { direction: "left" }, 500, function () {
			            		$(".PersonBusinessInfowindow").find('.DivPersonContactUs > .DivPersonContact').css('display', 'inline-block');
			                $(".PersonBusinessInfowindow").find('.DivPersonContactUs > .DivPersonContact').show("slide", { direction: "right" }, 500);
			            	});
			            }else
			            	{
			            	$(".DivPopTitle").find(".DivTrackUser").hide("slide", { direction: "left" }, 500, function () {
			            		$(".DivPopTitle").find('.DivPersonTrackingEmerencyContact').css('display', 'inline-block');
			                $(".DivPopTitle").find('.DivPersonTrackingEmerencyContact').show("slide", { direction: "right" }, 500);
			            	});
			           }
			 	  	});
		}
		//Get Person Emergency COntact list end
		
		//Stop person tracking start
		$scope.StopPersonTracking = function (){
			var locationTrackingStart = st_LocationTrackingIns_Para;
		    locationTrackingStart.PersonId = getLocalStorageData("PersonId");
		    locationTrackingStart.TimedOut = 1;
			    var data = GLOB_ConvertDataDBCompit(locationTrackingStart,"st_LocationTrackingIns");
		 	   	$ionicLoading.show({template: 'Loading...'});
		 	  	$http.post("http://safecabmobilewebservice.azurewebsites.net/api/Service",data)
		 	  	.success(function(reslocationTrackingStart) {
		 	  		setTimeout(function () {
		 	  			$ionicLoading.hide();
		                map.panTo(new google.maps.LatLng(currentGeoLatitude, currentGeoLongitude));
		                alert("Current Tracking stop");
		                var tempPinChangeImg = DomainName + "/Data/Images/Map_pins/person-orange_mini.png";

		                var tempIds = 0 + "_" + 0 + "_" + getLocalStorageData("PersonId") + "_0_0";
		                GLOB_IS_LOCATION_TRACKING_CONTINUE = false;
		                if ($(".DivSOSParentPopUp").css("display") == "block") {
		                    //DisplaySOSPopUp();
		                    $(".btnStopTracking").hide();
		                    $(".btnStartTracking").show();
		                }
		                //hide & show Track buttons SOS PopUp
		                $scope.closePinPopUpE4();
		                markersArray[tempIds].setAnimation(null);
		                markersArray[tempIds].setIcon(tempPinChangeImg);
		                flagPassengerTrack = false;
		            }, 100);
		 	  	});
		}
			
		//Stop person tracking end
		
		//Person Booking Pin related stuff start
			$scope.ShowPersonBookingDiv = function (){
			    var temp_st_PersonPointOfInterest = st_CombinedPointOfInterestSea_Para;
			    temp_st_PersonPointOfInterest.PersonId = getLocalStorageData("PersonId");
			    temp_st_PersonPointOfInterest.Longitude = currentGeoLongitude;
			    temp_st_PersonPointOfInterest.Latitude = currentGeoLatitude;
			    //get POI combine data END //
			    var data = GLOB_ConvertDataDBCompit(temp_st_PersonPointOfInterest,"st_CombinedPointOfInterestSea");
		 	   	$ionicLoading.show({template: 'Loading...'});
		 	  	$http.post("http://safecabmobilewebservice.azurewebsites.net/api/Service",data)
		 	  	.success(function(tempPOI) {
		 	  			$ionicLoading.hide();
		 	  			tempPOI = JSON.parse(tempPOI);
		 	  			$('.selePerson_POI').html('');
			            $.each(tempPOI, function (key, value) {
			                var tempPOIlatlng = tempPOI[key]["Longitude"] + ":" + tempPOI[key]["Latitude"] + ":" + tempPOI[key]["PointOfInterestId"];
			                $('.selePerson_POI').append('<option value=' + tempPOIlatlng + '>' + tempPOI[key]["PointOfInterest"] + '</option>');
			            });
			            var DivParentPopUpDescriptionHeight = $('.DivParentPopUpDescription').height();
			            $('.DivBookingPopUpInner').css('height', 'auto');
			            	$('.DivParentPopUpDescription').hide("slide", { direction: "left" }, 500, function () { 
			            		$(".DivBookingPopUp").css("display", "inline-block"); 
			            	$('.PersonBusinessInfowindow').find('.DivPersonBooking > .DivBookingPopUp').show("slide", { direction: "right" }, 500); 
			           });
		 	  	});
			}
		//Person Booking Pin related stuff end
			
		//Get Business comments type 8 
			$scope.Show_Booking_8_BusinessCommetns = function (BusinessId,DriverId,BookingId,PersonId){
				 var temp_st_RatingSel_Para = st_RatingSel_Para;
				    temp_st_RatingSel_Para.BusinessId = 0;
				    temp_st_RatingSel_Para.DriverId = 0;
				    temp_st_RatingSel_Para.PersonId = PersonId;
				    temp_st_RatingSel_Para.BookingId = 0;
				    temp_st_RatingSel_Para.PassengerView = true;
				    //
					    var data = GLOB_ConvertDataDBCompit(temp_st_RatingSel_Para,"st_RatingSel");
				 	   	$ionicLoading.show({template: 'Loading...'});
				 	  	$http.post("http://safecabmobilewebservice.azurewebsites.net/api/Service",data)
				 	  	.success(function(tempresRatings) {
				 	  			$ionicLoading.hide();
				 	  			$('.DivParentPopUpDescription').hide("slide", { direction: "left" }, 500, function () {
					                $('.DivBookingStatus_8').find(".DivBusiness_Booking_Status_8_Comments > .DivUserComments").css("display", "inline-block");
					                $('.DivBookingStatus_8').find(".DivBusiness_Booking_Status_8_Comments > .DivUserComments").find(".DivUserCommentsInner").html(DisplayCommentsDiv(tempresRatings));
					                $('.DivBookingStatus_8').find(".DivBusiness_Booking_Status_8_Comments > .DivUserComments").find(".DivUserCommentsInner").append("<a href='javascript:void(0);' onclick='javascript:CloseBusiness_Booking_8CommentsWindow($(this));' class='linkCancelPopup' style='float:right !important;'>Cancel</a><div class='clear'></div>");
					                $('.DivBookingStatus_8').find('.DivBusiness_Booking_Status_8_Comments > .DivUserComments').show("slide", { direction: "right" }, 500);
					            });
				 	  	});
			}
		//
		//Get Business comments type 16 START
			$scope.Show_BUSINESSBOOKING_16_BusinessCommetns = function (BusinessId,DriverId,BookingId,PersonId){
				 var temp_st_RatingSel_Para = st_RatingSel_Para;
				    temp_st_RatingSel_Para.BusinessId = 0;
				    temp_st_RatingSel_Para.DriverId = 0;
				    temp_st_RatingSel_Para.PersonId = PersonId;
				    temp_st_RatingSel_Para.BookingId = 0;
				    temp_st_RatingSel_Para.PassengerView = true;
				    //
					    var data = GLOB_ConvertDataDBCompit(temp_st_RatingSel_Para,"st_RatingSel");
				 	   	$ionicLoading.show({template: 'Loading...'});
				 	  	$http.post("http://safecabmobilewebservice.azurewebsites.net/api/Service",data)
				 	  	.success(function(tempresRatings) {
				 	  			$ionicLoading.hide();
				 	  		 $('.DivBookingStatus_16').find('.DivBookingStatus_16_Comments > .DivUserComments').find(".DivUserCommentsInner").html(DisplayCommentsDiv(tempresRatings));
				             $('.DivBookingStatus_16').find('.DivBookingStatus_16_Comments > .DivUserComments').find(".DivUserCommentsInner").append("<a href='javascript:void(0);' onclick='javascript:CloseBusiness_Booking_16_CommentsWindow($(this));' class='linkCancelPopup' style='float:right !important;'>Cancel</a><div class='clear'></div>");
				             $('.DivParentPopUpDescription').hide("slide", { direction: "left" }, 500, function () {
				                 $('.DivBookingStatus_16').find('.DivBookingStatus_16_Comments > .DivUserComments').show("slide", { direction: "right" }, 500);
				 	  	});
				 	  	});
			}
		//Get Business comments type 16 End
		//Submit person booking data Start
			$scope.SavePersonCabInstantBookNow = function (){
				var tempFromAddress = $(".DivAppendChildData").find(".btnPerson_FromLocation").html().toString().replace(/\"/g,'');
				var tempRequireDate = $(".DivAppendChildData").find(".btnCabDatePopUP").val();
				var tempBookingCarType = $(".DivAppendChildData").find(".btnPersonBusinessCarType").val();
				var tempToAddress = $(".DivAppendChildData").find(".btnPerson_ToLocation").val();
				var tempBookingNotes = $(".DivAppendChildData").find(".txtNotes").val();
				//
				
			    var personId = getLocalStorageData("PersonId").toString().replace(/\"/g,'');
			    var fullName = getLocalStorageData("FullName").toString().replace(/\"/g,'');
			    var telePhone = getLocalStorageData("Telephone").toString().replace(/\"/g,'');
			    var emailAddress = getLocalStorageData("EmailAddress").toString().replace(/\"/g,'');
			    var fromAddress = tempFromAddress;
			    var toAddress = $(".DivAppendChildData").find(".btnPerson_ToLocation").val();
			    var toAddressLat =  $(".DivAppendChildData").find(".hiddenPersonToAddressLat").val();
			    var booking = st_BookingIns_Para;
			    if (toAddressLat == null || toAddressLat == '') {
			        toAddressLat = 0.0;
			        booking.EndPointOfInterestId = 0;
			    } else {
			        //if (tempEndPointOfInterestAddress != toAddress.toString())
			            booking.EndPointOfInterestId = 0;
			        //else
			          //  booking.EndPointOfInterestId = tempEndPointOfInterestId;
			    }
			    var toAddressLng =  $(".DivAppendChildData").find(".hiddenPersonToAddressLng").val();
			    if (toAddressLng == null || toAddressLng == '')
			        toAddressLng = 0.0;
			    var carType = 2; //$(".DivAppendChildData").find(".btnPersonBusinessCarType").val();
			    var PersonNotes = $(".DivAppendChildData").find(".txtNotes").val();
			    var businessId = '0';
			    var driverId = '0';
			    var tempCurrentDate = $(".DivAppendChildData").find(".btnCabDatePopUP").val();

			    
			    booking.PersonId = personId;
			    booking.FullName = fullName;
			    booking.Telephone = telePhone;
			    booking.EmailAddress = emailAddress;
			    booking.StartAddress = fromAddress;
			    booking.StartLatitude = currentGeoLatitude;
			    booking.StartLongitude = currentGeoLongitude;
			    booking.EndAddress = toAddress;
			    booking.EndLatitude = toAddressLat;
			    booking.EndLongitude = toAddressLng;
			    booking.BookingNotes = PersonNotes;
			    booking.RequiredDateTime = tempCurrentDate;
			    booking.BikeRequired = carType == 1 ? '1' : '0';
			    booking.CarRequired = carType == 2 ? '1' : '0';
			    booking.HighTopRequired = carType == 4 ? '1' : '0';
			    booking.PeopleCarrierRequired = carType == 8 ? '1' : '0';
			    booking.MiniBusRequired = carType == 16 ? '1' : '0';
			    booking.LimoRequired = carType == 32 ? '1' : '0';
			    booking.DisabledAccess = false;
			    booking.FemaleDriver = false;
			    booking.QuoteOnly = false;
			    booking.BusinessId = 0;
			    booking.DriverId = 0;
			    booking.Country = GLOB_COUNTRYCODE;
			    booking.StartPointOfInterestId = 0;
			    booking.Bookingautoconnect = false;
			    booking.Bookingautoconnect = GetUserCurrentAccuracy();
				    var data = GLOB_ConvertDataDBCompit(booking,"st_BookingIns");
			 	   	$ionicLoading.show({template: 'Loading...'});
			 	  	$http.post("http://safecabmobilewebservice.azurewebsites.net/api/Service",data)
			 	  	.success(function(resBooking) {
			 	  			$ionicLoading.hide();
			 	  			alert("New booking has been requested.");
			 	  			var temp_st_BookingSel_Para = st_BookingSel_Para;
				            temp_st_BookingSel_Para.PersonId = personId;
				            temp_st_BookingSel_Para.BookingId = resBooking;
					            var data1 = GLOB_ConvertDataDBCompit(temp_st_BookingSel_Para,"st_BookingSel");
						 	   	$ionicLoading.show({template: 'Loading...'});
						 	  	$http.post("http://safecabmobilewebservice.azurewebsites.net/api/Service",data1)
						 	  	.success(function(resBookingSelData) {
						 	  		$ionicLoading.hide();
				                    //resBookingSelData[0].BookingDateTime = resBookingSelData[0]["RequiredDate"] + " " + resBookingSelData[0]["RequiredTime"];
				                    GLOB_MAPPINGSEA_PARA.Accuracy = currentGeoAccuracy;
				                    $scope.loadMap(currentGeoLatitude, currentGeoLongitude);
				                    $scope.closetempPinPopUpE1();
						 	  	});
			 	  			
			 	  	});
			}
				
		//Submit person booking data end
			
		//Save Place Pin data START
			$scope.POIConfirmUserLocation = function (){
				 if ($(".DivAppendChildData").find(".frmPOI").find(".txtPointOfInterestName").val() != "") {
					 var tempPOILat = $(".DivAppendChildData").find(".frmPOI").find('.hiddenPOIlat').val();
				        var tempPOILng = $(".DivAppendChildData").find(".frmPOI").find('.hiddenPOIlng').val();
				        var tmepPOIlbl = $(".DivAppendChildData").find(".frmPOI").find('.txtPointOfInterestName').val();
				        var tempPOIAddress = $.trim($(".DivAppendChildData").find(".DivPlaceReoveScreen").find('.lblUserCurrentAddress').html());
				        var tempPOIImage = "";
				        if ($(".DivAppendChildData").find('.DivPlaceReoveScreen').find('.POIPic').attr('src').indexOf('users.png') == -1)
				            tempPOIImage = $(".DivAppendChildData").find('.DivPlaceReoveScreen').find('.POIPic').attr('src').replace(/ /g, '');
				        else
				            tempPOIImage = null;
				        ///
					        var temp_st_PersonPointOfInterestIns_Para = st_EntityPointOfInterestIns_Para;
			                temp_st_PersonPointOfInterestIns_Para.PersonId = getLocalStorageData("PersonId");
			                temp_st_PersonPointOfInterestIns_Para.BusinessId = GLOB_CURRENT_BusinessId;
			                temp_st_PersonPointOfInterestIns_Para.DriverId = GLOB_CURRENT_DriverId;
			                temp_st_PersonPointOfInterestIns_Para.Latitude = tempPOILat;
			                temp_st_PersonPointOfInterestIns_Para.Longitude = tempPOILng;
			                temp_st_PersonPointOfInterestIns_Para.PointOfInterestAddress = tempPOIAddress;
			                temp_st_PersonPointOfInterestIns_Para.PointOfInterest = tmepPOIlbl;
			                temp_st_PersonPointOfInterestIns_Para.PointOfInterestImage = tempPOIImage;
			                var data = GLOB_ConvertDataDBCompit(temp_st_PersonPointOfInterestIns_Para,"st_EntityPointOfInterestIns");
					 	   	$ionicLoading.show({template: 'Loading...'});
					 	  	$http.post("http://safecabmobilewebservice.azurewebsites.net/api/Service",data)
					 	  	.success(function(resPOIAdd) {
					 	  			$ionicLoading.hide();
					 	  			if(resPOIAdd > 0){
					 	  				GLOB_NEW_POI_MARKER.setMap(null);
					 	  				alert("Place has been added successfully.");
					 	  				var temp_st_EntityPointOfInterestSel_Para = st_EntityPointOfInterestSel_Para;
			                            temp_st_EntityPointOfInterestSel_Para.EntityPointOfInterestId = parseInt(resPOIAdd);
			                            var data1 = GLOB_ConvertDataDBCompit(temp_st_EntityPointOfInterestSel_Para,"st_EntityPointOfInterestSel");
								 	   	$ionicLoading.show({template: 'Loading...'});
								 	   $http.post("http://safecabmobilewebservice.azurewebsites.net/api/Service",data1)
								 	  	.success(function(tempPOIData) {
								 	  		$ionicLoading.hide();
								 	  		tempPOIData = JSON.parse(tempPOIData);
								 	  		CreatePOIData(tempPOIData, false, parseInt(resPOIAdd), true);
								 	  	});
					 	  			}
					 	  			else
					 	  				alert('Data not added...');
					 	  				
					 	  	});
				        ///
				 }else{
					 $(".DivAppendChildData").find(".frmPOI").find(".txtPointOfInterestName").css('border','1px solid red !important');
				 }
			}
		//Save Place Pin data END
			
		//Load Places pin content START
			$scope.LoadPlacesPinContent = function (EntityPointOfInterestId){
				 var temp_st_EntityPointOfInterestSel_Para = st_EntityPointOfInterestSel_Para;
	             temp_st_EntityPointOfInterestSel_Para.EntityPointOfInterestId = EntityPointOfInterestId;
				 var data = GLOB_ConvertDataDBCompit(temp_st_EntityPointOfInterestSel_Para,"st_EntityPointOfInterestSel");
			 	   	$ionicLoading.show({template: 'Loading...'});
			 	  	$http.post("http://safecabmobilewebservice.azurewebsites.net/api/Service",data)
			 	  	.success(function(singlePOIData) {
			 	  			$ionicLoading.hide();
			 	  			singlePOIData = JSON.parse(singlePOIData);
			 	  			singlePOIData = singlePOIData[0];

	                        ///////////////////////////////

	                        //Placemarker.setAnimation(google.maps.Animation.BOUNCE);
	                        if (getLocalStorageData("PersonId") == 0)
	                            $(".btnPlaceSetRate").show();
	                        var PlacesDivPopTitle = $(".DivPopUpTitlePOIContainer").html();
	                        PlacesDivPopTitle = PlacesDivPopTitle.replace("DivPOIDivDescriptionContainer", ''); //VERY IMPORTANT
	                        PlacesDivPopTitle = PlacesDivPopTitle.replace("{tempDivTitle}", singlePOIData["PointOfInterest"]);
	                        PlacesDivPopTitle = PlacesDivPopTitle.replace("{currentGeoLatitude}", singlePOIData["Latitude"]);
	                        PlacesDivPopTitle = PlacesDivPopTitle.replace("{currentGeoLongitude}", singlePOIData["Longitude"]);
	                        PlacesDivPopTitle = PlacesDivPopTitle.replace("{PLACE}", singlePOIData["PointOfInterest"]);
	                        PlacesDivPopTitle = PlacesDivPopTitle.replace(/{PERSONPOIID}/g, EntityPointOfInterestId);
	                        PlacesDivPopTitle = PlacesDivPopTitle.replace("{LNG}", singlePOIData["Longitude"]);
	                        PlacesDivPopTitle = PlacesDivPopTitle.replace("{LAT}", singlePOIData["Latitude"]);
	                        PlacesDivPopTitle = PlacesDivPopTitle.replace("{ADDRESSFROMLAT}", singlePOIData["Latitude"]);
	                        PlacesDivPopTitle = PlacesDivPopTitle.replace("{ADDRESSFROMLNG}", singlePOIData["Longitude"]);
	                        PlacesDivPopTitle = PlacesDivPopTitle.replace("{HIDDENADVERTLAT}", singlePOIData["Latitude"]);
	                        PlacesDivPopTitle = PlacesDivPopTitle.replace("{HIDDENADVERTLNG}", singlePOIData["Longitude"]);
	                        PlacesDivPopTitle = PlacesDivPopTitle.replace("{USERPLACETO}", singlePOIData["PointOfInterest"]);
	                        PlacesDivPopTitle = PlacesDivPopTitle.replace("{USERPLACEFROM}", singlePOIData["PointOfInterest"]);
	                        var tempIsDisplayfromBtn = 'none';
	                        if (getLocalStorageData("PersonId") > 0)
	                            tempIsDisplayfromBtn = 'inline-block';
	                        PlacesDivPopTitle = PlacesDivPopTitle.replace("{BTNDISPLAYBOOKINGTO}", tempIsDisplayfromBtn);
	                        PlacesDivPopTitle = PlacesDivPopTitle.replace("{BTNDISPLAYBOOKINGFROM}", tempIsDisplayfromBtn);

	                        var tempPOIImage = "";
	                        if (singlePOIData["PointOfInterestImage"] != null && singlePOIData["PointOfInterestImage"] != '')
	                            tempPOIImage = "data:image/*;base64," + singlePOIData["PointOfInterestImage"];
	                        else
	                            tempPOIImage = DomainNameSource + '/images/UserDetails/users.png';

	                        PlacesDivPopTitle = PlacesDivPopTitle.replace("{PASSENGERPOISMALLIMAGE}", tempPOIImage);
	                        PlacesDivPopTitle = PlacesDivPopTitle.replace("{PASSENGERPOIIMAGE}", tempPOIImage);
	                        PlacesDivPopTitle = PlacesDivPopTitle.replace("{TEMPADDRESSLAT}", singlePOIData["Latitude"]);
	                        PlacesDivPopTitle = PlacesDivPopTitle.replace("{TEMPADDRESSLNG}", singlePOIData["Longitude"]);
	                        PlacesDivPopTitle = PlacesDivPopTitle.replace("{HIDDENTEMPPOILAT}", singlePOIData["Latitude"]);
	                        PlacesDivPopTitle = PlacesDivPopTitle.replace("{HIDDENTEMPPOILNG}", singlePOIData["Longitude"]);
	                        PlacesDivPopTitle = PlacesDivPopTitle.replace("{HIDDENISADVERTDATAADDED}", singlePOIData["IsAdvert"]);
	                        PlacesDivPopTitle = PlacesDivPopTitle.replace("{HIDDENIADVERTID}", singlePOIData["IsAdvert"]);
	                        //                    if (GLOB_TEMP_ADVERT_ID == 0) {
	                        //                        GLOB_TEMP_ADVERT_ID = singlePOIData["IsAdvert"];
	                        //                        PlacesDivPopTitle = PlacesDivPopTitle.replace("{ADVERTBUTTONTEXT}", 'Advertise Place');
	                        //                    }
	                        //                    else {
	                        if (singlePOIData["IsAdvert"] >= true)
	                            PlacesDivPopTitle = PlacesDivPopTitle.replace("{ADVERTBUTTONTEXT}", 'Update Advert');
	                        else
	                            PlacesDivPopTitle = PlacesDivPopTitle.replace("{ADVERTBUTTONTEXT}", 'Advertise Place');
	                        //                    }
	                        PlacesDivPopTitle = PlacesDivPopTitle.replace("{HIDDENADVERTPOIID}", EntityPointOfInterestId);
	                        PlacesDivPopTitle = PlacesDivPopTitle.replace(/{PLACETITLE}/g, singlePOIData["PointOfInterest"]);
	                        PlacesDivPopTitle = PlacesDivPopTitle.replace(/{HIDDENADVERTID}/g, singlePOIData["IsAdvert"]);

	                        PlacesDivPopTitle = PlacesDivPopTitle.replace("{PERSONID}", singlePOIData["PersonId"]);
	                        PlacesDivPopTitle = PlacesDivPopTitle.replace("{TIMEOUT}", 0);
	                        PlacesDivPopTitle = PlacesDivPopTitle.replace(/{DISPLAYPOIEDITDIV}/g, 'hide');
	                        PlacesDivPopTitle = PlacesDivPopTitle.replace(/{ADVERTADDRESS}/g, singlePOIData["PointOfInterestAddress"]);
	                        $(".DivAppendChildData").html(PlacesDivPopTitle).show();
	            	  		$scope.opentempPinPopUpE1();   
	                        //ImageHoverProperty('55', '22');

	                        map.panTo(new google.maps.LatLng(singlePOIData["Latitude"], singlePOIData["Longitude"]));
			 	  	});
				
			}
		//Load Places pin content END
			
		//Remove places related stuff start
			$scope.RemovePersonPointOfInterest =function (pointOfInterestId,POIPlace){
					var temp_st_PersonPointOfInterestIns_Para = st_EntityPointOfInterestIns_Para;
				    temp_st_PersonPointOfInterestIns_Para.EntityPointOfInterestId__O = pointOfInterestId;
				    temp_st_PersonPointOfInterestIns_Para.PersonId = getLocalStorageData("PersonId");
				    temp_st_PersonPointOfInterestIns_Para.BusinessId = 0;
				    temp_st_PersonPointOfInterestIns_Para.DriverId = 0;
				    temp_st_PersonPointOfInterestIns_Para.Longitude = 0.0;
				    temp_st_PersonPointOfInterestIns_Para.Latitude = 0.0;
				    temp_st_PersonPointOfInterestIns_Para.TimedOut = 1;
				    var data = GLOB_ConvertDataDBCompit(temp_st_PersonPointOfInterestIns_Para,"st_EntityPointOfInterestIns");
			 	   	$ionicLoading.show({template: 'Loading...'});
			 	  	$http.post("http://safecabmobilewebservice.azurewebsites.net/api/Service",data)
			 	  	.success(function(resPOIUpdate) {
			 	  			$ionicLoading.hide();
			 	  			alert(POIPlace + " Point Of Interest Removed.....");
			 	  			if (GLOB_ArrayPlaceMarkers[pointOfInterestId] != undefined)
		                        GLOB_ArrayPlaceMarkers[pointOfInterestId].setMap(null);
			 	  			$scope.closetempPinPopUpE1();
			 	  	});
			}	
		//Remove places related stuff end
			
		//Save Advert related data START
			$scope.AdvertConfirmUserLocation = function (){
				var tempPOILat = $(".DivAppendChildData").find('.DivPOIDivDescription').find(".DivPassengerAdvert").find('.HiddenAdvertLat').val();
			    var tempPOILng = $(".DivAppendChildData").find('.DivPOIDivDescription').find(".DivPassengerAdvert").find('.HiddenAdvertLng').val();
			    var tempAdvertAddress = $(".DivAppendChildData").find('.DivPOIDivDescription').find(".DivPassengerAdvert").find('.lblAdvertUserCurrentAddress').val();
			    var tmepPersonPOIId = $(".DivAppendChildData").find(".clsFrmAdvert").find('.hiddenPersonADVERTId').val();
			    var tmepAdvertViews = $(".DivAppendChildData").find(".clsFrmAdvert").find('.txtAdvertViews').val();
			    var tmepAdvertEmailAddress = $(".DivAppendChildData").find(".clsFrmAdvert").find('.txtAdavAdvertEmail').val();
			    var tmepAdvertTelePhone = $(".DivAppendChildData").find(".clsFrmAdvert").find('.txtPlaceCountryCode').val() == 0 ? 44 : $(".DivAppendChildData").find(".clsFrmAdvert").find('.txtPlaceCountryCode').val() + "" + $(".DivAppendChildData").find(".clsFrmAdvert").find('.txtAdavAdvertTelephone').val();
			    tmepAdvertViews = parseInt(tmepAdvertViews);
			    var tmepAdvertRange = $(".DivAppendChildData").find(".clsFrmAdvert").find('.txtAdvertRange').val();
			    var tmepAdvertValidFrom = new Date($(".DivAppendChildData").find(".clsFrmAdvert").find('.txtAdvertValidFrom').val());
			    var tmepAdvertValidTo = $(".DivAppendChildData").find(".clsFrmAdvert").find('.txtAdvertValidTo').val() == "" ? null : new Date($(".DivAppendChildData").find(".clsFrmAdvert").find('.txtAdvertValidTo').val());
			    var tempPersonPointOfInterestId = $(".DivAppendChildData").find('.DivPOIDivDescription').find(".DivPassengerAdvert").find(".HiddenAdvertPOIId").val() == "" ? null : $(".DivAppendChildData").find('.DivPOIDivDescription').find(".DivPassengerAdvert").find(".HiddenAdvertPOIId").val();  // $(".PERSONPOIID").val();
			    var AdvertImage = "";
			    var tmepAdvertId = $(".DivAppendChildData").find('.DivPOIDivDescription').find(".DivPassengerAdvert").find(".HiddenAdvertId").val().toString() == "{HIDDENADVERTID}" ? 0 : parseInt($(".DivAppendChildData").find('.DivPOIDivDescription').find(".DivPassengerAdvert").find(".HiddenAdvertId").val());
			    /*if (ISUserChangeAdvertImage == true) {
			        if ($(".DivAppendChildData").find('.DivPassengerAdvert').find('.AdvertPic').attr('src').indexOf('../../DATA/images/UserDetails/users.png') == -1)
			            AdvertImage = $(".DivAppendChildData").find('.DivPassengerAdvert').find('.AdvertPic').attr('src').replace(/ /g, '');
			    }
			    else*/
			        AdvertImage = null;
			    if (tmepAdvertRange == 'Whole UK')
			        tmepAdvertRange = 0;
			    if (tmepAdvertTelePhone.length == 12) {
			        var temp_st_AdvertIns_Para = st_AdvertIns_Para;
			        temp_st_AdvertIns_Para.PointOfInterestId = tempPersonPointOfInterestId;
			        temp_st_AdvertIns_Para.BusinessId = GLOB_CURRENT_BusinessId == 0 ? null : GLOB_CURRENT_BusinessId;
			        temp_st_AdvertIns_Para.DriverId = GLOB_CURRENT_DriverId == 0 ? null : GLOB_CURRENT_DriverId;
			        temp_st_AdvertIns_Para.PersonId = getLocalStorageData("PersonId") == 0 ? null : getLocalStorageData("PersonId");
			        temp_st_AdvertIns_Para.Latitude = tempPOILat;
			        temp_st_AdvertIns_Para.Longitude = tempPOILng;
			        temp_st_AdvertIns_Para.AdvertImage = AdvertImage;
			        temp_st_AdvertIns_Para.AdvertRange = tmepAdvertRange;
			        temp_st_AdvertIns_Para.AdvertViews = tmepAdvertViews;
			        temp_st_AdvertIns_Para.AdvertEmail = tmepAdvertEmailAddress;
			        temp_st_AdvertIns_Para.AdvertTelephone = tmepAdvertTelePhone;
			        temp_st_AdvertIns_Para.AdvertId__O = tmepAdvertId;
			        //
				        var data = GLOB_ConvertDataDBCompit(temp_st_AdvertIns_Para,"st_AdvertIns");
				 	   	$ionicLoading.show({template: 'Loading...'});
				 	  	$http.post("http://safecabmobilewebservice.azurewebsites.net/api/Service",data)
				 	  	.success(function(resAdvertAdded) {
				 	  			$ionicLoading.hide();
				 	  			GLOB_TEMP_ADVERT_ID = parseInt(resAdvertAdded);
				 	  			$(".DivAppendChildData").find('.DivPOIDivDescription').find(".DivPlaceReoveScreen").find('.btnAdvertTxt').val('Update Advert');
				                alert("Advert has been added successfully.");
				                CloseAdvert();
				 	  	});
			    }
			    else {
			        $(".txtAdavAdvertTelephone").addClass('error');
			    }
			}
		//Safe Advert related data END
		//Edit advert data START
			$scope.DisplayEditAdvertData = function (IsAdvertAdded){
			var temp_st_AdvertSel_Para = st_AdvertSel_Para;
		 	temp_st_AdvertSel_Para.AdvertId = IsAdvertAdded;
		 	var data = GLOB_ConvertDataDBCompit(temp_st_AdvertSel_Para,"st_AdvertSel");
	 	   	$ionicLoading.show({template: 'Loading...'});
	 	  	$http.post("http://safecabmobilewebservice.azurewebsites.net/api/Service",data)
	 	  	.success(function(resAdvertData) {
	 	  		$ionicLoading.hide();
	 	  		resAdvertData = JSON.parse(resAdvertData);
	 	  		resAdvertData = resAdvertData[0];
                if (resAdvertData["AdvertRecordingName"] != null && resAdvertData["AdvertRecordingName"] != '')
                    ISUserAddedAdvertRecording = true;
                $('.DivPOIDivDescription').find(".DivPlaceReoveScreen").hide("slide", { direction: "left" }, 500, function () {
                    $('.DivPOIDivDescription').find(".DivPassengerAdvert").show("slide", { direction: "right" }, 500);
                });
                $(".DivAppendChildData").find('.DivPOIDivDescription').find(".DivPassengerAdvert").find(".btnRemoveAdvert").show();
                $(".DivAppendChildData").find('.DivPOIDivDescription').find(".DivPassengerAdvert").find(".txtAdvertName").val(resAdvertData["AdvertRecordingName"]);
                $(".DivAppendChildData").find('.DivPOIDivDescription').find(".DivPassengerAdvert").find(".HiddenAdvertId").val(resAdvertData["AdvertId"]);
                $(".DivAppendChildData").find('.DivPOIDivDescription').find(".DivPassengerAdvert").find(".HiddenAdvertRecordingName").val(resAdvertData["AdvertRecordingName"]);
                $(".DivAppendChildData").find('.DivPOIDivDescription').find(".DivPassengerAdvert").find(".HiddenAdvertRecordingType").val(resAdvertData["AdvertRecordingType"]);
                $(".DivAppendChildData").find('.DivPOIDivDescription').find(".DivPassengerAdvert").find(".txtAdvertRange").val(resAdvertData["AdvertRange"] == 0 ? CONF_ADVERT_RANGE[0]["Title"] : resAdvertData["AdvertRange"]);
                $(".DivAppendChildData").find('.DivPOIDivDescription').find(".DivPassengerAdvert").find(".txtAdvertViews").val(resAdvertData["AdvertViews"]);
                $(".DivAppendChildData").find('.DivPOIDivDescription').find(".DivAdvancePassengerAdvert").find(".txtAdvertValidTo").val(resAdvertData["ValidTo"]);
                $(".DivAppendChildData").find('.DivPOIDivDescription').find(".DivAdvancePassengerAdvert").find(".txtAdvertValidFrom").val(resAdvertData["ValidFrom"]);
                $(".DivAppendChildData").find('.DivPOIDivDescription').find(".DivPassengerAdvert").find(".HiddenAdvertPOIId").val(resAdvertData["PointOfInterestId"]);
                $(".DivAppendChildData").find('.DivPOIDivDescription').find(".DivPassengerAdvert").find(".txtAdavAdvertEmail").val(resAdvertData["AdvertEmail"]);
                var SelectedCountry = getLocalStorageData("CountryCode");
                var tempAdvertTelePhone = "91";//CONF_COUNTRYCODE[SelectedCountry].replace('+', '');
                if (resAdvertData["AdvertTelephone"].length != undefined)
                    tempAdvertTelePhone = resAdvertData["AdvertTelephone"];

                //
                var tempCountry = "url('../../content/img/country/" + GLOB_GET_COUNTRY_IMAGE_FROM_COUNTRY_CODE(tempAdvertTelePhone.toString().substr(0, 2)) + ".png')";
                $(".txtPlaceCountryCode").css("background-image", tempCountry);
                $(".txtPlaceCountryCode").val(tempAdvertTelePhone.toString().substr(0, 2));
                $(".DivAppendChildData").find('.DivPOIDivDescription').find(".DivPassengerAdvert").find(".txtAdavAdvertTelephone").val(GLOB_GetTelePhoneNumber_Actual(tempAdvertTelePhone));
                //
                $(".DivAppendChildData").find('.DivPOIDivDescription').find(".DivAdvancePassengerAdvert").find(".txtAdavAdvertURL").val(resAdvertData["AdvertURL"]);
                if (resAdvertData["AdvertType"].toString().toLowerCase() == "true")
                	$(".DivAppendChildData").find('.DivPOIDivDescription').find(".DivAdvancePassengerAdvert").find("#chkPhoneType").prop('checked', true);

                var tempAdvertImage;
                if (resAdvertData["AdvertImage"] != null && resAdvertData["AdvertImage"] != "" && resAdvertData["AdvertImage"] != "null")
                    tempAdvertImage = "data:image/*;base64," + resAdvertData["AdvertImage"];
                else
                    tempAdvertImage = DomainName + "/DATA/images/UserDetails/users.png";
                $(".DivAppendChildData").find('.DivPOIDivDescription').find(".DivPassengerAdvert").find(".AdvertPic").attr("src", tempAdvertImage);
	 	  		
	 	  	});
		}
		//Edit advert data End
			
		//Load Place pin drop-down data Start
			$scope.LoadPlacePinDropDownData = function (){
				var temp_st_CombinedPointOfInterestSea_Para = st_CombinedPointOfInterestSea_Para;
			    temp_st_CombinedPointOfInterestSea_Para.PersonId = getLocalStorageData("PersonId");
			    temp_st_CombinedPointOfInterestSea_Para.Longitude = GLOB_map.getCenter().lng();  //initialLongitude;
			    temp_st_CombinedPointOfInterestSea_Para.Latitude = GLOB_map.getCenter().lat(); //initialLatitude;			    
			    var data = GLOB_ConvertDataDBCompit(temp_st_CombinedPointOfInterestSea_Para,"st_CombinedPointOfInterestSea");
		 	   	$ionicLoading.show({template: 'Loading...'});
		 	  	$http.post("http://safecabmobilewebservice.azurewebsites.net/api/Service",data)
		 	  	.success(function(restempPOI) {
		 	  		$ionicLoading.hide();
		 	  		restempPOI = JSON.parse(restempPOI);
		 	  		GLOB_POI_COMBINE_BOOKING_DATA = [];
		            $('.selePlacePopUp,.seleFromPlacePopUp').html('');
		            $.each(restempPOI, function (key, value) {
		                var tempPOIlatlng = restempPOI[key]["Longitude"] + ":" + restempPOI[key]["Latitude"];

		                $('.selePlacePopUp,.seleFromPlacePopUp').append('<option value=' + tempPOIlatlng + '>' + restempPOI[key]["PointOfInterest"] + '</option>');
		                var tempPOIData = {
		                    PointOfInterestId: restempPOI[key]["PointOfInterestId"],
		                    Longitude: restempPOI[key]["Longitude"],
		                    Latitude: restempPOI[key]["Latitude"],
		                    PointOfInterest: restempPOI[key]["PointOfInterest"]
		                };
		                GLOB_POI_COMBINE_BOOKING_DATA.push(tempPOIData);
		 	  	});
			});
		}
	    //Load Place pin drop-down data End
})

.controller('AppCtrl', function($scope,$rootScope, FriendService,$ionicModal,$ionicSideMenuDelegate, $compile,$ionicLoading,$window,$http,$location) {
	$scope.DisplayAllPlaceData =function (){
		//
		var temp_st_CombinedPointOfInterestSea_Para = st_CombinedPointOfInterestSea_Para;
        temp_st_CombinedPointOfInterestSea_Para.PersonId = getLocalStorageData("PersonId");
        temp_st_CombinedPointOfInterestSea_Para.BusinessId = GLOB_CURRENT_BusinessId;
        temp_st_CombinedPointOfInterestSea_Para.DriverId = GLOB_CURRENT_DriverId;
        temp_st_CombinedPointOfInterestSea_Para.Longitude = GLOB_MAPPINGSEA_PARA.POVLongitude;
        temp_st_CombinedPointOfInterestSea_Para.Latitude = GLOB_MAPPINGSEA_PARA.POVLatitude;
        var data = GLOB_ConvertDataDBCompit(temp_st_CombinedPointOfInterestSea_Para,"st_CombinedPointOfInterestSea");
    	$ionicLoading.show({template: 'Loading...'});
    	$http.post("http://safecabmobilewebservice.azurewebsites.net/api/Service",data)
	    		.success(function(tempPOIData) {
	    		$ionicLoading.hide();
	    		tempPOIData = JSON.parse(tempPOIData);
	    		CreatePOIData(tempPOIData, false, false, false);
	    		GLOB_PLACES_PIN_ALREADY_LOADED_PLACEID = 0;
    			
    		});
	}
	
	$scope.StMappingSeaData = [];
	  // Form data for the login modal
	  $scope.loginData = {};
	  
	  $scope.positions = [];
	  
	  $scope.autocompletelat = 41.07493;
	  $scope.autocompletelng = -78.381388;
	  
	  $scope.mapControl = {
	  };
	  
	  
	   $scope.toggleLeft = function() {
	    $ionicSideMenuDelegate.toggleLeft();
	  }

	   $scope.CheckUserIsOnline = function() {
	   	//condition for slidemenu content display proper when user is online
	  		$(".DivBeforeMenu,.DivAfterMenu").hide();
	  		if(getLocalStorageData("PersonId") != undefined && parseInt(getLocalStorageData("PersonId")) > 0 && getLocalStorageData("PersonId") != "null" && getLocalStorageData("PersonId") != null){
	  			$(".DivAfterMenu").show();	
	  		}
	  		else{
	  			$(".DivBeforeMenu").show();	
	  		}
	  }
	  //Add new friend data
		$scope.AddNewFriend = function(){	
			$scope.$broadcast('scroll.infiniteScrollComplete');
			var url ="#/app/AddFriend";
			$window.location.href = url;	
		};
	  
	  $scope.init = function() {
	  		
	        var myLatlng = new google.maps.LatLng(52.023410, -0.332402);
			$scope.loadMap(52.023410, -0.332402);
			currentGeoLongitude =52.023410;
			currentGeoLatitude =  -0.332402;
			
			/*$ionicLoading.show({
			  template: 'Loading...'
			});*/
			
			var options = {
			  enableHighAccuracy: true,
			  timeout: 5000,
			  maximumAge: 0
			};
			
			navigator.geolocation.getCurrentPosition(function(position) {
			  var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			  $scope.positions.push({lat: pos.k,lng: pos.D});
			  var tempLiveMapGeocoder = new google.maps.Geocoder();
			  Lat = position.coords.latitude;
			  Lng = position.coords.longitude;
			  currentGeoAccuracy = position.coords.accuracy;
			  
			  currentGeoLongitude = Lng;
			  currentGeoLatitude =  Lat;
			  $scope.locationList = [];
			  tempLiveMapGeocoder.geocode({ 'latLng': new google.maps.LatLng(Lat, Lng) }, function (results) {
		             if (results[0]) {
		                 var tempPlacesAddress = results[0].formatted_address;
		                 for (var i = 0; i < results[0].address_components.length; i++) {
	                            for (var b = 0; b < results[0].address_components[i].types.length; b++) {
	                                if (results[0].address_components[i].types[b] == "country") {
	                                    country = results[0].address_components[i];
	                                    GLOB_COUNTRYCODE = country.short_name;
	                                    setLocalStorageData("CountryCode", country.short_name);
	                                    CONF_COUNTRYCODE_TEMP = country.short_name;
	                                }
	                            }
	                        }
		                 setLocalStorageData("Address",tempPlacesAddress);
		             }
		         });
			  $scope.locationList.push({
				id:1, lat:Lat-0.02, lng:Lng-0.01, title:"deepal 1"
			  });
			  $scope.locationList.push({
				id:2, lat:Lat-0.04, lng:Lng-0.04, title:"sdfsfsd 2"
			  });
			  $scope.locationList.push({
				id:3, lat:Lat-0.054, lng:Lng-0.035, title:"234243423234 3"
			  });
			  $scope.locationList.push({
				id:4, lat:Lat+0.02, lng:Lng+0.02, title:"Place 4"
			  });
			  $scope.locationList.push({
				id:5, lat:Lat+0.013, lng:Lng+0.054, title:"Place 5"
			  });
			  $scope.locationList.push({
				id:6, lat:Lat+0.034, lng:Lng+0.063, title:"Place 6"
			  });
			  
			  $scope.loadMap(Lat, Lng);
			  
			  $ionicLoading.hide();
					},
			function(error) {
			  $ionicLoading.hide();
			  //alert('Unable to get location: ' + error.message);
			}, options);
			
	    };

	  
	  $scope.locationList = [{id:1, lat:51.5093510, lng:-0.1377580, title:"Place 1"}, 
							 {id:2, lat:51.4943510, lng:-0.1477580, title:"Place 2"}, 
							 {id:3, lat:51.4923510, lng:-0.1677580, title:"Place 3"},
							 {id:4, lat:51.5513510, lng:-0.1077580, title:"Place 4"}, 
							 {id:5, lat:51.4773510, lng:-0.1577580, title:"Place 5"}, 
							 {id:6, lat:51.4877510, lng:-0.1277580, title:"Place 6"}						 
							 ];
	  $scope.infoBoxList = [];
	  $scope.markerList = [];
	  
	  console.log($scope.locationList[0].lat + ", " + $scope.locationList[0].lng);
	   // Define item buttons
	  $scope.itemButtons = [{
		text: 'Delete',
		type: 'button-assertive',
		onTap: function(item) {
		  $scope.removeItem(item);
		}
	  }, {
		text: 'Edit',
		type: 'button-calm',
		onTap: function(item) {
		  $scope.showEditItem(item);
		}
	  }];
	  
	  $ionicModal.fromTemplateUrl('templates/popup.html', {
	    scope: $scope
	  }).then(function(modal) {
	    $scope.popup = modal;
	  });
	  
	  $ionicModal.fromTemplateUrl('templates/login.html', {
	    scope: $scope
	  }).then(function(modal) {
	    $scope.login = modal;
	  });
	  
	  $ionicModal.fromTemplateUrl('templates/PinPopUp_EntityType_4.html', {
		    scope: $scope
		  }).then(function(modal) {
		    $scope.PinPopUpE4 = modal;
		  });
	  
	   $ionicModal.fromTemplateUrl('templates/register.html', {
	    scope: $scope
	  }).then(function(modal) {
	    $scope.register = modal;
	  });
	   
	   //open pin popup
	   $ionicModal.fromTemplateUrl('templates/PinPopUp.html', {
		    scope: $scope
		  }).then(function(modal) {
		    $scope.PinPopUp = modal;
		  });
		   
	   //open pin popup Entity Type 1
	   $ionicModal.fromTemplateUrl('templates/PinPopUp_EntityType_1.html', {
		    scope: $scope
		  }).then(function(modal) {
		    $scope.PinPopUpE1 = modal;
		  });
	   
	   $ionicModal.fromTemplateUrl('templates/SOS.html', {
		    scope: $scope
		  }).then(function(modal) {
		    $scope.SOS = modal;
		  });
	   
	   $ionicModal.fromTemplateUrl('templates/tempPinPopUp_EntityType_1.html', {
		    scope: $scope
		  }).then(function(modal) {
		    $scope.tempPinPopUpE1 = modal;
		  });
	   
	   $ionicModal.fromTemplateUrl('templates/PinPopUp_EntityType_8.html', {
		    scope: $scope
		  }).then(function(modal) {
		    $scope.tempPinPopUpE8 = modal;
		  });
	   
	   $ionicModal.fromTemplateUrl('templates/PinPopUp_EntityType_16.html', {
		    scope: $scope
		  }).then(function(modal) {
		    $scope.tempCabPinPopUpE16 = modal;
		  });
	   
	   $ionicModal.fromTemplateUrl('templates/BusinessBooking_16.html', {
		    scope: $scope
		  }).then(function(modal) {
		    $scope.tempPinPopUpE16 = modal;
		  });
	   
	  // Triggered in the login modal to close it
	  $scope.closePopup = function() {
	    $scope.popup.hide();
	  };
	  
	  $scope.closeLogin = function() {
	    $scope.login.hide();
	  };
	  
	  $scope.closeSOS = function() {
		    $scope.SOS.hide();
		  };


	  $scope.closePinPopUpE1 = function() {
	    $scope.PinPopUpE1.hide();
	  };
	  
	  $scope.closePinPopUpE4 = function() {
		    $scope.PinPopUpE4.hide();
		  };
	  
	  $scope.closetempPinPopUpE1 = function() {
		    $scope.tempPinPopUpE1.hide();
		  };
		 
	  $scope.closetempPinPopUpE8 = function() {
		    $scope.tempPinPopUpE8.hide();
		  };
	
	  $scope.closetempPinPopUpE1 = function() {
		    $scope.tempPinPopUpE1.hide();
		  };
		  
	  $scope.closetempPinPopUpE16 = function() {
		    $scope.tempPinPopUpE16.hide();
		  };
		  $scope.closetempCabPinPopUpE16 = function() {
			    $scope.tempCabPinPopUpE16.hide();
			  };  
	  $scope.closeRegister = function() {
		    $scope.register.hide();
		  };
	  
	  // Open the login modal
	  $scope.openPopup = function() {
	  $(".DivAfterLoggedIn,.DivBeforeLoggedIn").hide();
	  $scope.popup.show();
	  	if(getLocalStorageData("PersonId") != undefined && parseInt(getLocalStorageData("PersonId")) > 0 )
	  		$(".DivAfterLoggedIn").show();
		else
			$(".DivBeforeLoggedIn").show();
		    
	  };
	  // Open the login modal
	  $scope.openLogin = function() {
		$scope.closePopup();
	    $scope.login.show();
	  };
	  
	  // Open the sos modal
	  $scope.openSOS = function() {
		$scope.closePopup();
	    $scope.SOS.show();
	    ///
		    $(".DivSoicalMedia").hide();
		    if (GLOB_CURRENT_DriverId != 0 && GLOB_CURRENT_BusinessId != 0)
		        $(".DivSoicalMedia").show();
		    if (GLOB_IS_LOCATION_TRACKING_CONTINUE == true) {
		        $(".btnStopTracking").show();
		        $(".btnStartTracking").hide();
		        $(".ImgPersonSOSUploadData").attr('onclick', 'javascript:OpenSOSPersonTrackingFileUploadOptions()').css('cursor', 'pointer');
		        $(".ImgSOSPerson").parent('.imgRounded').addClass('image-container');
		        $(".ImgSOSPerson").parent('.imgRounded').append('<div class="after"><img src="https://www.safecab.com/DATA/images/slr_camera2.png" style="margin-top:15px;" /></div>');
		        //ImageHoverProperty('47', '20');
		    }
		    else {
		        $(".btnStopTracking").hide();
		        $(".btnStartTracking").show();
		        $(".ImgPersonSOSUploadData").attr('onclick', 'javascript:OpenSOSPersonTrackingFileUploadOptions()').css('cursor', 'pointer');
		    }
		    var tempIds = GLOB_CURRENT_BusinessId + "_" + GLOB_CURRENT_DriverId + "_"+getLocalStorageData("PersonId");
		    $(".ImgSOSPerson").attr("src", ImageWebServicesUrl + tempIds);

		    $(".SOSPersonCurrentLocation").html(getLocalStorageData("Address").toString().replace(/\"/g,''));
		    //var tempLeft = (CONF_SCREENWIDTH - $(".DivSOSParentPopUp").width()) / 2;
		    //$(".DivSOSParentPopUp").css({ "left": tempLeft + "px", "top": "100px" }).show('slow');
	  };
	//Open the login modal
	  $scope.openPinPopUp = function() {
		$scope.closePopup();
	    $scope.PinPopUp.show();
	  };
	  
	  
	//Open the Pin Pop-up_Entity Type1 modal
	  $scope.openPinPopUpE1 = function() {
	    $scope.PinPopUpE1.show();
	  };
	  
	  $scope.openPinPopUpE4 = function() {
		    $scope.PinPopUpE4.show();
		  };
	  
	  $scope.opentempPinPopUpE8 = function() {
		    $scope.tempPinPopUpE8.show();
		  };
		  
	  $scope.opentempPinPopUpE1 = function() {
		    $scope.tempPinPopUpE16.show();
		  };  
	  $scope.opentempPinPopUpE1 = function() {
		    $scope.tempPinPopUpE1.show();
		  };
	  $scope.opentempPinPopUpE16 = function() {
		  $scope.closePopup();
		    $scope.tempPinPopUpE16.show();
		  };
		  
	  $scope.opentempCabPinPopUpE16 = function() {
		  $scope.closePopup();
		    $scope.tempCabPinPopUpE16.show();
		  };
		  
	  $scope.closePinPopUp = function() {
		    $scope.PinPopUp.hide();
	};

	  // Open the login modal
	  $scope.logout = function() {
	    window.localStorage.clear();
	    GLOB_CURRENT_PersonId = -1;
	    $scope.closePopup();
	    var earl = '/map.html';
	    $location.path(earl);
	  };
	    // Open the Registerlogin modal
	  $scope.openRegister = function() {
		$scope.closePopup();
	    $scope.register.show();
	  };
	      
	  /*notificationService.notifyWithDefaults({
			text: 'Regiteration Success!!!',
			delay: 1000,
		});*/
	  
		$scope.showPopup = false;
		$scope.currentIdx = -1;
		$scope.bCalled = false;
		$scope.num = 0;
		$scope.otherNum = 0;
		$scope.trackNum = 0;
		$scope.trackCnt = 0;
		
		
		$scope.loadMap = function(lat, lng) {
			$ionicLoading.show({template: 'Loading...'});
			/*setTimeout(function () {
				//$scope.openPinPopUpE1();
				$scope.opentempPinPopUpE1();
				$scope.openPinPopUpE4();
				$scope.opentempPinPopUpE8();
				$scope.opentempPinPopUpE16();
				$scope.opentempCabPinPopUpE16();
					setTimeout(function () {
					  //$scope.closePinPopUpE1();
					  $scope.closetempPinPopUpE1();
					  $scope.closePinPopUpE4();
					  $scope.closetempPinPopUpE8();
					  $scope.closetempPinPopUpE16();
					  $scope.closetempCabPinPopUpE16();
				},1);
			},2000);
			*/
				console.log("------loadMap------------");
				var myOptions = {
					zoom: 10,
					center: new google.maps.LatLng(lat, lng),
					mapTypeId: google.maps.MapTypeId.ROADMAP,
					streetViewControl: true,
					streetViewControlOptions: {
						position: google.maps.ControlPosition.LEFT_CENTER
					}
				};
				map = new google.maps.Map(document.getElementById('map'),   myOptions);
				var tempPersonId = -1;
				if(getLocalStorageData("PersonId") != undefined && parseInt(getLocalStorageData("PersonId")) > 0 && getLocalStorageData("PersonId") != "null" && getLocalStorageData("PersonId") != null){
					tempPersonId = getLocalStorageData("PersonId");
					var POIControlDiv = document.createElement('div');
			        var poiControl = new POIControl(POIControlDiv, map);

			        POIControlDiv.index = 1;
			        map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(POIControlDiv);

				}
				else{
					tempPersonId = -1;
				}
					 GLOB_MAPPINGSEA_PARA.RequestorPersonId = tempPersonId;
					 GLOB_MAPPINGSEA_PARA.Accuracy = "0";//currentGeoAccuracy;
					 GLOB_MAPPINGSEA_PARA.POVLongitude ="-0.33243800000002466";// map.getCenter().lng();
				     GLOB_MAPPINGSEA_PARA.POVLatitude = "52.022583000000004";//map.getCenter().lat();
				     GLOB_MAPPINGSEA_PARA.Longitude ="-0.332438000000006"; //currentGeoLongitude;
				     GLOB_MAPPINGSEA_PARA.Latitude ="52.022583000000004";// currentGeoLatitude; 
				     GLOB_MAPPINGSEA_PARA.NorthEastLongitude = "-0.18000269726564966";//ne.lng();
				     GLOB_MAPPINGSEA_PARA.NorthEastLatitude = "52.0823307439586";//ne.lat();
				     GLOB_MAPPINGSEA_PARA.SouthWestLongitude = "-0.48487330273439966"; //sw.lng();
				     GLOB_MAPPINGSEA_PARA.SouthWestLatitude = "51.962755338171";//sw.lat();
				     GLOB_MAPPINGSEA_PARA.PersonId = tempPersonId;
				     console.log(JSON.stringify(GLOB_MAPPINGSEA_PARA));
				$scope.customersController = function ($scope,$http) {
			  	var TempData = {"RequestorBusinessId":0,"RequestorDriverId":0,"RequestorPersonId":tempPersonId,"RequestorBookingId":0,"BusinessId":0,"DriverId":0,"PersonId":tempPersonId,"BookingId":0,"Longitude":"-0.332438000000006","Latitude":"52.022583000000004","Accuracy":0,"POVLongitude":-0.33243800000002466,"POVLatitude":52.022583000000004,"NorthEastLongitude":-0.18000269726564966,"NorthEastLatitude":52.0823307439586,"SouthWestLongitude":-0.48487330273439966,"SouthWestLatitude":51.962755338171,"RequiredDateTime":null,"FemaleDriverRequired":false,"DisabledAccessRequired":false,"TimeAdjustment":0,"FavouritesOnly":false,"VehicleTypesRequired":255,"MaxEstimatedCost":0,"RegistrationTypesRequired":7,"NumberRequired":20,"PusherAware":1};
				//var TempData = {"RequestorBusinessId":0,"RequestorDriverId":0,"RequestorPersonId":"15","RequestorBookingId":0,"BusinessId":0,"DriverId":0,"PersonId":15,"BookingId":1213,"Longitude":70.76942950000002,"Latitude":22.2935023,"Accuracy":547,"POVLongitude":70.76257229999993,"POVLatitude":22.29690280000001,"NorthEastLongitude":70.91500760273436,"NorthEastLatitude":22.38676953362899,"SouthWestLongitude":70.61013699726561,"SouthWestLatitude":22.20697822891824,"RequiredDateTime":"26 Mar 2015 3:19 PM","FemaleDriverRequired":false,"DisabledAccessRequired":false,"TimeAdjustment":0,"FavouritesOnly":false,"VehicleTypesRequired":2,"MaxEstimatedCost":0,"RegistrationTypesRequired":7,"NumberRequired":30,"PusherAware":1}
				//var TempData = {"RequestorBusinessId":0,"RequestorDriverId":0,"RequestorPersonId":"15","RequestorBookingId":0,"BusinessId":16022,"DriverId":0,"PersonId":15,"BookingId":1214,"Longitude":70.7747722,"Latitude":22.2934862,"Accuracy":971,"POVLongitude":-0.33447920000003073,"POVLatitude":52.017640600000014,"NorthEastLongitude":-0.29637037431643876,"NorthEastLatitude":52.032586678115955,"SouthWestLongitude":-0.37258802568362626,"SouthWestLatitude":52.002689526800225,"RequiredDateTime":"26 Mar 2015 7:18 PM","FemaleDriverRequired":false,"DisabledAccessRequired":false,"TimeAdjustment":0,"FavouritesOnly":false,"VehicleTypesRequired":255,"MaxEstimatedCost":0,"RegistrationTypesRequired":7,"NumberRequired":30,"PusherAware":1}
			  	var data = GLOB_ConvertDataDBCompit(TempData,"St_MappingSea");
			  	$http.post("http://safecabmobilewebservice.azurewebsites.net/api/Service",data)
			  	.success(function(response) {
			  		StMappingSeaData = JSON.parse(response);
			  		$ionicLoading.hide();
			  		// loading map pins from the mapping sea	
			  			$scope.map = map;
			  			GLOB_map = map;
			  			//var tempmappingSeaData = $.grep(StMappingSeaData,function(e){return (e.EntityType == 16 )});
			  			//StMappingSeaData = tempmappingSeaData; 
				

				var input = document.getElementById('txtSearchaddress');
				var autocomplete = new google.maps.places.Autocomplete(input);
				var streetView = map.getStreetView();
				
				
				var latlngbounds = new google.maps.LatLngBounds();
				for(i=0;i<StMappingSeaData.length; i++) {
					lat = StMappingSeaData[i].Latitude;
					lng = StMappingSeaData[i].Longitude;
					title = StMappingSeaData[i].EntityTitle;
					//var tempUserPinPopUpData =  getMapPopupDescriptionDiv(StMappingSeaData[i]);
					var latlng	 = new google.maps.LatLng(lat, lng);
					var tempMapPins = GLOB_GetPinImage(StMappingSeaData[i]);
					var BusinessId = StMappingSeaData[i].BusinessId;
					var DriverId = StMappingSeaData[i].DriverId;
					var PersonId = StMappingSeaData[i].PersonId;
					var BookingId = StMappingSeaData[i].BookingId;
					var RowNumber = StMappingSeaData[i].RowNumber;
					var EntityType = StMappingSeaData[i].EntityType;
					var tempid = BusinessId + "_" + DriverId + "_" + PersonId + "_" + BookingId + "_" + RowNumber;
					if (StMappingSeaData[i].Favourite == true && (EntityType == 1 || EntityType == 2)) {
			            GLOB_ArrayFavouritesMarkers.push(BusinessId + "_" + DriverId);
			        }
					
					marker = new google.maps.Marker({
						  position: new google.maps.LatLng(lat, lng),
						  map: $scope.map,
						  icon: tempMapPins, //'img/Map_pins/black_pin.png'
						  id: tempid,
				          title: StMappingSeaData[i].EntityTitle,
				          AdvertId: StMappingSeaData[i].AdvertId,
				          EntityType: StMappingSeaData[i].EntityType
					});
					var CurrentPosition = StMappingSeaData[i].CurrentPosition;
			        var LocationTracking = StMappingSeaData[i].LocationTracking;
					markersArray[tempid] = marker;
					 if (CurrentPosition == 1 && LocationTracking == 1)
				            GLOB_IS_LOCATION_TRACKING_CONTINUE = true;
					latlngbounds.extend(latlng);				
					// creating the div for the infobox
					  var boxText = document.createElement("div");
					  var infoOptions = {
							content: boxText,
							disableAutoPan: false,
							maxWidth: 0,
							pixelOffset: new google.maps.Size(-75, -100),
							zIndex: null,
							 boxStyle: {
								opacity: 1,
								width: "150px"
							},
							closeBoxMargin: "10px 2px 2px 2px",
							infoBoxClearance: new google.maps.Size(1, 1),
							closeBoxURL: "",
							isHidden: false,
							pane: "floatPane",
							enableEventPropagation: false
					 };
					$scope.markerList[i] = marker;	
					id = i;
					
					if (!$scope.infoBoxList[id]) {
						var infoBox = new InfoBox(infoOptions);
						$scope.infoBoxList[id] = infoBox
						
						google.maps.event.addListener($scope.infoBoxList[id], 'domready', function(a, b, c, d) {
							$scope.$apply(function(){
								//console.log("domready");
								//console.log($scope.currentIdx);
								for (h = 0; h < $scope.infoBoxList.length; h++) {
									$compile(document.getElementById("popup_"+h))($scope)
								}						
							});
						});
					}
					
				  $scope.showDetailPopup = function(idx) {
						$scope.showPopup = !$scope.showPopup;		 
				  }

					// marker action (click)
					google.maps.event.addListener(marker, "click", (function (marker, i) {
						return function () {
							 var tempCurrentMarkerAddress, geocoder;
					            var latlng = new google.maps.LatLng(marker.getPosition().lat(), marker.getPosition().lng());
					            geocoder = new google.maps.Geocoder();
					            geocoder.geocode({ 'latLng': latlng }, function (results, status) {
					                if (status == google.maps.GeocoderStatus.OK) {
					                    if (results[1]) {
					                        tempCurrentMarkerAddress = results[1].formatted_address;
					                        StMappingSeaData[i].EntityAddress = tempCurrentMarkerAddress;
					                        if(parseInt(StMappingSeaData[i].EntityType) == 1){
					                        	var getDivCabData = getMapPopupDescriptionDiv(StMappingSeaData[i],$scope,$http, $ionicLoading);
					                        }
					                        else if (parseInt(StMappingSeaData[i].EntityType) == 4) {
					                        	var getDivPersonPinData = getPinPopUpContent_4(StMappingSeaData[i],$scope,$http);
					                        }
					                        else if (parseInt(StMappingSeaData[i].EntityType) == 8) {
					                        	var getDivPersonPin_8_Data = getPinPopUpContent_8(StMappingSeaData[i],$scope,$http);
					                        }
					                        else if (parseInt(StMappingSeaData[i].EntityType) == 16) {
					                        	var getDivPersonPin_16_Data = getPinPopUpContent_16(StMappingSeaData[i],$scope,$http);
					                        }
					                        
					                    }
					                } 
					        });
							
						};
					})(marker, i));		
				}
				
				
				map.fitBounds(latlngbounds);	
				var infowindow = new google.maps.InfoWindow();

				google.maps.event.addListener(autocomplete, 'place_changed', function () {
					infowindow.close();
					var place = autocomplete.getPlace();
					$scope.autocompletelat = place.geometry.location.lat();
					$scope.autocompletelng = place.geometry.location.lng();
					console.log("Data selectd:" + place);

							$scope.goTo();
				});
				
				google.maps.event.addListener($scope.map, "click", function () {
					for (h = 0; h < $scope.infoBoxList.length; h++) {
						$scope.infoBoxList[h].close();
					}
					$scope.showPopup = false;
				});
				
				 google.maps.event.addListener(map, 'dblclick', function (event) {
					$scope.showPopup = false;
					if(getLocalStorageData("PersonId") > 0){
						var tempLiveMapGeocoder = new google.maps.Geocoder();
						tempLiveMapGeocoder.geocode({ 'latLng': event.latLng }, function (results) {
			                if (results[1]) {
			                    tempLiveMapPOItlong = results[1].formatted_address;
			                    loadPlaceMarker(event.latLng, tempLiveMapPOItlong,$scope);
			                }
						});
					}
				 });	
			
				
				$ionicLoading.hide();
			  		// 
				});
			}
		}
	  $scope.hideAllInfoWindow  = function() {
		$scope.mapControl.hideInfoWindow('info1');
		$scope.hideInfoWindow('info2');
		$scope.hideInfoWindow('info3');
		$scope.hideInfoWindow('info4');
		$scope.hideInfoWindow('info5');
		$scope.hideInfoWindow('info6');
	  }
	  

	  $scope.goTo = function() {

		$scope.loadMap($scope.autocompletelat, $scope.autocompletelng);
	  }
	  
	    $scope.IsTestWebServices = function() {
				console.log('Now in IsTestWebServices...');
				$http.get("http://www.w3schools.com/website/Customers_JSON.php")
	  			.success(function(response) {$scope.names = response;});
			}
	  
	  $scope.noMoreItemsAvailable = false;
	  
	  $scope.friends = [];
	  //$scope.movies = MovieService.all();
	  $(".DivFriendNoDataFound").hide();
	  if(getLocalStorageData("PersonId") != undefined && parseInt(getLocalStorageData("PersonId")) > 0){
	  		$scope.friends = FriendService.allSync($http,$scope);
		}
		else
		{
			$(".DivFriendNoDataFound").show();
	  		$scope.title = "Completely Random Collection Of Movies";
	  	}

	  // Method called on infinite scroll
	  // Receives a "done" callback to inform the infinite scroll that we are done
	  $scope.loadMore = function() {
		console.log('Loading more!');
		$timeout(function() {
		  $scope.friends.push({
			id: 'tt0114814',
			title: 'Usual Suspects',
			birth: '1995',
			description: 'A boat has been destroyed, criminals are dead, and the key to this mystery lies with the only survivor and his twisted, convoluted story beginning with five career crooks in a seemingly random police lineup.',
			name: 'Bryan Singer',
			rating: 8.3,
			img: 'c10.png'
		  });

		  $scope.$broadcast('scroll.infiniteScrollComplete');
		  $scope.$broadcast('scroll.resize');
		}, 1000);
	  }  
	  
	  $scope.onItemDelete = function(friend) {
	  	$ionicLoading.show({template: 'Loading...'});
	    $scope.friends.splice($scope.friends.indexOf(friend), 1);
	    $ionicLoading.hide();
	  };
	  
	  $scope.onItemEdit = function(friend) {
	  
		$scope.$broadcast('scroll.infiniteScrollComplete');
		$ionicLoading.show({template: 'Loading...'});
		url ="#/app/friendlist/" + friend.id;
		$window.location.href = url;	
		$ionicLoading.hide();
	  };
})
.controller('PlacePinPopUpInController', function($scope, $rootScope, PlacesService, $timeout, $ionicLoading,  $interval,$http) {
	
})



.controller('FriendlistCtrl', function($scope, $rootScope, FriendService,PlacesService, $timeout, $ionicLoading,  $interval,$http) {
	$scope.closePopup();
	$scope.onSwipeRight = function() {
		console.log("onSwipeRight");
	};
	
	$scope.onSwipeLeft = function() {
		console.log("onSwipeLeft");
	};

	
	$scope.bRefresh = true;
	$scope.clock = null;
	
	$rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams){
		$scope.clock = null;
        if(toState.url === "/friendlist") {
			$scope.bRefresh = true;
		}else{
			$scope.bRefresh = false;
		}
    });
	
  $scope.data = {
    showDelete: false
  };
  
  $scope.noMoreItemsAvailable = false;
  
  $scope.friends = [];

 	
  
  $(".DivFriendNoDataFound").hide();
  if(getLocalStorageData("PersonId") != undefined && parseInt(getLocalStorageData("PersonId")) > 0){
  		$scope.friends = FriendService.allSync($http,$scope);
  		$scope.closePopup();
	}
	else
	{
		$(".DivFriendNoDataFound").show();
  		$scope.title = "Completely Random Collection Of Movies";
  	}

  $scope.title = "friendlist";

  // Method called on infinite scroll
  // Receives a "done" callback to inform the infinite scroll that we are done
  $scope.loadMore = function() {
	console.log('Loading more!');
	$timeout(function() {
	  $scope.friends.push({
		id: 'tt0114814',
		title: 'Usual Suspects',
		birth: '1995',
		description: 'A boat has been destroyed, criminals are dead, and the key to this mystery lies with the only survivor and his twisted, convoluted story beginning with five career crooks in a seemingly random police lineup.',
		name: 'Bryan Singer',
		rating: 8.3,
		img: 'c10.png'
	  });

	  $scope.$broadcast('scroll.infiniteScrollComplete');
	  $scope.$broadcast('scroll.resize');
	  
	}, 1000);
  }
   
  
   // List Toggles
	$scope.editBtnText = 'Edit';
	$scope.toggleDelete = function() {
	  $scope.isDeletingItems = !$scope.isDeletingItems;
	  $scope.isReorderingItems = false;
	  $scope.editBtnText = ($scope.isDeletingItems ? 'Done' : 'Edit');
	};
	$scope.reorderBtnText = 'Reorder';
	$scope.toggleReorder = function() {
	  $scope.isReorderingItems = !$scope.isReorderingItems;
	  $scope.isDeletingItems = false;
	  $scope.reorderBtnText = ($scope.isReorderingItems ? 'Done' : 'Reorder');
	};


	// Item Methods/Properties
	$scope.deleteItem = function(item, index) {
	  console.log('onDelete from the "item" directive on-delete attribute. Lets not delete this item today ok!', item, index);
	};
	
	$scope.deleteListItem = function(item, index) {
	  console.log('onDelete from the "list" on-delete attribute', item, index);
	  $scope.friends.splice(index, 1);
	};	
	
	
	$scope.reorderItem = function(item, fromIndex, toIndex) {
		//Move the item in the array
		$scope.friends.splice(fromIndex, 1);
		$scope.friends.splice(toIndex, 0, item);
    };
	
	$scope.showReorder = false;
    $scope.toggleReorder = function () { 
		$scope.showReorder = !$scope.showReorder; 
	};
	
	$scope.doRefresh = function() {
		console.log('Refreshing!');
		$ionicLoading.show({
		  template: 'Refreshing...'
		});
		$timeout( function() {

		  //Stop the ion-refresher from spinning
		  $scope.$broadcast('scroll.refreshComplete');
		  $ionicLoading.hide();
		}, 1000);
	}
	
    $scope.clock = $interval( function() {
		if($scope.bRefresh == false)
			return ;
		$ionicLoading.show({
		  template: 'Refreshing...'
		});
		console.log("------------refreshing----------------");
		console.log("------------11111----------------");
		/*$timeout(function() {
		  $scope.friends.push({
			id: 'tt0114814',
			title: 'Usual Suspects',
			birth: '1995',
			description: 'A boat has been destroyed, criminals are dead, and the key to this mystery lies with the only survivor and his twisted, convoluted story beginning with five career crooks in a seemingly random police lineup.',
			name: 'Bryan Singer',
			rating: 8.3,
			img: 'c10.png'
		  });

		  $scope.$broadcast('scroll.infiniteScrollComplete');
		  $scope.$broadcast('scroll.resize');
		  $ionicLoading.hide();
		}, 2000);	*/	
		
		$timeout(function() {
			$scope.clock = null;
			$ionicLoading.hide();
		}, 1000);
    }, 31000);	
	
})

// Controller that shows more detailed info about a friend
.controller('FriendCtrl', function($scope, $stateParams, FriendService, $window, $ionicLoading, $timeout) {
  
  $scope.friend = FriendService.get($stateParams.friendId);
  $scope.title = "Friend Info";
  $scope.initRate = 5;
  $scope.rating = 4;
  $scope.data = {
    rating : 4,
    max: 4
  }

  $scope.rateClick = function () {
  	console.log($scope.initRate);
	url ="#/app/friendlist/friend/" + $scope.friend.id;
	//alert(url);
	$window.location.href = url;	
  }
  
 $scope.$watch('data.rating', function() {
  alert('rate value is: '+$scope.data.rating);
 });  
  $scope.onSwipeLeft = function () {
	//alert("swipeleft");
  }
    $scope.onSwipeRight = function () {
	url ="#/app/friendlist";
	$window.location.href = url;	
	//alert("swiperight");
  }
  
})

// Controller that shows more detailed info about a friend
.controller('CommentCtrl', function($scope, $stateParams, FriendService, $window, $ionicLoading, $timeout) {

  
  $scope.friend = FriendService.get($stateParams.commentId);
  $scope.title = "Friend Info";  
  
  $scope.onSwipeRight = function() {
	$window.history.back();
  }
})

// Controller that shows profile
.controller('ProfileCtrl', function($scope,$http, $stateParams, $ionicLoading, $timeout) {
$(".DivPersonNoDataFound,.DivPassengerForm").hide();
if(getLocalStorageData("PersonId") != undefined && parseInt(getLocalStorageData("PersonId")) > 0 && getLocalStorageData("PersonId") != "null" && getLocalStorageData("PersonId") != null){

	$(".DivPassengerForm").show();
  	var tempPersonData = "";
	var temp_st_PersonSel_Para = st_PersonSel_Para;
	temp_st_PersonSel_Para.PersonId = getLocalStorageData("PersonId");
	var data = GLOB_ConvertDataDBCompit(temp_st_PersonSel_Para,"st_PersonSel");
	$ionicLoading.show({template: 'Loading...'});
	$http.post("http://safecabmobilewebservice.azurewebsites.net/api/Service",data)
		.success(function(resUserData) {
		$ionicLoading.hide();
		tempPersonData = JSON.parse(resUserData);
		tempPersonData = tempPersonData[0];
		  $scope.profileInfo = [];
		  $scope.profileInfo.name = tempPersonData.FullName;
		  $scope.profileInfo.email = tempPersonData.EmailAddress;
		  $scope.profileInfo.phone = tempPersonData.Telephone;
		  $scope.profileInfo.personImage = ImageWebServicesUrl + getLocalStorageData("PersonId");
		  $scope.profileInfo.passcode = tempPersonData.PassCode;
		  $scope.profileInfo.DOB = tempPersonData.DateOfBirth.toString();
		  $scope.profileInfo.dateset = tempPersonData.DateSet;
		  
		  //$scope.friend = FriendService.get($stateParams.commentId);
		  $scope.title = "Profile";
	});
    }
    else{
    	$(".DivPersonNoDataFound").show();
    }
    	
})
.controller('AddFriendController', function($scope,$http,FriendService,$timeout) {
	$scope.seleFriendopn = function() {
		var tempSeletedValue = objData.value;

	 	$scope.test123();
	}
	$scope.doAddFriend = function() {
		var FullName = document.getElementById("txtFullName").value;
    	var Telephone = document.getElementById("txtTelephone").value;
    	var Email = document.getElementById("txtEmail").value;
    	$(".DivShowFriendsuggestionwindow").hide();
    	$ionicLoading.show({template: 'Loading...'});
    	var temp_st_PersonQuickSea_Para = st_PersonQuickSea_Para;
        temp_st_PersonQuickSea_Para.Fullname = FullName;
        temp_st_PersonQuickSea_Para.EmailAddress = Email;
        temp_st_PersonQuickSea_Para.Telephone = Telephone;
        var data = GLOB_ConvertDataDBCompit(temp_st_PersonQuickSea_Para,"st_PersonQuickSea");
        $http.post("http://safecabmobilewebservice.azurewebsites.net/api/Service",data)
		.success(function(response) {
			$ionicLoading.hide();
			var tempFriendData = JSON.parse(response);
			if(tempFriendData.length > 0)
			{
				for(i=0;i<tempFriendData.length;i++)
				{
					var tempFrndName = tempFriendData[i].FullName;
					var tempPersonId = tempFriendData[i].PersonId;  
					var tempdata = "<option value='"+tempPersonId+"'>"+tempFrndName+"</option>";
					$(".seleFriendData").append(tempdata);
				}
				$(".DivShowFriendsuggestionwindow").show();
			}
			else{
					/*
					var temp_st_FriendIns_Para = st_FriendIns_Para;
			        temp_st_FriendIns_Para.PersonId = getLocalStorageData("PersonId");
			        temp_st_FriendIns_Para.FullName = FullName;
			        temp_st_FriendIns_Para.Telephone = Telephone;
			        temp_st_FriendIns_Para.EmailAddress = Email;
			        var data = GLOB_ConvertDataDBCompit(temp_st_FriendIns_Para,"st_FriendIns");
			        $http.post("http://safecabmobilewebservice.azurewebsites.net/api/Service",data)
					.success(function(resFriend) {
						if(parseInt(resFriend) > 0)
							$(".frmAddFriend")[0].reset();
							alert("your Friend Contact Details added successfully.");
					});
					*/	
			}
		});
	}
	
 })
 .controller('RegisterController', function($scope,$http,$timeout,$ionicLoading) {
 	$scope.callPhoneService = function(){
	 
	 	$scope.registerData = {
	 		telephone : "",
	 		fullname : "",
	 		email : "",
	 		DOB : ""
	 	};

	  	if($scope.registerData.telephone.toString().length < 5)
	  		return ;

	    var url  = "https://external.safecab.com/ValidationService.svc/ValidatePhone/" + $scope.registerData.telephone + "/GB";

	    $ionicLoading.show({template: 'Loading...'});
	  	$http.get(url).
		  success(function(data, status, headers, config) {
		  	$ionicLoading.hide();
		    alert(data);
		  }).
		  error(function(data, status, headers, config) {
		  	$ionicLoading.hide();
		  });

  }
     
    $scope.doRegister = function() {
    var FullName = $scope.registerData.fullname;//document.getElementById("txtFullName").value;
    var Telephone = $scope.registerData.telephone;//document.getElementById("txtTelephone").value;
    var Email = $scope.registerData.email;//document.getElementById("txtEmail").value;
    var DOB = $scope.registerData.DOB;//document.getElementById("txtDOB").value; 
    		var temp_st_PersonIns_Para = st_PersonIns_Para;
            temp_st_PersonIns_Para.EmailAddress = Email;
            temp_st_PersonIns_Para.Telephone = Telephone;
            temp_st_PersonIns_Para.FullName = FullName;
            temp_st_PersonIns_Para.DateOfBirth = "1 Jan 2015";//DOB;
            temp_st_PersonIns_Para.PersonPhoto = "null";
            var temp_st_PersonSea_Para = st_PersonSea_Para;
            temp_st_PersonSea_Para.EmailAddress = Email;
            temp_st_PersonSea_Para.Telephone = Telephone;
            var data = GLOB_ConvertDataDBCompit(temp_st_PersonSea_Para,"st_PersonSea");
            $ionicLoading.show({template: 'Loading...'});
            $http.post("http://safecabmobilewebservice.azurewebsites.net/api/Service",data)
		  	.success(function(response) {
		  		$ionicLoading.hide();
		  		var tempIsEmailAlreadyAdded = JSON.parse(response).length;
		  		if(parseInt(tempIsEmailAlreadyAdded) > 0){
		  			alert("Email already existest");
		  		}
		  		else{
		  			var data = GLOB_ConvertDataDBCompit(temp_st_PersonIns_Para,"st_PersonIns");
				  	$http.post("http://safecabmobilewebservice.azurewebsites.net/api/Service",data)
				  	.success(function(response) {
				  	alert("You are successfully registered and Mobile verification code sent to your mobile.");
				  		$timeout(function() {
		      				$scope.closeRegister();
		    			}, 1000);
				  	}).error(function(data, status, headers, config) {
		    				alert(data);
		  			});
		  		}
		  		
		  	}).error(function(data, status, headers, config) {
		  				$ionicLoading.hide();
    					alert(data);
  			});
  };
}) 
 .controller('PassengerLoggedInController', function($scope, $http,$timeout,$ionicLoading,$location) {
 	 $scope.doLogin = function() {
     var UserName = document.getElementById("txtUserName").value;
     var Passcode = document.getElementById("txtPasscode").value;
     
     var temp_st_PersonLoginSel_Para = st_PersonLoginSel_Para;
     temp_st_PersonLoginSel_Para.EmailAddress = UserName;
     temp_st_PersonLoginSel_Para.Telephone = "";
     temp_st_PersonLoginSel_Para.PassCode = Passcode;
     
     $(".DivUserLoggedMessage").hide();
     $ionicLoading.show({
	  template: 'Loading...'
	});
     var data = GLOB_ConvertDataDBCompit(temp_st_PersonLoginSel_Para,"st_PersonLoginSel");
     $http.post("http://safecabmobilewebservice.azurewebsites.net/api/Service",data)
	 .success(function(response) {
	 	$ionicLoading.hide();
	  if (response["result"] != null){
               $(".DivUserLoggedMessage").html(response["result"]).show();
       }
      else{
      			var tempUserData =JSON.parse(response);
      			tempUserData = tempUserData[0];
      			setLocalStorageData("PersonId", tempUserData["PersonId"]);
      			GLOB_CURRENT_PersonId = tempUserData["PersonId"];
      			setLocalStorageData("EmailAddress", UserName);
      			setLocalStorageData("FullName", tempUserData["Fullname"]);
      			setLocalStorageData("Telephone", "");
               	//$timeout(function() {
					$scope.closeLogin();
            	    //$location.path("/app/AfterLoggedInmap");
            	    $location.path("/app/profile");
            	    var temp_st_PersonSel_Para = st_PersonSel_Para;
        			temp_st_PersonSel_Para.PersonId = getLocalStorageData("PersonId");
        			var data = GLOB_ConvertDataDBCompit(temp_st_PersonSel_Para,"st_PersonSel");
            	     $http.post("http://safecabmobilewebservice.azurewebsites.net/api/Service",data)
            		 .success(function(resPersonData) {
            		 	$ionicLoading.hide();
            		 	resPersonData = JSON.parse(resPersonData);
            		 	resPersonData = resPersonData[0];
    					var tempPersonTelephone = resPersonData.Telephone.toString().replace(/\"/g,'');
    					setLocalStorageData("Telephone",tempPersonTelephone);
            		 });
			//}, 1000);
          }
	 
	 }).error(function(data, status, headers, config) {
	 		$ionicLoading.hide();
			$(".DivUserLoggedMessage").html(JSON.stringify(data)).show()
	});
  };
 
  
})
.controller('TestProfileCtrl', function($scope, $stateParams, FriendService, $ionicLoading, $timeout, $http) {
  
	  //alert(FUN_GLOB_GETVEHICLETYPES_LI());
	    //$(".data123").append(FUN_GLOB_GETVEHICLETYPES_LI());

	var thePage = document.open('templates/SOS.html');

	alert(thePage.getElementById('TestSOSPage'));
	    
  $scope.profileInfo = [];
  $scope.profileInfo.name = "John Steve";
  $scope.profileInfo.email = "johnsteve@gmail.com";
  $scope.profileInfo.phone = "1232342342";
  $scope.profileInfo.emergencyinfo = "this is emergency information";
  
  $scope.phone = "";

  $scope.friend = FriendService.get($stateParams.commentId);
  $scope.title = "Profile";  	

	
	$scope.savePersonData = function(){
		alert("In savePersonData");
	}
	
	
	$scope.setDateHandler = function () {
	    alert('date is set');
	    $scope.$apply(function () {
	        $scope.isSet = true;
	        alert("in date");
	    });
	};
	
	$scope.setImg = function (html, instance) {
	    alert('date is set'  +JSON.stringify(html) + ":" + JSON.stringify(instance));
	    $scope.$apply(function () {
	        $scope.isSet = true;
	        alert("in date");
	    });
	};
	
  $scope.callPhoneService = function(){
  	//alert($scope.profileInfo.phone);
  	if($scope.profileInfo.phone.toString().length < 5)
  		return ;
   // alert(typeof($scope.profileInfo.phone));
    var url  = "https://external.safecab.com/ValidationService.svc/ValidatePhone/" + $scope.profileInfo.phone + "/GB";
   // alert(url);
  	$http.get(url).
	  success(function(data, status, headers, config) {
	    // this callback will be called asynchronously
	    // when the response is available
	  }).
	  error(function(data, status, headers, config) {
	    // called asynchronously if an error occurs
	    // or server returns response with an error status.
	  });

  }
/*$scope.imgData = null;
  
  $scope.openCamera  = function (){
	var options = {
      quality: 50,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 100,
      targetHeight: 100,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false
    };

    $cordovaCamera.getPicture(options).then(function(imageData) {
      var image = document.getElementById('myImage');
      image.src = "data:image/jpeg;base64," + imageData;
	  $scope.imgData = imageData;
    }, function(err) {
      // error
    }); 
  }
  

  $scope.openAlbum  = function (){
	var options = {
      quality: 50,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 100,
      targetHeight: 100,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false
    };

    $cordovaCamera.getPicture(options).then(function(imageData) {
      var image = document.getElementById('myImage');
      image.src = "data:image/jpeg;base64," + imageData;
	  $scope.imgData = imageData;
    }, function(err) {
      // error
    }); 
  }
  */
})
.controller('RemindMeController', function($scope, $http,$timeout) {
	 $scope.RemindMe = function() {
  			$(".DivUserLoggedMessage").hide();
  			var EmailAddress = document.getElementById("txtUserName").value;
            var Mobile = null;
            if ($.isNumeric(EmailAddress) == true && isValidMobileNumber(EmailAddress) == true) {
                Mobile = document.getElementById("txtUserName").value;
                var EmailAddress = null;
            }
            else if ($.isNumeric(EmailAddress) != true && isValidEmailAddress(EmailAddress) == true) {
                var EmailAddress = document.getElementById("txtUserName").value;
                Mobile = null;
            }
            else {
                $(".DivUserLoggedMessage").html("Enter valid email or Telephone").show();
                return false;
            }
            var temp_st_PersonLostPassCodeSea_Para = st_PersonLostPassCodeSea_Para;
            temp_st_PersonLostPassCodeSea_Para.EmailAddress = EmailAddress;
            temp_st_PersonLostPassCodeSea_Para.Telephone = Mobile;
             var data = GLOB_ConvertDataDBCompit(temp_st_PersonLostPassCodeSea_Para,"st_PersonLostPassCodeSea");
            $http.post("http://safecabmobilewebservice.azurewebsites.net/api/Service",data)
	 		.success(function(response) {
		 				if (response["result"] == true) {
	                        alert("if your email/mobile is known your details will have been sent.");
	                    }
	                    else {
	                        alert("your email/mobile is not exsits.");
	                    }
	 			
	 		}).error(function(data, status, headers, config) {
			$(".DivUserLoggedMessage").html(JSON.stringify(data)).show()
	});
            
  	
  };
})
.controller('PassengerProfileDataController', function($scope, $http,$timeout) {
	$scope.SaveProfileData = function() {
		var tempFullName = document.getElementById("txtPassengerFullName").value;
     	var tempMobile = document.getElementById("txtPassengerMobile").value;
     	var tempPasscode = document.getElementById("txtPassengerPasscode").value;
     	var tempEmailAddress = document.getElementById("txtPassengerEmail").value;
     	
     	var temp_st_PersonIns_Para = st_PersonIns_Para;
        temp_st_PersonIns_Para.PersonId__O = getLocalStorageData("PersonId");
        temp_st_PersonIns_Para.PassCode = tempPasscode;
        temp_st_PersonIns_Para.FullName = tempFullName;
        temp_st_PersonIns_Para.EmailAddress = tempEmailAddress;
        temp_st_PersonIns_Para.Telephone = tempMobile;
         var data = GLOB_ConvertDataDBCompit(st_PersonIns_Para,"st_PersonIns");
            $http.post("http://safecabmobilewebservice.azurewebsites.net/api/Service",data)
	 		.success(function(resUserData) {
	 			alert("User Profile Details Updated Successfully..");
	 		});
	}
})

.controller('NewsCtrl', function($scope, $http,$timeout) {

})
function hidePopUp() {
	document.getElementById("detailPopup").style.display = 'none';	
}

function showPopUp() {
	document.getElementById("detailPopup").style.display = 'block';	
}

function showhidePopUp() {
	showhide = document.getElementById("detailPopup").style.display;
	if(showhide == "none") {
		showPopUp();
		document.getElementById("ImgRightArrow").src = "img/Map_pins/arrow_down.png";
	}else{
		hidePopUp();
		document.getElementById("ImgRightArrow").src = "img/Map_pins/arrow_right.png";
	}
}
function hidePopUpDesc(objThis) {
    $(objThis).hide();
    $(objThis).parents('.DivVerticalMiddle').next('.BusinessInfowindow').hide();
    $(objThis).parents('.DivVerticalMiddle').find('.PopupArrowImageRight').show();
}

 function GLOB_ConvertDataDBCompit(objParas, SPName) {
        var paras = { SPName: SPName, Paras: objParas,RequestorBusinessId: 0, RequestorDriverId: 0, RequestorPersonId: 0 };
        return JSON.stringify(paras);
    }
 
 function showPopUpDescription(obj) {
	    $('.DivArrowImage').toggle();
	    $('.BusinessInfowindow').slideToggle();
	}
 function showPopUpDesc(objThis) {
	 $(objThis).hide();
     $(objThis).parents('.DivVerticalMiddle').next('.BusinessInfowindow').show();
     $(objThis).parents('.DivVerticalMiddle').find('.PopupArrowImageDown').show(); 
 }

