
function CloseSOSEmergencyContact(objBtn) {
    $(objBtn).parents(".DivSOSParentPopUp").find('.DivSOSEmergencyContact').hide("slide", { direction: "right" }, 500, function () {
        $(objBtn).parents(".DivSOSParentPopUp").find('.DivSOSMainScreen').show("slide", { direction: "left" }, 500);
    });
}
function HideTrackingButton() {
    $(".btnStopTracking").hide();
    $(".btnStartTracking").show();
    $(".ImgSOSPerson").attr('onclick', 'javascript:void(0)').css('cursor', 'default');
}
