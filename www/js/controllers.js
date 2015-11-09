angular.module('safecab.controllers', ['mobiscroll-image', 'mobiscroll-datetime', 'ionic.rating', 'jlareau.pnotify', 'ngCordova', 'google.places'])

.controller('AppCtrl', function($scope, $rootScope, FriendService, $ionicModal, $timeout, $ionicLoading, $ionicSideMenuDelegate, $compile,$ionicLoading,$window, notificationService) {

  // Form data for the login modal
  $scope.loginData = {};
    
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
  
  $scope.positions = [];
  
  $scope.autocompletelat = 41.07493;
  $scope.autocompletelng = -78.381388;
  
  $scope.mapControl = {
  };
  
  $scope.init = function() {
		//alert("load");
        var myLatlng = new google.maps.LatLng(51.5073510, -0.1277580);
		$scope.loadMap(51.5073510, -0.1277580);
		
		
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
		  Lat = position.coords.latitude;
		  Lng = position.coords.longitude;
		  $scope.locationList = [];
		  $scope.locationList.push({
			id:1, lat:Lat-0.02, lng:Lng-0.01, title:"Place 1"
		  });
		  $scope.locationList.push({
			id:2, lat:Lat-0.04, lng:Lng-0.04, title:"Place 2"
		  });
		  $scope.locationList.push({
			id:3, lat:Lat-0.054, lng:Lng-0.035, title:"Place 3"
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
		  console.log(pos);
		  $scope.map.setCenter(pos);
		  marker = new google.maps.Marker({
			  position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
			  map: $scope.map,
			  draggable: true
		  });
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

  // Triggered in the login modal to close it
  $scope.closePopup = function() {
    $scope.popup.hide();
  };
  
  $scope.closeLogin = function() {
    $scope.login.hide();
  };

  // Open the login modal
  $scope.openPopup = function() {
    $scope.popup.show();
  };
  // Open the login modal
  $scope.openLogin = function() {
	$scope.closePopup();
    $scope.login.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 2000);

	notificationService.notifyWithDefaults({
		text: 'Regiteration Success!!!',
		delay: 1000,
	});

  };
  
		
	$scope.showPopup = false;
	$scope.currentIdx = -1;
	$scope.bCalled = false;
	$scope.num = 0;
	$scope.otherNum = 0;
	$scope.trackNum = 0;
	$scope.trackCnt = 0;
	
	
	$scope.loadMap = function(lat, lng) {
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
			
			$scope.map = map;

			//var input = document.getElementById('txtSearchaddress');
			//var autocomplete = new google.maps.places.Autocomplete(input);
			var streetView = map.getStreetView();
			
			
			var latlngbounds = new google.maps.LatLngBounds();
			
			for(i=0;i<$scope.locationList.length; i++) {
				lat = $scope.locationList[i].lat;
				lng = $scope.locationList[i].lng;
				title = $scope.locationList[i].title;
				var latlng	 = new google.maps.LatLng(lat, lng);
				marker = new google.maps.Marker({
					  position: new google.maps.LatLng(lat, lng),
					  map: $scope.map,
					  icon: 'img/orange_pin.png',
					  draggable: true
				});
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
				 
				 // infobox css styles
				boxText.style.cssText = "text-align:center;border:1px solid black; padding: 5px;   margin-top: 18px;    background:orange;    color:white;    font-family:Arial, Helvetica, sans-serif;    font-size:12px;    padding: 0.5em 0.5em;    -webkit-border-radius: 3px;    -moz-border-radius: 3px;    border-radius: 3x;    text-shadow:0 0px #000000;    -webkit-box-shadow: 0 0  8px #000;    box-shadow: 0 0 8px #000;opacity: 0.95";
				// infobox content

				
				boxText.innerHTML = '<div  id="popup_' + i +'"  style="cursor:pointer;"><span style="font-size:17px;" >' + title + '</span><img src="img/open.png" style="margin-left:20px;width:25px;height:25px;" onclick="showhidePopUp()" /><div id="detailPopup" style="display:none; text-align:left;opacity: 0.5;background-color:rgba(255,0,0,0.5);">This is beautiful place one.Please visit this place.</div></div>';
				
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
						if($scope.currentIdx != i) {
							for (h = 0; h < $scope.infoBoxList.length; h++) {
								$scope.infoBoxList[h].close();
							}
							//console.log(i);
							$scope.infoBoxList[i].open($scope.map, this);
							$scope.showPopup = false;
						}
					};
				})(marker, i));	
				
				
				google.maps.event.addListener(marker, "dragstart", (function (marker, i) {
					marker.setOptions({ draggable: false }); // mapObj is the object of google map
					$scope.map.setOptions({ draggable: false }); // mapObj is the object of google map

				})(marker, i));	
				
				google.maps.event.addListener(marker, "dragend", (function (marker, i) {
					marker.setOptions({ draggable: true }); // mapObj is the object of google map
					$scope.map.setOptions({ draggable: true }); // mapObj is the object of google map
				})(marker, i));	
				

				/*google.maps.event.addListener(marker, 'dragstart', function(){
					marker.setOptions({ draggable: false }); // mapObj is the object of google map
				});
				google.maps.event.addListener(marker, 'dragend', function(){
					marker.setOptions({ draggable: true }); // mapObj is the object of google map
				});*/
				
			}
			
			map.fitBounds(latlngbounds);	
			
			var infowindow = new google.maps.InfoWindow();

			/*google.maps.event.addListener(autocomplete, 'place_changed', function () {
				infowindow.close();
				var place = autocomplete.getPlace();
				$scope.autocompletelat = place.geometry.location.lat();
				$scope.autocompletelng = place.geometry.location.lng();
			});*/
			
			google.maps.event.addListener($scope.map, "click", function () {
				for (h = 0; h < $scope.infoBoxList.length; h++) {
					$scope.infoBoxList[h].close();
				}
				$scope.showPopup = false;
			});
		
			
			$ionicLoading.hide();
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
	$ionicLoading.show({
	  template: 'Loading...'
	});

	$scope.loadMap($scope.autocompletelat, $scope.autocompletelng);
  }
  
  $scope.noMoreItemsAvailable = false;
  
  $scope.friends = [];
  //$scope.movies = MovieService.all();
  $scope.friends = FriendService.allSync();

  $scope.title = "Completely Random Collection Of Movies";

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
    $scope.friends.splice($scope.friends.indexOf(friend), 1);
  };
  
  $scope.onItemEdit = function(friend) {
  
	$scope.$broadcast('scroll.infiniteScrollComplete');
	url ="#/app/friendlist/" + friend.id;
	$window.location.href = url;	
  };
})

.controller('FriendlistCtrl', function($scope, $rootScope, FriendService, $timeout, $ionicLoading,  $interval) {
	  
	  
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

  $scope.friends = FriendService.allSync();

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
  $scope.rateClick = function () {
	url ="#/app/friendlist/friend/" + $scope.friend.id;
	//alert(url);
	$window.location.href = url;	
  }
  

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
.controller('ProfileCtrl', function($scope, $stateParams, FriendService, $ionicLoading, $ionicModal,$sce, $timeout, $http, notificationService, $cordovaCamera) {
  
  $scope.profileInfo = [];
  $scope.profileInfo.name = "John Steve";
  $scope.profileInfo.email = "johnsteve@gmail.com";
  $scope.profileInfo.phone = "1232342342";
  $scope.profileInfo.emergencyinfo = "this is emergency information";
  
  $scope.phone = "";
  
  $scope.friend = FriendService.get($stateParams.commentId);
  $scope.title = "Profile";  	

  $scope.selectedCar;
 	
  $scope.birthday = new Date();

	/*zheng start*/
	$scope.showModal = function(templateUrl) {
		$ionicModal.fromTemplateUrl(templateUrl, {
			scope: $scope,
			animation: 'slide-in-up'
		}).then(function(modal) {
			$scope.modal = modal;
			$scope.modal.show();
		});
	}
	
		// Close the modal
		$scope.closeModal = function() {
			$scope.modal.hide();
			$scope.modal.remove()
		};

		
		$scope.clipSrc = 'https://www.safecab.com/home/AdvertMedia?AdvertId=2';
 
		$scope.playVideo = function() {
			$scope.showModal('templates/video-popover.html');
		}
		
		 $scope.trustSrc = function(src) {
			return $sce.trustAsResourceUrl(src);
		}
		
		/*zheng end*/
		
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
	    alert(data);
	  }).
	  error(function(data, status, headers, config) {
	    // called asynchronously if an error occurs
	    // or server returns response with an error status.
	  });
  }
  
  $scope.imgData = null;
  
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
  
  $scope.uploadPhoto  = function (){
	  var temp = { "PersonRecordingName": null, "PersonRecordingURL": null, "PersonRecording": null,  "PersonPhoto": $scope.imgData, "PassCode": null, "MobilePhoneVerified": null, "EmailVerified": null, "DateOfBirth": "01 Jan 2009", "SIPAddress": null, "DefaultVehicleTypes": null, "DefaultMapRefreshRate": null, "DefaultCabsToDisplay": null, "DefaultReportEmailAddress": null, "LocationBasedServices": null, "Newsletter": null, "ValidFrom": null, "ValidTo": null, "TimedOut": 0, "PersonId__O": 15 }
		$ionicLoading.show({
		  template: 'Uploading...'
		});
		$.ajax({
			url: 'http://safecabmobilewebservice.azurewebsites.net/api/Service',
			type: 'POST',
			contentType: "application/json;charset=utf-8",
			data: $scope.GLOB_ConvertDataDBCompit(temp, "st_PersonIns"),
			dataType: 'json',
			success: function (result) {
				$ionicLoading.hide();
				alert("Image uploaded successfully......");
			},
			error: function (result1, error) {
				$ionicLoading.hide();
				alert("error");
			}
		}); 
  }	
  
  $scope.GLOB_ConvertDataDBCompit = function(objParas, SPName) {
        var paras = { SPName: SPName, Paras: objParas,RequestorBusinessId: 0, RequestorDriverId: 0, RequestorPersonId: 0 };
        return JSON.stringify(paras);
   
  }

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
	}else{
		hidePopUp();
	}
}


$(document).on({
    'DOMNodeInserted': function() {
        $('.pac-item, .pac-item span', this).addClass('needsclick');
    }
}, '.pac-container');