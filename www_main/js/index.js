var tempScope = "",temphttp = "";

//get cab data
function getMapPopupDescriptionDiv(objBusiness,$scope,$http, $ionicLoading)
{
	tempScope = $scope;
	temphttp = $http;
	
	var tempDescription = $(".divUserData").html();
	if(objBusiness.EntityType == 1 || objBusiness.EntityType == 2 )
		{
			var temp_st_PinDetailSea_Para = st_PinDetailSea_Para;
	        temp_st_PinDetailSea_Para.BusinessId = objBusiness.BusinessId;
	        temp_st_PinDetailSea_Para.DriverId = objBusiness.DriverId;
	        temp_st_PinDetailSea_Para.PersonId = objBusiness.PersonId;
	        temp_st_PinDetailSea_Para.BookingId = objBusiness.BookingId;
	        temp_st_PinDetailSea_Para.RequestorBusinessId = 0 ;
	        temp_st_PinDetailSea_Para.RequestorDriverId = 0;
	        temp_st_PinDetailSea_Para.RequestorPersonId = getLocalStorageData("PersonId");
	        temp_st_PinDetailSea_Para.RequestorBookingId = 0;// GLOB_MAPPINGSEA_PARA.BookingId;
	        //GLOB_SBPARADEBUGGER(temp_st_PinDetailSea_Para);
	        var data = GLOB_ConvertDataDBCompit(temp_st_PinDetailSea_Para,"st_PinDetailSea");
            $ionicLoading.show({
                template: 'Loading...'
            });
		  	$http.post("http://safecabmobilewebservice.azurewebsites.net/api/Service",data)
		  	.success(function(resPinDetailsData) {
                $ionicLoading.hide();
		  		var singleMappingSea = JSON.parse(resPinDetailsData);
		  		singleMappingSea = singleMappingSea[0];
                singleMappingSea.BusinessId = objBusiness.BusinessId;
                singleMappingSea.DriverId = objBusiness.DriverId;
                singleMappingSea.PersonId = objBusiness.PersonId;
                singleMappingSea.BookingId = objBusiness.BookingId;
                singleMappingSea.EntityTitle = objBusiness.EntityTitle;
                singleMappingSea.Rating = objBusiness.Rating;
                singleMappingSea.CommentCount = objBusiness.CommentCount;
                singleMappingSea.CurrentPosition = objBusiness.CurrentPosition;
                singleMappingSea.LocationPhoto = objBusiness.LocationPhoto;
                singleMappingSea.RowNumber = objBusiness.RowNumber;
                singleMappingSea.EstimatedCost = objBusiness.EstimatedCost;

                singleMappingSea.LocationTracking = objBusiness.LocationTracking;
                singleMappingSea.IsFriend = objBusiness.ISFriend;
                singleMappingSea.Latitude = objBusiness.Latitude;
                singleMappingSea.Longitude = objBusiness.Longitude;
                singleMappingSea.EntityType = objBusiness.EntityType;
                singleMappingSea.LastLocated = objBusiness.LastLocated;
                var tempVehicleType = 2;
            	if (singleMappingSea.VehicleTypes)
                	tempVehicleType = GetVehicleTypeFromBinaryValue(singleMappingSea.VehicleTypes);
            	var btnChat = "", btnAddFavourites = "&nbsp", btnBooking = "&nbsp", btnContactUs = "&nbsp", ContentHeight = 0, ButttonClass = "&nbsp", DivUserComments = "";
            	if(getLocalStorageData("PersonId") != undefined && parseInt(getLocalStorageData("PersonId")) > 0 && getLocalStorageData("PersonId") != "null" && getLocalStorageData("PersonId") != null){
            		
            		btnContactUs = '<input type="button" class="btnyellow" onClick="javascript:functionContactUs(' + objBusiness.BusinessId + ',' + singleMappingSea.EntityTelephone + ',' + objBusiness.DriverId + ',' + objBusiness.RowNumber + ',' + objBusiness.BookingId + ')" value="Contact Us"/>';
            	 if (objBusiness.EntityType == 2 || objBusiness.RegistrationType == 2 || objBusiness.RegistrationType == 4) {
            		 
                     if (objBusiness.Favourite == true) {
                         btnAddFavourites = '<input type="button" class="btnyellow btnPassengerFavourites" onClick="javascript:CabAddtoFavourites(' + objBusiness.BusinessId + ',' + objBusiness.DriverId + ',1,'+ objBusiness.RegistrationType + ',0)" value="Remove Favourite" style="float:none;"/>';
                     }
                     else {
                         btnAddFavourites = '<input type="button" class="btnyellow btnPassengerFavourites" onClick="javascript:CabAddtoFavourites(' + objBusiness.BusinessId + ',' + objBusiness.DriverId + ',0,' + objBusiness.RegistrationType + ',0)" value="Add to Favourites" style="float:none;"/>';
                     }
                     btnBooking = "<input type='button' class='btnyellow marginleft5'  onClick = 'javascript:functionBooking($(this));' value='Pick Up'/>";
                 }
            	}
            	else{

            			btnContactUs = "<input type='button' onClick='functionContactUs('" + objBusiness.BusinessId + "',0,0,0,0)' class='btnyellow' value='Contact Us'/>";
            		}
                tempDescription = tempDescription.replace(/{ENTITYTITLE}/g, objBusiness.EntityTitle);
            	tempDescription = tempDescription.replace(/{CABREVIEWS}/g, singleMappingSea.CommentCount);
            	tempDescription = tempDescription.replace(/{CABIMAGE}/g, ImageWebServicesUrl + objBusiness.BusinessId );
            	tempDescription = tempDescription.replace(/{CABTELEPHONE}/g, GLOB_GetTelePhoneNumber(singleMappingSea.EntityTelephone));
            	if (singleMappingSea.EntityTelephone.substr(0, 2) == '91' || singleMappingSea.EntityTelephone.substr(0, 2) == '44')
            		tempDescription = tempDescription.replace(/{CABTELEPHONECOUTRYCODEIMAGE}/g, GetCountryFlagFromCountryCode(singleMappingSea.EntityTelephone.substr(0, 2)));
            	tempDescription = tempDescription.replace(/{BUSINESSID}/g, objBusiness.BusinessId);
            	tempDescription = tempDescription.replace(/{DRIVERID}/g, objBusiness.DriverId);
            	tempDescription = tempDescription.replace(/{RAINGSTAR}/g, objBusiness.Rating);
            	tempDescription = tempDescription.replace(/{BTNBOOKING}/g, btnBooking);
            	tempDescription = tempDescription.replace(/{BTNCONTACTUS}/g, btnContactUs);
            	tempDescription = tempDescription.replace(/{BTNFAVOURITES}/g, btnAddFavourites);
            	tempDescription = tempDescription.replace(/{CURRENTSCOPE}/g, $scope);
            	tempDescription = tempDescription.replace(/{CURRENTHTTP}/g, $http);
            	tempDescription = tempDescription.replace(/{ENTITYADDRESS}/g, objBusiness.EntityAddress);
            	
            	//set Pick up screen data Start
            	 var currentAdddress = getLocalStorageData("Address");
            	    var DivBookingContent = "";
            	    var currentDateTime = new Date();
            	    var month = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
            	    //get time am/pm time start
            	    var formatTime = (function () {
            	        function addZero(num) {
            	            return (num >= 0 && num < 10) ? "0" + num : num + "";
            	        }
            	        return function (dt) {
            	            var formatted = '';

            	            if (dt) {
            	                var hours24 = dt.getHours();
            	                var hours = ((hours24 + 11) % 12) + 1;
            	                formatted = [[formatted, [hours, addZero(dt.getMinutes())].join(":")].join(" "), hours24 > 11 ? " PM" : " AM"].join("");
            	            }
            	            return formatted;
            	        }
            	    })();
            	    //get time am/pm time end
            	    var tempDateTime = currentDateTime.getDate() + " " + month[new Date().getMonth()] + " " + currentDateTime.getFullYear() + " " + formatTime(new Date());
            	    var CabImage = DomainNameSource + "/images/cab-icon.png";

            	    var tempUlPersonCarType = "<div class='hide'><ul class='ulPersonCarType'>" +
            	                                           FUN_GLOB_GETVEHICLETYPES_LI_SELECTED(GetVehicleTypeFromBinaryValue(objBusiness.VehicleTypes)) +
            	                                        "</ul></div>";
            	    var tempVehicleTypeArry = [];
            	    tempVehicleTypeArry = GetVehicleTypeFromBinaryValue(objBusiness.VehicleTypes);
            	    var tempVehicleTypeLabel = "";
            	    //
            	    if (CurrentUserFullDetails["DefaultVehicleTypes"] == $.grep(GetVehicleTypeFromBinaryValue(objBusiness.VehicleTypes), function (n, i) { return n == CurrentUserFullDetails["DefaultVehicleTypes"] })) {
            	        tempVehicleTypeLabel = FUN_GLOB_GETVEHICLE_NAME_FROM_VEHICLEID(CurrentUserFullDetails["DefaultVehicleTypes"]);
            	        tempUserVehicleTypeId = CurrentUserFullDetails["DefaultVehicleTypes"];
            	    }
            	    else {
            	        if (tempVehicleTypeArry.indexOf('2') == 1) {
            	            tempVehicleTypeLabel = FUN_GLOB_GETVEHICLE_NAME_FROM_VEHICLEID(GetVehicleTypeFromBinaryValue(objBusiness.VehicleTypes)[1]);
            	            tempUserVehicleTypeId = 2;
            	        }
            	        else {
            	            tempVehicleTypeLabel = FUN_GLOB_GETVEHICLE_NAME_FROM_VEHICLEID(GetVehicleTypeFromBinaryValue(objBusiness.VehicleTypes)[0]);
            	            tempUserVehicleTypeId = GetVehicleTypeFromBinaryValue(objBusiness.VehicleTypes)[0];
            	        }

            	    }
            	tempDescription = tempDescription.replace(/{tempUserVehicleTypeId}/g, tempUserVehicleTypeId);
            	tempDescription = tempDescription.replace(/{PickUpScreenCurrentAddress}/g, getLocalStorageData("Address"));
            	tempDescription = tempDescription.replace(/{tempDateTime}/g, tempDateTime);
            	tempDescription = tempDescription.replace(/{tempVehicleTypeLabel}/g, tempVehicleTypeLabel);
            	
            	//set Pick up screen data End
            	
            	tempDescription = tempDescription.replace(/{LAT}/g, objBusiness.Latitude);
            	tempDescription = tempDescription.replace(/{LNG}/g, objBusiness.Longitude);
            	
            	tempDescription = tempDescription.replace(/{STARTTIME}/g, singleMappingSea.EntityTimeStart);
            	tempDescription = tempDescription.replace(/{ENDTIME}/g, singleMappingSea.EntityTimeEnd);
            	var tempdatalink = "functionGetBusinessCommetns('"+objBusiness.BusinessId+"','"+objBusiness.DriverId+"')";
            	tempDescription = tempDescription.replace(/{COMMENTDATA}/g, tempdatalink);
            	
            	tempDescription = tempDescription.replace(/{BUSINESSCABTYPES}/g, FUN_GLOB_GETPOSSIBLEVEHICLETYPE_FROM_VEHICLETYPE_ARRAY(tempVehicleType));
            	$(".DivAppendChildData").html(tempDescription).show();
            	$(".DivParentPopUpDescription").show();
            	$(".DivUserComments,.DivContact,.DivBookingPopUp").hide();
				$scope.opentempPinPopUpE1();
				
            	//return tempDescription;
		  	});
		}
}
//Pin Type 8 start
function getPinPopUpContent_8(objBusinessData,$scope,$http){
	
		var temp_st_PinDetailSea_Para = st_PinDetailSea_Para;
        temp_st_PinDetailSea_Para.BusinessId = objBusinessData.BusinessId;
        temp_st_PinDetailSea_Para.DriverId = objBusinessData.DriverId;
        temp_st_PinDetailSea_Para.PersonId = objBusinessData.PersonId;
        temp_st_PinDetailSea_Para.BookingId = objBusinessData.BookingId;
        temp_st_PinDetailSea_Para.RequestorBusinessId = 0 ;
        temp_st_PinDetailSea_Para.RequestorDriverId = 0;
        temp_st_PinDetailSea_Para.RequestorPersonId = getLocalStorageData("PersonId");
        temp_st_PinDetailSea_Para.RequestorBookingId = 0;// GLOB_MAPPINGSEA_PARA.BookingId;
        //GLOB_SBPARADEBUGGER(temp_st_PinDetailSea_Para);
        var data = GLOB_ConvertDataDBCompit(temp_st_PinDetailSea_Para,"st_PinDetailSea");
	  	$http.post("http://safecabmobilewebservice.azurewebsites.net/api/Service",data)
	  	.success(function(resPinDetailsData) {
	  		var singleMappingSea = JSON.parse(resPinDetailsData);
	  		singleMappingSea = singleMappingSea[0];
	  	    var DivBookingStatus_8_Contnet = $('.TMPLT_BusinessBooking_8').html();
	  	    var tempDisabledAccess = "";
	  	    var tempFemaleDriver = "";
	  	    var PersonImageServices = 'https://imagewebservice.azurewebsites.net/LogoImage.aspx?Logo='+objBusinessData.BusinessId+'_0_0';
	  	    var PersonImageDiv = "<img src='" + PersonImageServices + "' class='imgRounded' />";
	  	    var tempVehicleType = GetVehicleTypeFromBinaryValue(objBusinessData.VehicleTypes);
	  	    DivBookingStatus_8_Contnet = DivBookingStatus_8_Contnet.replace(/{BUSINESSBOOKING_8_BUSINESSID}/g, objBusinessData.BusinessId);
	  	    DivBookingStatus_8_Contnet = DivBookingStatus_8_Contnet.replace(/{BUSINESSBOOKING_8_BOOKINGID}/g, objBusinessData.BookingId);
	  	    DivBookingStatus_8_Contnet = DivBookingStatus_8_Contnet.replace(/{BUSINESSBOOKING_8_PERSONID}/g, objBusinessData.PersonId);
	  	    DivBookingStatus_8_Contnet = DivBookingStatus_8_Contnet.replace(/{BUSINESSBOOKING_8_VehicleType}/g, singleMappingSea.VehicleTypes);
	  	    DivBookingStatus_8_Contnet = DivBookingStatus_8_Contnet.replace(/{LAT}/g, objBusinessData.Latitude);
	  	    DivBookingStatus_8_Contnet = DivBookingStatus_8_Contnet.replace(/{LNG}/g, objBusinessData.Longitude);
	  	    DivBookingStatus_8_Contnet = DivBookingStatus_8_Contnet.replace(/{BUSINESSBOOKING_8_PERSONID}/g, objBusinessData.PersonId);
	  	    DivBookingStatus_8_Contnet = DivBookingStatus_8_Contnet.replace(/{BUSINESSBOOKING_8_DRIVERID}/g, objBusinessData.DriverId);
	  	    DivBookingStatus_8_Contnet = DivBookingStatus_8_Contnet.replace(/{BUSINESSBOOKING_8_RATING}/g, objBusinessData.Rating);
	  	    //    DivTrackingCotnet = DivTrackingCotnet.replace(/{BUSINESSTRACKINGBOOKINGID}/g, objBusinessData.BookingId);
	  	    DivBookingStatus_8_Contnet = DivBookingStatus_8_Contnet.replace(/{Booking_Status_8_Booking_Alt_Text}/g, objBusinessData.EntityTitle);
	  	    DivBookingStatus_8_Contnet = DivBookingStatus_8_Contnet.replace(/{BUSINESSBOOKINGTITLE}/g, objBusinessData.EntityTitle);
	  	    DivBookingStatus_8_Contnet = DivBookingStatus_8_Contnet.replace(/{BUSINESSBOOKING_8_COMMENTCOUNT}/g, objBusinessData.CommentCount);
	  	    
	  	    var tempImgDisabledAccess = objBusinessData.DisabledAccess == true ? "on" : "off";
	  	    var tempImgFemaleDriver = objBusinessData.FemaleDrivers == true ? "on" : "off";
	  	    tempDisabledAccess = DomainNameSource + "/images/New_bits/disabled_access_" + tempImgDisabledAccess + ".png";
	  	    tempFemaleDriver = DomainNameSource + "/images/New_bits/female_driver_" + tempImgFemaleDriver + ".png";
	  	    DivBookingStatus_8_Contnet = DivBookingStatus_8_Contnet.replace(/{BUSINESSBOOKING_8_CABIMG}/g, PersonImageServices);
	  	    var tempImageIds = objBusinessData.BusinessId + "_" + objBusinessData.DriverId + "_" + objBusinessData.PersonId + "_" + objBusinessData.BookingId;
	  	    DivBookingStatus_8_Contnet = DivBookingStatus_8_Contnet.replace(/{BUSINESSBOOKING_Inner_8_CABIMG}/g, ImageWebServicesUrl + tempImageIds);
	  	    DivBookingStatus_8_Contnet = DivBookingStatus_8_Contnet.replace(/{BUSINESSBOOKING_8_BUSINESSADDRESS}/g, singleMappingSea.EntityDescription);
	  	    var tempTelePhone = objBusinessData.EntityTelephone;
	  	    var tempCountryFlagDisplayStyle = 'hide';
	  	    if (singleMappingSea.EntityTelephone.substr(0, 2).indexOf('91') == 0 || singleMappingSea.EntityTelephone.substr(0, 2).indexOf('44') == 0) {
	  	        tempCountryFlagDisplayStyle = 'inline-block';
	  	        tempTelePhone = singleMappingSea.EntityTelephone.substr(2, singleMappingSea.EntityTelephone.length);
	  	    }
	  	    else
	  	        tempTelePhone = singleMappingSea.EntityTelephone;
	  	    var tempDisplayVehicleType = 'hide', tempBookingVehicleType = "";
	  	  singleMappingSea.VehicleTypes = 2;
	  	    if (singleMappingSea.VehicleTypes != 0) {
	  	        tempDisplayVehicleType = 'show';
	  	        tempBookingVehicleType = DomainName + "/DATA/images/cab_images/" + $.grep(CONF_CARTYPES, function (e) { return e.value == singleMappingSea.VehicleTypes })[0]["Image"];
	  	    }
	  	    var temopBookingNotes = singleMappingSea.BookingNotes;
	  	    if (singleMappingSea.BookingNotes == null || singleMappingSea.BookingNotes == '')
	  	        temopBookingNotes = "No special requirements";
	  	    var tempBusiness16_ToAddress = singleMappingSea.EndAddress;
	  	    if (objBusinessData.EndAddress == null || objBusinessData.EndAddress == '')
	  	        tempBusiness16_ToAddress = 'Will tell driver';
	  	    DivBookingStatus_8_Contnet = DivBookingStatus_8_Contnet.replace(/{BUSINESSBOOKING_8_BOOKING_STATUS_VEHICLETYPE}/g, tempBookingVehicleType);
	  	    DivBookingStatus_8_Contnet = DivBookingStatus_8_Contnet.replace(/{BUSINESSBOOKING_8_BOOKING_STATUS_VEHICLETYPE_CSS}/g, tempDisplayVehicleType);
	  	    DivBookingStatus_8_Contnet = DivBookingStatus_8_Contnet.replace(/{BUSINESSBOOKING_8_COUNTRYIMGSHOW}/g, tempCountryFlagDisplayStyle);
	  	    DivBookingStatus_8_Contnet = DivBookingStatus_8_Contnet.replace(/{BUSINESSBOOKING_8_TELEPHONE}/g, GLOB_GetTelePhoneNumber(singleMappingSea.EntityTelephone));
	  	    DivBookingStatus_8_Contnet = DivBookingStatus_8_Contnet.replace(/{BUSINESSBOOKING_8_COUNTRYIMG}/g, GetCountryFlagFromCountryCode(singleMappingSea.EntityTelephone.substr(0, 2)));
	  	    DivBookingStatus_8_Contnet = DivBookingStatus_8_Contnet.replace(/{BUSINESSBOOKING_8_BUSINESSFROMADDRESS}/g, singleMappingSea.StartAddress);
	  	    DivBookingStatus_8_Contnet = DivBookingStatus_8_Contnet.replace(/{DivBookingStatus_8_From_Address}/g, singleMappingSea.StartAddress);
	  	    DivBookingStatus_8_Contnet = DivBookingStatus_8_Contnet.replace(/{BUSINESSBOOKING_8_BUSINESSTOADDRESS}/g, tempBusiness16_ToAddress);
	  	    DivBookingStatus_8_Contnet = DivBookingStatus_8_Contnet.replace(/{DivBookingStatus_8_To_Address}/g, tempBusiness16_ToAddress);
	  	    var tempEstimatedCost = objBusinessData.EstimatedCost;
	  	    if (objBusinessData.EstimatedCost == 0 || objBusinessData.EstimatedCost == undefined)
	  	        tempEstimatedCost = "0.00";
	  	    DivBookingStatus_8_Contnet = DivBookingStatus_8_Contnet.replace(/{BUSINESSBOOKING_8_BOOKING_STATUS_BUSINESSESTIMATEDCOST}/g, tempEstimatedCost);
	  	    DivBookingStatus_8_Contnet = DivBookingStatus_8_Contnet.replace(/{BUSINESSBOOKING_8_BUSINESSNOTES}/g, temopBookingNotes);
	  	    DivBookingStatus_8_Contnet = DivBookingStatus_8_Contnet.replace(/{DivBookingStatus_8_Notes_Address}/g, temopBookingNotes);
	  	    DivBookingStatus_8_Contnet = DivBookingStatus_8_Contnet.replace(/{BUSINESSBOOKING_8_BUSINESSREQUIREDDATETIME}/g, $.formatDateTime(CONF_NEW_PIN_8_DATE_TIME, new Date(Date.parse(singleMappingSea.RequiredDateTime))));
	  	    DivBookingStatus_8_Contnet = DivBookingStatus_8_Contnet.replace(/{BUSINESSBOOKING_8_BUSINESSREDISABLEDACCESSIMG}/g, tempDisabledAccess);
	  	    DivBookingStatus_8_Contnet = DivBookingStatus_8_Contnet.replace(/{BUSINESSBOOKING_8_BUSINESSREFEMALEDRIVERIMG}/g, tempFemaleDriver);
	  	    var tempDetails = DivBookingStatus_8_Contnet;
	  		$(".DivAppendChildData").html(tempDetails).show();
	  		$scope.opentempPinPopUpE1();    
	  	    //return DivBookingStatus_8_Contnet;
	  	});
	
}
//Pin Type 8 end

//Pin Type 16 Start
function getPinPopUpContent_16(objBusinessData,$scope,$http){
	var temp_st_PinDetailSea_Para = st_PinDetailSea_Para;
    temp_st_PinDetailSea_Para.BusinessId = objBusinessData.BusinessId;
    temp_st_PinDetailSea_Para.DriverId = objBusinessData.DriverId;
    temp_st_PinDetailSea_Para.PersonId = objBusinessData.PersonId;
    temp_st_PinDetailSea_Para.BookingId = objBusinessData.BookingId;
    temp_st_PinDetailSea_Para.RequestorBusinessId = 0 ;
    temp_st_PinDetailSea_Para.RequestorDriverId = 0;
    temp_st_PinDetailSea_Para.RequestorPersonId = getLocalStorageData("PersonId");
    temp_st_PinDetailSea_Para.RequestorBookingId = 0;// GLOB_MAPPINGSEA_PARA.BookingId;
    //GLOB_SBPARADEBUGGER(temp_st_PinDetailSea_Para);
    var data = GLOB_ConvertDataDBCompit(temp_st_PinDetailSea_Para,"st_PinDetailSea");
  	$http.post("http://safecabmobilewebservice.azurewebsites.net/api/Service",data)
  	.success(function(resPinDetailsData) {
  		var singleMappingSea = JSON.parse(resPinDetailsData);
  		singleMappingSea = singleMappingSea[0];
  		singleMappingSea.BusinessId = objBusinessData.BusinessId;
        singleMappingSea.DriverId = objBusinessData.DriverId;
        singleMappingSea.PersonId = objBusinessData.PersonId;
        singleMappingSea.BookingId = objBusinessData.BookingId;
        singleMappingSea.EntityTitle = objBusinessData.EntityTitle;
        singleMappingSea.Rating = objBusinessData.Rating;
        singleMappingSea.CommentCount = objBusinessData.CommentCount;
        singleMappingSea.CurrentPosition = objBusinessData.CurrentPosition;
        singleMappingSea.LocationPhoto = objBusinessData.LocationPhoto;
        singleMappingSea.RowNumber = objBusinessData.RowNumber;
        singleMappingSea.EstimatedCost = objBusinessData.EstimatedCost;
        singleMappingSea.EntityAddress = objBusinessData.EntityAddress;

        //singleMappingSea.LocationTracking = currentPinTitleDetails.LocationTracking;
        singleMappingSea.IsFriend = objBusinessData.ISFriend;
        singleMappingSea.EntityType = objBusinessData.EntityType;
        singleMappingSea.LastLocated = objBusinessData.LastLocated;
        CreatePinContent_16_Data(singleMappingSea,$scope,$http);
  	});
}
//Pin Type 16 End
//Pin Type 8 comments
function Show_Booking_8_BusinessCommetns(BusinessId, objBtn, DriverId, BookingId, PersonId) 
{
	var scope = angular.element($(".DivTempPinPopUp")).scope();
	scope.Show_Booking_8_BusinessCommetns(BusinessId,DriverId,BookingId,PersonId);
}

function Show_BUSINESSBOOKING_16_BusinessCommetns(BusinessId, objBtn, DriverId, BookingId, PersonId){
	var scope = angular.element($(".DivTempPinPopUp")).scope();
	scope.Show_BUSINESSBOOKING_16_BusinessCommetns(BusinessId,DriverId, BookingId, PersonId);
}

function CloseBusiness_Booking_16_CommentsWindow(objBtn) {
    $(objBtn).parents(".DivUserComments").hide("slide", { direction: "right" }, 500, function () {
        $(objBtn).parents(".DivBookingStatus_16").find('.DivParentPopUpDescription').show("slide", { direction: "left" }, 500);
    });
}
//Entity type 16 Booking Contact Us related stuff Start
function Show_Passenger_Contact(BusinessId, objBtn, DriverId, BookingId, PersonId) {
    var tempIds = BusinessId + "_" + DriverId + "_0_0_0";
    //var presenceCheckName = 'presence-' + tempIds;
    //var tempBusinessPresenceCheckChannel = pusher.subscribe(presenceCheckName);
    var tempImageVideoHtmlContent = DomainName + "/DATA/images/New_bits/NoPresenceVideo.png";
    var tmepImageVoiceHtmlContent = DomainName + "/DATA/images/New_bits/NoPresenceVoice.png";
    var tmepImageMessageHtmlContent = DomainName + "/DATA/images/New_bits/NoPresenceMessage.png";

    var tempAllIds = BusinessId + "_" + DriverId + "_" + BookingId + "_" + PersonId;
    var PresenceFlag = false;
    /*tempBusinessPresenceCheckChannel.members.each(function (member) {
        if (member.id == tempIds) {
            PresenceFlag = true;
            return;
        }
    });
    
    if (PresenceFlag == true) {
        tmepImageVoiceHtmlContent = DomainName + "/DATA/images/New_bits/voice.png";
        tempImageVideoHtmlContent = DomainName + "/DATA/images/New_bits/video.png";
        tmepImageMessageHtmlContent = DomainName + "/DATA/images/New_bits/message.png";
        $(objBtn).parents(".TMPLT_DivBusinessPopUpBooking_16_Title").find(".DivBusiness_Booking_Status_16_Passenger_Contact").find(".linkBusiness_16_Video_" + tempAllIds).css({ "pointer-events": "all", "cursor": "pointer;" });
    }
    else
        $(objBtn).parents(".TMPLT_DivBusinessPopUpBooking_16_Title").find(".DivBusiness_Booking_Status_16_Passenger_Contact").find(".linkBusiness_16_Video_" + tempAllIds).css({ "pointer-events": "none", "cursor": "default;" });
*/

    $(objBtn).parents(".TMPLT_DivBusinessPopUpBooking_16_Title").find(".DivBusiness_Booking_Status_16_Passenger_Contact").find("#Booking_Status_16_Booking_VIDEO_IMAGE_" + tempAllIds).attr("src", tempImageVideoHtmlContent);
    $(objBtn).parents(".TMPLT_DivBusinessPopUpBooking_16_Title").find(".DivBusiness_Booking_Status_16_Passenger_Contact").find("#Booking_Status_16_Booking_VOICE_IMAGE_" + tempAllIds).attr("src", tmepImageVoiceHtmlContent);
    $(objBtn).parents(".TMPLT_DivBusinessPopUpBooking_16_Title").find(".DivBusiness_Booking_Status_16_Passenger_Contact").find("#Booking_Status_16_Booking_MESSAGE_IMAGE_" + tempAllIds).attr("src", tmepImageMessageHtmlContent);

    $(objBtn).parents('.DivParentPopUpDescription').hide("slide", { direction: "left" }, 500, function () {
        $(objBtn).parents('.DivBookingStatus_16').find(".DivBusiness_Booking_Status_16_Passenger_Contact").css("display", "inline-block");
        $(objBtn).parents('.DivBookingStatus_16').find(".DivBusiness_Booking_Status_16_Passenger_Contact").find(".DivContact").css("display", "block");
        $(objBtn).parents('.DivBookingStatus_16').find('.DivBusiness_Booking_Status_16_Passenger_Contact').show("slide", { direction: "right" }, 500);
    });
}

function ClosePassengerContactWindow(objBtn) {
    $(objBtn).parents('.DivBusiness_Booking_Status_16_Passenger_Contact').hide("slide", { direction: "right" }, 500, 
    function () { $(objBtn).parents('.DivBookingStatus_16').find('.DivParentPopUpDescription').show("slide", { direction: "left" }, 500); });
}

function Send_16_ChatMessage(BusinessId, objBtn, DriverId, PersonId) {
	var scope = angular.element($(".DivTempPinPopUp")).scope();
	scope.Send_16_ChatMessage(BusinessId,DriverId, PersonId);	
}
//Entity type 16 Booking Contact us related stuff end

function CreatePinContent_16_Data(objBusinessData,$scope,$http)
{
	var EntityType = objBusinessData.EntityType;
    var CurrentPosition = objBusinessData.CurrentPosition;
    var LocationTracking = objBusinessData.LocationTracking;
    var LocationPhoto = objBusinessData.LocationPhoto;
    var tempCommentImageDisplayClass = 'none';
    var tempDisabledAccess = DomainNameSource + "/images/New_bits/disabled_access_off.png";
    var tempFemaleDriver = DomainNameSource + "/images/New_bits/female_driver_off.png";
    //set mobiscroll content
    var tempBookingEntityStatus = parseInt(objBusinessData.EntityStatus);
    $(".Business_Booking_16_seleBookingStatusType").html("");
    var DivBookingStatus_16_Contnet = $('.TMPLT_BusinessBooking_16').html();
    var tempStatus = 0, tempDisplayContent = 'none', tempBookingText, tempBookingTextColor = "orange", tempBtnBookingStatusDisplay = "block";
    if (getLocalStorageData("PersonId") > 0)
        tempStatus = undefined;
    if (tempBookingEntityStatus != 0) {
        tempStatus = GetVehicleTypeFromBinaryValue(tempBookingEntityStatus);
        tempStatus = $(tempStatus).last()[0];
    }
    var tempStatusarr = [];
    if (objBusinessData.EntityStatus == 2) {
        tempStatusarr = "2";
    }
    else {
        if (getLocalStorageData("PersonId") > 0) {
            tempStatusarr = FUN_GLOB_GET_PASSENGER_BOOKING_STATUS_VALUE_FROM_ENTITY_STATUS(tempStatus);
        }
        else if (GLOB_CURRENT_BusinessId > 0 && GLOB_CURRENT_DriverId > 0) {
            tempStatusarr = FUN_GLOB_GET_DRIVER_OR_BUSINESS_BOOKING_STATUS_VALUE_FROM_ENTITY_STATUS(tempStatus);
        }
        else if (GLOB_CURRENT_BusinessId > 0) {
            tempStatusarr = FUN_GLOB_GET_DRIVER_OR_BUSINESS_BOOKING_STATUS_VALUE_FROM_ENTITY_STATUS(tempStatus);
        }
        tempStatusarr = tempStatusarr.toString().split(',');
    }
    if ((objBusinessData.EntityStatus & 128) == 128) {
        DivBookingStatus_16_Contnet = DivBookingStatus_16_Contnet.replace(/{BUSINESSBOOKING_16_BOOKING_STATUS_BTN_DISPLAY}/g, "none");
        DivBookingStatus_16_Contnet = DivBookingStatus_16_Contnet.replace(/{BUSINESSBOOKING_16_BOOKING_STATUS_DISPLAY}/g, "block");
        DivBookingStatus_16_Contnet = DivBookingStatus_16_Contnet.replace(/{BUSINESSBOOKING_16_BOOKING_STATUS_TEXT_COLOR}/g, "red");
        DivBookingStatus_16_Contnet = DivBookingStatus_16_Contnet.replace(/{BUSINESSBOOKING_16_BOOKING_STATUS_TEXT}/g, "Not Required");
    }
    if ((objBusinessData.EntityStatus & 16) == 16) {
        DivBookingStatus_16_Contnet = DivBookingStatus_16_Contnet.replace(/{BUSINESSBOOKING_16_BOOKING_STATUS_BTN_DISPLAY}/g, "none");
        DivBookingStatus_16_Contnet = DivBookingStatus_16_Contnet.replace(/{BUSINESSBOOKING_16_BOOKING_STATUS_DISPLAY}/g, "block");
        DivBookingStatus_16_Contnet = DivBookingStatus_16_Contnet.replace(/{BUSINESSBOOKING_16_BOOKING_STATUS_TEXT_COLOR}/g, "green");
        DivBookingStatus_16_Contnet = DivBookingStatus_16_Contnet.replace(/{BUSINESSBOOKING_16_BOOKING_STATUS_TEXT}/g, "Completed");
    }
    else {
        if (tempStatus != undefined && tempStatusarr.length > 0) {
            if (objBusinessData.EntityStatus == 2) {
                DivBookingStatus_16_Contnet = DivBookingStatus_16_Contnet.replace(/{BUSINESSBOOKING_16_BOOKING_STATUS_BTN_DISPLAY}/g, "none");
                DivBookingStatus_16_Contnet = DivBookingStatus_16_Contnet.replace(/{BUSINESSBOOKING_16_BOOKING_STATUS_DISPLAY}/g, "block");
                DivBookingStatus_16_Contnet = DivBookingStatus_16_Contnet.replace(/{BUSINESSBOOKING_16_BOOKING_STATUS_TEXT_COLOR}/g, "red");
                DivBookingStatus_16_Contnet = DivBookingStatus_16_Contnet.replace(/{BUSINESSBOOKING_16_BOOKING_STATUS_TEXT}/g, "Declined");
            }
            else {
                for (var i = 0; i < tempStatusarr.length; i++) {

                    var tempBookingEntityStatusArray = $.grep(CONF_BOOKINGSTATUS_ARRAY_FOR_POPUP, function (e) { return parseInt(e.value) == tempStatusarr[i] });
                    $(".Business_Booking_16_seleBookingStatusType").append('<option value=' + tempBookingEntityStatusArray[0]["value"] + '>' + tempBookingEntityStatusArray[0]["Title"] + '</option>');
                }
            }
        }
        else {
            if (getLocalStorageData("PersonId") > 0 || GLOB_CURRENT_DriverId > 0) {

                tempBtnBookingStatusDisplay = "none";
                tempDisplayContent = 'block';
                tempBookingText = FUN_GLOB_GET_PASSENGER_BOOKING_STATUS_VALUE_FROM_ENTITY_STATUS(tempStatus);
                if (objBusinessData.QuoteOnly == true) {
                    DivBookingStatus_16_Contnet = DivBookingStatus_16_Contnet.replace(/{BUSINESSBOOKING_16_BOOKING_DISPLAY_REQUEST_PICK_UP_BTN}/g, 'show');
                    tempBookingText = "Quote";
                    tempDisplayContent = "none";
                }
                else
                    DivBookingStatus_16_Contnet = DivBookingStatus_16_Contnet.replace(/{BUSINESSBOOKING_16_BOOKING_DISPLAY_REQUEST_PICK_UP_BTN}/g, 'hide');
                DivBookingStatus_16_Contnet = DivBookingStatus_16_Contnet.replace(/{BUSINESSBOOKING_16_BOOKING_STATUS_DISPLAY}/g, tempDisplayContent);
                DivBookingStatus_16_Contnet = DivBookingStatus_16_Contnet.replace(/{BUSINESSBOOKING_16_BOOKING_STATUS_TEXT}/g, tempBookingText);
                DivBookingStatus_16_Contnet = DivBookingStatus_16_Contnet.replace(/{BUSINESSBOOKING_16_BOOKING_STATUS_TEXT_COLOR}/g, tempBookingTextColor);
            }
        }
        DivBookingStatus_16_Contnet = DivBookingStatus_16_Contnet.replace(/{BUSINESSBOOKING_16_BOOKING_STATUS_BTN_DISPLAY}/g, tempBtnBookingStatusDisplay);
    }


    if (objBusinessData.EntityTelephone == null || objBusinessData.EntityTelephone == undefined)
        objBusinessData.EntityTelephone = "";
    var tempTelephoneDivContent = "";
    //if (objBusinessData.EntityTelephone != null) {
    if (objBusinessData.EntityTelephone != null && objBusinessData.EntityTelephone.length > 2) {
        tempCommentImageDisplayClass = 'inline-block';
        tempTelephoneDivContent = "<div class='h2InfoBoxDescriptionWindowLandPhone'><div><h2 class='h2PinPopup textcenter'><img src=" + GetCountryFlagFromCountryCode(objBusinessData.EntityTelephone.substr(0, 2)) + " class='PhoneCountryFlagIcon' style='display:" + tempCommentImageDisplayClass + "'/>" + GLOB_GetTelePhoneNumber(objBusinessData.EntityTelephone) + "</div></h2><div class='clear'></div><div class='DivInfoBoxDescriptionWindowRating' style='padding-left:20px !important;'>";
    }
    //}
    if (EntityType == 16) {
        //        if (GLOB_CURRENT_BusinessId == 0 && GLOB_CURRENT_DriverId == 0 && CurrentPosition == 1 && LocationTracking == 1 && parseInt(objBusinessData.EntityStatus) < 24) {
        //                return GetBusinessTrackingContent(objBusinessData, pinIcon);
        //        }
        if (CurrentPosition == 0 && LocationTracking == 1) {
            if (LocationPhoto > 0)
                return GetBookingPerviousTrackingContent(objBusinessData, pinIcon);
            else
                return GetBookingPerviousTrackingContent(objBusinessData, pinIcon);
        }
        else {
            var tempShowPassengerContactDiv = "none";
            if (parseInt(objBusinessData.EntityStatus) == 1)
                tempShowPassengerContactDiv = 'block';
            DivBookingStatus_16_Contnet = DivBookingStatus_16_Contnet.replace(/{SHOWPASSENGERCONTACTDIV}/g, tempShowPassengerContactDiv);

            var tempIsBusinessPerson = 'hide';
            if (GLOB_MAPPINGSEA_PARA.DriverId != 0 || GLOB_MAPPINGSEA_PARA.BusinessId != 0)
                tempIsBusinessPerson = 'show';
            //Display Passenger Contact div if Entity Status > 0 (Accepted)
            //

            DivBookingStatus_16_Contnet = DivBookingStatus_16_Contnet.replace(/{BUSINESSBOOKING_16_IS_BUSINESS}/g, tempIsBusinessPerson);
            var PersonImageDiv = "<img src='" + loadCurrentUserProfileImage(objBusinessData.BusinessId) + "' class='imgRounded' />";
            var tempVehicleType = GetVehicleTypeFromBinaryValue(objBusinessData.VehicleTypes);
            var tmepVideoCallBusinessId = objBusinessData.BusinessId + "_" + objBusinessData.DriverId + "_0_0_0";
            DivBookingStatus_16_Contnet = DivBookingStatus_16_Contnet.replace(/{Booking_Status_16_Video_Booking_BUSINESSID}/g, tmepVideoCallBusinessId);
            DivBookingStatus_16_Contnet = DivBookingStatus_16_Contnet.replace(/{Booking_Status_16_Booking_BUSINESSID}/g, objBusinessData.BusinessId);
            DivBookingStatus_16_Contnet = DivBookingStatus_16_Contnet.replace(/{Booking_Status_16_Booking_DRIVERID}/g, objBusinessData.DriverId);
            DivBookingStatus_16_Contnet = DivBookingStatus_16_Contnet.replace(/{Booking_Status_16_Booking_PERSONID}/g, objBusinessData.PersonId);
            DivBookingStatus_16_Contnet = DivBookingStatus_16_Contnet.replace(/{Booking_Status_16_Booking_Alt_Text}/g, objBusinessData.EntityDescription);

            //DivBookingStatus_16_Contnet = DivBookingStatus_16_Contnet.replace(/{Booking_Status_16_From_Lat}/g, objBusinessData.EntityDescription);


            DivBookingStatus_16_Contnet = DivBookingStatus_16_Contnet.replace(/{Booking_Status_16_Booking_BOOKINGID}/g, objBusinessData.BookingId);
            DivBookingStatus_16_Contnet = DivBookingStatus_16_Contnet.replace(/{Booking_Status_16_Booking_VEHICLETYPE}/g, objBusinessData.VehicleTypes);
            DivBookingStatus_16_Contnet = DivBookingStatus_16_Contnet.replace(/{LAT}/g, objBusinessData.Latitude);
            DivBookingStatus_16_Contnet = DivBookingStatus_16_Contnet.replace(/{LNG}/g, objBusinessData.Longitude);
            DivBookingStatus_16_Contnet = DivBookingStatus_16_Contnet.replace(/{BUSINESSBOOKING_16_DRIVERID}/g, objBusinessData.DriverId);
            DivBookingStatus_16_Contnet = DivBookingStatus_16_Contnet.replace(/{BUSINESSBOOKING_16_RATING}/g, objBusinessData.Rating);
            DivBookingStatus_16_Contnet = DivBookingStatus_16_Contnet.replace(/{BUSINESSBOOKINGTITLE}/g, objBusinessData.EntityTitle);
            DivBookingStatus_16_Contnet = DivBookingStatus_16_Contnet.replace(/{BUSINESSBOOKING_16_COMMENTCOUNT}/g, objBusinessData.CommentCount);
            if (objBusinessData.EntityTelephone != null || objBusinessData.EntityTelephone != undefined || objBusinessData.EntityTelephone != '') {
                DivBookingStatus_16_Contnet = DivBookingStatus_16_Contnet.replace(/{BUSINESSBOOKING_16_CURRENT_TELEPHONE}/g, objBusinessData.EntityTelephone);
                DivBookingStatus_16_Contnet = DivBookingStatus_16_Contnet.replace(/{BUSINESSBOOKING_16_TELEPHONE}/g, GLOB_GetTelePhoneNumber(objBusinessData.EntityTelephone));
                DivBookingStatus_16_Contnet = DivBookingStatus_16_Contnet.replace(/{BUSINESSBOOKING_16_CONTACT_TELEPHONE}/g, GLOB_GetTelePhoneNumber(objBusinessData.EntityTelephone));
            }
            var tempIds = "0_0_0";
            if (getLocalStorageData("PersonId") > 0)
                tempIds = objBusinessData.BusinessId + "," + objBusinessData.DriverId + "," + 0;
            else if (GLOB_CURRENT_DriverId > 0 && GLOB_CURRENT_BusinessId > 0)
                tempIds = 0 + "," + 0 + "," + 0;
            else if (GLOB_CURRENT_BusinessId > 0)
                tempIds = 0 + "," + 0 + "," + objBusinessData.DriverId;
            DivBookingStatus_16_Contnet = DivBookingStatus_16_Contnet.replace(/{Booking_Status_16_IDS}/g, tempIds);
            var tempCabIcon = "";
//            if (pinIcon == null) {
               // tempCabIcon = loadCurrentBusinessProfileImage(objBusinessData.EntityPicture);

           // }
            //else {
                //if (pinIcon.length == undefined)
                    tempCabIcon = DomainNameSource + "/images/cab-icon.png";
               // else
               //     tempCabIcon = pinIcon;
            //}
            if (objBusinessData.QuoteOnly == true)
                DivBookingStatus_16_Contnet = DivBookingStatus_16_Contnet.replace(/{BUSINESSBOOKING_16_BOOKING_DISPLAY_REQUEST_PICK_UP_BTN}/g, 'show');
            else
                DivBookingStatus_16_Contnet = DivBookingStatus_16_Contnet.replace(/{BUSINESSBOOKING_16_BOOKING_DISPLAY_REQUEST_PICK_UP_BTN}/g, 'hide');

            if (objBusinessData.EntityTelephone == null || objBusinessData.EntityTelephone == undefined || objBusinessData.EntityTelephone == '')
                objBusinessData.EntityTelephone = "";
            var tempTelephoneDivContent = "";
            if (objBusinessData.EntityTelephone.length > 2) {
                tempCommentImageDisplayClass = 'inline-block';
                tempTelephoneDivContent = "<div class='h2InfoBoxDescriptionWindowLandPhone'><div><h2 class='h2PinPopup textcenter'><img src=" + GetCountryFlagFromCountryCode(objBusinessData.EntityTelephone.substr(0, 2)) + " class='PhoneCountryFlagIcon' style='display:" + tempCommentImageDisplayClass + "'/>" + GLOB_GetTelePhoneNumber(objBusinessData.EntityTelephone) + "</div></h2><div class='clear'></div><div class='DivInfoBoxDescriptionWindowRating' style='padding-left:20px !important;'>";
            }

            DivBookingStatus_16_Contnet = DivBookingStatus_16_Contnet.replace(/{BUSINESSBOOKING_CONTACT_US_16_CABIMG}/g, ImageWebServicesUrl + objBusinessData.BusinessId);
            var tempImageIds = objBusinessData.BusinessId + "_" + objBusinessData.DriverId + "_" + objBusinessData.PersonId + "_" + objBusinessData.BookingId;
            if (getLocalStorageData("PersonId") != 0) {
                DivBookingStatus_16_Contnet = DivBookingStatus_16_Contnet.replace(/{BUSINESSBOOKING_Inner_16_CABIMG}/g, ImageWebServicesUrl + objBusinessData.BusinessId + "_" + objBusinessData.DriverId);
                DivBookingStatus_16_Contnet = DivBookingStatus_16_Contnet.replace(/{BUSINESSBOOKING_16_CABIMG}/g, ImageWebServicesUrl + objBusinessData.BusinessId + "_" + objBusinessData.DriverId);
            }
            else if (GLOB_CURRENT_BusinessId != 0 || GLOB_CURRENT_DriverId != 0) {
                DivBookingStatus_16_Contnet = DivBookingStatus_16_Contnet.replace(/{BUSINESSBOOKING_Inner_16_CABIMG}/g, ImageWebServicesUrl + "0_0_" + objBusinessData.PersonId);
                DivBookingStatus_16_Contnet = DivBookingStatus_16_Contnet.replace(/{BUSINESSBOOKING_16_CABIMG}/g, ImageWebServicesUrl + "0_0_" + objBusinessData.PersonId);
            }

            var tempCursorType = "default";
            var DisplayTrackingDiv = "none", DisplayWithOutTrackingDiv = "block";
            if (parseInt(objBusinessData.EntityStatus) == 13 || parseInt(objBusinessData.EntityStatus) == 9) {
                tempCursorType = "pointer";
                DisplayTrackingDiv = "block";
                DisplayWithOutTrackingDiv = "none";
            }

            DivBookingStatus_16_Contnet = DivBookingStatus_16_Contnet.replace(/{BUSINESSBOOKING_16_UPLOAD_WITHOUT_TRACKING_DIV}/g, DisplayWithOutTrackingDiv);
            DivBookingStatus_16_Contnet = DivBookingStatus_16_Contnet.replace(/{BUSINESSBOOKING_16_INNER_IMAGE_CURSOR_TYPE}/g, tempCursorType);
            DivBookingStatus_16_Contnet = DivBookingStatus_16_Contnet.replace(/{BUSINESSBOOKING_16_UPLOAD_TRACKING_DIV}/g, DisplayTrackingDiv);

            DivBookingStatus_16_Contnet = DivBookingStatus_16_Contnet.replace(/{BUSINESSBOOKING_16_COUNTRYIMG}/g, GetCountryFlagFromCountryCode(objBusinessData.EntityTelephone.substr(0, 2)));
            DivBookingStatus_16_Contnet = DivBookingStatus_16_Contnet.replace(/{Booking_Status_16_Booking_REGISTRATIONTYPE}/g, objBusinessData.RegistrationType);
            DivBookingStatus_16_Contnet = DivBookingStatus_16_Contnet.replace(/{BUSINESSBOOKING_16_BUSINESSFROMADDRESS}/g, objBusinessData.StartAddress);
            DivBookingStatus_16_Contnet = DivBookingStatus_16_Contnet.replace(/{Booking_Status_16_BUSINESSFROMADDRESS_Booking_Alt_Text}/g, objBusinessData.StartAddress);
            var tempBusiness16_ToAddress = objBusinessData.EndAddress;
            if (objBusinessData.EndAddress == null || objBusinessData.EndAddress == '')
                tempBusiness16_ToAddress = 'Will tell driver';
            DivBookingStatus_16_Contnet = DivBookingStatus_16_Contnet.replace(/{BUSINESSBOOKING_16_BUSINESSTOADDRESS}/g, tempBusiness16_ToAddress);
            DivBookingStatus_16_Contnet = DivBookingStatus_16_Contnet.replace(/{Booking_Status_16_BUSINESSTOADDRESS_Booking_Alt_Text}/g, tempBusiness16_ToAddress);
            var tempBusiness16_BookingNotes = objBusinessData.BookingNotes;
            if (objBusinessData.BookingNotes == null || objBusinessData.BookingNotes == '')
                tempBusiness16_BookingNotes = 'No special requirements';
            DivBookingStatus_16_Contnet = DivBookingStatus_16_Contnet.replace(/{BUSINESSBOOKING_16_BUSINESSNOTES}/g, tempBusiness16_BookingNotes);
            DivBookingStatus_16_Contnet = DivBookingStatus_16_Contnet.replace(/{Booking_Status_16_BUSINESSNOTES_Booking_Alt_Text}/g, tempBusiness16_BookingNotes);
            var tempActualCostText = "";
            //alrt(objBusinessData);
            if (objBusinessData.PassengerCost != null && parseFloat(objBusinessData.PassengerCost) > 0) {
                tempActualCostText = parseFloat(objBusinessData.PassengerCost).toFixed(2);
            }
            else if (objBusinessData.ActualCost != null && parseFloat(objBusinessData.ActualCost) > 0) {
                tempActualCostText = parseFloat(objBusinessData.ActualCost).toFixed(2);
            }
            else if (objBusinessData.EstimatedCost != null && parseFloat(objBusinessData.EstimatedCost) > 0) {
                tempActualCostText = parseFloat(objBusinessData.EstimatedCost).toFixed(2);
            }
            else
                tempActualCostText = "0.00";
            DivBookingStatus_16_Contnet = DivBookingStatus_16_Contnet.replace(/{BUSINESSBOOKING_16_BUSINESSESTIMATEDCOST}/g, tempActualCostText);
            
            DivBookingStatus_16_Contnet = DivBookingStatus_16_Contnet.replace(/{BUSINESSBOOKING_16_BUSINESSREQUIREDDATETIME}/g, $.formatDateTime(CONF_NEW_PIN_8_DATE_TIME, new Date(Date.parse(objBusinessData.RequiredDateTime))));
            DivBookingStatus_16_Contnet = DivBookingStatus_16_Contnet.replace(/{BUSINESSBOOKING_16_BUSINESSREDISABLEDACCESSIMG}/g, tempDisabledAccess);
            DivBookingStatus_16_Contnet = DivBookingStatus_16_Contnet.replace(/{BUSINESSBOOKING_16_BUSINESSREFEMALEDRIVERIMG}/g, tempFemaleDriver);

            var tempFavouriteText = "Add Favourite";
            var tempFavourite = 0;
            if (objBusinessData.Favourite == 1) {
                tempFavouriteText = "Remove Favourite";
                tempFavourite = 1;
            }
            var tempISBusinessOrDriver = 'none';
            if (getLocalStorageData("PersonId") != 0)
                tempISBusinessOrDriver = 'inline-block';

            DivBookingStatus_16_Contnet = DivBookingStatus_16_Contnet.replace(/{SHOW_BUSINESSBOOKING_16_ADD_TO_FAVOURITES}/g, tempISBusinessOrDriver);
            DivBookingStatus_16_Contnet = DivBookingStatus_16_Contnet.replace(/{Booking_Status_16_Booking_Favourites}/g, tempFavourite);
            DivBookingStatus_16_Contnet = DivBookingStatus_16_Contnet.replace(/{Booking_Status_16_Booking_FAVOURITESTEXT}/g, tempFavouriteText);

            if (objBusinessData.EntityTelephone == undefined || objBusinessData.EntityTelephone == null)
                objBusinessData.EntityTelephone = "";
            if (objBusinessData.EntityTelephone.length == 0)
                DivBookingStatus_16_Contnet = DivBookingStatus_16_Contnet.replace(/{IMG_BUSINESSBOOKING_16_COUNTRYIMG}/g, 'hide');
            DivBookingStatus_16_Contnet = DivBookingStatus_16_Contnet.replace(/{BUSINESSBOOKING_16_BUSINESSADDRESS}/g, objBusinessData.EntityDescription);
            var tempUserBookingStatus = "";
            if (objBusinessData.EntityStatus == 0) {
                tempUserBookingStatus = FUN_GLOB_GET_BOOKING_STATUS_VALUE_FROM_ENTITY_STATUS(objBusinessData.EntityStatus);
            }
            else {
                var tempBookingStatus = [];
                tempBookingStatus = GetVehicleTypeFromBinaryValue(objBusinessData.EntityStatus);
                tempBookingStatus.sort(DescendingNumberSort).reverse();
                tempUserBookingStatus = FUN_GLOB_GET_BOOKING_STATUS_VALUE_FROM_ENTITY_STATUS($(tempBookingStatus).last()[0]);
            }
            DivBookingStatus_16_Contnet = DivBookingStatus_16_Contnet.replace(/{BUSINESSBOOKING_16_BOOKINGSTATUS}/g, tempUserBookingStatus);
            var tempEntityStatusColor = FUN_GLOB_GET_BOOKING_STATUS_COLOR_FROM_ENTITY_STATUS(objBusinessData.EntityStatus);
            var tempDisplayVehicleType = 'hide', tempBookingVehicleType = "";
            if (objBusinessData.VehicleTypes != 0) {
                tempDisplayVehicleType = 'show';
                tempBookingVehicleType = DomainName + "/DATA/images/cab_images/" + $.grep(CONF_CARTYPES, function (e) { return e.value == objBusinessData.VehicleTypes })[0]["Image"];
            }

            DivBookingStatus_16_Contnet = DivBookingStatus_16_Contnet.replace(/{BUSINESSBOOKING_16_BOOKING_STATUS_VEHICLETYPE}/g, tempBookingVehicleType);
            DivBookingStatus_16_Contnet = DivBookingStatus_16_Contnet.replace(/{BUSINESSBOOKING_16_BOOKING_STATUS_VEHICLETYPE_CSS}/g, tempDisplayVehicleType);

            DivBookingStatus_16_Contnet = DivBookingStatus_16_Contnet.replace(/{Div_Booking_Status_Picked_and_Noshow_visibility}/g, 'hide');
            DivBookingStatus_16_Contnet = DivBookingStatus_16_Contnet.replace(/{Div_Booking_Status_Arrived_visibility}/g, 'hide');
            DivBookingStatus_16_Contnet = DivBookingStatus_16_Contnet.replace(/{Div_Booking_Status_BookingFeedBack_visibility}/g, 'hide');
            DivBookingStatus_16_Contnet = DivBookingStatus_16_Contnet.replace(/{Div_Booking_Status_16_NonShow_visibility}/g, 'hide');
            DivBookingStatus_16_Contnet = DivBookingStatus_16_Contnet.replace(/{ENTITYSTATUSCOLOR}/g, tempEntityStatusColor);

            var tempDetails = DivBookingStatus_16_Contnet;
        	$(".DivAppendChildData").html(tempDetails).show();
        	$scope.opentempPinPopUpE1();    
            //return DivBookingStatus_16_Contnet;
        }
    }	
}

function getPinPopUpContent_4(objBusiness,$scope,$http){
	var EntityType = objBusiness.EntityType;
    var CurrentPosition = objBusiness.CurrentPosition;
    var LocationTracking = objBusiness.LocationTracking;
    var LocationPhoto = objBusiness.LocationPhoto;
	if(getLocalStorageData("PersonId") != undefined && parseInt(getLocalStorageData("PersonId")) > 0 && getLocalStorageData("PersonId") != "null" && getLocalStorageData("PersonId") != null){
		if (CurrentPosition == false && LocationTracking == true) {
            if (LocationPhoto == true) {
                return get_Person_Pervious_Tracking_PopupTitleDiv(objBusiness.Latitude, objBusiness.Longitude, objBusiness, pinIcon);
            }
            else if (objBusiness.IsFriend == true) {
                return getMapPopupTitleDiv_Person(objBusiness.Latitude, objBusiness.Longitude, objBusiness, false, pinIcon);
            }
            else if (objBusiness == true && LocationTracking == false) {
                return getMapPopupTitleDiv_Person(objBusiness.Latitude, objBusiness.Longitude, objBusiness, false, pinIcon);
            }
            else {
                //return get_Person_Pervious_Tracking_PopupTitleDiv(objBusinessData.Latitude, objBusinessData.Longitude, objBusinessData, pinIcon);
            	get_Person_Pervious_Tracking_PopupTitleDiv(objBusiness,$scope);
            }
        }
        else {
            //alrt("in else part" + CurrentPosition +":"+LocationTracking);
            if (CurrentPosition == true && LocationTracking == true) {
                //ImageHoverProperty('57', '20');
                return get_Person_Tracking_Div(objBusiness,$scope);
            }
            GetPersonWithLoggedInData(objBusiness,$scope);
        }
		
	}
	else{
		GetPersonWithOutLoggedInData(objBusiness,$scope);
	}
}

function get_Person_Pervious_Tracking_PopupTitleDiv(objBusiness,$scope,$http) {
    var DivPopTitle = "";

    var rightArrowImage = DomainNameSource + "/images/Map_pins/arrow_right.png";
    var downArrowImage = DomainNameSource + "/images/Map_pins/arrow_down.png";
    var tempCabIcon = "",tempPersonId = getLocalStorageData("PersonId");
    var PersonImageServices = 'https://imagewebservice.azurewebsites.net/LogoImage.aspx?Logo=0_0_' +tempPersonId;
    DivPopTitle =
                            "<div class='DivPopTitle DivPopUpTitle fl' style='width:265px;!important;'>" +
                                "<div class='DivVerticalMiddle'>";

    
    tempCommentCount = objBusiness.CommentCount;
   
        tempCabIcon = "<a href='javascript:void(0);' onClick='javascript:ShowStreetView(" + objBusiness.Latitude + "," + objBusiness.Longitude + ");'>" +
                                                                "<img src='" + PersonImageServices + "' style='width:21px;vertical-align:middle;'/>" +
                                                           "</a>";
    

    DivPopTitle += "<div class='DivPersonPopUp_Header_Cab_Background_Icon'>" + tempCabIcon + "</div>" +
                                   "<div class='DivInfoBoxTitleContentWidth'>" +
                                        "<h5 class='textcenter margin0 DivInfoBoxTitleContentText' >" + objBusiness.EntityTitle + "</h5>" +
                                    "<div><div class='MainStar fl' style='margin-left:23px;'>" +
                                        "<div class='smallstar" + objBusiness.Rating + " fl' style='border:none;'></div></div>&nbsp;&nbsp;" + tempCommentCount + " Reviews" +
                                    "</div></div>" +
                                    "<div class='DivInfoBoxRightContentWidth' >" +
                                        "<a href='javascript:void(0);'  value='linkValue' class='linkDispalyPopFullContent' to='down'>" +
                                            "<img class='DivArrowImage DivInfoBoxTitleRightImgBackgroundWidth PopupArrowImageRight hide' onclick='javascript:showPopUpDesc(this)' src='" + rightArrowImage + "'/>" +
                                            "<img class='DivArrowImage DivInfoBoxTitleRightImgBackgroundWidth PopupArrowImageDown' src='" + downArrowImage + "' onclick='javascript:hidePopUpDesc(this)'/>" +
                                         "</a>" +
                                     "</div>" +
                               "</div>" +
                                get_Person_Pervious_Tracking_PopupDescriptionDiv(objBusiness)
    "</div>";
    var tempDetails = DivPopTitle;
	$(".DivAppendChildData").html(tempDetails).show();
	$scope.opentempPinPopUpE1();    
}

function get_Person_Pervious_Tracking_PopupDescriptionDiv(objBusiness) {
    var personId = objBusiness.PersonId;
    var fullName = objBusiness.EntityTitle;
    var templat = objBusiness.Latitude;
    var templng = objBusiness.Longitude;
    var telephone = objBusiness.EntityTelephone;
    var fromaddress = objBusiness.EntityAddress;
    var CurrentUserTrackingImage = objBusiness.LocationPhoto;
    var LocationDateTime = objBusiness.LastLocated;
    var LocationPhoto = objBusiness.LocationPhoto;
    var CabImage = DomainNameSource + "/images/cab-icon.png ";

    var btnChat = "", ContentHeight = 0, ButttonClass = "", DivUserComments = "";
    ButttonClass = "btnyellow fr";

    var PersonImageDiv = "";

    if (CurrentUserFullDetails.length == 0) {
        ContentHeight = "190px";
        PersonImageDiv = "<img src='" + loadCurrentUserProfileTrackingPerviousImage(CurrentUserTrackingImage, personId) + "' class='PinPopUpDescriptionWindowImage' />";
    }
    else if (CurrentUserFullDetails != undefined) {
        ContentHeight = "220px";
        var personCurrentUserdetail = CurrentUserFullDetails;
        var personCurrentUserdetail_photo = personCurrentUserdetail["PersonPhotoPath"];
        if (LocationPhoto == true) {
            var tempLink = "0_0_" + personId + "_0_" + LocationDateTime;
           PersonImageDiv = "<img src='" + Location_Photo_WebServiceUrl + tempLink + "' class='PinPopUpDescriptionWindowImage' style='padding: 8px 5px 5px 5px;max-height: 60px !important;max-width: 80px !important;height: auto;width: auto !important;' />";
        }
        else
        {
            if (DivPopDescriptionWidth == "221px") {
                PersonImageDiv = "<img src='" + loadCurrentUserProfileTrackingPerviousImage(CurrentUserTrackingImage, personId) + "' class='PinPopUpDescriptionWindowImage' />";
        }
        else {
            PersonImageDiv = "<img src='" + +loadCurrentUserProfileTrackingPerviousImage(CurrentUserTrackingImage, personId) + +"' class='PinPopUpDescriptionWindowImage' />";
        }
        }
        
    }

    var DivPopDescription = "";
    var popDownImage = DomainNameSource + "/images/Pop_down.png";
    var img_exclusive_hire_cars = DomainNameSource + "/images/exclusive_hire_cars/cars.png";
    if (GLOB_CURRENT_BusinessId == 0) {
        if (CurrentUserFullDetails != undefined) {
            DivPopDescription = "<div class='PersonBusinessInfowindow BusinessInfowindow' style='width:250px;display: inline-block;'><input type='hidden' value='B' class='txtHiddenUserType' />" +
                    "<div class='DivPersonParentPopUpDescription'>" +
                    "<div class='DivParentPopUpDescription'>" +
                        "<div class='fl imgRounded'>" + PersonImageDiv + "</div>" +
                        "<div class='DivInfoBoxDescriptionWindowLeftSideContent'>" +
                        "<div class='h2InfoBoxDescriptionWindowLandPhone textcenter' style='float:none;'>" +
                            "<h4 style='padding:0px !important;margin:0px !important;'>" + fullName + "</h4>" +
            //                                "<a href='javascript:void(0);' onClick='javascript:functionGetPersonCommetns($(this));'>" +
                                    "<div class='DivInfoBoxDescriptionWindowRating'>" +
                                        "<div class='MainBigStar ' style='margin:0px auto;'>" +
                                            "<div class='Bigstar" + objBusiness.Rating + "'></div>" +
                                        "</div>" +
                                    "</div>";
            //                                   "</a>" +
            if (LocationDateTime != null && LocationDateTime != '') {
                DivPopDescription += "<p class='PElementInfoBoxDescriptionWindow BoxIndentedStyle fl' style='width:133px;'>" + $.formatDateTime(CONF_NEW_TRACKING_DATE_TIME, new Date(LocationDateTime)); + "</p>";
            }
            DivPopDescription += "</div>" +
                            "</div>" +
                            "<div class='clear'></div>";


            if (fromaddress != null && fromaddress != '') {
                DivPopDescription += "<p class='PElementInfoBoxDescriptionWindow BoxIndentedStyle'>" + fromaddress + "</p>";
            }
            DivPopDescription += "<div class='clear'></div>" +
                    "</div></div>";
        }
    }
    return DivPopDescription;
}

function loadCurrentUserProfileTrackingPerviousImage(TrackingImage,PersonId) {
    if (TrackingImage != undefined) {
        var CurrentUserProfileImage = TrackingImage;

        if (TrackingImage == null || TrackingImage == '')
            return (ImageWebServicesUrl + "0_0_" + PersonId);
        else
            return ('data:image/*;base64,' + TrackingImage);
    }
    else
        return (ImageWebServicesUrl + "0_0_" + PersonId);
}

function GetPersonWithOutLoggedInData(objBusiness,$scope)
{
	var rightArrowImage = DomainNameSource + "/images/Map_pins/arrow_right.png";
	var downArrowImage = DomainNameSource + "/images/Map_pins/arrow_down.png";
	var tempCabIcon = "<a href='javascript:void(0);' onClick='javascript:ShowStreetView(" + objBusiness.Latitude + "," + objBusiness.Longitude + ");'>" +
    					"<img src='https://imagewebservice.azurewebsites.net/LogoImage.aspx?Logo=0_0_-1' style='width:21px;vertical-align:middle;margin-top:3px;' class='DivInfoBoxTitleLeftImgWidth'/>" +
					 "</a>";
			var DivPopTitle ="<div class='DivPopTitle DivPopUpTitle fl' style='width:265px;!important;'>" +
            				"<div class='DivVerticalMiddle'>"+
								"<div class='DivPersonPopUp_Header_Cab_Background_Icon'>" + tempCabIcon + "</div>" +
						    "<div class='DivInfoBoxTitleContentWidth'>" +
						         "<h5 class='textcenter margin0 DivInfoBoxTitleContentText' >" + objBusiness.EntityAddress + "</h5>" +
						     "<div><div class='MainStar fl' style='margin-left:23px;'>" +
						         "<div class='smallstar" + objBusiness.Rating + " fl' style='border:none;'></div></div>&nbsp;&nbsp;" + objBusiness.CommentCount + " Reviews" +
						     "</div></div>" +
						     "<div class='DivInfoBoxRightContentWidth' >" +
						         "<a href='javascript:void(0);'  value='linkValue' class='linkDispalyPopFullContent' to='down'>" +
						             "<img class='DivArrowImage DivInfoBoxTitleRightImgBackgroundWidth PopupArrowImageRight hide' onclick='javascript:showPopUpDesc(this)' src='" + rightArrowImage + "'/>" +
						             "<img class='DivArrowImage DivInfoBoxTitleRightImgBackgroundWidth PopupArrowImageDown ' src='" + downArrowImage + "' onclick='javascript:hidePopUpDesc(this)'/>" +
						          "</a>" +
						      "</div>" +
		"</div>" +
			getPersonWithOutLoggedInPopupDescriptionDiv()
		"</div>";
		var tempDetails = DivPopTitle;
		$(".DivAppendChildData").html(tempDetails).show();
		$scope.opentempPinPopUpE1();
}

function get_Person_Tracking_Div(objBusinessData,$scope) {
    var getCurrentUserData = CurrentUserFullDetails;
    var DivTrackingCotnet = $('.DivPersonEmergencyTracking').html();
    var tempPersonId = getLocalStorageData("PersonId");
    var PersonImageServices = 'https://imagewebservice.azurewebsites.net/LogoImage.aspx?Logo=0_0_' +tempPersonId;
    var PersonImageDiv = "<img src='" + PersonImageServices + "' class='imgRounded' />";
    DivTrackingCotnet = DivTrackingCotnet.replace(/{PERSONTRACKINGPERSONID}/g, objBusinessData.PersonId);
    DivTrackingCotnet = DivTrackingCotnet.replace(/{LAT}/g, objBusinessData.Latitude);
    DivTrackingCotnet = DivTrackingCotnet.replace(/{LNG}/g, objBusinessData.Longitude);
    DivTrackingCotnet = DivTrackingCotnet.replace(/{PERSONTRACKINGTITLE}/g, objBusinessData.EntityTitle);
    if (getLocalStorageData("PersonId") != 0)
        DivTrackingCotnet = DivTrackingCotnet.replace(/{PERSONTRACKINGIMAGE}/g, PersonImageServices);
    else
        DivTrackingCotnet = DivTrackingCotnet.replace(/{PERSONTRACKINGIMAGE}/g, PersonImageServices);

    DivTrackingCotnet = DivTrackingCotnet.replace(/{PERSONCURRENTADDRESS}/g, getLocalStorageData("Address"));

    //return DivTrackingCotnet;
    var tempDetails = DivTrackingCotnet;
	$(".DivAppendChildData").html(tempDetails).show();
	$scope.opentempPinPopUpE1();
}

function getPersonWithOutLoggedInPopupDescriptionDiv(){
			var DivPopDescription = "<div class='PersonBusinessInfowindow BusinessInfowindow' style='width:250px;'>" +
				    "<div class='DivPersonParentPopUpDescription' style='padding:0px 3px !important;display:inline-block;width:100%;'>" +
				    	"<div class='clear'></div>" +
						   "<div class='textcenter'>" +
						        "<span class='spanBookingContentText'>Please Sign or<br> If you are new in safecab<br>please Register</span>" +
						    "</div>" +
						    "<div class='clear'></div><div class='textcenter'><a onClick='javascript:ShowPersonSignIn()'><input type='button' class='btnyellow' value='Sign In or Register' /></a></div>" +
						    "</div>" +
				   "</div>";
		return DivPopDescription;
}

function GetPersonWithLoggedInData(objBusiness,$scope){
	getPersonPinPopUpDiv(objBusiness,$scope);
}

function getPersonPinPopUpDiv(objBusiness,$scope) {
    var DivPopTitle = "",DivCustomStyle="";
    var rightArrowImage = DomainNameSource + "/images/Map_pins/arrow_right.png";
    var downArrowImage = DomainNameSource + "/images/Map_pins/arrow_down.png";
    DivPopTitle =
                            "<div class='DivPopTitle DivPopUpTitle fl' style='width:265px;!important;'>" +
                                "<div class='DivVerticalMiddle'>";

    var tempCabIcon = "",tempPersonId = getLocalStorageData("PersonId");
    var PersonImageServices = 'https://imagewebservice.azurewebsites.net/LogoImage.aspx?Logo=0_0_' +tempPersonId;

    var tempCabIcon = "<a href='javascript:void(0);' onClick='javascript:ShowStreetView(" + objBusiness.Latitude + "," + objBusiness.Longitude + ");'>" +
								"<img src='"+PersonImageServices+"' style='width:20px;vertical-align:middle;' class='DivInfoBoxTitleLeftImgWidth'/>" +
					   "</a>";
    
    var DivCabBacgroundClasss = "";
    if (objBusiness.CommentCount != undefined)
        tempCommentCount = objBusiness.CommentCount;
    else
        tempCommentCount = 0;
    
    var tempEntityTitle = objBusiness.EntityTitle;
    if (objBusiness.EntityTitle == null || objBusiness.EntityTitle == 'null' || objBusiness.EntityTitle == '') {
        tempEntityTitle = getLocalStorageData("Address");
    }
    DivPopTitle += "<div class='DivPersonPopUp_Header_Cab_Background_Icon'>" + tempCabIcon + "</div>" +
                                   "<div class='DivInfoBoxTitleContentWidth'>" +
                                        "<h5 class='textcenter margin0 DivInfoBoxTitleContentText' >" + tempEntityTitle + "</h5>" +
                                    "<div><div class='MainStar fl' style='margin-left:23px;'>" +
                                        "<div class='smallstar" + objBusiness.Rating + " fl' style='border:none;'></div></div>&nbsp;&nbsp;" + tempCommentCount + " Reviews" +
                                    "</div></div>" +
                                    "<div class='DivInfoBoxRightContentWidth' >" +
                                        "<a href='javascript:void(0);'  value='linkValue' class='linkDispalyPopFullContent' to='down'>" +
                                            "<img class='DivArrowImage DivInfoBoxTitleRightImgBackgroundWidth PopupArrowImageRight hide' onclick='javascript:showPopUpDesc(this)' src='" + rightArrowImage + "'/>" +
                                            "<img class='DivArrowImage DivInfoBoxTitleRightImgBackgroundWidth PopupArrowImageDown ' src='" + downArrowImage + "' onclick='javascript:hidePopUpDesc(this)'/>" +
                                         "</a>" +
                                     "</div>" +
                               "</div>" +
                                getPersonMapPopupDescriptionDiv(objBusiness)
    "</div>";
    var tempDetails = DivPopTitle;
	$(".DivAppendChildData").html(tempDetails).show();
	$scope.opentempPinPopUpE1();
}

function getPersonMapPopupDescriptionDiv(objBusiness) {
    var personId = objBusiness.PersonId;
    var fullName = objBusiness.EntityTitle;
    var templat = objBusiness.Latitude;
    var templng = objBusiness.Longitude;
    var telephone = getLocalStorageData("Telephone").toString().replace(/\"/g,'');
    var fromaddress = objBusiness.EntityAddress;

    var currentDateTime = new Date();
    currentDateTime = new Date(currentDateTime.getFullYear(), currentDateTime.getMonth(), currentDateTime.getDate(), currentDateTime.getHours(), currentDateTime.getMinutes(), currentDateTime.getSeconds());
    var CabImage = DomainNameSource + "/images/cab-icon.png ";

    var btnChat = "", btnAddFavourites = "", btnBooking = "", btnContactUs = "", ButttonClass = "", DivUserComments = "";
    ButttonClass = "btnyellow";

    var PersonImageDiv = "";
    var tempPersonId = getLocalStorageData("PersonId");
    
    if (getLocalStorageData("PersonId") > 0 ) {
      
            btnBooking = "<input type='button' class='" + ButttonClass + "'  onClick = 'javascript:ShowPersonBookingDiv();' value='Pick Up' style='margin-left:5px;margin-right:8px;'/>";
            btnContactUs = "<input type='button' class='" + ButttonClass + "' onClick='javascript:PersonTracking()' value='Track Me' />";
            btnAddFavourites = "<input type='button' class='" + ButttonClass + "'  onClick='javascript:functionPersonContactUs()' value='Emergency Contacts' style='float:none;font-size:13px;'/>";
        
        var personCurrentUserdetail_photo = 'https://imagewebservice.azurewebsites.net/LogoImage.aspx?Logo=0_0_' +tempPersonId;
    	PersonImageDiv = "<img src='" + personCurrentUserdetail_photo +"' class='PinPopUpDescriptionWindowImage'/>";
    }

    var DivPopDescription = "";
    var popDownImage = DomainNameSource + "/images/Pop_down.png";
    var img_exclusive_hire_cars = DomainNameSource + "/images/exclusive_hire_cars/cars.png";
    if (GLOB_CURRENT_BusinessId == 0) {
        if (getLocalStorageData("PersonId") > 0) {
            var tempTelephone = telephone;
            if (telephone == null || telephone == "")
                tempTelephone = "";
            DivPopDescription = "<div class='PersonBusinessInfowindow BusinessInfowindow' style='width:250px;display: inline-block;'><input type='hidden' value='B' class='txtHiddenUserType' />" +
                    "<div class='DivPersonParentPopUpDescription' style='display:inline-block;width:100%;'>" +
                    "<div class='DivParentPopUpDescription'>" +
                    "<div>" +
                        "<div class='fl imgRounded'>" + PersonImageDiv + "</div>" +
                        "<div class='h2InfoBoxDescriptionWindowLandPhone textcenter' style='padding-left:0px !important;'>" +
                            "<div class='h2InfoBoxDescriptionWindowLandPhone textcenter'  style='padding-left:0px !important;' style='float:none;'>" +
                                "<h2 class='h2PinPopup'><img src=" + GetCountryFlagFromCountryCode(telephone.substr(0, 2)) + " class='PhoneCountryFlagIcon'/>" + telephone.substr(2, telephone.length) + "</h2>" +
                                    "<a href='javascript:void(0);' onClick='javascript:GetPersonComments();'>" +
                                        "<div class='DivInfoBoxDescriptionWindowRating'>" +
                                                "<div class='MainBigStar' style='margin:0px auto;border-bottom:1px solid orange;'>" +
                                                    "<div class='Bigstar" + objBusiness.Rating + "' ></div>" +
                                                   "</div>" +
                                             "</div>" +
                                       "</a>" +
                                       "<div class='DivInfoBoxDescriptionWindowBtnAddtoFavourite'> " + btnAddFavourites + "</div>" +
                             "</div>" +
                                "</div>" +
                            "<div class='clear'></div>" +
                            "<div >" +
                        "<p class='PElementInfoBoxDescriptionWindow BoxIndentedStyle'>" + fromaddress + "</p>" +
                        "<div class='clear' style='margin-top:8px;'></div><div class='textcenter'>" + btnContactUs + "" + btnBooking + "</div>" +
                        "<div class='clear'></div>" +
                    "</div></div></div>" +
                        "<div class='DivPersonComments'>" + getPersonPopupCommentsDiv(objBusiness) + "</div>" +
                        "<div class='DivPersonBooking'>" + getPersonBookingPopUpsDiv(objBusiness) + "</div>" +
                        "<div class='DivPersonTrack'>" + getPersonTrackPopUpDiv(objBusiness) + "</div>" +
                        "<div class='DivTrackUser' style='display:none;height:180px;'>" +
                            "<div class='textcenter'>" +
                                "<h2 style='line-height:20px !important;margin:0px !important;'>Tracking.....</h2>" +
                                "<div class='BoxIndentedStyle padding5'>" + getLocalStorageData("Address") + "</div>" +
                             "</div>" +
                            "<h3 class='h2PinPopup textcenter'>Emergency Contact List</h3><hr/>" +
                            "<div class='DivBusinessPopUpChat'>" +
                                "<div class='DivPersonTrackingFriendList textcenter' style='padding:5px;'></div>" +
                            "</div>" +
                            "<div class='clear'></div>" +
                                "<div class='textcenter'>" +
                                    "<input type='button' class='btnyellow  btnTrackingEmergencyContact' href='javascript:void(0);' onclick='javascript:CallEmergencyContact($(this))' value='Emergency Contacts' />" +
                                  "</div>" +
                            "<div class='clear'></div>" +
                                "<div class='textcenter'>" +
                                    "<input type='button' class='btnyellow  btnuploadLocationTrackingImage' onClick='javascript:DisplayLocationTrackingUploadImageDiv(0);' value='Upload Image' />" +
                                    "<input type='button' class='btnyellow marginleft5 btnStopTracking' onClick='clearWatch()' value='Stop Tracking' />" +
                                 "</div><div class='clear'></div>";
            DivPopDescription += "<div class='DivLocationTrackingUploadImageContent hide'>";
           
                DivPopDescription +=
                                        '<img src="' + DomainName + '/Data/images/UserDetails/users.png" id="PersonLocationTrackingImg" name="PersonLocationTrackingImg" class="fl imgPersonTracking" />' +
                                        '<div class="fl" style="padding-top: 15px;">' +
                                            '<a>' +
                                                '<img src="' + DomainName + '/Data/images/camera-button.png" class="div_Userdetail_input_file_img" id="UserImage" name="UserImage" onClick="OpenFileUploadOptions()" />' +
                                            '</a>' +
                                        '</div>' +
                                        '<input type="file" id="FileLocationTracking" name="FileLocationTracking" onchange="makePersonProfileScriptReady(event)" style="display:none;" />' +
                                        '<div style="padding-top:15px;">' +
                                            '<a href="javascript:void(0);" class="fr" onclick="CloseLocationTrackingUploadImageDiv()" style="margin:5px 0px 0px 3px;">Cancel</a>' +
                                            '<input type="button" class="btnyellow fr" id="btnUploadLocationTrackingImage" name="btnUploadLocationTrackingImage" onclick="UploadPassengerTrackingRouteImage()" style="font-size:12px !important;" value="Upload Image"/>' +
                                            '</div>';
           
            DivPopDescription += "</div>";
            DivPopDescription += "</div>" +
                        "<div class='DivPersonContactUs'>" + getPersonContactPopUpsDiv(objBusiness) + "</div>" +
                        "<div class='DivPersonTrackMePopUp' style='display:none;'>" +
                            "<div class='textcenter'>" +
                                "<input type='button' onClick='javascript:ClosePersonTrackMeWindow($(this));' class='minibtnyellow fr btnWidth'  value='Back' />" +
                                "<div class='clear'></div>" +
                                "<p style='font-size:18px;margin-top: 5px;'> If this is for an existing booking? </p>" +
                                    "<div class='clear'></div>" +
                                        "<input type='button' class='btnyellow' onClick='functionTrackingYes()' style='width:55px;' value='Yes'/>&nbsp;&nbsp;" +
                                        "<input type='button' class='btnyellow' onClick='functionTrackingNo()' style='width:55px;margin-left:10px;' value='No'/>" +
                             "</div>" +
                         "</div>" +
                "</div>";
        }
    }
    return DivPopDescription;
}

function getPersonContactPopUpsDiv(objBusiness) {
    var tempBtnContactUs = "", DivUserContact = "", DivPersonUserContact = "";
    var CabImage = DomainNameSource + "/images/cab-icon.png";
    var tempTelephone = getLocalStorageData("Telephone").toString().replace(/\"/g,'');
    var personCurrentUserdetail_photo = 'https://imagewebservice.azurewebsites.net/LogoImage.aspx?Logo=0_0_' +getLocalStorageData("PersonId");
    tempBtnContactUs = "<input type='button' class='btnyellow' style='float:left !important;' href='javascript:void(0)' onclick='javascript:CallEmergencyContact($(this))' value='call now'/>";


    DivPersonUserContact = "<div class='DivPersonContact hide' style='cursor:default;width:100%;'>" +
                            "<div class='DivPersonContactInner clear'>" +
                            "<div>" +
                            "<div class='fl imgRounded'>" +
                                "<img src='" + personCurrentUserdetail_photo + "' class='PinPopUpDescriptionWindowImage' />" +
                              "</div>" +
                           "<div class='DivInfoBoxDescriptionWindowLeftSideContent'>" +
                            "<div class='h2InfoBoxDescriptionWindowLandPhone textcenter ' style='float:none;'>" +
                                "<h3 class='h2PinPopup'>Emergency Contact</h3>" +
                                 "<div><h2 class='h2PinPopup textcenter'><img src=" + GetCountryFlagFromCountryCode(tempTelephone.substr(0, 2)) + " class='PhoneCountryFlagIcon'/>" + tempTelephone.substr(2, tempTelephone.length) + "</h2>" +
                                    "<div class='DivInfoBoxDescriptionWindowRating'>" +
                                           "<div class='MainBigStar' style='margin:0px auto;display:inline-block;'>" +
                                                  "<div class='Bigstar" + objBusiness.Rating + "' ></div>" +
                                           "</div>" +
                                     "</div>" +
                                 "</div>" +
                             "</div>" +
                             "</div>" +
                             "</dvi>" +
                              "<div class='clear'></div>" +
                                     "<hr/>" +
                                     "<h3 class='h2PinPopup textcenter'>Emergency Contact List</h3><div class='DivBusinessPopUpChat'><div class='DivPersonFriendList textcenter' style='padding:5px;'></div></div>" +
                                     "<hr/>" +
                                "<div class='clear'></div><div class='DivInfoBoxDescriptionWindowTime'><a href='javascript:void(0);' onClick='javascript:ClosePersonContactWindow($(this));' class='linkCancelPopup' style='float:right !important;font-weight:normal;'>Cancel</a></div>" +
                            "</div>" +
                            "<div class='clear'></div>" +
                    "</div>";
    return DivPersonUserContact;
}
//Person Booking screen Page Html Content start
function getPersonBookingPopUpsDiv(currentPersonInfo) {
    var CabImage = DomainNameSource + "/images/cab-icon.png";
    var personId = currentPersonInfo.PersonId;
    var fullName = currentPersonInfo.EntityTitle;
    var templat = currentPersonInfo.Latitude;
    var templng = currentPersonInfo.Longitude;
    var telephone = getLocalStorageData("Telephone").toString().replace(/\"/g,'');;
    var fromaddress = currentPersonInfo.EntityAddress; //getLocalStorageData(LSvars.Address);
    var currentDateTime = new Date();
    var personCurrentUserdetail_photo = 'https://imagewebservice.azurewebsites.net/LogoImage.aspx?Logo=0_0_' +getLocalStorageData("PersonId");
    //get time am/pm time start 
    //get time am/pm time end
    var tempDateTime = $.formatDateTime(CONF_NEW_TRACKING_DATE_TIME, new Date());
    
    var DivBookingContent = "";
    //var fromaddress = getLocalStorageData(LSvars.Address);

    var PersonImageDiv = "";
    PersonImageDiv = "<img src='" + personCurrentUserdetail_photo + "' class='imgRounded' />";

    /* create code Image & text control  START*/
    var tempBookingPopUpUserCarType = "<ul class='ulPersonBookingCabType hide'>" +
                                       FUN_GLOB_GETVEHICLETYPES_LI() +
                                    "</ul>";
    /* create code Image & text control  END*/

    DivBookingContent = "<div class='DivBookingPopUp hide' ><select class='selePerson_POI hide'></select>" +
                            "<div class='textcenter' style='width:100%;margin-bottom:3px;'><h3 class='h2PinPopup'>Pick Up</h3>" +
                             "</div>" +
                             "<div class='clear'></div>" +
                            "<div class='DivBookingPopUpInner clear'>" +
                               "<div class='clear'></div>" +
                                    "<input type='hidden' class='hiddenPersonId' value='" + personId + "' />" +
                                    "<input type='hidden' class='hiddenDateTime' value='" + currentDateTime + "' />" +
                                    "<input type='hidden' class='hiddenFromAddress' value='" + fromaddress + "'/>" +
                                    "<input type='hidden' class='hiddenCarType' value=" + CONF_CARTYPES[1]['Title'] + "/>" +
                                    "<input type='hidden' class='hiddenPesonCarType' value='2'/>" +
                                    "<input type='hidden' class='hiddenLat' value='" + templat + "'/>" +
                                    "<input type='hidden' class='hiddenLng' value='" + templng + "'/>" +
                            "<input type='hidden' class='hiddenPersonCarType' value=" + CONF_CARTYPES[1]["Title"] + "/>" + tempBookingPopUpUserCarType +
"<div class='clear'></div>" +
                                     "<label class='lblBusinessPopUpSmallTitles' >From:</label>" +
                                    "<div style='margin-left:65px;'><label class='btnPerson_FromLocation padding5 BoxIndentedStyle' style='margin:0px !important;'>" + getLocalStorageData("Address") + "</label></div>" +
                                    "<div class='clear DivBookingPopUpMarginBottom'></div>" +
                                    "<label class='lblBusinessPopUpSmallTitles' >When:</label>" +
                                    "<input type='button' onClick='functionPersonShowDateTimePopUp()' class='btnyellow btnCabDatePopUP divBookingPopUptxtboxMarginleft'  value='" + tempDateTime + "'/>" +
                                    "<div class='clear DivBookingPopUpMarginBottom'></div>" +
                                    "<label class='lblBusinessPopUpSmallTitles' >For:</label>" +
                                    "<input type='button' onClick='functionPersonShowCarTypePopUp()' class='btnyellow btnPersonBusinessCarType divBookingPopUptxtboxMarginleft'  value='" + CONF_CARTYPES[1]["Title"] + "'  style='width:157px;'/>" +
                                    "<div class='clear DivBookingPopUpMarginBottom'></div>" +
                                      "<input type='hidden' class='hiddenPersonFromAddressLat'/>" +
                                     "<input type='hidden' class='hiddenPersonFromAddressLng'/>" +
                                     "<div class='clear DivBookingPopUpMarginBottom'></div>" +
                                     "<label class='lblBusinessPopUpSmallTitles' >To:</label>" +
                                     "<a href='javascript:void(0);'></a>" +
                                     "<input type='button' onClick='javascript:ShowPersonPOIList(this)' class='btnyellow divBookingPopUptxtboxMarginleft btnPerson_ToLocation'  value='will tell driver'  style='width:157px;'/>" +
                                     "<input type='hidden' class='hiddenPersonToAddressLat'/>" +
                                     "<input type='hidden' class='hiddenPersonToAddressLng'/>" +
                                     "<div class='clear DivBookingPopUpMarginBottom'></div>" +
                                     "<label class='lblBusinessPopUpSmallTitles'>Notes:</label>" +
                                     "<input type='text'  class='txtNotes fl divBookingPopUptxtboxMarginleft' style='width:170px;border-color:#894d05;'/>" +
                                    "<div class='clear DivBookingPopUpMarginBottom'></div>" +
                                    "<a href='javascript:void(0);' onClick='javascript:ClosePersonBookingWindow($(this));' class='linkCancelPopup' style='float:right !important;'>Cancel</a>" +
                                    "<div class='fr'><a class='btnBookNow' onClick='javascript:SavePersonCabInstantBookNow()'><input type='button' class='btnyellow btnRequest' value='Request Now' /></a></div>" +

                            "</div>" +
                    "</div>";

    return DivBookingContent;
}
//

function ClosePersonContactWindow(objBtn) {
    $(objBtn).parents(".DivPersonContact").hide("slide", { direction: "right" }, 500, function () {
        $(objBtn).parents('.DivPersonParentPopUpDescription').find(".DivParentPopUpDescription").show("slide", { direction: "left" }, 500);
    });
}
//Submit Person Booking Data START //
function SavePersonCabInstantBookNow() {
	var scope = angular.element($(".DivTempPinPopUp")).scope();
	scope.SavePersonCabInstantBookNow();	
}

function ShowPersonEmergencyContactDiv() {
	var scope = angular.element($(".DivTempPinPopUp")).scope();
	scope.ShowPersonEmergencyContactDiv(0);	
}

function ShowPersonBookingDiv(){
	var scope = angular.element($(".DivTempPinPopUp")).scope();
	scope.ShowPersonBookingDiv();	
}

function functionPersonContactUs() {
	var scope = angular.element($(".DivTempPinPopUp")).scope();
	scope.ShowPersonEmergencyContactDiv(1);	
}

function StopPersonTracking(){
	var scope = angular.element($(".DivTempPinPopUp")).scope();
	scope.StopPersonTracking();
}

function ClosePersonEmergencyContact(objBtn) {
    $(objBtn).parents(".DivPopTitle > .DivPersonTrackingEmerencyContact").hide("slide", { direction: "right" }, 500, function () {
        $(objBtn).parents(".DivPopTitle").find('.BusinessInfowindow').show("slide", { direction: "left" }, 500);
    });
}

function ShowPersonSignIn()
{
	var scope = angular.element($(".DivMenuData")).scope();
	scope.closetempPinPopUpE1();
	scope.openLogin();
}

function GetPersonComments() {
	var scope = angular.element($(".DivTempPinPopUp")).scope();
	scope.GetPersonComments();	
}

function getPersonPopupCommentsDiv(objBusiness) {
    var CabImage = DomainNameSource + "/images/cab-icon.png";
    var tempTelephone = getLocalStorageData("Telephone").toString().replace(/\"/g,'');
    var personCurrentUserdetail_photo = 'https://imagewebservice.azurewebsites.net/LogoImage.aspx?Logo=0_0_' +getLocalStorageData("PersonId");
    DivPersonUserContact = "<div class='DivUserComments hide' style='width:100%;'>" +
                                       "<div>" +
                                        "<div class='fl imgRounded'>" +
                                            "<img src='" + personCurrentUserdetail_photo + "' class='PinPopUpDescriptionWindowImage' />" +
                                        "</div>" +
                                        "<div class='DivInfoBoxDescriptionWindowLeftSideContent'>" +
                                "<div class='DivBookingContentLandPhone textcenter' style='float:none;'>" +
                                "<h2 class='h2PinPopup'>Comments</h2>" +
                                    "<div class='h2InfoBoxDescriptionWindowLandPhone' style='float:none;'><div><h2 class='h2PinPopup textcenter'><img src=" + GetCountryFlagFromCountryCode(tempTelephone.substr(0, 2)) + " class='PhoneCountryFlagIcon'/>" + tempTelephone.substr(2, tempTelephone.length) + "</div></h2><div class='DivInfoBoxDescriptionWindowRating' style='padding-left:20px !important;'>" +
                                        "<div class='MainBigStar' style='margin:0px auto;display:inline-block;'>" +
                                                  "<div class='Bigstar" + objBusiness.Rating + "' ></div>" +
                                           "</div>" +
                                        "</div>" +
                                        "</div></div></div></div>" +
                                        "<div class='clear'></div>" +
                                        "<div class='DivUserCommentsInner CustomScroll DivReviewInsidePopUp BoxIndentedStyle'>";

    DivPersonUserContact += "</div></div>";
    return DivPersonUserContact;

}

function ClosePersonCommentsWindow() {
    $(".DivUserComments").hide("slide", { direction: "right" }, 500, function () {
        $(".DivPersonComments").prev().show("slide", { direction: "left" }, 500);
    });
}

function PersonTracking()
{
	$('.DivParentPopUpDescription').hide("slide", { direction: "left" }, 500, function () {
        $(".DivTrackMePopUp > .DivParentPopUpDescription1").css("display", "inline-block");
        $('.PersonBusinessInfowindow').find('.DivPersonTrack > .DivTrackMePopUp').show("slide", { direction: "right" }, 500);
    });
}


/* Choose Track Me  START*/
function getPersonTrackPopUpDiv(objBusiness) {
	 var PersonImageDiv = "";
     PersonImageDiv = "<img src='" + 'https://imagewebservice.azurewebsites.net/LogoImage.aspx?Logo=0_0_' +getLocalStorageData("PersonId") + "' class='PinPopUpDescriptionWindowImage' />";
     var tempTelephone = getLocalStorageData("Telephone").toString().replace(/\"/g,'')

    var divTrackMeContent = "";
    var month = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
    var tempDateTime = new Date().getDate() + " " + month[new Date().getMonth()] + " " + new Date().getFullYear();
    divTrackMeContent = "<div class='DivTrackMePopUp hide' class='tdSpanText'>" +
                                "<div class='DivParentPopUpDescription1'>" +
                                    "<div class='fl imgRounded'>" + PersonImageDiv + "</div>" +
                                    "<div class='h2InfoBoxDescriptionWindowLandPhone textcenter'><h3 class='h2PinPopup'>Track Me</h3>" +
                                         "<div class='margintop5'><h2 class='h2PinPopup textcenter'><img src=" + GetCountryFlagFromCountryCode(tempTelephone.substr(0, 2)) + " class='PhoneCountryFlagIcon'/>" + tempTelephone.substr(2, tempTelephone.length) + "</h2><div class='clear'></div>" +
                                            "<div class='DivInfoBoxDescriptionWindowRating' style='padding-left:0px !important;'>" +
                                                "<div class='MainBigStar' style='margin:0px auto;display:inline-block;'><div class='Bigstar'" + objBusiness.Rating + "'></div></div>" +
                                             "</div>" +
                                        "</div>" +
                                     "</div>" +
                                "<div class='clear'></div>" +
                                "<div class='DivTrackMePopUpInner'>" +
                                "<div class='BoxIndentedStyle' style='margin-left:5px;'>" + getLocalStorageData("Address").toString().replace(/\"/g,'') + "</div>" +
                                "<div class='DivTemprTrackData'></div>" +
                                "<input type='text' class='linkFromDateTime tdSpanText' style='display:none;' />" +
                                "<input type='text' id='txtHiddenBusinessId' name='txtHiddenBusinessId' class='tdSpanText' style='display:none;'/>" +
                                "<input type='text' id='txtHiddenDriverId' name='txtHiddenDriverId' class='tdSpanText' style='display:none;' />" +
                                "<input type='text' id='txtHiddenPerosnId' name='txtHiddenPerosnId' class='tdSpanText' style='display:none;' />" +
                                "<input type='text' id='txtHiddenBookingId' name='txtHiddenBookingId' class='tdSpanText' style='display:none;'/>" +
                                "<div class='DivTrackingFullContent hide'></div>";
    divTrackMeContent += "<div class='clear'></div>" +
                         "<input type='text' name='txtPersonTrackingCabDescription' id='txtPersonTrackingCabDescription' class='fl txtbox' style='margin:5px 10px;' placeholder='Tracking description'/>" +
                        "<div class='DivData hide' class='tdSpanText'></div>" +
                        "<a href='javascript:void(0);' onClick='javascript:closePersonTrackMeWindow($(this));' class='linkCancelPopup' style='float:right !important;'>Cancel</a>" +
                        "<div class='fr'><input type='button' class='btnyellow' onClick='javascript:functionConfirmLocation($(this))' value='Confirm'/></div>" +
                        "<div class='clear'></div>" +
                        "</div><div class='clear'></div></div>";

    return divTrackMeContent;
}

function closePersonTrackMeWindow(objBtn) {
    $(objBtn).parents(".DivTrackMePopUp").hide("slide", { direction: "right" }, 500, function () {
        $(objBtn).parents(".DivPersonTrack").prev().prev().show("slide", { direction: "left" }, 500);
    });
}

function functionConfirmLocation() {
	var scope = angular.element($(".DivTempPinPopUp")).scope();
	scope.ConfirmLocation();
}
//Get Person pin details end
function ShowStreetView(lat,lng)
{
	var tempLatlng = new google.maps.LatLng(lat, lng);
    var streetViewService = new google.maps.StreetViewService();
    var STREETVIEW_MAX_DISTANCE = 50;
    var latLng = new google.maps.LatLng(lat, lng);
    streetViewService.getPanoramaByLocation(latLng, STREETVIEW_MAX_DISTANCE, function (streetViewPanoramaData, status) {
        if (status === google.maps.StreetViewStatus.OK) {
            panorama = null;
            panorama = GLOB_map.getStreetView();

            panorama.setPosition(tempLatlng);
            panorama.setOptions({ enableCloseButton: false });
            panorama.setPov(/** @@type {google.maps.StreetViewPov} */({
                heading: 265,
                pitch: 0
            }));
            $(".btnStreetViewClose").css('visibility', 'visible');
            tempScope.closetempPinPopUpE1();
            panorama.setVisible(true);
        } else {
            alert("No any Street View for this location..");
        }
    });
}


//Remove places from the map START
function RemovePersonPointOfInterest(pointOfInterestId, personId, timeout, POIPlace, FromGridView) {
	var scope = angular.element($(".DivTempPinPopUp")).scope();
	scope.RemovePersonPointOfInterest(pointOfInterestId,POIPlace);
}
//Remove places from the map END

function HideStreetView() {
    var toggle = panorama.getVisible();
    if (toggle == true) {
        panorama.setVisible(false);
        $(".btnStreetViewClose").css('visibility', 'hidden');
    }

}

//Place Pin template related stuff START
function POIConfirmUserLocation(objBtn) {
	var scope = angular.element($(".DivTempPinPopUp")).scope();
	scope.POIConfirmUserLocation();	
}
//Place Pin template related stuff END

function getPerviousMessageData(objChatData) {
    var tempChatDiv = "";
    $.each(objChatData, function (index, key) {
        var tempId =ImageWebServicesUrl + objChatData[index]["BusinessId"] + "_" + objChatData[index]["DriverId"] + "_" + objChatData[index]["PersonId"] + "_" + objChatData[index]["BookingId"];

        tempChatDiv += '<div class="fl" style="width:100%;">' +
                                '<div class="fl imgChatContentRounded" style="width:11%;">' +
                                    '<img src="' + tempId + '"  class="ImgPopUpChatMessageImage" style="padding:5px;"/>' +
                                 '</div>' +
                                 '<div  style="width:88%;margin-left:4px;" class="fl">' +
                                    '<div class="bubble"><div class="padding5 BoxIndentedStyle">' + objChatData[index]["Chat"] + '</div></div>' +
                                 '</div>' +
                          '</div>' +
                          '<div class="clear"></div>' +
                          '<div class="divChatMessageDateTime fl padding5" style="color:Gray;">' + objChatData[index]["ValidFrom"] + '</div>' +
                          '<div class="divChatMessageSender fr"  style="color:Orange;">- ' + objChatData[index]["EntityDescription"] + '</div><div class="clear"></div><hr/>';
    });
    return tempChatDiv;
}

function functionGetBusinessCommetns(BusinessId, DriverId) {
		var scope = angular.element($(".DivTempPinPopUp")).scope();
		scope.GetBusinessCommetns(BusinessId,DriverId);		
}

function SendChatMessage(BusinessId,DriverId)
{
	var scope = angular.element($(".DivTempPinPopUp")).scope();
	scope.SendChatMessage(BusinessId,DriverId);
}

function CabAddtoFavourites(BusinessId, DriverId, Timeout, RegistrationType, FavouritesLbl) {
	var scope = angular.element($(".DivTempPinPopUp")).scope();
	scope.CabAddtoFavourites(BusinessId, DriverId, Timeout, RegistrationType, FavouritesLbl);
}

function CloseCommentsWindow(objBtn) {
    $(objBtn).parents(".DivUserComments").hide("slide", { direction: "right" }, 500, function () {
        $(objBtn).parents(".BusinessInfowindow").find('.DivParentPopUpDescription').show("slide", { direction: "left" }, 500);
    });

}

function CloseContactWindow(objBtn) {
    $(objBtn).parents(".DivContact").hide("slide", { direction: "right" }, 500, function () {
        //$(".DivContact").css("display", "none");
        $(objBtn).parents(".DivContactUs").prev().prev().prev().show("slide", { direction: "left" }, 500);
    });
}

function DisplayCommentsDiv(objRatingData, IsDisplayCommentInProfileView) {
    
    var temp_GLOB_COMMENT_NO_OF_RECORDS_DISPLAY_COUNTER = GLOB_COMMENT_NO_OF_RECORDS_DISPLAY_COUNTER;
    if (IsDisplayCommentInProfileView == true)
        temp_GLOB_COMMENT_NO_OF_RECORDS_DISPLAY_COUNTER = GLOB_COMMENT_NO_OF_RECORDS_DISPLAY_ON_PROFILE_COUNTER;
    var tempRatingDiv = "",tempCommentCounter = 0;
    if (objRatingData.length > 2) {
        tempRatingDiv += "<div class='MainCommentData'>";
        $.each(objRatingData, function (index, key) {


            if (tempCommentCounter == 0) {
                if (index == 0)
                    tempRatingDiv += "<div class='commentActivePage'>";
                else
                    tempRatingDiv += "<div>";
                //if (tempCommentCounter < GLOB_COMMENT_NO_OF_RECORDS_DISPLAY_COUNTER) {
            }
            var tempstring = "Hi this is test Message from my side Hi this is test Message Hi this is test Message from my side Hi this is test MessageHi this is test Message from my side Hi this is test Message Hi this is test Message from my side Hi this is test Message";
            tempRatingDiv += "<div><div class='MainRating'><div class='StarRating" + objRatingData[index].Rating + "''></div></div>";
            if (objRatingData[index].Note.toString() != null && objRatingData[index].Note.toString() != '')
                tempRatingDiv += "<div class='h4TextStyle DivCommentReviewellipsisText DivCommentRatingToolTip' title='" + objRatingData[index].Note + "'>" + objRatingData[index].Note + "</div>";
            else
                tempRatingDiv += "<div class='h4TextStyle DivCommentReviewellipsisText DivCommentRatingToolTip'>" + objRatingData[index].Note + "</div>";
            
                                  tempRatingDiv +="<h4  class='fl h4TextStyle' style='margin-right:10px !important;'>" + objRatingData[index].FeedbackDate + "</h4>" +
                                    "<h4  class='fr h4TextStyle' style='margin-right:10px !important;'>" + objRatingData[index].Rater + "</h4>" +
                                    "<div class='clear'></div></div>";


            if (tempCommentCounter == (temp_GLOB_COMMENT_NO_OF_RECORDS_DISPLAY_COUNTER - 1)) {
                tempRatingDiv += "</div>";
                tempCommentCounter = -1;
            }

            tempCommentCounter += 1;
        });

        if (tempCommentCounter != 0)
            tempRatingDiv += "</div>";

        tempRatingDiv += "</div>";

        if (objRatingData.length > temp_GLOB_COMMENT_NO_OF_RECORDS_DISPLAY_COUNTER) {
            tempRatingDiv += '<input type="button" onclick="javascript:DisplayCommentPrevPage(this)" class="fl linkPrevActive CommentlinkDeactive Commentbtn" value="Back" /><input type="button" onclick="javascript:DisplayCommentNextPage(this)" class="fr linkNextActive Commentlinkactive Commentbtn" value="Next" /><div class="clear"></div>';
        }
    }
    else
        tempRatingDiv += "<div class='padding5'><h4>User has no Comments.</h4></div>";
    return tempRatingDiv;
}

function CloseBusiness_Booking_8CommentsWindow(objBtn) {
    $(objBtn).parents(".DivUserComments").hide("slide", { direction: "right" }, 500, function () {
        $(objBtn).parents(".DivBookingStatus_8").find('.DivParentPopUpDescription').show("slide", { direction: "left" }, 500);
    });
}

function functionContactUs(BusinessId, BusinessLandPhone, DriverId, BusinessRowNumber, BusinessBookingId) {
    $('.DivContactInner').css('height', 'auto');
    var tempImageVideoHtmlContent = DomainName + "/DATA/images/New_bits/NoPresenceVideo.png";
    var tmepImageVoiceHtmlContent = DomainName + "/DATA/images/New_bits/NoPresenceVoice.png";
    var tmepImageMessageHtmlContent = DomainName + "/DATA/images/New_bits/NoPresenceMessage.png";
    setTimeout(function () {
        $('.DivParentPopUpDescription').hide("slide", { direction: "left" }, 500, function () {
            $(".DivContactUs > .DivContact > .DivContactInner").css("display", "inline-block");
            $('.BusinessInfowindow').find('.DivContactUs > .DivContact').find(".ImgBusinessContactUsVideo").html('<img src="' + tempImageVideoHtmlContent + '" style="width: 79px;" />');
            $('.BusinessInfowindow').find('.DivContactUs > .DivContact').find(".ImgBusinessContactUsVoice").html('<img src="' + tmepImageVoiceHtmlContent + '" style="width: 70px;" />');
            $('.BusinessInfowindow').find('.DivContactUs > .DivContact').find(".ImgBusinessContactUsMessage").html('<img src="' + tmepImageMessageHtmlContent + '" style="width: 100px;" />');
            $('.BusinessInfowindow').find('.DivContactUs > .DivContact').show("slide", { direction: "right" }, 500);
        });
    }, 500);
}
