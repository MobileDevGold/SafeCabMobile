var tempPOIScope = null;
var tempPOIScope = angular.element($(".DivTempMapPopUp")).scope();
function loadPlaceMarker(location, CurrentAddress,$scope) {
	tempPOIScope = $scope;
	tempGLOB_POIScope = $scope; 
	var tempLiveMapGeocoder = new google.maps.Geocoder();
	var tempPersonSilverPin = "img/New_bits/point_of_interest_personal.png";
	
	var image = new google.maps.MarkerImage(tempPersonSilverPin);

    GLOB_NEW_POI_MARKER = new google.maps.Marker({
        position: location,
        map: GLOB_map,
        icon: image,
        draggable: true
    });
    
    google.maps.event.addListener(GLOB_NEW_POI_MARKER, 'dragend', function (event) {
        tempLiveMapGeocoder.geocode({ 'latLng': new google.maps.LatLng(event.latLng.lat(), event.latLng.lng()) }, function (results) {
            if (results[0]) {
                tempPlaceslong = results[0].formatted_address;
                $("#search_f").val(tempPlaceslong);
                $(".DivPassengerAdvert").hide();
            }
        });
    });

    google.maps.event.addListener(GLOB_NEW_POI_MARKER, 'drag', function () {
        //objInfoBox.hide();
        $(".DivPassengerAdvert").hide();
    });
    google.maps.event.addListener(GLOB_NEW_POI_MARKER, "click", function (event) {
    	var PlacesDivPopTitle = $("#TMPLT_PopUpAddPlace").html();
        map.panTo(new google.maps.LatLng(event.latLng.lat(), event.latLng.lng()));
        PlacesDivPopTitle = PlacesDivPopTitle.replace("{currentGeoLatitude}", event.latLng.lat());
        PlacesDivPopTitle = PlacesDivPopTitle.replace("{currentGeoLongitude}", event.latLng.lng());
        PlacesDivPopTitle = PlacesDivPopTitle.replace("{PLACE}", '');
        PlacesDivPopTitle = PlacesDivPopTitle.replace("{PERSONPOIID}", "0");
        PlacesDivPopTitle = PlacesDivPopTitle.replace("{PLACETITLE}", "Place");
        PlacesDivPopTitle = PlacesDivPopTitle.replace("{LAT}", event.latLng.lat());
        PlacesDivPopTitle = PlacesDivPopTitle.replace("{LNG}", event.latLng.lng());
        
        var tempPlacesAddress = "";
        tempLiveMapGeocoder.geocode({ 'latLng': new google.maps.LatLng(event.latLng.lat(), event.latLng.lng()) }, function (results) {
            if (results[0]) {
                tempPlacesAddress = results[0].formatted_address;
                PlacesDivPopTitle = PlacesDivPopTitle.replace(/{TITLE}/g, tempPlacesAddress);
                //objInfoBox.content_ = PlacesDivPopTitle;
                $(".DivAppendChildData").html(PlacesDivPopTitle).show();
    	  		$scope.opentempPinPopUpE1();    
                var tempPlaceStreetViewlink = "javascript:ShowStreetView(" + event.latLng.lat() + "," + event.latLng.lng() + ")";
                $(".cabBackground").find('a').attr('onclick', tempPlaceStreetViewlink);
            }
        });
    });	
 }

function CreatePOIData(tempPOIData, IsAdvert, specificPOIId, IsMarkerClickEventFire) {
    GLOB_TEMP_ADVERT_ID = 0;
//    tempPOIScope.closetempPinPopUpE1();
    if (Object.keys(GLOB_ArrayPlaceMarkers).length > 0) {
    	//tempPOIScope.closetempPinPopUpE1();
        if (Object.keys(GLOB_ArrayPlaceMarkers).length > 0) {
            $.each(GLOB_ArrayPlaceMarkers, function (key, index) {
                if(GLOB_ArrayPlaceMarkers[key] != null)
                    GLOB_ArrayPlaceMarkers[key].setAnimation(null);
            });
        }
    }
    if (GLOB_IS_POI_CLICK_FORM_POI_GRID == true) {
        editPlaceData(tempPOIData, IsAdvert);
        GLOB_IS_POI_CLICK_FORM_POI_GRID = false;
    }
    $('.DivPOIDivDescription').css({ 'width': '96%' });
    var tempPlacesImage = DomainName + "/DATA/Images/New_bits/point_of_interest_personal.png";
    var Placesimage = {
        url: tempPlacesImage,
        anchor: new google.maps.Point(0, 32)
    };
    $.each(tempPOIData, function (index, key) {
        var tempEntityPointOfInterestId = "";
        if (specificPOIId == 0)
            tempEntityPointOfInterestId = tempPOIData[index]["PointOfInterestId"];
        else
            tempEntityPointOfInterestId = tempPOIData[index]["EntityPointOfInterestId"];
        if (GLOB_ArrayPlaceMarkers[tempEntityPointOfInterestId] == null) {
            var Placemarker = new google.maps.Marker({
                id: tempEntityPointOfInterestId,
                position: new google.maps.LatLng(tempPOIData[index]["Latitude"], tempPOIData[index]["Longitude"]),
                map: map,
                icon: Placesimage
            });
            google.maps.event.addListener(Placemarker, 'dragend', function (event) {
                // Get the Current position, where the pin is dropped
                tempLiveMapGeocoder.geocode({ 'latLng': new google.maps.LatLng(event.latLng.lat(), event.latLng.lng()) }, function (results) {
                    if (results[0]) {
                        tempPlaceslong = results[0].formatted_address;
                        $("#search_f").val(tempPlaceslong);
                    }
                });
            });
            google.maps.event.addListener(Placemarker, 'drag', function () {
            	tempPOIScope.closetempPinPopUpE1();
            });

            $('.DivAddPlace').hide();
            $('.DivEditPlace,.DivEditPlaceData').show();

            GLOB_ArrayPlaceMarkers[tempEntityPointOfInterestId] = Placemarker;
            /*$('.seleAdvertRange').html(FUN_GLOB_ADVERT_RANGE_OPTIONS());
            $(".txtAdvertRange").val(CONF_ADVERT_RANGE[0]["Title"]);
            $('.seleAdvertRange').mobiscroll().select({
                inputClass: 'hiddenInput',
                theme: 'ios7',
                display: 'modal',
                mode: 'scroller',
                animate: 'pop',
                label: '',
                onSelect: function (html, instance) {
                    $(".txtAdvertRange").val("");
                    $(".txtAdvertRange").val(html);
                }
            }).scroller('setValue', [$(".txtAdvertRange").val()]);
			*/
            google.maps.event.addListener(Placemarker, "click", function (event) {
                if (Placemarker.getAnimation() != null) {
                    Placemarker.setAnimation(null);
                }
	                var scope = angular.element($(".DivTempPinPopUp")).scope();
	            	scope.LoadPlacesPinContent(tempEntityPointOfInterestId);	

            });
        }
        else {
            //GLOB_ArrayPlaceMarkers[tempEntityPointOfInterestId].setAnimation(google.maps.Animation.BOUNCE);
        }

        if (specificPOIId != 0) {
            map.panTo(new google.maps.LatLng(tempPOIData[index]["Latitude"], tempPOIData[index]["Longitude"]));
            Placemarker.setAnimation(google.maps.Animation.BOUNCE);
            if (IsMarkerClickEventFire == true) {
                google.maps.event.trigger(Placemarker, "click");
            }
            //tempPOIScope.opentempPinPopUpE1();
        }
    });
}
function fireAdvertEmailBlur() {
    $(".txtAdavAdvertEmail").blur(function () {
        $(this).removeClass('error');
        if (isValidEmailAddress($(this).val()) == true) {
            if (ValidateEmailUsing_ValidationAPI($(this).val()) == true) {
            }
            else {
                $(this).addClass('error');
            }
        }
        else {
            $(this).addClass('error');
        }
    });
}

function ValidatePlaceTelephone() {
    $(".txtAdavAdvertTelephone").blur(function () {
        $(this).removeClass('error');
        if (isValidMobileNumber($(this).val()) == true) {
            if (ValidateBusinessMobile($(this).val()) == true) {
            }
            else 
                $(this).addClass('error');
        }
        else 
            $(this).addClass('error');
    });
}
function SetEmailTextInLowerCase() {
    $(".txtEmailLowerCase").bind("input", function () {
        this.value = this.value.toLowerCase();
    });
}
function applyTPValidation() {
    var SelectedCountry = getLocalStorageData("CountryCode");
    var tempCountry = "url('../../content/img/country/" + SelectedCountry + ".png')";
    //$(".txtTN").css("background-image", tempCountry);

    //TelePhoneNumberValidation();
    //SetEmailTextInLowerCase();
}
function ShowAdvertDiv(objBtn) {
    //CallAdvertViewTextBoxKeyUp();    
    applyTPValidation();
    //fireAdvertEmailBlur();
    //ValidatePlaceTelephone();
    SetEmailTextInLowerCase();
    
    $(objBtn).parents('.DivPOIDivDescription').find(".DivPassengerAdvert").find(".btnRemoveAdvert").hide();
    $(objBtn).parents('.DivPOIDivDescription').find(".DivPassengerAdvert").find(".AdvertPic").attr("src", DomainName + "/DATA/images/UserDetails/users.png");
    var tempPOIAddress = $.trim($(objBtn).parents('.DivPOIDivDescription').find(".DivPlaceReoveScreen").find('.lblUserCurrentAddress').html());
    var tempPOILatitude = $.trim($(objBtn).parents('.DivPOIDivDescription').find('.HIDDENTEMPPOILAT').val());
    var tempPOILongitude = $.trim($(objBtn).parents('.DivPOIDivDescription').find('.HIDDENTEMPPOILNG').val());
    var tempPOIId = $.trim($(objBtn).parents('.DivPOIDivDescription').find('.HIDDENIADVERTID').val());
    var IsAdvertAdded = tempPOIId == 0 ? GLOB_TEMP_ADVERT_ID : tempPOIId;
    if (IsAdvertAdded > 0) {
    	var scope = angular.element($(".DivTempPinPopUp")).scope();
    	scope.DisplayEditAdvertData(IsAdvertAdded);
    }
    else {
        var SelectedCountry = getLocalStorageData("CountryCode");
        $(objBtn).parents('.DivPOIDivDescription').find(".DivPassengerAdvert").find(".txtAdvertRange").val(CONF_ADVERT_RANGE[0]["Title"]);
        var SelectedCountry = getLocalStorageData("CountryCode");
        var tempCountryCode = "91";//CONF_COUNTRYCODE[SelectedCountry].replace('+', '');
        var tempCountryImg = "url('../../content/img/country/" + SelectedCountry + ".png')";
        $(objBtn).parents('.DivPOIDivDescription').find(".DivPassengerAdvert").find(".HiddenAdvertRecordingName").val('null');
        $(objBtn).parents('.DivPOIDivDescription').find(".DivPassengerAdvert").find(".txtPlaceCountryCode").css('background-image', tempCountryImg);
        $(objBtn).parents('.DivPOIDivDescription').find(".DivPassengerAdvert").find(".txtPlaceCountryCode").val(tempCountryCode);
        $(objBtn).parents('.DivPOIDivDescription').find(".DivPlaceReoveScreen").hide("slide", { direction: "left" }, 500, function () {
            $(objBtn).parents('.DivPOIDivDescription').find(".DivPassengerAdvert").show("slide", { direction: "right" }, 500);
        });
    }
}

function CloseAdvert(objBtn) {

    $(objBtn).parents('.DivPOIDivDescription').find(".DivPassengerAdvert").hide("slide", { direction: "right" }, 500, function () {
        $(objBtn).parents('.DivPOIDivDescription').find(".DivPlaceReoveScreen").show("slide", { direction: "left" }, 500);
    });
}

function AdvertConfirmUserLocation()
{
	var scope = angular.element($(".DivTempPinPopUp")).scope();
	scope.AdvertConfirmUserLocation();
}
function CloseAdvert(objBtn) {

    $('.DivPOIDivDescription').find(".DivPassengerAdvert").hide("slide", { direction: "right" }, 500, function () {
        $('.DivPOIDivDescription').find(".DivPlaceReoveScreen").show("slide", { direction: "left" }, 500);
    });
}
function DisplayPlaceBooking(objBtn, objBtnClick) {
    var objThisContainer = $(objBtn).parents('.DivPOIDivDescription');
    if (objBtnClick == "From") {
        GLOB_Places_ISFrom_btn_click = true;
        $(objThisContainer).find(".DivPlaceFromLocation").hide();
        $(objThisContainer).find(".btnUserFromLocaiton").show();
    }
    else {
        $(objThisContainer).find(".DivPlaceFromLocation").show();
        $(objThisContainer).find(".btnUserFromLocaiton").hide();
    }

    var tempcurrentAdddress = getLocalStorageData("Address").toString().replace(/\"/,'');
    $(objThisContainer).find(".lblUserFromLocation").html(tempcurrentAdddress);
    $(objThisContainer).find(".btnPlaceCabDatePopUP").val($.formatDateTime(CONF_NEW_PIN_8_DATE_TIME, new Date()));
    $(objThisContainer).find(".btnPlaceToLocation").val();
    
    var scope = angular.element($(".DivTempPinPopUp")).scope();
	scope.LoadPlacePinDropDownData();
    setTimeout(function (){
    		$(objBtn).parents(".DivPlaceReoveScreen").hide("slide", { direction: "left" }, 500, function () {
                $(objThisContainer).find(".DivPlaceBookingScreen").css("display", "inline-block");
                $(objThisContainer).find(".DivPlaceBookingScreen").show("slide", { direction: "right" }, 500);
            });
    },800);
}
//Close Booking screen in place page
function ClosePlaceBookingWindow(objBtn) {
    $(objBtn).parents('.DivPOIDivDescription').find(".DivPlaceBookingScreen").hide("slide", { direction: "right" }, 500, function () {
        $(objBtn).parents('.DivPOIDivDescription').find(".DivPlaceReoveScreen").show("slide", { direction: "left" }, 500);
    });
}
//
//Save BookTo & BookFrom Button START
function SavePlaceInstantBookNow() {
	var scope = angular.element($(".DivTempPinPopUp")).scope();
	scope.SavePlaceInstantBookNow();	
}
//Save BookTo & BookFrom Button END

