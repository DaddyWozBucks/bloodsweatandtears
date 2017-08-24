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
