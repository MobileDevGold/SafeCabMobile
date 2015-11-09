angular.module('safecab.controllers', [])

.controller('AppCtrl', function($scope, FriendService, $ionicModal, $timeout, $ionicLoading, $ionicSideMenuDelegate, $compile) {
  // Form data for the login modal
  $scope.loginData = {};
    
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
  
  $scope.positions = [];
  
  $scope.autocompletelat = 41.07493;
  $scope.autocompletelng = -78.381388;
  
  $scope.cities = [
				{
					city : 'Toronto',
					desc : 'This is the best city in the world!',
					lat : 43.7000,
					long : -79.4000
				},
				{
					city : 'New York',
					desc : 'This city is aiiiiite!',
					lat : 40.6700,
					long : -73.9400
				},
				{
					city : 'Chicago',
					desc : 'This is the second best city in the world!',
					lat : 41.8819,
					long : -87.6278
				},
				{
					city : 'Los Angeles',
					desc : 'This city is live!',
					lat : 34.0500,
					long : -118.2500
				},
				{
					city : 'Las Vegas',
					desc : 'Sin City...\'nuff said!',
					lat : 36.0800,
					long : -115.1522
				}
		];

  $scope.locationList = [{lat:41.06493, lng:-78.381388, title:"Place 1"}, 
						 {lat:41.06793, lng:-78.389388, title:"Place 2"}, 
						 {lat:41.07963, lng:-78.351888, title:"Place 3"},
						 {lat:41.07473, lng:-78.380388, title:"Place 4"}, 
						 {lat:41.07183, lng:-78.379388, title:"Place 5"}, 
						 {lat:41.07593, lng:-78.361348, title:"Place 6"}						 
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
    }, 1000);
  };
  
   $scope.init = function() {
        var myLatlng = new google.maps.LatLng(41.06493, -78.381388);
		$scope.loadMap(41.06493, -78.381388);
		
		/*$ionicLoading.show({
		  template: 'Loading...'
		});*/
		
		var options = {
		  enableHighAccuracy: true,
		  timeout: 5000,
		  maximumAge: 0
		};
		
		/*navigator.geolocation.getCurrentPosition(function(position) {
		  var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
		  $scope.positions.push({lat: pos.k,lng: pos.B});
		  console.log(pos);
		  $scope.map.setCenter(pos);
		  marker = new google.maps.Marker({
			  position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
			  map: $scope.map
		  });
		  $ionicLoading.hide();
		}, 
		function(error) {
		  $ionicLoading.hide();
		  alert('Unable to get location: ' + error.message);
		}, options);*/
    };
		
	$scope.showPopup = false;
	
	$scope.loadMap = function(lat, lng) {
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

			var input = document.getElementById('txtSearchaddress');
			var autocomplete = new google.maps.places.Autocomplete(input);
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
					  icon: 'img/orange_pin.png'
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
				boxText.innerHTML = '<div id="popup_' + i +'" data-ng-click="showDetailPopup()" style="cursor:pointer;">' + title + '<div ng-show="showPopup" style="text-align:left;display:block;">This is beautiful place one.Please visit this place.</div></div>';
				
				
		
				$scope.infoBoxList[i] = new InfoBox(infoOptions);;
				$scope.markerList[i] = marker;	

				// marker action (click)
				google.maps.event.addListener(marker, "click", (function (marker, i) {
					return function () {
						for (h = 0; h < $scope.infoBoxList.length; h++) {
							$scope.infoBoxList[h].close();
						}
						$scope.infoBoxList[i].open($scope.map, this);
					};
				})(marker, i));		

				google.maps.event.addListener($scope.infoBoxList[i], 'domready', function(a,b,c,d) {
                    $scope.$apply(function(){
					   $compile(document.getElementById("popup_" + i)($scope));
					});
                });				
			}
			
			map.fitBounds(latlngbounds);	
			
			var infowindow = new google.maps.InfoWindow();

			google.maps.event.addListener(autocomplete, 'place_changed', function () {
				infowindow.close();
				var place = autocomplete.getPlace();
				$scope.autocompletelat = place.geometry.location.lat();
				$scope.autocompletelng = place.geometry.location.lng();
			});
			
			google.maps.event.addListener($scope.map, "click", function () {
				for (h = 0; h < $scope.infoBoxList.length; h++) {
					$scope.infoBoxList[h].close();
				}
			});
			
			$ionicLoading.hide();
	  }  
  

  $scope.showDetailPopup = function() {
			alert("1");
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
  
})

.controller('FriendlistCtrl', function($scope, $rootScope, FriendService, $timeout, $ionicLoading,  $interval) {
	$scope.onSwipe = function() {
		//alert("swipe");
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
.controller('FriendCtrl', function($scope, $stateParams, FriendService) {
  $scope.friend = FriendService.get($stateParams.friendId);
  $scope.title = "Friend Info";
})