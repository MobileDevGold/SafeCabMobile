var GLOB_CURRENT_PersonId = -1;
var GLOB_CURRENT_BusinessId = 0;
var GLOB_CURRENT_DriverId = 0;
var GLOB_CURRENT_BusinessContactId = 0;
var GLOB_Friend_Data = [],Temp_GLOB_BookingData = [];
var GLOB_COMMENT_NO_OF_RECORDS_DISPLAY_COUNTER = 2;
var markersArray = {};
var FLAG_IsDisplayPlace = false, FLAG_IsDisplayFavourites = false;
var GLOB_COMMENT_NO_OF_RECORDS_DISPLAY_ON_PROFILE_COUNTER = 4;
var GLOB_NEW_POI_MARKER, GLOB_NEW_ADVERT_MARKER, GLOB_Passenger_Favourite_BusinessId = "";
var ImageWebServicesUrl = 'https://imagewebservice.azurewebsites.net/LogoImage.aspx?Logo='; //DomainName + '/ImageHandler/ProfileImage?Logo=';
var Location_Photo_WebServiceUrl = DomainName + '/ImageHandler/LocationTrackingImage?Image=';
var DomainName = 'https://www.safecab.com';
var DomainNameSource = DomainName + "/data";
var currentGeoLongitude,currentGeoLatitude,GLOB_COUNTRYCODE;
var GLOB_IS_LOCATION_TRACKING_CONTINUE = false;
var GLOB_IS_POI_CLICK_FORM_POI_GRID = false;
var CurrentUserFullDetails = "";
var GLOB_TEMP_QUOTE_LIST_DATA = [];
var GLOB_ArrayFavouritesMarkers = [];
var GLOB_POI_COMBINE_BOOKING_DATA = [], GLOB_POI_COMBINE_MAP_ADVERT_BOOKING_DATA = [],GLOB_Selected_Place_From_Grid;
var GLOB_Places_ISFrom_btn_click = false,tempGLOB_POIScope = '';
var GLOB_ArrayPlaceMarkers = {};
var currentGeoAccuracy = 0.0;
var GLOB_TEMP_ADVERT_ID = 0;
var GLOB_ACCURACY_SET = 10;
var CONF_Map_Zoom_MIN_LIMIT = 10;
var CONF_Map_Zoom_MAX_LIMIT = 17;
var GLOB_MarkerBookingStart,GLOB_MarkerBookingEnd,GLOB_TEMP_BOOKING_END_PIN_ADDRESS="",GLOB_CURRENT_BOOKING_OPEN_BOOKINGID = 0,GLOB_CURRENT_SELECTED_BOOKING_ENTITY_STATUS = 0;
var IS_GRID_VIEW_DISPLAYED = false;
var GLOB_flag_LoadDataOnMap = true;
var CONF_LAT_LONG__DIGIT_ACCURACY_LEVEL = 7;
var CONF_LOCATION_ACCURACY_LIMIT = 0.0; //99999.99999;
var CONF_MobiScrolldateOrder = "dd M yyyy"; // "dd MM YYYY";
var CONF_MobiScrolldateFormat = "dd M yyyy"; // "dd MM YYYY";
var CONF_MobiScrolldatetimeOrder = "dd M yyyy h:ii A";
var CONF_MobiScrolldatetimeFormat = "dd M yyyy h:ii A";
var CONF_KendoDatePickerFormat = "dd MMM yyyy";
var CONF_TWilio_Guest_Verified_Number = "448454688860";
var CONF_KENDO_BOOKING_GRID_DISPLAY_FORMATE = "{0:dd MMM yyyy h:mm:ss tt}";
var CONF_PIN_TRACKING_POPUP_DATE_FORMATE = "dd MMM yyyy h:mm:ss tt";
var CONF_PIN_TRACKING_POPUP_DATE_FORMATE_TRACKING_PIN_SPECIAL = "dd MMM yyyy  <br /> h:mm:ss tt";
var GLOB_FLAG_IS_MAP_REFRESH_STOP = false;
var CONF_NEW_TRACKING_DATE_TIME = "d M yy  g:ii:ss a";
var CONF_NEW_PIN_8_DATE_TIME = "d M yy  g:ii a";
var CONF_PLACE_BOOKING_PIN_DATE = "d M yy";

var CONF_COUNTRYCODE = {
	    IN: "91",
	    GB: "44",
	    US: "1",
	    FR: "33",
	    DE: "49"
	};

//CONF_ADVERT_RANGE related stuff START
var CONF_ADVERT_RANGE = [
        { value: 0, Title: "Whole UK" },
        { value: 10, Title: "10" },
        { value: 20, Title: "20" },
        { value: 30, Title: "30" },
        { value: 40, Title: "40" },
        { value: 50, Title: "50" },
        { value: 60, Title: "60" },
        { value: 70, Title: "70" },
        { value: 80, Title: "80" },
        { value: 90, Title: "90" },
        { value: 100, Title: "100" }
    ]

var CONF_BOOKINGSTATUS_COLOR = [
                                { value: '0', color: '#f99600' },
                                { value: '1', color: 'green' },
                                { value: '2', color: 'red' }
                            ]


var CONF_BOOKINGSTATUS_ARRAY = [
{ value: "1", Title: 'Accepted' },
{ value: "2", Title: 'Decline' },
{ value: "4", Title: 'OnRoute' },
{ value: "8", Title: 'PickedUp' },
{ value: "16", Title: 'Completed' },
{ value: "32", Title: 'Non Pay' },
{ value: "64", Title: 'Non Show' },
{ value: "128", Title: 'Not Required' }
]

var CONF_BOOKINGSTATUS_ARRAY_FOR_POPUP = [
    { value: "1", Title: 'Accept' },
    { value: "2", Title: 'Decline' },
    { value: "4", Title: 'OnRoute' },
    { value: "8", Title: 'PickedUp' },
    { value: "16", Title: 'Arrived' },
    { value: "32", Title: 'Non Pay' },
    { value: "64", Title: 'Non Show' },
    { value: "128", Title: 'Not Required' }
]

var CONF_PASSENGER_BOOKING_STATUS_POSIBILITY = [
       { value: "1", PossibleValue: "8,64" },
       { value: "4", PossibleValue: "8" },
       { value: "8", PossibleValue: "16" }

   ]

var GLOB_MAPPINGSEA_PARA = {
	    RequestorBusinessId: 0,
	    RequestorDriverId: 0,
	    RequestorPersonId: 0,
	    RequestorBookingId: 0,
	    BusinessId: 0,
	    DriverId: 0,
	    PersonId: -1,
	    BookingId: 0,
	    Longitude: 0.0,
	    Latitude: 0.0,
	    Accuracy: 0,
	    POVLongitude: 0.0,
	    POVLatitude: 0.0,
	    NorthEastLongitude: 0.0,
	    NorthEastLatitude: 0.0,
	    SouthWestLongitude: 0.0,
	    SouthWestLatitude: 0.0,
	    RequiredDateTime: null,
	    FemaleDriverRequired: false,
	    DisabledAccessRequired: false,
	    TimeAdjustment: 0,
	    FavouritesOnly: false,
	    VehicleTypesRequired: 255,
	    MaxEstimatedCost: 0,
	    RegistrationTypesRequired: 7,
	    NumberRequired: 20,
	    PusherAware: 1
	}

var CONF_CARTYPES = [
                     { value: "1", Title: 'Bike', Image: 'Bike_on.png' },
                     { value: "2", Title: '1 - 4 Passenger', Image: 'Car_1_on.png' },
                     { value: "4", Title: '4 - 6 Passengers', Image: 'Car_2_on.png' },
                     { value: "8", Title: '1 - 7 Passengers', Image: 'Car_3_on.png' },
                     { value: "16", Title: '8 + Passengers', Image: 'Car_4_on.png' },
                     { value: "32", Title: 'Specialist', Image: 'Car_5_on.png' }
                 ]

var BookingStatusImage = {
    0: "unknow_Cab_Gold.png",   //unknown booking
    1: "accepted_Cab_Gold.png", //accepted booking
    2: "declined_Cab_Gold.png"  //declined booking
}
var RegistrationTypeCabImage = {
    FAV0: "sillver_pin.png",
    1: "black_pin.png",
    2: "sillver_pin.png",
    FAV2: "favourite_silver.png",
    4: "orange_pin.png",
    FAV4: "favourite_orange.png"
}

var GLOB_map = null;
var BookingStatusImage = {
    0: "unknow_Cab_Gold.png",   //unknown booking
    1: "accepted_Cab_Gold.png", //accepted booking
    2: "declined_Cab_Gold.png"  //declined booking
}

var CONF_BusinessRegistrationType = {
    1: "Bronze",
    2: "Silver",
    4: "Gold"
};

var ImagePath = 'img/Map_pins/';
function GLOB_GetPinImage(objPin) {
    var tempBusinessImage = "";
    var EntityType = objPin.EntityType;
    var EntityStatus = objPin.EntityStatus;
    var RegistrationType = objPin.RegistrationType;
    var IsFriend = objPin.Friend;
    var CurrentPosition = objPin.CurrentPosition;
    var LocationTracking = objPin.LocationTracking;
    var LocationPhoto = objPin.LocationPhoto;
    var registrationType = objPin.RegistrationType;
    if (objPin.Favourite == true) {
        registrationType = "FAV" + registrationType;
    }
    if (EntityType == 0) {

        if ((objPin.PersonId > 0 || objPin.BusinessId > 0 || objPin.DriverId > 0) && GLOB_CURRENT_PersonId == objPin.PersonId && GLOB_CURRENT_BusinessId == objPin.BusinessId && GLOB_CURRENT_DriverId == objPin.DriverId) {
            if (LocationTracking == true)
                tempBusinessImage = ImagePath +"Person_Tracking.png";
            else
                tempBusinessImage = ImagePath +"point_of_interest_personal.png";
        }
        else {
            if (LocationTracking == true)
                tempBusinessImage = ImagePath +" Person_Tracking.png";
            else
                tempBusinessImage = ImagePath +"Map_POI_38.png";
        }
    }
    if (EntityType == 1) {
        tempBusinessImage = ImagePath + RegistrationTypeCabImage[RegistrationType];
        if (objPin.Favourite == true) {
            tempBusinessImage = ImagePath +RegistrationTypeCabImage[registrationType];
        }
    }
    if (EntityType == 2)
        if (CurrentPosition == true && LocationTracking == true)
            tempBusinessImage = ImagePath + "Person_Tracking.png";
        else if (CurrentPosition == true && LocationTracking == false) {
            tempBusinessImage = ImagePath + "person-orange_mini.png";
        }
        else
            tempBusinessImage = ImagePath +"orange_pin.png";  

    else if (EntityType == 4) {
        if (objPin.PersonId == -1) {
            tempBusinessImage = ImagePath +"person_black_mini.png";
        }
        else {
            if (IsFriend == true && CurrentPosition == false && LocationTracking == true) {
                if (LocationPhoto == true)
                    tempBusinessImage = ImagePath +"friend.png";
                else
                    tempBusinessImage = ImagePath +"friend.png";

            }
            else {
                if (CurrentPosition == true && LocationTracking == false) {
                    tempBusinessImage = ImagePath +"person-orange_mini.png";
                }
                else if (CurrentPosition == true && LocationTracking == true) {
                    tempBusinessImage = ImagePath +"Person_Tracking.png";
                }
                else if (CurrentPosition == false && LocationTracking == true) {
                    if (LocationPhoto == true) {
                        tempBusinessImage = ImagePath +"black_person_photo.png";
                    }
                    else
                        tempBusinessImage = ImagePath +"black_person.png";
                }
                else
                    tempBusinessImage = ImagePath +"person-orange_mini.png";
            }

        }

    }
    else if (EntityType == 8)
        tempBusinessImage = ImagePath +"Booking.png";
    else if (EntityType == 16) {

        if (LocationTracking != 0) {
            if (CurrentPosition == 1) {
                tempBusinessImage = ImagePath +"red_cab.png";
            }
            else if (CurrentPosition == 0) {
                if (LocationPhoto > 0)
                    tempBusinessImage = ImagePath +"black_cab_photo.png";
                else {
                    tempBusinessImage =ImagePath +"black_cab.png";
                }
            }
        }
        else {
            if (EntityStatus == 128) {
                tempBusinessImage = ImagePath +"red_cab.png";
            }
            if (EntityStatus > 3) {
                tempBusinessImage = ImagePath +BookingStatusImage[1];
            }
            else {
                if (EntityStatus == 2) {
                    tempBusinessImage = ImagePath + BookingStatusImage[2];
                }
                else if (EntityStatus == 1) {
                    tempBusinessImage = ImagePath + BookingStatusImage[1];
                }
                else if (EntityStatus == 0)
                    tempBusinessImage = ImagePath + BookingStatusImage[0];
            }
        }
    }

    return tempBusinessImage;
}
function FUN_GLOB_GET_PASSENGER_BOOKING_STATUS_VALUE_FROM_ENTITY_STATUS(ENTITYSTATUS) {
    var tempBookingStatus = "";
    if (ENTITYSTATUS == undefined)
        return "Awaiting Response";
    else if (ENTITYSTATUS != 2) {
        tempBookingStatus = $.grep(CONF_PASSENGER_BOOKING_STATUS_POSIBILITY, function (e) { return e.value == ENTITYSTATUS });
        return tempBookingStatus[0]["PossibleValue"];
    }
    //    else if (ENTITYSTATUS != 128) {
    //        return "Not Required";
    //    }

}
var CONF_BUSINESS_OR_DRIVER_BOOKING_STATUS_POSIBILITY = [
         { value: "0", PossibleValue: "1,2" },
         { value: "1", PossibleValue: "4,8,64" },
         { value: "4", PossibleValue: "8,64" },
         { value: "8", PossibleValue: "16,32" },
         { value: "16", PossibleValue: "32" }
     ]
function FUN_GLOB_GET_DRIVER_OR_BUSINESS_BOOKING_STATUS_VALUE_FROM_ENTITY_STATUS(ENTITYSTATUS) {
    var tempBookingStatus = "";
    tempBookingStatus = $.grep(CONF_BUSINESS_OR_DRIVER_BOOKING_STATUS_POSIBILITY, function (e) { return e.value == ENTITYSTATUS });
    return tempBookingStatus[0]["PossibleValue"];
}
function loadCurrentUserProfileImage() {
    var tempPersonId = -1;
    if (getLocalStorageData("PersonId") != undefined)
        tempPersonId = getLocalStorageData("PersonId");
    return GLOB_GET_IMAGEURL(0, 0, tempPersonId);
}
function GLOB_GetTelePhoneNumber_Actual(Telephone) {
    return Telephone.replace(Telephone.substr(0, 2), '');
}
function FUN_GLOB_GETPOSSIBLEVEHICLETYPE_FROM_VEHICLETYPE_ARRAY(ARRAYVEHICLETYPE) {
    if (ARRAYVEHICLETYPE == "" || ARRAYVEHICLETYPE == null) {
        return "";
    }
    else {
        ARRAYVEHICLETYPE = ARRAYVEHICLETYPE.sort();
        var tempDivHtmlContent = "";
        var temparr = ARRAYVEHICLETYPE.toString().split(',').length;
        for (var i = 0; i < temparr; i++) {
            tempDivHtmlContent += "<div class='DivCar_" + ARRAYVEHICLETYPE[i] + "_On'></div>";
        }
        return tempDivHtmlContent;
    }
}

function FUN_GLOB_GETVEHICLE_ID_FROM_VEHICLENAME(VEHICLENAME) {
    if (VEHICLENAME == undefined)
        return "";
    else {
        var tempResVehicle = "";
        tempResVehicle = $.grep(CONF_CARTYPES, function (e) { return e.Title == VEHICLENAME });
        if (tempResVehicle[0] == undefined)
            return "";
        else
            return tempResVehicle[0]["value"];
    }
}
function GLOB_GET_IMAGEURL(BusinessId, DriverId, PersonId) {
    return ImageWebServicesUrl + BusinessId + '_' + DriverId + '_' + PersonId + '_' + 0 + '_' + 0 + '_' + 0 + '_' + 0 + '_' + 0;
}

function FUN_GLOB_GETVEHICLE_NAME_FROM_VEHICLEID(VEHICLEID) {

    if (VEHICLEID == undefined)
        return "";
    else {
        var tempResVehicle = "";
        tempResVehicle = $.grep(CONF_CARTYPES, function (e) { return e.value == VEHICLEID });
        if (tempResVehicle[0] == undefined)
            return "";
        else
            return tempResVehicle[0]["Title"];
    }
}

function FUN_GLOB_GET_BOOKING_STATUS_COLOR_FROM_ENTITY_STATUS(ENTITYSTATUS) {
    var tempBookingStatusColor = "";
    if (ENTITYSTATUS > 1) {
        return CONF_BOOKINGSTATUS_COLOR[1]["color"];
    }
    else {
        tempBookingStatusColor = $.grep(CONF_BOOKINGSTATUS_COLOR, function (e) { return e.value == ENTITYSTATUS });
        return tempBookingStatusColor[0]["color"];
    }
}
function GetUserCurrentAccuracy() {
    var result = false;
    if (currentGeoAccuracy > GLOB_ACCURACY_SET)
        result = true;
    return result;
}
function FUN_GLOB_GET_BOOKING_STATUS_VALUE_FROM_ENTITY_STATUS(ENTITYSTATUS, QuoteOnly) {
    var tempBookingStatus = "";
    if (QuoteOnly == true) {
        if (parseInt(ENTITYSTATUS) == 0)
            return "Quote";
        else {
            tempBookingStatus = $.grep(CONF_BOOKINGSTATUS_ARRAY, function (e) { return e.value == parseInt(ENTITYSTATUS) });
            return tempBookingStatus[0]["Title"];
        }
    }
    else {
        if (ENTITYSTATUS == undefined)
            return "Awaiting Response";
        if (parseInt(ENTITYSTATUS) == 0)
            return "Awaiting Response";
        else {
            tempBookingStatus = $.grep(CONF_BOOKINGSTATUS_ARRAY, function (e) { return e.value == parseInt(ENTITYSTATUS) });
            return tempBookingStatus[0]["Title"];
        }
    }
}
function currentFromDate() {
    var tempValidFromDate = (new Date().getMonth(), 1 + "/" + new Date().getFullYear());
    var month = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
    var tempCurrentDate = new Date();
    var currrentDate = tempCurrentDate.getDate() + " " + month[tempCurrentDate.getMonth()] + " " + tempCurrentDate.getFullYear();
    return tempValidFromDate + "," + currrentDate;
}

function FUN_GLOB_GETVEHICLETYPES_LI() {
    var tempVehicleOptions = "";
    $.each(CONF_CARTYPES, function (index, key) {
        tempVehicleOptions += "<li data-val='" + CONF_CARTYPES[index]["value"] + "'>" +
                    "<div class='car'>" +
                        "<div class='img-cont'>" +
                            "<img src='" + DomainNameSource + "/images/cab_images/" + CONF_CARTYPES[index]["Image"] + "' class='ImgMobiscrollImageandTextWidth' />" +
                         "</div>" +
                        "<span>" + CONF_CARTYPES[index]["Title"] + "</span>" +
                     "</div>" +
                "</li>";
    });
    return tempVehicleOptions;
}

function getLocalStorageData(cname) {    
    return window.localStorage.getItem(cname);
}

function setLocalStorageData(e, t) {
    window.localStorage.setItem(e, JSON.stringify(t));
}
function DescendingNumberSort(a, b) { return b - a; }
function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
    return pattern.test(emailAddress);
}

function isValidMobileNumber(mobileNumber) {
    var pattern = new RegExp(/^[0-9]{10}/);
    return pattern.test(mobileNumber);
}
function pad(value, len) {
    return (value.toString().length < len) ? pad(value + "0", len) : value;
}

function GetVehicleTypeFromBinaryValue(decimal) {
    var binary_array = parseInt(decimal, 10).toString(2).split("");
    var binary_length = binary_array.length;
    var final_array = new Array();
    var i = 0;
    binary_array.forEach(function (bin) {
        if (bin == 1) {
            var pad_num = binary_length - i;
            var final_binary = pad('1', pad_num);
            final_array.push(parseInt(final_binary, 2).toString(10));
        }
        i++;
    });
    return final_array.sort();// return final_array.sort();
}
function FUN_GLOB_GETPOSSIBLEVEHICLETYPE_FROM_VEHICLETYPE_ARRAY(ARRAYVEHICLETYPE) {
    if (ARRAYVEHICLETYPE == "" || ARRAYVEHICLETYPE == null) {
        return "";
    }
    else {
    	if(ARRAYVEHICLETYPE.length > 1)
    		ARRAYVEHICLETYPE = ARRAYVEHICLETYPE.sort();
        var tempDivHtmlContent = "";
        var temparr = ARRAYVEHICLETYPE.toString().split(',').length;
        for (var i = 0; i < temparr; i++) {
            tempDivHtmlContent += "<div class='DivCar_" + ARRAYVEHICLETYPE[i] + "_On'></div>";
        }
        return tempDivHtmlContent;
    }
}
function FUN_GLOB_GETVEHICLETYPES_LI_SELECTED(arraySelectedVehicles) {
    var tempVehicleOptions = "";
    $.each(CONF_CARTYPES, function (index, key) {
        if ($.inArray(CONF_CARTYPES[index]["value"], arraySelectedVehicles) > -1) {
            tempVehicleOptions += "<li data-val='" + CONF_CARTYPES[index]["value"] + "'>" +
                    "<div class='car'>" +
                        "<div class='img-cont'>" +
                            "<img src='" + DomainName + "/DATA/images/cab_images/" + CONF_CARTYPES[index]["Image"] + "' class='ImgMobiscrollImageandTextWidth' />" +
                         "</div>" +
                        "<span>" + CONF_CARTYPES[index]["Title"] + "</span>" +
                     "</div>" +
                "</li>";
        }
    });
    return tempVehicleOptions;
}
function GLOB_GetTelePhoneNumber(Telephone) {
    if (Telephone.substr(0, 2) == '91' || Telephone.substr(0, 2) == '44')
        Telephone = Telephone.replace(Telephone.substr(0, 2), '0');

    return Telephone;
}
///get Country Flag By Passing Country Code START
function GetCountryFlagFromCountryCode(CountryCode) {
    var tempCountryFlag = "";
    switch (parseInt(CountryCode)) {
        case 44:
            tempCountryFlag = "GB";
            break;
        case 91:
            tempCountryFlag = "IN";
            break;

    }
    return 'https://www.safecab.com/Content/img/country/' + tempCountryFlag + '.png';
}
//Place image related stuff Start
var tempPOIControlClick = 0;
function POIControl(controlDiv, map) {
    
    // from the edge of the map
    controlDiv.style.padding = '5px';
    controlDiv.style.index = '10001';

    // Set CSS for the control border
    var controlUI = document.createElement('div');
    controlUI.style.cursor = 'pointer';
    controlUI.style.textAlign = 'center';
    controlUI.title = 'Places';
    controlUI.style.bottom = '30px';
    controlDiv.appendChild(controlUI);

    // Set CSS for the control interior
    var controlText = document.createElement('div');
    controlText.style.paddingLeft = '4px';
    controlText.style.paddingRight = '4px';
    controlText.style.paddingBottom = '10px';
    var tempPOIPinImageMaring = '80px';
    if (GLOB_CURRENT_DriverId > 0 || GLOB_CURRENT_BusinessId > 0)
        tempPOIPinImageMaring = '80px';
    controlText.style.bottom = tempPOIPinImageMaring;
    var tempBackgroundImage = DomainNameSource + "/images/New_bits/Points_Of_Interest_map.png";
    controlText.innerHTML = '<img src=' + tempBackgroundImage + ' style="width:50px;">';
    controlUI.appendChild(controlText);
    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(controlUI);
    google.maps.event.addDomListener(controlUI, 'click', function () {
        ClearPlacePinFromMap();
        if (tempPOIControlClick == 0) {
            
            FLAG_IsDisplayPlace = true;
            DisplayPlacesFromListInMap(0, false, false, true);
            tempPOIControlClick = 1;
        }
        else {
            FLAG_IsDisplayPlace = false;
            //ClearPlacePinFromMap();
            tempPOIControlClick = 0;
        }

    });

}
//Place image related stuff End
function ClearPlacePinFromMap() {
	var tempdata ;
	 var scope = angular.element($(".DivTempPinPopUp")).scope();
	    if (Object.keys(GLOB_ArrayPlaceMarkers).length > 0) {
	    	scope.closetempPinPopUpE1();

	        $.each(GLOB_ArrayPlaceMarkers, function (key, index) {
	            if (GLOB_ArrayPlaceMarkers[key] != null && GLOB_ArrayPlaceMarkers[key].id != GLOB_Selected_Place_From_Grid) {
	                GLOB_ArrayPlaceMarkers[key].setMap(null);
	                GLOB_ArrayPlaceMarkers[key] = null;
	            }

	        });
	    }

	    if (GLOB_NEW_POI_MARKER != null) {
	        GLOB_NEW_POI_MARKER.setMap(null);
	    }
	    if (GLOB_NEW_ADVERT_MARKER != null) {
	        GLOB_NEW_ADVERT_MARKER.setMap(null);
	    }
	    //GLOB_ArrayPlaceMarkers = {};
	    FLAG_IsDisplayPlace = false;
	}
function DisplayPlacesFromListInMap(specificPOIId, IsAdvert, IsNewPlaceAdded,IsClickFormGird) {
      if (specificPOIId == 0) {
          if (FLAG_IsDisplayPlace == false)
              ClearPlacePinFromMap();
          	var scope = angular.element($(".DivTempMapPopUp")).scope();
      		scope.DisplayAllPlaceData();
      }
}
