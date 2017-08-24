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