
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

angular.module('bst.controllers', ['bst.services', 'bst.filters'])
.controller('AppCtrl', ['$scope', '$log', '$state', '$stateParams', '$rootScope', '$http', '$anchorScroll', '$location', '$mdMedia', '$mdDialog', '$timeout',  '$firebaseObject', '$firebaseArray', '$translate', '$mdToast',  '$mdDialog', '$sce', '$interval', 'deviceDetector', '$q', 'Auth'

		, function ($scope, $log, $state, $stateParams, $rootScope, $http, $anchorScroll, $location, $mdMedia, $mdDialog, $timeout,  $firebaseObject, $firebaseArray, $translate, $mdToast, $mdDialog, $sce, $interval, deviceDetector, $q, Auth) {
			var ref = firebase.database().ref();
		$scope.titleBg = "https://s3-eu-west-1.amazonaws.com/bloodsweatandtears.eu/assets/blood_1.gif";
		$scope.gifs = {
			title: [
			"https://s3-eu-west-1.amazonaws.com/bloodsweatandtears.eu/assets/images/blood_1.gif",
			"https://s3-eu-west-1.amazonaws.com/bloodsweatandtears.eu/assets/images/blood_3.gif",
			"https://s3-eu-west-1.amazonaws.com/bloodsweatandtears.eu/assets/images/blood_4.gif",
			"https://s3-eu-west-1.amazonaws.com/bloodsweatandtears.eu/assets/images/sweat_1.gif",
			"https://s3-eu-west-1.amazonaws.com/bloodsweatandtears.eu/assets/images/sweat_2.gif",
			"https://s3-eu-west-1.amazonaws.com/bloodsweatandtears.eu/assets/images/tears_1.gif",
			"https://s3-eu-west-1.amazonaws.com/bloodsweatandtears.eu/assets/images/tears_2.gif",
			"https://s3-eu-west-1.amazonaws.com/bloodsweatandtears.eu/assets/images/tears_3.gif",
			"https://s3-eu-west-1.amazonaws.com/bloodsweatandtears.eu/assets/images/blood_5.gif",
			"https://s3-eu-west-1.amazonaws.com/bloodsweatandtears.eu/assets/images/blood_6_xs.gif",
			"https://s3-eu-west-1.amazonaws.com/bloodsweatandtears.eu/assets/images/sweat_3.gif",
			"https://s3-eu-west-1.amazonaws.com/bloodsweatandtears.eu/assets/images/sweat_4.gif",
			"https://s3-eu-west-1.amazonaws.com/bloodsweatandtears.eu/assets/images/sweat_5.gif",
			"https://s3-eu-west-1.amazonaws.com/bloodsweatandtears.eu/assets/images/sweat_6.gif",
			"https://s3-eu-west-1.amazonaws.com/bloodsweatandtears.eu/assets/images/tears_4.gif",
			"https://s3-eu-west-1.amazonaws.com/bloodsweatandtears.eu/assets/images/tears_5.gif"


			]
		};
		$scope.trustRes = function(url){
			return $sce.trustAsResourceUrl(url);
		};
		$scope.youtubeUrl = function(code) {
			var str = 'https://www.youtube.com/embed/' + code + '?autoplay=0&rel=0'
			return $sce.trustAsResourceUrl(str)
		};
		$scope.signOut = function(){
			Auth.signOut().then(function(data){
				$scope.auth = {};
				$scope.profile = {};
			})
		}
		$scope.currentState = $state.current.name;

		$rootScope.$on('$stateChangeSuccess', function(ev, to, toParams, from, fromParams) {
									$rootScope.previousState = from.name;
									$rootScope.currentState = to.name;
									$scope.currentState = to.name;
									$rootScope.previousParams = fromParams;
									$rootScope.currentParams = toParams;

									$scope.shareUrl = "https://bloodsweatandtears.eu/#!" + $location.url();

									console.log('Previous state:' + $rootScope.previousState + " p " + fromParams)
									console.log('Current state:' + $rootScope.currentState + " p " + toParams)
							});
		$interval(function(){
			var rIndex =  Math.floor(Math.random() * $scope.gifs.title.length - 1);
			$scope.titleBg = $scope.gifs.title[rIndex]
		}, 3000)
		$scope.mQ = function(bp){
			return $mdMedia(bp)
		};
		firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
				$scope.auth = user;
				$scope.$broadcast('authSet');


				$firebaseObject(ref.child("profiles").child(user.uid)).$loaded(function(data){
					$scope.profile = data;
				})
			}
		})
		$scope.signIn = function(prov){
			Auth.loginWith(prov, 'pop').then(function(data){
				$scope.alert("Welcome", "thanks for visiting!")
			})
		};
		$scope.refreshAuth = function(){
			var deferred = $q.defer();
			Auth.getAuth().then(function(user){
				if (user) {
					$scope.auth = user;

					$firebaseObject(ref.child("profiles").child(user.uid)).$loaded(function(data){
						$scope.profile = data;
						deferred.resolve(user)
					})
				}
			})
			return deferred.promise
		};
		$scope.scrollToX = function (x) {
		var newHash = x;
				if ($location.hash() !== newHash) {
					// set the $location.hash to `newHash` and
					// $anchorScroll will automatically scroll to it
					$location.hash(x);
				}
				else {
					// call $anchorScroll() explicitly,
					// since $location.hash hasn't changed
					$anchorScroll();
				}
				// var idstr = "#" + x;
				// console.log(idstr)
			    // 			var	scrollTo = $(idstr);
			    // 			scrollTo.velocity("scroll", { duration: 750, easing: "swing" })
			    // 		.velocity({ opacity: 1 });
    	}
    	$scope.alertBool = false;
		$scope.alertText = "";
		$scope.alertTitle = "";
		$scope.alertGutter = '2px';
    	$scope.alert = function(title, text){
    		$scope.alertBool = true;
			$scope.alertText = text;
			$scope.alertTitle = title;

			$timeout(function(){
				$scope.alertGutter = '0px';
			}, 750);
			$timeout(function(){
				$scope.alertGutter = '2px';
			}, 4250);
			$timeout(function(){
				$scope.alertBool = false;
				$scope.alertText = false;
				$scope.alertTitle = false;
				$scope.alertGutter = '2px';
			}, 5000);
    	}

    	var step;
    	$scope.tiles = [];
		for (step = 0; step < 200; step++) {
		  // Runs 5 times, with values of step 0 through 4.
		  $scope.tiles.push(step);

		}
}])
.controller('MainCtrl', ['$scope', 'Enquiry', function($scope, Enquiry){
	$scope.ten = [1,2,3,4,5]
	$scope.skills = [
		{
			score:40,
			name:"Javscript",
			colors:[
			"#FFEBEE"
			,"#FFCDD2"
			,"#EF9A9A"
			,"#E57373"
			,"#EF5350"
			,"#F44336"
			,"#E53935"
			,"#D32F2F"
			,"#C62828"
			,"#B71C1C"
			],
			img: "https://s3-eu-west-1.amazonaws.com/bloodsweatandtears.eu/assets/images/javascript.png"
		},
		{
			score:45,
			name: "AngularJs",
			colors:[
				"#FCE4EC"
				,"#F8BBD0"
				,"#F48FB1"
				,"#F06292"
				,"#EC407A"
				,"#E91E63"
				,"#D81B60"
				,"#C2185B"
				,"#AD1457"
				,"#880E4F"
			],
			img: "https://s3-eu-west-1.amazonaws.com/bloodsweatandtears.eu/assets/images/angularjs.svg"
		},
		{
			score:38,
			name: "Amazon Web Services",
			colors:[
				"#F3E5F5"
				,"#E1BEE7"
				,"#CE93D8"
				,"#BA68C8"
				,"#AB47BC"
				,"#9C27B0"
				,"#8E24AA"
				,"#7B1FA2"
				,"#6A1B9A"
				,"#4A148C"

			],
			img: "https://s3-eu-west-1.amazonaws.com/bloodsweatandtears.eu/assets/images/aws.png"
		},
		{
			score:35,
			name: "Ionic",
			colors:[

			"#E3F2FD"
			,"#BBDEFB"
			,"#90CAF9"
			,"#64B5F6"
			,"#42A5F5"
			,"#2196F3"
			,"#1E88E5"
			,"#1976D2"
			,"#1565C0"
			,"#0D47A1"

			],
			img: "https://s3-eu-west-1.amazonaws.com/bloodsweatandtears.eu/assets/images/ionic.png"
		},
		{
			score:40,
			name: "CSS",
			colors:[
			"#EDE7F6",
			,"#D1C4E9"
			,"#B39DDB"
			,"#9575CD"
			,"#7E57C2"
			,"#673AB7"
			,"#5E35B1"
			,"#512DA8"
			,"#4527A0"
			,"#311B92"
			],
			img: "https://s3-eu-west-1.amazonaws.com/bloodsweatandtears.eu/assets/images/css3.png"
		},
		{
			score:43,
			name: "Ruby",
			colors:[
			"#E0F7FA",
			,"#B2EBF2"
			,"#80DEEA"
			,"#4DD0E1"
			,"#26C6DA"
			,"#00BCD4"
			,"#00ACC1"
			,"#0097A7"
			,"#00838F"
			,"#006064"
			],
			img: "https://s3-eu-west-1.amazonaws.com/bloodsweatandtears.eu/assets/images/ruby.jpg"
		},
		{
			score:37,
			name: "Firebase",
			colors:[
				"#FFF3E0"
				,"#FFE0B2"
				,"#FFCC80"
				,"#FFB74D"
				,"#FFA726"
				,"#FF9800"
				,"#FB8C00"
				,"#F57C00"
				,"#EF6C00"
				,"#E65100"
			],
			img: "https://s3-eu-west-1.amazonaws.com/bloodsweatandtears.eu/assets/images/firebase.png"
		},
		{
			score:30,
			name: "Google Cloud Compute",
			colors:[
			"#FBE9E7",
			,"#FFCCBC"
			,"#FFAB91"
			,"#FF8A65"
			,"#FF7043"
			,"#FF5722"
			,"#F4511E"
			,"#E64A19"
			,"#D84315"
			,"#BF360C"
			],
			img: "https://s3-eu-west-1.amazonaws.com/bloodsweatandtears.eu/assets/images/googlecloud.png"
		},
		{
			score:45,
			name: "PayPal",
			colors:[
			"#ECEFF1",
			,"#CFD8DC"
			,"#B0BEC5"
			,"#90A4AE"
			,"#78909C"
			,"#607D8B"
			,"#546E7A"
			,"#455A64"
			,"#37474F"
			,"#263238"
			],
			img: "https://s3-eu-west-1.amazonaws.com/bloodsweatandtears.eu/assets/images/paypal1.png"
		},
		{
			score:37,
			name: "PostgreSQL",
			colors:[
			"#E8EAF6",
			,"#C5CAE9"
			,"#9FA8DA"
			,"#7986CB"
			,"#5C6BC0"
			,"#3F51B5"
			,"#3949AB"
			,"#303F9F"
			,"#283593"
			,"#1A237E"
			],
			img: "https://s3-eu-west-1.amazonaws.com/bloodsweatandtears.eu/assets/images/postgres.png"
		},
		{
			score:42,
			name: "HTML5",
			colors:[
			"#E8EAF6",
			,"#C5CAE9"
			,"#9FA8DA"
			,"#7986CB"
			,"#5C6BC0"
			,"#3F51B5"
			,"#3949AB"
			,"#303F9F"
			,"#283593"
			,"#1A237E"
			],
			img: "https://s3-eu-west-1.amazonaws.com/bloodsweatandtears.eu/assets/images/html5.png"
		}
		]
	$scope.currView = "store";
	$scope.setView = function(text){
		$scope.currView = text;
	};
	$scope.startView = true;
	$scope.startGame = function(){
		$scope.startView = false;
		$scope.scrollToX('start');

	};

	$scope.verticals = ["restaurant" ,"bar" ,"store" ,"artist" ,"startup"]
	$scope.content = {
			restaurant:{
				implementations:[
				{
					title:"Digitise your menu",
					text: [
					"Show of your menu is fullscreen with interactive menus.",
					"Fullscreen photos and customiseable orders.",
					"Place orders and call wait staff from their phone"
					],
					icon: "assignment",
					gif: "https://s3-eu-west-1.amazonaws.com/bloodsweatandtears.eu/assets/images/foodmenu.gif",
				},
				{
					title:"Go Cashless",
					text: [
					"Accept payments from all card providers and never need a TPV.",
					"Futureproof your till by accepting Apple Pay Android Wallet and even Bitcoin!"
					],
					icon: "card_giftcard",
					gif: "https://s3-eu-west-1.amazonaws.com/bloodsweatandtears.eu/assets/images/money.gif",
				},
				{
					title:"Analyze & Improve",
					text:[
					"Using Beacon technology and app analytics we can help you gain insights into your business and your customers needs",
					 "Find ineffeciencies in your business and reclaim your lost profits!"
					 ],
					 icon: "multiline_chart",
					 gif: "https://s3-eu-west-1.amazonaws.com/bloodsweatandtears.eu/assets/images/analytics.gif",
				},
				{
					title:"Tax Bliss",
					text: ["Easily print out statements and excel spreadsheets for your accountant at tax season or just integrate with a tax filing system!"],
					icon: "account_balance",
					gif: "https://s3-eu-west-1.amazonaws.com/bloodsweatandtears.eu/assets/images/taxes.gif",
				}


				]
			},
			bar:{
				implementations:[
				{
					title:"Digitise your menu",
					text: ["Let your customers browse and order their drinks right from their phone.", "They do the ordering and your bartender focuses on tending bar", "Removing barriers to ordering drinks like 'Ugh the line is too long' and 'I've got no cash on me'"],
					icon: "assignment",
					gif: "https://s3-eu-west-1.amazonaws.com/bloodsweatandtears.eu/assets/images/foodmenu.gif",
				},
				{
					title:"Go Cashless",
					text: ["Give your customers customised NFC 'debit cards' they can preload and top up online with their phone. ","Everything is tracked and balanced in the cloud, once again leaving your bartenders to tend bar."," Accept payments from all card providers and never need a TPV. Futureproof your till by accepting Apple Pay Android Wallet and even Bitcoin!"],
					icon:"attach_money",
					gif: "https://s3-eu-west-1.amazonaws.com/bloodsweatandtears.eu/assets/images/money.gif",
				},
				{
					title:"Analyze & Improve",
					text: ["Using Beacon technologyand app analytics we can help you gain insights into your business and your customers needs","A-B test drink specials and special events with ease and confindence"],
					icon: "multiline_chart",
					gif: "https://s3-eu-west-1.amazonaws.com/bloodsweatandtears.eu/assets/images/analytics.gif",
				},
				{
					title:"Tax Bliss",
					text: ["Know where you stand at all times with total coverage of all your income and cost in real time.",
					"When tax season comes just hit a button and your accountant has all he needs."],
					icon: "account_balance",
					gif: "https://s3-eu-west-1.amazonaws.com/bloodsweatandtears.eu/assets/images/taxes.gif",
				},
				{
					title:"Payday made simple",
					text: ["Shift lists and payable hours - a nightmare, no more.","Automate and make sure payments are made correctly and timeously"],
					icon: "attach_money"
				}



				]
			},
			store:{
				implementations:[
				{
					title:"Sell Online",
					text: ["Get your products out into the world.","Custom built solutions to fit your needs and style.","From stock catalogs to invoicing and shipping - we got you."],
					icon: "add_shopping_cart"
				},
				{
					title:"Accept all the moneys",
					text: ["Accept payments from all card providers and never need a TPV.","Futureproof your till by accepting Apple Pay Android Wallet and even Bitcoin!"],
					icon:"attach_money",
					gif: "https://s3-eu-west-1.amazonaws.com/bloodsweatandtears.eu/assets/images/money.gif",
				},
				{
					title:"Go Social",
					text: ["Every store needs a social presence.","We will help set you up with a Facebook store, Instagram, Twitter, Facebook ads strategy and even automate it for you!"],
					icon: "share",
					gif: "https://s3-eu-west-1.amazonaws.com/bloodsweatandtears.eu/assets/images/social.gif",
				},
				{
					title:"Tax Bliss",
					text: ["Easily print out statements and excel spreadsheets for your accountant at tax season or just integrate with a tax filing system!"],
					icon: "account_balance",
					gif: "https://s3-eu-west-1.amazonaws.com/bloodsweatandtears.eu/assets/images/taxes.gif",
				}



				]
			},
			artist:{
				implementations:[
				{
					title:"Sell Online",
					text: ["Get your work out into the world."," Custom built solutions to fit your needs and style.","From stock catalogs to invoicing and shipping - we got you."],
					gif: "https://s3-eu-west-1.amazonaws.com/bloodsweatandtears.eu/assets/images/sellonline.gif",
				},
				{
					title:"Host your content",
					text: ["Make sure people get to enjoy your work - wherever they are, on whatever device.","Set up high quality, lightning fast streams of audio or video, present 360 video and VR content to phones worldwide"],
					gif: "https://s3-eu-west-1.amazonaws.com/bloodsweatandtears.eu/assets/images/content.gif",
				},
				{
					title:"Accept all the moneys",
					text:[ "Accept payments from all card providers and never need a TPV.","Futureproof your till by accepting Apple Pay Android Wallet and even Bitcoin!"],
					icon:"attach_money",
					gif: "https://s3-eu-west-1.amazonaws.com/bloodsweatandtears.eu/assets/images/money.gif",
				},
				{
					title:"Go Social",
					text: ["Every store needs a social presence.","We will help set you up with a Facebook store, Instagram, Twitter, Facebook ads strategy and even automate it for you!"],
					icon: "share",
					gif: "https://s3-eu-west-1.amazonaws.com/bloodsweatandtears.eu/assets/images/social.gif",
				},
				{
					title:"Tax Bliss",
					text: ["Easily print out statements and excel spreadsheets for your accountant at tax season or just integrate with a tax filing system!"],
					icon: "account_balance",
					gif: "https://s3-eu-west-1.amazonaws.com/bloodsweatandtears.eu/assets/images/taxes.gif",
				}



				]
			},

			startup:{
				implementations:[
				{
					title:"Prototype Now",
					text: ["You have the idea, now you need to show it to people", "We can help get you from idea to prototype and beyond"],
					icon: "alarm"
				},
				{
					title:"Establish your Online Presence",
					text: ["Get your domain, servers, email and SSL and webpage all sorted - make your .com a memorable one"],
					icon: "public"
				},
				{
					title:"Have it both ways",
					text:[ "Using the ever amazing Ionic framework we can build apps for both iOS and Android simulatenously and using the same code base. Saving time and money and getting your first release out faster!"]
					,icon: "code"
				},
				{
					title:"Go Social",
					text: ["Nobody needs social media quite like a startup with a product to promote", "Build a base of content and we'll help you blast the web with it with automated posting schedules across all major (and evenminor) social networks",
					"Using Google Adwords in conjunction with Facebook Ads we can make sure your product ends up in front of the right eyeballs "],
					icon: "share",
					gif: "https://s3-eu-west-1.amazonaws.com/bloodsweatandtears.eu/assets/images/social.gif",
				}



				]
			}
		}
		$scope.services = [
			{
				title: "Responsive Web Design",
				text: [
					"These days the web is available on shapes and sizes of screens.",
					"Make sure your web page is ready for all of them with pages built from the ground up to adjust and adapt to the space available",
					"From tiny iPhone5 5's to monstrous Samsung Phablets and 4K desktop monitors - be ready to dazzle on any screen size",
					"using powerful web technologies your site will be running smoothly and snappily even on legacy devices"
				],
				gif: "https://s3-eu-west-1.amazonaws.com/bloodsweatandtears.eu/assets/images/responsive.gif"
			},
			{
				title: "App Prototyping",
				text: [
					"Turn that idea for a revolutionary app into reality",
					"Combining the power of Cordova, Ionic and AngularJs we can go from the drawing board to live testing in a matter of weeks.",
					"Anything is possible - from a photo sharing app, secure private messaging app or payment processing apps"
					],
				gif: "https://s3-eu-west-1.amazonaws.com/bloodsweatandtears.eu/assets/images/prototyping.gif"
			},
			{
				title: "Online Store",
				text: [
				"Sell your goods the world over with a custom built store that is designed to meet your needs and brand style.",
				"Accept payments, issue invoices & refunds, print shipping labels and automated emailing systems - the whole nine yards"
					],
				gif: "https://s3-eu-west-1.amazonaws.com/bloodsweatandtears.eu/assets/images/store2.gif"
			},
			{
				title: "Content Hosting",
				text: [
					"Need to get your art/music/video out there?",
					"We can set up secure, reliable and fast media streams for any kind of content - audio, video, 360 video",
					"Using AWS's powerful architecture we can build you an easy to use media distribution platform that opens you up to the world - in HD of course"
					],
				gif: "https://s3-eu-west-1.amazonaws.com/bloodsweatandtears.eu/assets/images/content2.gif"
			}
			// ,
			// {
			// 	title: "",
			// 	text: [
			// 		],
			// 	gif: ""
			// }
		]
	$scope.enq = {
		name: "",
		company: "",
		email: "",
		text: ""
	};
	$scope.submitEnq = function(){

		Enquiry.submit($scope.enq).then(function(data){
			$scope.alert("Thanks!", "We'll be in touch soon!")
		})
	}
}])

.controller('BlogCtrl', ['$scope', 'Blogs', function($scope, Blogs){
	Blogs.getPosts().then(function(data){
		$scope.posts = data;
		twttr.widgets.load();
	})
	$scope.hoverObj = {};
}])
.controller('PostCtrl', ['$scope', 'Blogs', '$stateParams', function($scope, Blogs, $stateParams){
	var ref = firebase.database().ref();
	Blogs.getPost($stateParams.id).then(function(data){
		$scope.post = data;
	})
	$scope.likesCount = function(likes){
		if (likes) {
			return Object.keys(likes).length;
		} else {
			return 0;
		}

	};
	$scope.toggleLike = function(){

		if ($scope.auth) {
			if ($scope.post.likes && $scope.post.likes[$scope.auth.uid]) {
				$scope.post.likes[$scope.auth.uid] = null;
				ref.child("posts").child($stateParams.id).child("likes").child($scope.auth.uid).set({});
			} else {
				if (!$scope.post.likes) {
					$scope.post.likes = {};
				}
				$scope.post.likes[$scope.auth.uid] = true;
				ref.child("posts").child($stateParams.id).child("likes").child($scope.auth.uid).set(true);
			}
		}
	}
	$scope.toggleCommentLike = function(comm){
		if ($scope.auth) {
			if (comm.likes && comm.likes[$scope.auth.uid]) {
				comm.likes[$scope.auth.uid] = null;
				ref.child("comments").child(comm.$id).child("likes").child($scope.auth.uid).set({});
			} else {
				if (!comm.likes) {
					comm.likes = {};
				}
				comm.likes[$scope.auth.uid] = true;
				ref.child("comments").child(comm.$id).child("likes").child($scope.auth.uid).set(true);
			}
		}
	};
	Blogs.getComments($stateParams.id).then(function(data){

		$scope.comments = data;
	})
	if ($scope.auth) {
		$scope.newComment = {
			comment: "",
			uid: $scope.auth.uid,
			displayName: $scope.auth.displayName,
			postId: $stateParams.id,
			photo: $scope.auth.photoURL
		}
	} else {
		$scope.$on('authSet',function(){

			$scope.newComment = {
				comment: "",
				uid: $scope.auth.uid,
				displayName: $scope.auth.displayName,
				postId: $stateParams.id,
				photo: $scope.auth.photoURL
			}
		});

	};
	$scope.addComment = function(){
		Blogs.addComment($scope.newComment).then(function(data){
			$scope.newComment = {
				comment: "",
				uid: $scope.auth.uid,
				displayName: $scope.auth.displayName,
				postId: $stateParams.id,
				photo: $scope.auth.photoURL
			}
		})
	}
}])
.controller('CreatePostCtrl', ['$scope', 'Blogs', '$stateParams', function($scope, Blogs, $stateParams){

	$scope.newPost = {
		title: "",
		banner: "",
		body: [],
		images: {},
		tags:[]
	};
	$scope.newData = {
		paragraph: "",
		quote: "",
		image:"",
		youtube:""
	}
	$scope.addParagraph = function(){

		var obj = {
			text: $scope.newData.paragraph,
			type: "text"
		}
		$scope.newPost.body.push(obj);
	}
	$scope.addPost = function(){
		Blogs.addPost($scope.newPost).then(function(data){
			console.log("done");
			console.log(data);
		})
	};

	$scope.addImage = function(){

		var obj = {
			image: $scope.newData.image,
			type: "image"
		}

		$scope.newPost.body.push(obj);
	};
	$scope.addQuote = function(){

		var obj = {
			text: $scope.newData.quote,
			type: "quote"
		}
		$scope.newPost.body.push(obj);
	};
	$scope.addYoutube = function(){

		var obj = {
			url: $scope.newData.youtube,
			type: "youtube"
		}
		debugger
		$scope.newPost.body.push(obj);
	};
}])

angular.module('bst.directives',[])
.directive('tagEnter', function () {
  return function(scope, element, attrs) {

     element.bind("keydown keypress", function(event) {
         var keyCode = event.which || event.keyCode;

         // If enter key is pressed
         if (keyCode === 13) {
             scope.$apply(function() {
                     // Evaluate the expression
                 scope.$eval(attrs.dlEnterKey);
             });

             event.preventDefault();
         }
     });
   }
})
.directive('threeKeys', function () {
    return function (scope, element, attrs) {
        var numKeysPress=0;
        element.bind("keydown keypress", function (event) {   
                 numKeysPress++;
                     if(numKeysPress>=3){
                        scope.$apply(function (){
                            scope.$eval(attrs.myOnKeyDownCall);
                        });
                        event.preventDefault();
                      }
                });
    };
})
.directive('myAutocomplete', function() {
    return {
        require: 'ngModel',
        replace: true,
        scope: {
            ngModel: '=',
            address1: "=",
            city: "=",
            state: "=",
            country: "=",
            zip: '=',
        },
        template: '<input class="form-control" type="text" data-tap-disabled>',
        link: function(scope, element, attrs, model) {
            var options = {
                // types: [],
                // componentRestrictions: {}
            };    

            var autocomplete = new google.maps.places.Autocomplete(element[0], options);

            google.maps.event.addListener(autocomplete, 'place_changed', function() {
                scope.$apply(function() {
                    var place = autocomplete.getPlace();
                    var components = place.address_components;  // from Google API place object   

                    scope.address1 = components[0].short_name + " " + components[1].short_name;
                    scope.city = components[3].short_name;
                    scope.state = components[5].short_name;
                    scope.country = components[6].long_name;
                    scope.zip = components[7].short_name;

                    model.$setViewValue(element.val());   
                });
            });
        }
    }
})
.directive('backImg', function(){
    return function(scope, element, attrs){
        var url = attrs.backImg;
        element.css({
            'background-image': 'url(' + url +')',
            'background-size' : 'cover'
        });
    };
})

.directive('disabletap', ['$timeout', function($timeout) {
  return {
    link: function() {
      $timeout(function() {
        container = document.getElementsByClassName('pac-container');
        // disable ionic data tab
        angular.element(container).attr('data-tap-disabled', 'true');
        // leave input field if google-address-entry is selected
        angular.element(container).on("click", function(){
            document.getElementById('type-selector').blur();
        });
       // container2 = document.getElementsByClassName('originput');
       //  // disable ionic data tab
       //  angular.element(container2).attr('data-tap-disabled', 'true');
       //  // leave input field if google-address-entry is selected
       //  angular.element(container2).on("click", function(){
       //      document.getElementById('type-selector').blur();
       //  });

      },500);

    }
  };
}])
.directive('onLongPress', ['$timeout',function($timeout) {
    return {
        restrict: 'A',
        link: function($scope, $elm, $attrs) {
            $elm.bind('touchstart', function(evt) {
                // Locally scoped variable that will keep track of the long press
                $scope.longPress = true;

                // We'll set a timeout for 600 ms for a long press
                $timeout(function() {
                    if ($scope.longPress) {
                        // If the touchend event hasn't fired,
                        // apply the function given in on the element's on-long-press attribute
                        $scope.$apply(function() {
                            $scope.$eval($attrs.onLongPress)
                        });
                    }
                }, 600);
            });

            $elm.bind('touchend', function(evt) {
                // Prevent the onLongPress event from firing
                $scope.longPress = false;
                // If there is an on-touch-end function attached to this element, apply it
                if ($attrs.onTouchEnd) {
                    $scope.$apply(function() {
                        $scope.$eval($attrs.onTouchEnd)
                    });
                }
            });
        }
    };
}])
.directive('myDirective', function () {
    return {
        restrict: 'EA', //E = element, A = attribute, C = class, M = comment         
        scope: {
            //@ reads the attribute value, = provides two-way binding, & works with functions
            title: '@'         },
      
        templateUrl: 'mytemplate.html',
        controller: controllerFunction, //Embed a custom controller in the directive
        link: function ($scope, element, attrs) { } //DOM manipulation
    }
})
.directive('ngDrag', ['$document', function($document) {
  return {
    link: function(scope, element, attr) {
      var startX = 0, startY = 0, x = 0, y = 0;

      // element.css({
      //  position: 'relative',
      //  border: '1px solid red',
      //  backgroundColor: 'lightgrey',
      //  cursor: 'pointer'
      // });

      element.on('mousedown', function(event) {
        // Prevent default dragging of selected content
        event.preventDefault();
        startX = event.pageX - x;
        startY = event.pageY - y;
        $document.on('mousemove', mousemove);
        $document.on('mouseup', mouseup);
      });

      function mousemove(event) {
        y = event.pageY - startY;
        x = event.pageX - startX;
        element.css({
          top: y + 'px',
          left:  x + 'px'
        });
      }

      function mouseup() {
        $document.off('mousemove', mousemove);
        $document.off('mouseup', mouseup);
      }
    }
  };
}]);

angular.module('bst.filters', []).filter('unique', function () {

  return function (items, filterOn) {

    if (filterOn === false) {
      return items;
    }

    if ((filterOn || angular.isUndefined(filterOn)) && angular.isArray(items)) {
      var hashCheck = {}, newItems = [];

      var extractValueToCompare = function (item) {
        if (angular.isObject(item) && angular.isString(filterOn)) {
          return item[filterOn];
        } else {
          return item;
        }
      };

      angular.forEach(items, function (item) {
        var valueToCheck, isDuplicate = false;

        for (var i = 0; i < newItems.length; i++) {
          if (angular.equals(extractValueToCompare(newItems[i]), extractValueToCompare(item))) {
            isDuplicate = true;
            break;
          }
        }
        if (!isDuplicate) {
          newItems.push(item);
        }

      });
      items = newItems;
    }
    return items;
  };
})
.filter('capitalise', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
})
.filter('fullstop', function() {
    return function(input) {
     if (input) {
      var o = input.charAt(input.length-1);
       if (o == "." ||o == "!"||o == "?") {
        return input
      } else {
        return input += "."
      }
    }else{
      return ""
      
    }
    }
})
.filter('converter', function() {
    return function(value, rate) {
      console.log("converter", value, rate.rate)
      return value * rate.rate
    }
})
.filter('searchFilter', ['User', function (User) {
  var user;
  var auth;
  var lang = "en";
   User.getUser().then(function(data){
      user = data.profile;
      auth = data.auth;
      lang = data.profile.l18n;
   })
 return function (products, search) {
     var result = {};
      if (search) {
        var tstr = angular.lowercase(search);
     angular.forEach(products, function (product, key) {
        if (product.searchKeys) {
          if (product.searchKeys[lang] && product.searchKeys[lang].name.indexOf(tstr) >= 0 ) {
            result[product.$id] = product;
        }
        if (lang != "en") {
          if (product.searchKeys["en"] && product.searchKeys["en"].name.indexOf(tstr) >= 0 ) {
              result[product.$id] = product;
          }
        }
        if (product.searchKeys[lang].subcat && product.searchKeys[lang].subcat.indexOf(tstr) >= 0) {
          result[product.$id] = product;
        }
        if (product.searchKeys[lang].keywords && product.searchKeys[lang].keywords.indexOf(tstr) >= 0) {
          result[product.$id] = product;
        }
      }
      
      
         // if (foobar.foo.Id === fooId) {
         //     result[key] = foobar;
         // }
     });
      }
     return result;
 };
}])
.filter('searchFilter2', ['User', 'InfoService', function (User, InfoService) {
  var user;
  var auth;
  var lang = "en";
   User.getUser().then(function(data){
      user = data.profile;
      auth = data.auth;
      lang = data.profile.l18n;
   })
 return function (sKeys, search) {
     var result = {};
      if (search) {
        var tstr = angular.lowercase(search);
      angular.forEach(sKeys, function (searchKeys) {
        
        if (searchKeys) {
          var searchName = angular.lowercase(searchKeys[lang].name);
          if (searchKeys[lang].keywords) {
             var searchKeywords = angular.lowercase(searchKeys[lang].keywords);
          }
       

          if (searchKeys[lang] && searchName.indexOf(tstr) >= 0 ) {
            // InfoService.getInfo(searchKeys.$id).then(function(item){
              result[searchKeys.$id] = searchKeys;
            // })
        }
        if (lang != "en") {
          if (searchKeys["en"] && searchName.indexOf(tstr) >= 0 ) {
              // InfoService.getInfo(searchKeys.$id).then(function(item){
                result[searchKeys.$id] = searchKeys;
              // })
          }
        }
        if (searchKeys[lang].subcat && searchKeys[lang].subcat.indexOf(tstr) >= 0) {
          // InfoService.getInfo(searchKeys.$id).then(function(item){
            result[searchKeys.$id] = searchKeys;
          // })
        }
        if (searchKeys[lang].keywords && searchKeywords.indexOf(tstr) >= 0) {
          // InfoService.getInfo(searchKeys.$id).then(function(item){
            result[searchKeys.$id] = searchKeys;
          // })
        }
      }
      
      
         // if (foobar.foo.Id === fooId) {
         //     result[key] = foobar;
         // }
     });
      }
     return result;
 };
}])
/*.filter('multiTagSearch', ['', function () {
  
 return function (tickets, tags) {
     var result = {};
      if (tags) {
    angular.forEach(tags, function(tag){
       angular.forEach(tickets, function (ticket, key) {
        if (ticket.sportid == tag) {
          result[]
        }
     });
    })
    
      }
     return result;
 };
}])*/
.filter('unsafe', function($sce) {
    return function(val) {
        return $sce.trustAsHtml(val);
    };
})
.filter('orderObjectBy', function(){
 return function(input, attribute) {
    if (!angular.isObject(input)) return input;

    var array = [];
    for(var objectKey in input) {
        array.push(input[objectKey]);
    }

    array.sort(function(a, b){
        a = parseInt(a[attribute]);
        b = parseInt(b[attribute]);
        return a - b;
    });
    return array;
 }
});
jQuery.expr.filters.offscreen = function(el) {
  var rect = el.getBoundingClientRect();
  return (
           (rect.x + rect.width) < 0 
             || (rect.y + rect.height) < 0
             || (rect.x > window.innerWidth || rect.y > window.innerHeight)
         );
};
(function($){

    /**
     * Copyright 2012, Digital Fusion
     * Licensed under the MIT license.
     * http://teamdf.com/jquery-plugins/license/
     *
     * @author Sam Sehnert
     * @desc A small plugin that checks whether elements are within
     *       the user visible viewport of a web browser.
     *       only accounts for vertical position, not horizontal.
     */
    var $w=$(window);
    $.fn.visible = function(partial,hidden,direction,container){

        if (this.length < 1)
            return;
	
	// Set direction default to 'both'.
	direction = direction || 'both';
	    
        var $t          = this.length > 1 ? this.eq(0) : this,
						isContained = typeof container !== 'undefined' && container !== null,
						$c				  = isContained ? $(container) : $w,
						wPosition        = isContained ? $c.position() : 0,
            t           = $t.get(0),
            vpWidth     = $c.outerWidth(),
            vpHeight    = $c.outerHeight(),
            clientSize  = hidden === true ? t.offsetWidth * t.offsetHeight : true;

        if (typeof t.getBoundingClientRect === 'function'){

            // Use this native browser method, if available.
            var rec = t.getBoundingClientRect(),
                tViz = isContained ?
												rec.top - wPosition.top >= 0 && rec.top < vpHeight + wPosition.top :
												rec.top >= 0 && rec.top < vpHeight,
                bViz = isContained ?
												rec.bottom - wPosition.top > 0 && rec.bottom <= vpHeight + wPosition.top :
												rec.bottom > 0 && rec.bottom <= vpHeight,
                lViz = isContained ?
												rec.left - wPosition.left >= 0 && rec.left < vpWidth + wPosition.left :
												rec.left >= 0 && rec.left <  vpWidth,
                rViz = isContained ?
												rec.right - wPosition.left > 0  && rec.right < vpWidth + wPosition.left  :
												rec.right > 0 && rec.right <= vpWidth,
                vVisible   = partial ? tViz || bViz : tViz && bViz,
                hVisible   = partial ? lViz || rViz : lViz && rViz,
		vVisible = (rec.top < 0 && rec.bottom > vpHeight) ? true : vVisible,
                hVisible = (rec.left < 0 && rec.right > vpWidth) ? true : hVisible;

            if(direction === 'both')
                return clientSize && vVisible && hVisible;
            else if(direction === 'vertical')
                return clientSize && vVisible;
            else if(direction === 'horizontal')
                return clientSize && hVisible;
        } else {

            var viewTop 				= isContained ? 0 : wPosition,
                viewBottom      = viewTop + vpHeight,
                viewLeft        = $c.scrollLeft(),
                viewRight       = viewLeft + vpWidth,
                position          = $t.position(),
                _top            = position.top,
                _bottom         = _top + $t.height(),
                _left           = position.left,
                _right          = _left + $t.width(),
                compareTop      = partial === true ? _bottom : _top,
                compareBottom   = partial === true ? _top : _bottom,
                compareLeft     = partial === true ? _right : _left,
                compareRight    = partial === true ? _left : _right;

            if(direction === 'both')
                return !!clientSize && ((compareBottom <= viewBottom) && (compareTop >= viewTop)) && ((compareRight <= viewRight) && (compareLeft >= viewLeft));
            else if(direction === 'vertical')
                return !!clientSize && ((compareBottom <= viewBottom) && (compareTop >= viewTop));
            else if(direction === 'horizontal')
                return !!clientSize && ((compareRight <= viewRight) && (compareLeft >= viewLeft));
        }
    };

})(jQuery);

var baseURL = "https://d4e7e241.ngrok.io";
// var baseURL = "https://www.pbpapi.com";

angular.module('bst.services', [])
.factory('Enquiry', ['$http', '$q', function($http, $q){
	function submit(obj){
		var deferred = $q.defer();
		var req = {
			"method": "POST",
			"headers": {
				"Content-Type": "application/json"

			},
			"url": baseURL + "/users/bst_enquiry"

			, "data": {
					obj: obj
				}
			}

		$http(req).then(function (response) {
			console.log(response.data);
			if (response.data) {
				deferred.resolve(response.data);
			} else {
				deferred.resolve(null);
			}

			// stockCache.put(pid, response.data);

			// $mdToast.show($mdToast.simple().textContent("We'll be in touch!"));
		})
		return deferred.promise
	}
	return {
		submit: function(obj){
			return submit(obj)
		}
	};
}])
.factory('Auth', ['$http', '$firebaseAuth', '$firebaseObject', '$q', function($http, $firebaseAuth, $firebaseObject, $q){
	var ref = firebase.database().ref();
	var authObj = $firebaseAuth();
	function signOut(){
		var deferred = $q.defer();
		authObj.$signOut().then(function(data){
			deferred.resolve(data)
		})

		return deferred.promise
	}
	function loginWith(prov, method) {
			var deferred = $q.defer();
			switch (prov) {
			case "google":
				var provider = new firebase.auth.GoogleAuthProvider();
				provider.addScope('https://www.googleapis.com/auth/plus.login');
				provider.addScope('https://www.googleapis.com/auth/userinfo.email');
				break;
			case "facebook":
				var provider = new firebase.auth.FacebookAuthProvider();
				provider.addScope('email');
				provider.addScope('user_friends');
				break;
			case "twitter":
				var provider = new firebase.auth.TwitterAuthProvidernewDriver();
				break;
			}
			switch (method) {
				case 'pop':
					authObj.$signInWithPopup(provider).then(function(userObj){
						//
						if(userObj.user && userObj.user.email ){
							var profile = {
							uid: userObj.user.uid,
							displayName: userObj.user.displayName,
							email: userObj.user.email
							}


						if (userObj.user.photoURL) {
							profile.photo = userObj.user.photoURL
						}
						//
							ref.child("profiles").child(userObj.user.uid).set(profile).then(function(data){
								deferred.resolve(profile)
							})


						}
					}, function(err){
						deferred.resolve(err)
					});
					break;
					case 'redir':
						firebase.auth().signInWithRedirect(provider);
						break;
				default:

			}
			return deferred.promise
		};
		function getAuth(){
			var deferred = $q.defer();
				var	auth = $firebaseAuth().$getAuth();
				deferred.resolve(auth);
				return deferred.promise;
		}
		return {
			loginWith: function(prov, method){
				return loginWith(prov, method)
			},
			getAuth : function(){
				return getAuth()
			},
			signOut : function(){
				return signOut()
			}
		}
}])
.factory('Blogs', ['$http', '$firebaseArray', '$firebaseObject', '$q', function($http, $firebaseArray, $firebaseObject, $q){
	var ref = firebase.database().ref();
	function getPosts(){
		var deferred = $q.defer();
		$firebaseArray(ref.child("posts")).$loaded(function(data){
			deferred.resolve(data);
		})
		return deferred.promise;
	};
	function getPost(id){
		var deferred = $q.defer();
		$firebaseObject(ref.child("posts").child(id)).$loaded(function(data){
			deferred.resolve(data);
		})
		return deferred.promise;
	};
	function getComments(id){
		var deferred = $q.defer();
		$firebaseArray(ref.child("comments").orderByChild('postId').equalTo(id)).$loaded(function(data){
			deferred.resolve(data);
		})
		return deferred.promise;
	};
	function addPost(post){
		var deferred = $q.defer();
		post.timestamp = moment().format('x');
		$firebaseArray(ref.child("posts")).$add(post).then(function(data){
			deferred.resolve(data);
		}).catch(function(err){
			debugger
		})
		return deferred.promise;
	};
	function addComment(comm){
		var deferred = $q.defer();
		comm.timestamp = moment().format('x');
		$firebaseArray(ref.child("comments")).$add(comm).then(function(data){

			deferred.resolve(data);
		})
		return deferred.promise;
	};
	return {
		getPosts: function(){
			return getPosts();
		},
		getPost: function(id){
			return getPost(id);
		},
		getComments: function(id){
			return getComments(id);
		},
		addPost: function(post){
			return addPost(post);
		},
		addComment: function(comm){
			return addComment(comm);
		}
	}
}])
