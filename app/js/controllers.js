newTab.controller('newTabCtrl', function($scope, $timeout, $uibModal, $window) {
	// Build the date object
	$scope.date = {};

	// Update time function
	var updateTime = function() {
		$scope.date.raw = new Date();
		$timeout(updateTime, 1000);
	}

	// Start the update function
	updateTime();

	// Default values
	$scope.newTablinks = [{
		name: 'Google',
		url: 'google.com'
	},{
		name: 'Facebook',
		url: 'facebook.com'
	},{
		name: 'Twitter',
		url: 'twitter.com'
	}];

	// If the new tab link details are stored
	if(localStorage.getItem('newTablinks-stored') !== null) {
		$scope.newTablinks = JSON.parse(localStorage.getItem('newTablinks'));
	} else {
		localStorage.setItem('newTablinks-stored', true);
		localStorage.setItem('newTablinks', JSON.stringify($scope.newTablinks));
		localStorage.setItem('defaultNewTablinks', JSON.stringify($scope.newTablinks));
	}

	$scope.addShortCut = function() {
		var modalInstance = $uibModal.open({
	        templateUrl: 'templates/add-edit-shortcut.html',
	        controller: 'shortCutModalCtrl',
	         resolve: {
	        	newTabLink: function () {
	        		return undefined;
	        	}
	       }
	    });
	    modalInstance.result.then(function (newShortcut) {
	    	$scope.newTablinks = JSON.parse(localStorage.getItem('newTablinks'));
	    	$scope.newTablinks.push(newShortcut);
	    	localStorage.setItem('newTablinks', JSON.stringify($scope.newTablinks));
	    });
	};

	$scope.openLink = function(link) {
		$window.open('http://' + link.url + "/");
	};

	$scope.removeShortcut = function(newTabLink, $event) {
		$event.stopPropagation();
		var modalInstance = $uibModal.open({
	        templateUrl: 'templates/delete-shortcut.html',
	        controller: 'deleteShortCutModalCtrl'
	    });
	    modalInstance.result.then(function (deleteShortcut) {
	    	if(deleteShortcut) {
	    		 $scope.newTablinks = JSON.parse(localStorage.getItem('newTablinks'));
				var indexToDelete = $scope.newTablinks.indexOf(newTabLink);
		  		$scope.newTablinks.splice(indexToDelete, 1);     
				localStorage.setItem('newTablinks', JSON.stringify($scope.newTablinks));
	    	}
	    });
		
	};

	$scope.editShortcut = function(newTabLink, $event) {
		$event.stopPropagation();
		var indexToEdit = $scope.newTablinks.indexOf(newTabLink);

		var modalInstance = $uibModal.open({
	        templateUrl: 'templates/add-edit-shortcut.html',
	        controller: 'shortCutModalCtrl',
		    resolve: {
	        	newTabLink: function () {
	        		return newTabLink;
	        	}
	       }
	    });
	    modalInstance.result.then(function (modifiedShortcut) {
	    	$scope.newTablinks = JSON.parse(localStorage.getItem('newTablinks'));
	    	$scope.newTablinks[indexToEdit] = modifiedShortcut;
	    	localStorage.setItem('newTablinks', JSON.stringify($scope.newTablinks));
	    });
	};

	$scope.resetNewTabToDefault = function() {
		localStorage.removeItem('newTablinks');
		localStorage.removeItem('newTablinks-stored');
		$scope.newTablinks = JSON.parse(localStorage.getItem('defaultNewTablinks'));
	};

});

newTab.controller('shortCutModalCtrl', function($scope,  $modalInstance, newTabLink) {
	$scope.buttonText = "Add";
	if(newTabLink != undefined) {
		$scope.name = newTabLink.name;
		$scope.url = newTabLink.url;
		$scope.buttonText = "Ok"
	} else {	
		$scope.name = "";
		$scope.url = "";
	}

	$scope.ok = function () {
		// No values entered
		if($scope.name.trim() === "" || $scope.url.trim === "") {
			$scope.cancel();
		}

		$modalInstance.close({
			name: $scope.name,
			url: $scope.url
		});
	};

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
});

newTab.controller('deleteShortCutModalCtrl', function($scope,  $modalInstance) {
	$scope.yes = function() {
		$modalInstance.close({
			deleteShortcut: true
		});
	};

	$scope.no = function () {
		$modalInstance.dismiss('cancel');
	};
});