// console.log('ng-abiltiy');
AngularBonfire.factory("NgAbilityFactory", function($http, $q) {
  //this runs the first time the service is injected
  //this creates the service
  var factory = {}


  factory.getAll = function () {

  	var deferred = $q.defer()
  	
  	$http.get(AngularBonfireUrl+'/ability/get_profile_abilites_json').then(function(resp) {
    	
      deferred.resolve(resp.data)
 	  })

  	return deferred.promise
  }

  

  factory.addAbility = function (dataObject) {
  	
  	var deferred = $q.defer()

    var post_data = {
        'form_data'     : dataObject, 
        'ci_csrf_token' : ci_csrf_token()
    }
	
  	// so far we have an object we can 'POST' to our form which contains a security token
  	$.post(AngularBonfireUrl+'/ability/add', post_data).done(function(){
     		
        deferred.resolve('done')
    })

  	return deferred.promise
  }
  
  factory.updateAbility = function (id, dataObject) {

    var deferred = $q.defer();

    var post_data = {
      'item_ref'      : id,
      'form_data'     : dataObject, 
      'ci_csrf_token' : ci_csrf_token()
    }
  
    // so far we have an object we can 'POST' to our form which contains a security token
    $.post(AngularBonfireUrl+'/ability/update', post_data).done(function(sdf){
        console.log('saved', sdf)
        deferred.resolve('done')
    })

    return deferred.promise

  }

  factory.deleteAbility = function (id) {
  }

  return factory

})

var NgAbilityCtrl = AngularBonfire.controller('NgAbilityCtrl', [
	'$scope', 
	'$state', 
	'NgAbilityFactory', 
	function($scope, $state
		, NgAbilityFactory
		) {

	$scope.abilities = {};
	$scope.abilityFormData = {};

	$scope.init = function(){

		NgAbilityFactory.getAll().then(function(data) {
		    console.log(data);
		    $scope.abilities = data;
		});
  }
  $scope.init(); 

  $scope.addAbility = function() {

    console.log($scope.abilityFormData)
    	
  	// add to front of array
  	$scope.abilities.unshift($scope.abilityFormData)

    NgAbilityFactory.addAbility($scope.abilityFormData).then(function(data) {

		  console.log('saved', data)
    	// reset the form
    	$scope.abilityFormData = {}
		})
  }

  $scope.updateAbility = function(ability) {
    // Note, we are retrieving full ability object 
    // due to way form is submitted using ng-click(ng-model)
    // rather than ng-submit on the form element. 
    // We need to remove the user id from the post, 
    // so people cant  manipulate other users data.
    var id   = ability.id
    var dataObject = {
      name        : ability.name,
      description : ability.description
    } 

    NgAbilityFactory.addAbility(id, dataObject).then(function(data) {

      alert('saved')
    })
  }  

}])




