// Ionic safecab App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'safecab' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'safecab.controllers' is found in controllers.js


ionic.Gestures.gestures.Hold.defaults.hold_threshold = 20;

angular.module('safecab', ['ionic', 'ionic.rating', 'safecab.controllers', 'safecab.services', 'safecab.sortable', 'mobiscroll-image'])

.run(function($ionicPlatform, $rootScope, $location, $ionicLoading, $timeout) {
  $ionicPlatform.ready(function() {
	//alert("ready");	
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
  
   $rootScope.$on('$locationChangeStart', function(ev, next, current) {
    // We need the path component of `next`. We can either process `next` and 
    // spit out its path component, or simply use $location.path(). I go with
    // the latter.
    var nextPath = $location.path();
	  $ionicLoading.show({
		template: 'Loading...'
	  });
	  $timeout(function() {
		$ionicLoading.hide();
	  }, 1000);
    //console.log(nextRoute.access); // There you go!
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.map', {
    url: "/map",
    views: {
      'menuContent': {
		 templateUrl: "templates/map.html"
      }
    }
  })
   .state('app.AfterLoggedInmap', {
    url: "/AfterLoggedInmap",
    templateUrl: "templates/AfterLoggedInmap.html"
  })

   .state('app.profile', {
      url: "/profile",
      views: {
        'menuContent': {
          templateUrl: "templates/profile.html",
          controller: 'ProfileCtrl'
        }
      }
    })
      .state('app.TestProfile', {
      url: "/TestProfile",
      views: {
        'menuContent': {
          templateUrl: "templates/TestProfile.html",
          controller: 'TestProfileCtrl'
        }
      }
    })
    
    .state('app.features', {
      url: "/features",
      views: {
        'menuContent': {
          templateUrl: "templates/features.html"
        }
      }
    })
    
    .state('app.aboutus', {
      url: "/aboutus",
      views: {
        'menuContent': {
          templateUrl: "templates/aboutus.html"
        }
      }
    })
     .state('app.news', {
      url: "/news",
      views: {
        'menuContent': {
          templateUrl: "templates/news.html",
           controller: 'NewsCtrl'
        }
      }
    })
    .state('app.AddFriend', {
      url: "/AddFriend",
      views: {
        'menuContent': {
          templateUrl: "templates/AddFriend.html"
        }
      }
    })
    .state('app.Booking', {
      url: "/Booking",
      views: {
        'menuContent': {
          templateUrl: "templates/Booking.html",
          controller: 'BookinglistCtrl'
        }
      }
    })
    .state('app.Message', {
      url: "/Message",
      views: {
        'menuContent': {
          templateUrl: "templates/Message.html",
          controller: 'MessageCtrl'
        }
      }
    })
    
	
    .state('app.friendlist', {
      url: "/friendlist",
      views: {
        'menuContent': {
          templateUrl: "templates/friendlist.html",
          controller: 'FriendlistCtrl'
        }
      }
    })
    
    
    .state('app.cabnow', {
        url: "/cabnow",
        views: {
          'menuContent': {
            templateUrl: "templates/cabnow.html",
            controller:'CabNowCtrl'
          }
        }
      })
    .state('app.places', {
      url: "/places",
      views: {
        'menuContent': {
          templateUrl: "templates/places.html",
          controller:'PlacesCtrl'
        }
      }
    })
    .state('app.favourites', {
      url: "/favourites",
      views: {
        'menuContent': {
          templateUrl: "templates/favourites.html",
          controller:'FavouritesCtrl'
        }
      }
    })
    

  .state('app.friend', {
    url: "/friendlist/:friendId",
    views: {
      'menuContent': {
        templateUrl: "templates/friend.html",
        controller: 'FriendCtrl'
      }
    }
  })
  
    .state('app.MessageData', {
    url: "/Message/:id",
    views: {
      'menuContent': {
        templateUrl: "templates/MessageData.html",
        controller: 'MessageDataCtrl'
      }
    }
  })
  
  .state('app.comment', {
    url: "/friendlist/friend/:commentId",
    views: {
      'menuContent': {
        templateUrl: "templates/comment.html",
        controller: 'CommentCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/map');
});
