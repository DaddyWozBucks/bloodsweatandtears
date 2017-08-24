
angular.module('bst', ['bst.controllers'
      , 'bst.services'
      , 'bst.directives'
      , 'bst.filters'
      // ,'tktr.lodgectrls'

      , 'ui.router'
      , 'ngAnimate'
      , 'ngSanitize'
      , 'firebase'
      , 'ngMaterial'
      , 'angular-storage'
      , 'ngGeolocation'
      ,'ngIdle'

      , 'ngFileUpload'
      , '720kb.socialshare'
      , 'pascalprecht.translate',
	     'chart.js',
	      'ng.deviceDetector'
  ])
// .run(function ($state, $rootScope) {
// 	// $rootScope.$on('$stateChangeSuccess', function (evt, toState) {
// 	//   if (toState.changeColor) {
// 	//     $rootScope.changeColor = true;
// 	//     $rootScope.art_nav = true;
// 	//   } else {
// 	//     $rootScope.changeColor = false;
// 	//     $rootScope.art_nav = false;
// 	//   }
// 	// });
// })
.run(['$rootScope', '$state', function ($rootScope, $state) {
	$rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
		// We can catch the error thrown when the $requireSignIn promise is rejected
		// and redirect the user back to the home page
  
		if (error === "AUTH_REQUIRED") {
			$state.go("app.landing");
		}
	});

}])
.config(['$mdDateLocaleProvider',function($mdDateLocaleProvider) {
    $mdDateLocaleProvider.formatDate = function(date) {
       return moment(date).format('YYYY-MM-DD');
    };
}])
/*.config(['IdleProvider', 'KeepaliveProvider', function(IdleProvider, KeepaliveProvider) {
    // configure Idle settings translate
    IdleProvider.idle(5); // in seconds
    IdleProvider.timeout(5); // in seconds
    IdleProvider.autoResume(true)
    IdleProvider.interrupt('mousemove keydown DOMMouseScroll mousewheel mousedown');
    KeepaliveProvider.interval(2); // in seconds
}])*/
.run(['Idle', function(Idle){
    // start watching when the app runs. also starts the Keepalive service by default.
    Idle.watch();
}])
// .run(['$anchorScroll', function ($anchorScroll) {
// 	// $anchorScroll.yOffset = 50;   // always scroll by 50 extra pixels
// }])
.config(function() {
  var config = {
     apiKey: "AIzaSyAK0VBRwTfNdncL6yO_TY38eeKPKNIV1iI",
     authDomain: "bloodsweatandtears-ca002.firebaseapp.com",
     databaseURL: "https://bloodsweatandtears-ca002.firebaseio.com",
     projectId: "bloodsweatandtears-ca002",
     storageBucket: "",
     messagingSenderId: "943747241942"
   };
   firebase.initializeApp(config);
})
.config(['$translateProvider', function ($translateProvider) {

	$translateProvider.useStaticFilesLoader({
		   prefix: 'https://tktr-fa4cf.firebaseio.com/translations/'
		 // prefix: 'https://tktr-za.firebaseio.com/translations/'
		//prefix: '/l18n/'
		  //prefix: 'https://s3-eu-west-1.amazonaws.com/assets.tktr.es/l18n/'

		, suffix: '.json'
	}).preferredLanguage('en').useMissingTranslationHandlerLog().useSanitizeValueStrategy(null);

}])
.config(['$sceDelegateProvider', function ($sceDelegateProvider) {
	$sceDelegateProvider.resourceUrlWhitelist([
    // Allow same origin resource loads.
    'self'
    , // Allow loading from our assets domain.  Notice the difference between * and **.
    'https://tktr-fa4cf.firebaseio.com/**',
		'https://google.com/maps/embed/**'
    , "**tktr-fa4cf.appspot.com"
     , "**glaring-fire-7161.appspot.com"
    , 'https://*.tktr.eu/**',
    'https://tktr-za.appspot.com/**',
    "https://tktr-za.firebaseio.com",
    "https://tktrza-test.firebaseio.com",
		'https://api.tolq.com/v1/translations/requests/quote'
  ]);
}])
// .run(function(){
// 	 FB.init({
//     *********************************************************************
//      * TODO(Developer): Change the value below with your Facebook app ID. *
//      *********************************************************************
//     appId      : '1295865090426674',
//     status     : true,
//     xfbml      : true,
//     version    : 'v2.6'
//   });

// })
.run(['$rootScope', '$state',function($rootScope, $state){
	$rootScope.stateIsLoading = true;
  $rootScope.$on('$stateChangeStart',function(){
      $rootScope.stateIsLoading = true;
 	});


 //  $rootScope.$on('$stateChangeSuccess',function(){
 //      $rootScope.stateIsLoading = false;
 // });

}])
.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
	function ($stateProvider, $urlRouterProvider, $locationProvider) {
	 // $locationProvider.html5Mode(true, true);
	 // $locationProvider.hashPrefix('');
	$stateProvider

		.state('app', {
			url: '/app'
			, abstract: true
			, views: {
				"header": {
					templateUrl: "templates/app2.html"

					, controller: "AppCtrl"
				},

			}
		})

		.state('app.main', {
			url: '/home'
			, views: {
				"main": {
					templateUrl:"templates/main.html"

					, controller: "MainCtrl"
				}

			}
			})
      .state('app.blog', {
  			url: '/blog'
  			, views: {
  				"main": {
  					templateUrl:"templates/blog.html"

  					, controller: "BlogCtrl"
  				}

  			}
  			})
        .state('app.post', {
    			url: '/post/:id'
    			, views: {
    				"main": {
    					templateUrl:"templates/post.html"

    					, controller: "PostCtrl"
    				}

    			}
    			})
          .state('app.createpost', {
      			url: '/createpost'
      			, views: {
      				"main": {
      					templateUrl:"templates/createpost.html"

      					, controller: "CreatePostCtrl"
      				}

      			}
      			})


	$urlRouterProvider.otherwise(function ($injector, $location) {

			return '/app/home'

	});
}])
.config(['$mdThemingProvider', function ($mdThemingProvider) {
	$mdThemingProvider.theme('default')
}])

// .config(function (SpotifyProvider) {
// 	SpotifyProvider.setClientId('5e10adf81564490590d285b7fc100fa8');


// });;
