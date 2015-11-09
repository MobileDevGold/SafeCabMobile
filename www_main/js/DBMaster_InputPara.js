var st_PersonEmail_Para = {
    PersonId:0,
	EmailAddress:null,
    AlreadyExits__O:0
}

var st_DriverIns_Para = {
    BusinessId: 0,
    PersonRecordingName: null,
    PersonRecordingURL: null,
    PersonRecording: null,
    PersonPhoto: null,
    FullName: null,
    Telephone: null,
    EmailAddress: null,
    PassCode: null,
    FemaleDriver: false,
    DisabledAccess: false,
    DriverStatus: false,
    OverrideTaxiNumber: null,
    MakePublic: false,
    DriverLicenceNumber: null,
    DriverLicenceExpires: null,
    CarInsuranceExpires: null,
    MOTExpires: null,
    MobilePhoneVerified:false,
    EmailVerified:false,
    RoadTaxExpires: null,
    DriverTimeStart: null,
    DriverTimeEnd: null,
    CabNumber: null,
    CabDriverExpires: null,
    CabVehicleExpires: null,
    RegistrationNumber: null,
    JobsRefreshRate: null,
    JobsToDisplay: null,
    LicencePhoto: null,
    VehicleType: null,
    DefaultReportEmailAddress: null,
    DefaultMapRefreshRate: null,
    VehicleDescription: null,
    ValidFrom: null,
    ValidTo: null,
    TimedOut: 0,
    DriverId__O: 0,
    VanityURL:null,
    ISMobileValueEdit: false, //extra paras
    ISEmailValueEdit:false //extra paras
}

var st_AlertIns_Para = {
    Alert: null,
    ValidFrom: null,
    ValidTo: null,
    TimedOut: 0,
    AlertId: 0
}

var st_DriverSel_Para = {
    BusinessId: 0,
    DriverId: 0
}

var st_ChatCnt_Para = {
    BusinessId: 0,
    BusinessContactId:0,
    DriverId: 0,
    PersonId: 0
}

var st_RatingSel_Para = {
    BusinessId: 0,
    DriverId: 0,
    PersonId: 0,
    BookingId: 0,
    PassengerView: 1,
    NumberRequired: 20,
    PageNumber:1,
	RecordsPerPage:10
}

var st_BusinessSea_Para = {
    BusinessName: '',
    EmailAddress: '',
    MobilePhone: '',
    LandPhone: '',
    ValidFrom: null,
    ValidTo: null,
    TimedOut: 0,
    NumberRequired: 20
}

var st_DriverBookingIns_Para = {
    BusinessId: 0,
    DriverId: 0,
    PersonId: 0,
    BookingId: 0,
    TrackingDescription: null,
    VehicleType: null,
    CabNumber: null,
    Status: null,
    ActualCost: null,
    PassengerCost: null,
    DriverNote: null,
    PassengerNote: null,
    DriverRating: null,
    PassengerRating: null,
    DateSet: null,
    QuoteOnly:null,
    Bookingautoconnect: false//extra Parameters
//    CurrentBusinessId: GLOB_CURRENT_BusinessId,//extra paras
//    CurrentDriverId: GLOB_CURRENT_DriverId, //extra paras
//    CurrentPersonId: GLOB_CURRENT_PersonId //extra paras
}

var st_DriverBookingSet_Para = {
    PersonId: 0,
    BookingId: 0,
    Range: 40,
    NumberRequired: 10
}

var st_FriendIns_Para = {
    PersonId: 0,
    FullName: null,
    PersonPhoto: null,
    Telephone: null,
    EmailAddress: null,
    EmergencyContact: null,
    VisibleToFriend: null,
    ValidFrom: null,
    ValidTo: null,
    TimedOut: 0,
    DateSet: null,
    FriendId__O: 0
}

var st_LocationTrackingIns_Para = {
    BusinessId: 0,
    DriverId: 0,
    PersonId: 0,
    BookingId: 0,
    TrackingDescription: null,
    ValidFrom: null,
    ValidTo: null,
    TimedOut: 0,
    Longitude: 0.0, // extra paras
    Latitude: 0.0  // extra paras
}

var st_LocationIns_Para = {
    BusinessId: 0,
    DriverId: 0,
    PersonId: 0,
    BookingId: 0,
    LocationPhoto: null,
    Longitude: 0.0,
    Latitude: 0.0,
    Altitude: null,
    Satellites: null,
    Accuracy: 0,
    ValidSignal: null
}

var st_FriendSea_Para = {
    PersonId: 0,
    EmergencyContact: null,
    ValidFrom: null,
    ValidTo: null,
    TimedOut: 0,
    NumberRequired: 20
}

var st_BookingIns_Para = {
    PersonId: 0,
    FullName: null,
    Telephone: null,
    EmailAddress: null,
    PassCode: null,
    BookingNotes: null,
    FemaleDriver: null,
    DisabledAccess: null,
    StartAddress: null,
    StartLongitude: null,
    StartLatitude: null,
    EndAddress: null,
    EndLongitude: null,
    EndLatitude: null,
    Country: null,
    RequiredDateTime: null,
    RequiredDateRecordingName: null,
    RequiredDateRecordingURL: null,
    RequiredTimeRecordingName: null,
    RequiredTimeRecordingURL: null,
    StartAddressRecordingName: null,
    StartAddressRecordingURL: null,
    EndAddressRecordingName: null,
    EndAddressRecordingURL: null,
    BookingNotesRecordingName: null,
    BookingNotesRecordingURL: null,
    BookingRecording: null,
    BikeRequired: null,
    CarRequired: null,
    HighTopRequired: null,
    PeopleCarrierRequired: null,
    MiniBusRequired: null,
    LimoRequired: null,
    Frequency: null,
    QuoteOnly:null,
    TimedOut: 0,
    BookingId__O: 0,
    EndPointOfInterestId: null,
    StartPointOfInterestId:null,
    BusinessId:0, //extra Parameters
    DriverId: 0 ,//extra Parameters
    VehicleType: 0,//extra Parameters
    Bookingautoconnect:false//extra Parameters
}

var st_BookingSea_Para = {
    PersonId: 0,
    BusinessId: 0,
    DriverId: 0,
    Fullname: '',
    EmailAddress: '',
    Telephone: '',
    ValidFrom: null,
    ValidTo: null,
    TimedOut: 0,
    NumberRequired: 0
}

var st_BookingSel_Para = {
    PersonId:0,
	BookingId:0
}

var st_PersonWorkPlaceSel = {
    PersonId: 0
}

var st_PersonIns_Para = {
    PersonRecordingName: null,
    PersonRecordingURL: null,
    PersonRecording: null,
    FullName: null,
    PersonPhoto: null,
    Telephone: null,
    EmailAddress: null,
    PassCode: null,
    MobilePhoneVerified: null,
    EmailVerified: null,
    DateOfBirth: null,
    //SIPAddress: null,
    DefaultVehicleTypes: null,
    DefaultMapRefreshRate: null,
    DefaultCabsToDisplay: null,
    DefaultReportEmailAddress: null,
    LocationBasedServices: null,
    Newsletter: null,
    ValidFrom: null,
    ValidTo: null,
    TimedOut: 0,
    RegisteredAddress:null, 
	ProofOfIdentity:null,
	CountryOfResidence:null,
	Nationality:null,
    PersonId__O: 0,
    ISEmailValueEdit:false, //extra paras
    ISMobileValueEdit:false //extra paras
}

var st_PassengerFavouriteIns_Para = {
    PersonId: 0,
    BusinessId: 0,
    DriverId: 0,
    ValidFrom: null,
    ValidTo: null,
    TimedOut: 0
}

var st_CombinedPointOfInterestSea_Para = {
        PersonId:0,
        BusinessId:0,
        DriverId:0,
        Longitude:0.0,
        Latitude:0.0,
        Range:10,
        ValidFrom:null,                 
        ValidTo:null,
        TimedOut:0,
        NumberRequired:0
}

var st_PersonPointOfInterestSea_Para = {
    /*id: 0,
    PersonId: 0,
    PointOfInterest: null,
    Longitude: null,
    Latitude: null,
    Range: 50,
    ValidFrom: null,
    ValidTo: null,
    TimedOut: 0,
    NumberRequired: 0
    */
    PersonId: 0,
    BusinessId: 0,
    DriverId: 0,
    NumberRequired: 0,
    Range: 50
    //
}

var st_DriverSea_Para = {
    //id: 0,
    BusinessId: 0,
    DriverId: null,
    Fullname: '',
    EmailAddress: '',
    Telephone: '',
    ValidFrom: null,
    ValidTo: null,
    TimedOut: 0,
    NumberRequired: 20
}

var st_ChatIns_Para = {
    ChatThreadId: null,
    SenderBusinessId: null,
    SenderBusinessContactId: null,
    SenderDriverId: null,
    SenderPersonId: null,
    SenderBookingId: null,
    SenderAdvertId: null,
    BusinessId: null,
    BusinessContactId: null,
    DriverId: null,
    PersonId: null,
    BookingId: null,
    AdvertId: null,
    Chat: null,
    //ChatRecording: null,
    ValidFrom: null,
    ValidTo: null,
    TimedOut: 0,
    DateSet: null,
    ChatId__O: 0
}

var st_ChatSea_Para = {
    ChatThreadId: null,
    SenderBusinessId: null,
    SenderBusinessContactId: null,
    SenderDriverId: null,
    SenderPersonId: null,
    SenderBookingId: null,
    SenderAdvertId: null,
    BusinessId: null,
    BusinessContactId: null,
    DriverId: null,
    PersonId: null,
    BookingId: null,
    AdvertId: null,
    ValidFrom: null,
    ValidTo: null,
    TimedOut: 0,
    NumberRequired: 0
}

var st_BusinessIns_Para = {
    BusinessName: null,
    AddressRecordingName: null,
    AddressRecordingURL: null,
    AddressRecording: null,
    BusinessPhoto: null,
    PossibleVehicleTypes: null,
    Website: null,
    EmailAddress: null,
    MobilePhone: null,
    LandPhone: null,
    Fax: null,
    BusinessTimeStart: null,
    BusinessTimeEnd: null,
    IncorporationNumber: null,
    RegisteredAddress: null,
    Longitude: null,
    Latitude: null,
    Area: null,
    MakePublic: null,
    VanityURL: null,
    RegistrationType: null,
    BusinessVerified: null,
    AddressVerified: null,
    EmailVerified: null,
    MobilePhoneVerified: null,
    LandPhoneVerified: null,
    DefaultMapRefreshRate: null,
    DefaultJobsRefreshRate: null,
    DefaultDriversRefreshRate: null,
    DefaultCabsToDisplay: null,
    DefaultJobsToDisplay: null,
    DefaultReportEmailAddress: null,
    ValidFrom: null,
    ValidTo: null,
    TimedOut: 0,
    BusinessId__O: 0,
    ISMobileValueEdit: false, //extra paras
    ISEmailValueEdit: false, //extra paras
    ISLandphoneValueEdit:false //extra paras
}

var st_DriverBookingSea_Para = {
    BusinessId: 0,
    DriverId: 0,
    PersonId: 0,
    BookingId: 0,
    Status: 0,
    ValidFrom:null,
	ValidTo:null,
    NumberRequired: 0
}

var st_BusinessContactSea_Para = { BusinessId: 0 }

var st_PersonSel_Para = { PersonId: 0 }

var st_PassengerFavouriteSea_Para = {
    PersonId: 0,
    NumberRequired: 0
}

var st_FriendSel_Para = {
    PersonId: 0,
    FriendId: 0
}

var st_PersonPointOfInterest = {
    /*PersonPointOfInterestId: 0,
    PersonId: 0,
    Longitude: 0,
    Latitude: 0,
    NumberRequired: 0*/
    PersonId: 0,
    BusinessId: 0,
    DriverId: 0,
    NumberRequired: 0,
    Range: 50,
    Longitude: null,
    Latitude: null,
    EntityPointOfInterestId: 0
}

var st_NewsLetter_Para = {
    FullName: null,
    EmailAddress: null,
    Telephone: null,
    PassCode: null,
    PersonId: 0
}

var st_PersonPointOfInterestIns_Para = {
    PersonId: null,
    BusinessId: null,
    DriverId: null,
    PointOfInterestImage: null,
    PointOfInterest: null,
    PointOfInterestAddress: null,
    Longitude: null,
    Latitude: null,
    ValidFrom: null,
    TimedOut: 0,
    EntityPointOfInterestId: 0
}

var st_EntityPointOfInterestSel_Para = {
    EntityPointOfInterestId:0
}

var st_BusinessSel_Para = {
    BusinessId: 0,
    PersonId: 0
}

var st_BusinessVanityURL_Para = {
    BusinessId: 0,
    VanityURL: 0,
    AlreadyExits__O:0
}
var st_DriverVanityURL_Para = {
    BusinessId:0,
	DriverId:0,
    VanityURL:0,
    AlreadyExits__O:0
}

var st_BusinessContactSel_Para = {
    BusinessId: 0,
    BusinessContactId: 0
}

var st_BusinessContactIns_Para = {
    BusinessId: 0,
    FullName: null,
    Telephone: null,
    EmailAddress: null,
    PersonPhoto: null,
    JobRole: null,
    ForLogin: 0,
    PersonRecordingName: null,
    TimedOut: 0,
    BusinessContactId__O: 0,
    ISCreditCardDataAdded: false,//extra paras
    Message: null,//extra paras
    MonthlyCost: 0.0,//extra paras
    BusinessNameVerified: false,//extra paras
    BusinessAddressVerified: false, //extra paras
    CallDocMailServices: false//extra paras
}

var st_PersonSea_Para = {
    Fullname: '',
    EmailAddress: '',
    Telephone: '',
    ValidFrom: null,
    ValidTo: null,
    TimedOut: 0,
    NumberRequired: 20
}

var st_RegistrationTypeIns_Para = {
    BusinessId__O: null,
    RegistrationType: null,
    PromotionType: null,
    ValidFrom: null,
    Cost: null,
    ValidTo: null,
    TimedOut: false,
    DateSet: null,
    ISRegistrationTypeupgradeFromBusinessProfile:false, //extra paras
    Message:null, //extra paras
    MonthlyCost: null,//extra paras
    BusinessNameVerified: false, //extra paras
    BusinessAddressVerified: false, //extra paras
    CallDocMailServices: false,//extra paras
    PersonId: 0//extra paras
}

var st_ReversGeoCode_Para = {
    Longitude: 0.0,
    Latitude: 0.0,
    CountryCode: 'GB'
}

//var st_PersonQuickSea_Para = {
//    Fullname: '',
//    EmailAddress: '',
//    Telephone: '',
//    ValidFrom: null,
//    ValidTo: null,
//    TimedOut: 0,
//    NumberRequired: 20
//}

var st_GeneralStatisticSea_Para = {
    BusinessId: 0,
    DriverId: 0,
    PersonId: 0,
    ByBusinessId:0,
	ByDriverId:0,
	ByPersonId:0,
    DayOfWeekRequired: 255,
    TimesliceRequired: 9223372036854775807,
    VehicleTypesRequired: 255,
    BookingComplete: 1,
    ByDay: 0,
    ByMonth: 0,
    ByYear: 0,
    ValidFrom: null,
    ValidTo: null
}

var st_ChatMarkAsRead_Para = {
    ChatId: 0
}

var st_PinDetailSea_Para = {
    RequestorBusinessId: 0,
    RequestorDriverId: 0,
    RequestorPersonId: 0,
    RequestorBookingId: 0,
    BusinessId: 0,
    DriverId: 0,
    PersonId: 0,
    BookingId: 0
}

var st_EntityPointOfInterestSea_Para = {
    PersonId: 0,
    BusinessId: 0,
    DriverId: 0,
    PointOfInterest: null,
    Longitude: null,
    Latitude: null,
    Range: 50,
    ValidFrom: null,
    ValidTo: null,
    TimedOut: 0,
    NumberRequired: 0
}

var st_EntityPointOfInterestIns_Para = {
    PersonId: null,
    BusinessId: null,
    DriverId: null,
    PointOfInterest: null,
    PointOfInterestImage: null,
    PointOfInterestAddress: null,
    Longitude: null,
    Latitude: null,
    ValidFrom: null,
    ValidTo: null,
    TimedOut: 0,
    DateSet: null,
    EntityPointOfInterestId__O: 0
}

var st_Communication_Chart_Para = {
    BusinessId: 0,
    DriverId: 0,
    PersonId: 0,
    ByDay: 1,
    ByMonth: 0,
    ByYear: 0,
    ValidFrom: null,
    ValidTo: null
}

var st_PersonLoginSel_Para = {
    EmailAddress: null,
    Telephone: null,
    PassCode: null,
    NewPassCode: null,
    HasCookie: 0,
    TimedOut: 0,
    IsAcheck: 0
}

var st_PersonLostPassCodeSea_Para = {
    EmailAddress: null,
    Telephone: null,
    ValidFrom: null,
    ValidTo: null,
    TimedOut: 0
}

var st_HighLevelStatisticSea_Para = {
    BusinessId: 0,
    DriverId: 0,
    PersonId: 0,
    DayOfWeekRequired: 255,
    VehicleTypesRequired: 255,
    ByDriver: 1,
    ByPassenger: 1,
    ByBusiness: 1,
    ByTimeSlice: 1,
    BookingComplete:1,
    ValidFrom: null,
    ValidTo: null
}

var st_AdvertIns_Para = {
    PointOfInterestId: null,
    PersonId: null,
    BusinessId: null,
    DriverId: null,
    AdvertType: false,
    AdvertImage: null,
    AdvertTelephone: null,
    AdvertEmail: null,
    AdvertURL: null,
    Longitude: null,
    Latitude: null,
    DateSet: null,
    TimedOut: 0,
    AdvertRange: null,
    AdvertViews: null,
    ValidTo: null,
    ValidFrom: null,
    AdvertId__O: 0,
    AdvertRecordingName: null,
    AdvertRecordingType: null
}

var st_mappingSea_Para = {
    BusinessId: 0,
    DriverId: 0,
    PersonId: -1,
    BookingId: 0,
    Longitude: 0.0,
    Latitude: 0.0,
    POVLongitude: 0.0,
    POVLatitude: 0.0,
    NorthEastLongitude: 0.0,
    NorthEastLatitude: 0.0,
    SouthWestLongitude: 0.0,
    SouthWestLatitude: 0.0
}

var st_AdvertSel_Para = {
    AdvertId: 0
}

var st_VehicleTypeRateIns_Para = {
    PointOfInterestId:0,
    BusinessId: 0,
    DriverId: 0,
    PersonId:0,
    VehicleType: 0,
    Standard: 0,
    RushHour: 0,
    RushHourBitMask: 0,
    LateNight: 0,
    LateNightBitMask: 0,
    BankHolidayMultiplier: 0,
    StandardFixedPrice:0,
    RushHourFixedPrice:0,
    LateNightFixedPrice:0
}

var st_VehicleTypeRateSel_Para = {
    PointOfInterestId:0,
	BusinessId:0,
	DriverId:0,
	PersonId:0,
	VehicleType:null
}

var st_RegistrationTypeSel_Para = {
    BusinessId:0,
	Latest:1
}
var st_PersonTelephone_Para = {
    PersonId:0,
	Telephone:null,
    AlreadyExits__O:0
}
var st_BusinessEmail_Para = {
    BusinessId:0,
	EmailAddress:null,
    AlreadyExits__O:0
}
var st_BusinessLandPhone_Para = {
    BusinessId:0,
	LandPhone:null,
    AlreadyExits__O:0
}
var st_BusinessMobilePhone_Para = {
    BusinessId:0,
	MobilePhone:null,
    AlreadyExits__O:0
}
var cs_ContactUs_Para = {
    FirstName:null,
    EmailAddress:null,
    PhoneNumber:null,
    Subject:null,
    Message:null
}
var cs_SupportRequest_Para = {
    EmailAddress:null
}
var st_AlertCnt_Para = {

}
var st_QRCodeSea_Para = {
    BusinessId: 0,
	DriverId: 0,
	PersonId: 0,
	BookingId: 0,
	AdvertId: 0,
	EventId: 0,
	NumberRequired:20
}
var st_QRCodeSel_Para = {
   QRCodeId:0
}
var MappingSeaRow = {
    Accuracy: 0,
    BookingId: 0,
    BookingNotes: "",
    BusinessId: 0,
    BusinessSuspended: false,
    Catcher: 15,
    CommentCount: 0,
    CurrentLocationTracking: 0,
    CurrentPosition: false,
    DisabledAccess: false,
    Distance: 1.1000000000000001,
    DriverId: 0,
    DriverSuspended: false,
    EndAddress: "",
    EntityAddress: "",
    EntityDescription: "",
    EntityPicture: null,
    EntityStatus: 0,
    EntityTelephone: "",
    EntityTimeEnd: "",
    EntityTimeStart: "",
    EntityTitle: "wwwww",
    EntityType: 1,
    EstimatedCost: 0,
    Favourite: true,
    FemaleDrivers: false,
    Friend: false,
    JourneyDistance: 0,
    LastLocated: "27 Dec 2013 12:25:16:860",
    Latitude: 22.295952856944478,
    LocationPhoto: false,
    LocationTracking: false,
    Longitude: 70.78671047607418,
    PassengerSuspended: false,
    PersonId: 0,
    PositionsAvailable: 0,
    Potential: false,
    Rating: 0,
    RegistrationType: 2,
    RequiredDateTime: null,
    RowNumber: 0,
    StartAddress: "",
    VehicleTypes: 0
}
var st_CombinedPointOfInterestQuickSea_Para =
{
    PersonId:0,
    BusinessId:0,
    DriverId:0,
	PointOfInterest:'',
    ValidFrom:null,                  
    ValidTo:null,
    TimedOut:0,
    NumberRequired:10,
	ShowAlreadyExisting:0
}
var st_PersonQuickSea_Para = {
    Fullname: '',
    EmailAddress: '',
    Telephone:'',
	ValidFrom:null,                  
	ValidTo:null,
	TimedOut:0,
	NumberRequired:10,
	ShowAlreadyExisting:0
}
var st_AdvertPinDetailSea_Para = {
    RequestorBusinessId:0,
    RequestorDriverId:0,
    RequestorPersonId:0,
    RequestorBookingId:0,
    AdvertId:0
}
var st_WalletSea_Para = {
    BusinessId:0,
	DriverId:0,
	PersonId:0,
	BookingId:0
}
var st_WalletSel_Para = {
    BusinessId:0,
	DriverId:0,
	PersonId:0,
	BookingId:0
}
var st_BankAccountSea_Para = {
    BusinessId:0,
	DriverId:0,
	PersonId:0,
	BookingId:0
}
var st_BankAccountSel_Para = {
    Id: 0
}
var st_CreditIns_Para = {
    PersonId:0,
	BusinessId:0,
	DriverId:0,
	Credits:0,
	Description:null,
	CreditId__O: 0
}
var st_BusinessSalesSea_Para = {
    BusinessName:'',
	STDCode	:'',
	ValidFrom :null,                  
	ValidTo:null,
	TimedOut:0,
	NumberRequired:20
}
//var DBCallLink = DomainName + '/GetDataFromSPAPI/';
//var newDBCallLink = DomainName + '/GetDataFromSPAPIForMapping/';
//var DBCallLink = "http://safecabmobilewebservice.azurewebsites.net/api/service";



