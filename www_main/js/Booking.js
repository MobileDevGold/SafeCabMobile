var VanityBookingmap="",Vanity_MarkerBookingStart, Vanity_MarkerBookingEnd, tempSearchDataFromSearchBox = false, tempDisplayedBookingMap = 1,tempLiveMapGeocoder =  new google.maps.Geocoder();
function loadBookingMapStuffReady(Latitude, Longitude)
{
	    var myOptions = {
	        center: new google.maps.LatLng(Latitude, Longitude),
	        draggable: false,
	        zoom: 12,
	        zoomControl: false,
	        zoomControlOptions: {
	            style: google.maps.ZoomControlStyle.SMALL,
	            position: google.maps.ControlPosition.LEFT_BOTTOM
	        },
	        mapTypeId: google.maps.MapTypeId.ROADMAP,
	        streetViewControl: true,
	        streetViewControlOptions: {
	            position: google.maps.ControlPosition.LEFT_CENTER
	        }
	    };
	    VanityBookingmap = new google.maps.Map(document.getElementById("VanityBookingmap"),
	            myOptions);
	    google.maps.event.addListener(VanityBookingmap, 'click', function (e) {
	        //objInfoBox.hide();
	    });	    
	    /*var input = document.getElementById('txtBusinessVanityPagesearchbox');
	    var autocomplete = new google.maps.places.Autocomplete(input);

	    google.maps.event.addListener(autocomplete, 'place_changed', function () {
	        var place = autocomplete.getPlace();
	        autocompletelat = place.geometry.location.lat();
	        autocompletelng = place.geometry.location.lng();
	    });
	     */
	    if (tempSearchDataFromSearchBox == true) {
	        if (tempDisplayedBookingMap == 1) {
	            Vanity_MarkerBookingStart.setPosition(new google.maps.LatLng(Latitude, Longitude));
	            Vanity_MarkerBookingStart.setMap(VanityBookingmap);
	        }
	        else {
	            Vanity_MarkerBookingEnd.setPosition(new google.maps.LatLng(Latitude, Longitude));
	            Vanity_MarkerBookingEnd.setMap(VanityBookingmap);
	        }
	    }	
}

$(document).ready(function () {
	setTimeout(function () { 
		
	$(".DivPassengerBookingDisableAccess").click(function () {
        $(this).toggleClass("DivDisableAccessOff").toggleClass("DivDisableAccessOn");
    });

    $(".DivPassengerBookingFemaleDriver").click(function () {
        $(this).toggleClass("DivFemaleDriverOff").toggleClass("DivFemaleDriverOn");
    });
    
	}, 1000);
	
});

function BookingBusiness16BookingData(BusinessId,DriverId,BookingId) {
	var scope = angular.element($(".DivTempPinPopUp")).scope();
	scope.BookingBusiness16BookingData(BusinessId,DriverId,BookingId);		
}
function loadBookingPinsIntoMap()
{
	var tempVanityStartFlag = "https://www.safecab.com/DATA/Images/Map_pins/start_flag.png";
    var tempVanityEndFlag = "https://www.safecab.com/DATA/Images/Map_pins/end_flag.png";

    var imageVanityStartFlag = new google.maps.MarkerImage(tempVanityStartFlag);
    var imageVanityEndFlag = new google.maps.MarkerImage(tempVanityEndFlag);

    Vanity_MarkerBookingStart = new google.maps.Marker({
        icon: imageVanityStartFlag,
        draggable: true
    });

    Vanity_MarkerBookingEnd = new google.maps.Marker({
        icon: imageVanityEndFlag,
        draggable: true
    });
    //Google Map Booking Start marker dragend event START
    google.maps.event.addListener(Vanity_MarkerBookingStart, "dragstart", function (event) {
    	//VanityBookingmap.setOptions({ draggable: false });
        var divPopupTitleTemplate = $(".divBookingHistoryStartFlagTemplatePopupTitle").html();
        var tempEndFlagAddress = "";
        tempLiveMapGeocoder.geocode({ 'latLng': new google.maps.LatLng(event.latLng.lat(), event.latLng.lng()) }, function (results) {
            if (results[0]) {
                tempEndFlagAddress = results[0].formatted_address;
                $("#txtSearchaddress,.txtBusinessVanityPagesearchbox").val(tempEndFlagAddress);
                $(".lblCurrentMapAddress").html(tempEndFlagAddress);
                $("#txtBusinessVanityPagefromAddress").val(tempEndFlagAddress);
                $("#hiddenFromStartlat").val(event.latLng.lat());
                $("#hiddenFromStartlng").val(event.latLng.lng());
                VanityBookingmap.panTo(new google.maps.LatLng(event.latLng.lat(), event.latLng.lng()));
            }
        });
    });
    //Google Map Booking Start marker dragend event END

    //Google Map Booking End marker dragend event START
    google.maps.event.addListener(Vanity_MarkerBookingEnd, "dragstart", function (event) {
    	//VanityBookingmap.setOptions({ draggable: false });
        var divPopupTitleTemplate = $(".divBookingHistoryEndFlagTemplatePopupTitle").html();
        var tempEndFlagAddress = "";
        tempLiveMapGeocoder.geocode({ 'latLng': new google.maps.LatLng(event.latLng.lat(), event.latLng.lng()) }, function (results) {
            if (results[0]) {
                tempEndFlagAddress = results[0].formatted_address;
                $("#txtSearchaddress,.txtBusinessVanityPagesearchbox").val(tempEndFlagAddress);
                $(".lblCurrentMapAddress").html(tempEndFlagAddress);
                $("#txtBusinessVanityPageToAddress").val(tempEndFlagAddress);
                $("#hiddenEndlat").val(event.latLng.lat());
                $("#hiddenEndlng").val(event.latLng.lng());
                VanityBookingmap.panTo(new google.maps.LatLng(event.latLng.lat(), event.latLng.lng()));
            }
        });
    });
    //Google Map Booking End marker dragend event END
}
function AddBookingData() {
	var scope = angular.element($(".DivCabNowData")).scope();
	scope.AddBookingData();
}
function CloseSelectBookingMap() {
//  $(".DivBookingMap").hide("slide", { direction: "left" }, 500, function () {
//      $(".DivBooking").show("right", { direction: "left" }, 1000);
//  });
  $(".DivBookingMap,.DivVanityToUrlPlace,.DivVanityFromUrlPlace").hide();
  //$(".DivBookingMap").hide();
  $(".DivBooking").show();
}
function AddBookingQuoteNowData() {
	var scope = angular.element($(".DivCabNowData")).scope();
	scope.AddBookingQuoteNowData();
}
function DisplayBusinesBookingPlacesPopUp(objBtn, ClickedFromId) {
	var scope = angular.element($(".DivCabNowData")).scope();
	scope.DisplayBusinesBookingPlacesPopUp(ClickedFromId);
}
function ShowBusinessBookingPOIPopUp(ClickedFromId){
	$(".seleBusinesBookingPOIAddress").click();
}


function SetPassengerBookingDivContent (tempSelectedBooking) {
	    var tempVehicleType = parseInt(tempSelectedBooking["BookingVehicleType"]);
	    //if (tempSelectedBooking["EntityStatus"] < 25)
	    GLOB_CURRENT_BOOKING_OPEN_BOOKINGID = 0;
	    GLOB_CURRENT_BOOKING_OPEN_BOOKINGID = tempSelectedBooking["BookingId"];
	    if (tempSelectedBooking["EntityStatus"] == 1) {
	        $(".btnBookingHistoryDivFavourites").show();
	        $("#btnBookingHistoryPersonImage").attr('src', ImageWebServicesUrl + tempSelectedBooking["BusinessId"] + "_" + tempSelectedBooking["DriverId"]);
	    }
	    var tempCurrentBookingData = {
	        BusinessId: tempSelectedBooking["BusinessId"],
	        DriverId: tempSelectedBooking["DriverId"],
	        PersonId: tempSelectedBooking["PersonId"],
	        BookingId: tempSelectedBooking["BookingId"],
	        Longitude: tempSelectedBooking["StartLongitude"],
	        Latitude: tempSelectedBooking["StartLatitude"],
	        StartAddress: tempSelectedBooking["StartAddress"],
	        EndAddress: tempSelectedBooking["EndAddress"],
	        BookingDateTime: tempSelectedBooking["RequiredDate"] + " " + tempSelectedBooking["RequiredTime"],
	        BookingVehicleType: tempVehicleType,
	        EntityType: tempSelectedBooking["EntityType"],
	        EntityStatus: tempSelectedBooking["EntityStatus"],
	        DisabledAccess: tempSelectedBooking["DisabledAccess"],
	        FemaleDriver: tempSelectedBooking["FemaleDriver"],
	        BookingNotes: tempSelectedBooking["BookingNotes"],
	        EstimatedCost: tempSelectedBooking["EstimatedCost"],
	        FullName: tempSelectedBooking["FullName"],
	        IsFavourite: tempSelectedBooking["IsFavourite"],
	        EntityDescription: tempSelectedBooking["BusinessDescription"],
	        QuoteOnly: tempSelectedBooking["QuoteOnly"]
	    };
	    //$(".DivGridViewButtons,.DivMainMapGridView").hide();
	   
	    GLOB_CURRENT_SELECTED_BOOKING_ENTITY_STATUS = tempSelectedBooking["EntityStatus"];
	    if (parseInt(tempSelectedBooking["EntityStatus"]) == 2 || parseInt(tempSelectedBooking["EntityStatus"]) == 128) {
	        GLOB_MAPPINGSEA_PARA.BusinessId = 0;
	        GLOB_MAPPINGSEA_PARA.DriverId = 0;
	    }
	    else {
	        GLOB_MAPPINGSEA_PARA.BusinessId = tempSelectedBooking["BusinessId"];
	        GLOB_MAPPINGSEA_PARA.DriverId = tempSelectedBooking["DriverId"];
	    }
	    GLOB_MAPPINGSEA_PARA.PersonId = tempSelectedBooking["PersonId"];
	    GLOB_MAPPINGSEA_PARA.BookingId = tempSelectedBooking["BookingId"];
	    GLOB_MAPPINGSEA_PARA.VehicleTypesRequired = tempVehicleType;
	    $(".hiddenStartLng").val(tempSelectedBooking["StartLongitude"]);
	    $(".hiddenStartLat").val(tempSelectedBooking["StartLatitude"]);
	    //map.panTo(new google.maps.LatLng(tempSelectedBooking["StartLatitude"], tempSelectedBooking["StartLongitude"]));
	   DisplaySelectedBookingDiv(tempCurrentBookingData);

}
function ClickFavouritesStuff()
{
		var tempFavourites = 1;
        if ($(".btnBookingHistoryDivFavourites").val().toString() == 'Add to Favourites')
            tempFavourites = 0;
        AddtoFavourites(GLOB_MAPPINGSEA_PARA.BusinessId, GLOB_MAPPINGSEA_PARA.DriverId, tempFavourites, 2, $("#btnBookingHistoryPersonImage").attr('title'));
        var tempFavouritesValue = "Add to Favourites"
        if ($(".btnBookingHistoryDivFavourites").val().toString() == 'Add to Favourites')
            tempFavouritesValue = "Remove Favourite";
        $(".btnBookingHistoryDivFavourites").val(tempFavouritesValue);
}
function AddtoFavourites(BusinessId, DriverId, Timeout, RegistrationType, FavouritesLbl) {
		var scope = angular.element($(".DivMainBookingList")).scope();
		//var tempFavouritesLbl = FavouritesLbl;
		//if( FavouritesLbl == '0')
			//tempFavouritesLbl = $(".DivAppendChildData").find(".DivInfoBoxTitleContentText").html();
		scope.FavouritesOperation(BusinessId, DriverId, Timeout, RegistrationType, FavouritesLbl);
}
function DisplaySelectedBookingDiv(objBookingData, IsBookingShowViaBooking) {
    IS_GRID_VIEW_DISPLAYED = true;
    GLOB_flag_LoadDataOnMap = true;
    $(".divClassBookingData,.divMapChat,.Div_Arrived,.Div_Picked_and_Noshow,.DivBookingFeedBack,.DivBookingFeedbackReadonlyData,.DivBookingNonShow").hide();
    $("#txtBookingPassengerCost,#txtBookingDriverNote").val('');
    $("#btnSaveBookingFeedBackDetails").show();
    if (parseInt(objBookingData.EntityStatus) != 2) {
        GLOB_MAPPINGSEA_PARA.BusinessId = objBookingData.BusinessId;
        GLOB_MAPPINGSEA_PARA.DriverId = objBookingData.DriverId;
    }    
    GLOB_MAPPINGSEA_PARA.PersonId = objBookingData.PersonId;
    GLOB_MAPPINGSEA_PARA.BookingId = objBookingData.BookingId;
    //if (objBookingData.QuoteOnly == true)
    GLOB_MAPPINGSEA_PARA.RequiredDateTime = $.mobiscroll.formatDate(CONF_MobiScrolldatetimeFormat, new Date(Date.parse(objBookingData.BookingDateTime)));
    //displayCabsNearbyLatitudeLongitude(map);
    $(".divMapChat").hide();
    //$(".DivDisplayBookingHistoryData").css('display', 'inline-block');
    $("#txtfromAddress,#txtAddBookingDateTime,#selePassengersType,#txtToAddress").val("");
    $("#txtBookingHistoryFromAddress").html(objBookingData.StartAddress);
    $("#txtBookingHistoryFromAddress").attr('title', objBookingData.StartAddress);
    $("#btnBookingHistoryPersonImage").attr("title", objBookingData.EntityDescription);
   
    $(".btnBookingHistoryDivFavourites").hide();
    if (objBookingData.BusinessId > 0) {
        if (objBookingData.IsFavourite == true) {
            $(".btnBookingHistoryDivFavourites").attr('value', 'Remove Favourite');
        }
        $(".btnBookingHistoryDivFavourites").show();
    }
    var strDateToDisplay = $.mobiscroll.formatDate(CONF_MobiScrolldatetimeFormat, new Date(Date.parse(objBookingData.BookingDateTime)));
    $("#txtBookingHistoryDateTime").html(strDateToDisplay);    
    var tempEndAddress = objBookingData.EndAddress, tempHistoryNotes = objBookingData.BookingNotes;
    if (objBookingData.EndAddress == null || objBookingData.EndAddress == '')
        tempEndAddress = "Will tell driver";
    else
        tempEndAddress = objBookingData.EndAddress;
    $("#txtBookingHistoryToAddress").html(tempEndAddress);
    $("#txtBookingHistoryToAddress").attr('title', tempEndAddress);
    if (objBookingData.BookingNotes == null || objBookingData.BookingNotes == '')
        tempHistoryNotes = "No special requirements";
    else
        tempHistoryNotes = objBookingData.BookingNotes;
    $(".txtBookingHistoryNotes").html(tempHistoryNotes);
    $(".txtBookingHistoryNotes").attr('title', tempHistoryNotes);
   
    var tempImgRequiredGender = "DivFemaleDriverOff";
    if (objBookingData.RequiredGender == true)
        tempImgRequiredGender = "DivFemaleDriverOn";
    $(".DivPassengerHistoryBookingFemaleDriver").addClass(tempImgRequiredGender);
    var tempImgDisabledAccess = "DivDisableAccessOff";
    if (objBookingData.DisabledAccess == true)
        tempImgDisabledAccess = "DivDisableAccessOn";
    $(".DivPassengerHistoryBookingDisableAccess").addClass(tempImgDisabledAccess);
    var tempBookingVehicleType = FUN_GLOB_GETVEHICLE_ID_FROM_VEHICLENAME(objBookingData.BookingVehicleType);
    $("#txtBookingHistoryPassengersType").html(FUN_GLOB_GETVEHICLE_NAME_FROM_VEHICLEID(objBookingData.BookingVehicleType));
    
    var tempUserBookingStatus = "";
    if (objBookingData.EntityStatus == 0) {
        var tempQuoteOnly = false;
        if (objBookingData.QuoteOnly == true)
            tempQuoteOnly = true;
        tempUserBookingStatus = FUN_GLOB_GET_BOOKING_STATUS_VALUE_FROM_ENTITY_STATUS(objBookingData.EntityStatus, tempQuoteOnly);
    }
    else {
        if (objBookingData.IsFavourite == true) {
            $(".btnBookingHistoryDivFavourites").attr('value', 'Remove Favourite');
        }

        $(".btnBookingHistoryDivFavourites").show();
        var tempBookingStatus = [];
        tempBookingStatus = GetVehicleTypeFromBinaryValue(objBookingData.EntityStatus);
        tempBookingStatus.sort(DescendingNumberSort).reverse(); //sort in Descending Number    
        var tempQuoteOnly = false;
        if (objBookingData.QuoteOnly == true)
            tempQuoteOnly = true;
        tempUserBookingStatus = FUN_GLOB_GET_BOOKING_STATUS_VALUE_FROM_ENTITY_STATUS($(tempBookingStatus).last()[0], tempQuoteOnly);
    }
    
    var tempEntityStatusColor = FUN_GLOB_GET_BOOKING_STATUS_COLOR_FROM_ENTITY_STATUS(objBookingData.EntityStatus);
    $(".divBookingHistoryText").css('color', tempEntityStatusColor).html(tempUserBookingStatus);

    if (objBookingData.EstimatedCost == null)
        $(".txtBookingExpectedCost").html("0.00");
    else
        $(".txtBookingExpectedCost").html(parseFloat(objBookingData.EstimatedCost).toFixed(2));

    var tmpVehicleImage = $.grep(CONF_CARTYPES, function (e) { return e.value == tempBookingVehicleType });
    if (tmpVehicleImage.length > 0)
        tmpVehicleImage = tmpVehicleImage[0]["Image"];
    else
        tmpVehicleImage = "";

    
    $("#btnBookingHistoryPersonImage").attr("src", ImageWebServicesUrl + objBookingData.BusinessId + "_0_0_0");
    $(".imgBookingHistoryVehicleTypeStatus").attr('src', DomainName + "/DATA/images/cab_images/" + tmpVehicleImage);
    //if (objBookingData.EntityType == 16 && objBookingData.EntityStatus == 25 || objBookingData.EntityType == 16 && objBookingData.EntityStatus == 29) {
    //alrt(objBookingData.EntityStatus);
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
    }
    if (objBookingData.EntityType == 16 && objBookingData.EntityStatus >= 25) {
    	var scope = angular.element($(".DivMainBookingList")).scope();
		scope.DisplayBookingFeedbackDiv(objBookingData);    	

    }else
    {
    	
  		  $(".DivMainBookingList").find('.DivBookingDetailView').show("slide", { direction: "right" }, 500);
  		 $(".btnQuoteList").hide();
 	    if (objBookingData["QuoteOnly"] == true) {
 	    	$(".btnQuoteList").show();
 	    }
 	    else
 	    {
 	    	$(".btnQuoteList").hide();
 	    }
  		  	$(".DivBookingList").hide("slide", { direction: "left" }, 500, function () {
  		  });
    }
    
    
}



function DisplayBookingMap(objBtn, PinToDisplay) {
	
    tempDisplayedBookingMap = PinToDisplay;
    $(objBtn).parents(".DivBooking").hide("slide", { direction: "left" }, 500, function () {
        setTimeout(function () {
        	loadBookingMapStuffReady(currentGeoLatitude,currentGeoLongitude);
            //objInfoBox.hide();
            Vanity_MarkerBookingStart.setMap(null);
            Vanity_MarkerBookingEnd.setMap(null);
            var tempEndLat = currentGeoLatitude, tempEndLng = currentGeoLongitude, tempGooglemapLat = currentGeoLatitude, tempGooglemapLng = currentGeoLongitude;
            if (PinToDisplay == 1) {
                tempGooglemapLat = $("#hiddenFromStartlat").val();
                tempGooglemapLng = $("#hiddenFromStartlng").val();
                if ($("#hiddenFromStartlat").val() == currentGeoLatitude && $("#hiddenFromStartlng").val() == currentGeoLongitude) {
                    $(".lblCurrentMapAddress").html(getLocalStorageData("Address"));
                    $("#txtBusinessVanityPagesearchbox").val(getLocalStorageData("Address"));
                }
                else {
                    $(".lblCurrentMapAddress").html($("#txtBusinessVanityPagefromAddress").val());
                    $("#txtBusinessVanityPagesearchbox").val($("#txtBusinessVanityPagefromAddress").val());
                }
            }
            else if (PinToDisplay == 2) {
                if ($("#hiddenEndlat").val() != '' && $("#hiddenEndlng").val() != '') {
                    tempGooglemapLat = $("#hiddenEndlat").val();
                    tempGooglemapLng = $("#hiddenEndlng").val();
                    $(".lblCurrentMapAddress").html($("#txtBusinessVanityPageToAddress").val());
                    $("#txtBusinessVanityPagesearchbox").val($("#txtBusinessVanityPageToAddress").val());
                }
                else {
                    tempGooglemapLat = currentGeoLatitude;
                    tempGooglemapLng = currentGeoLongitude;
                    $(".lblCurrentMapAddress").html(getLocalStorageData("Address"));
                    $("#txtBusinessVanityPagesearchbox").val(getLocalStorageData("Address"));
                }
            }
            if ($("#hiddenEndlat").val() != '' && $("#hiddenEndlng").val() != '') {
                tempEndLat = $("#hiddenEndlat").val();
                tempEndLng = $("#hiddenEndlng").val();
            }

            if (PinToDisplay == 1)
                Vanity_MarkerBookingStart.setMap(VanityBookingmap);
            else
                Vanity_MarkerBookingEnd.setMap(VanityBookingmap);
            VanityBookingmap.setCenter(new google.maps.LatLng(tempGooglemapLat, tempGooglemapLng));
            google.maps.event.trigger(VanityBookingmap, "resize");
            VanityBookingmap.panTo(new google.maps.LatLng(tempGooglemapLat, tempGooglemapLng));
            Vanity_MarkerBookingEnd.setPosition(new google.maps.LatLng(tempEndLat, tempEndLng));
            Vanity_MarkerBookingStart.setPosition(new google.maps.LatLng($("#hiddenFromStartlat").val(), $("#hiddenFromStartlng").val()));
        }, 200);
        $(".DivVanityFromUrlPlace,.DivVanityToUrlPlace").hide();
        $(".DisplayBacklink").show();
        if (PinToDisplay == 1)
            $(".DivVanityFromUrlPlace").css("display", "block");
        else
            $(".DivVanityToUrlPlace").css("display", "block");
            $(objBtn).parents(".DivMainBookingPart").find(".DivBookingMap").css("display", "block");
        $(objBtn).parents(".DivMainBookingPart").find(".DivBookingMap").show("right", { direction: "left" }, 1000);
    });
}

//Display Cab pick up Popup
function functionBooking(objBtn) {
	var scope = angular.element($(".DivTempPinPopUp")).scope();
	scope.DisplayBookingPickUpPopUp();		
}
//Display Cab pick up Popup
//Close Booking window START
function CloseBookingWindow(objBtn) {
    $(objBtn).parents(".DivBookingPopUp").hide("slide", { direction: "right" }, 500, function () {
        $(objBtn).parents(".DivBooking").prev().prev().show("slide", { direction: "left" }, 500);
    });
}
//Close Booking window End

//Save Cab booking data START
function SaveCabInstantBookNow(){
	var scope = angular.element($(".DivTempPinPopUp")).scope();
	scope.SaveCabInstantBookNow();
}
//Save Cab booking data END