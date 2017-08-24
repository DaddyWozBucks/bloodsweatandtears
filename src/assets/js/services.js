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
