newTab.controller('newTabCtrl', function($scope, $timeout, $uibModal) {

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
	}

	$scope.addShortCut = function() {
		var modalInstance = $uibModal.open({
	        animation: true,
	        templateUrl: 'templates/add-shortcut.html',
	        controller: 'addShortCutModalCtrl'
	    });
	    modalInstance.result.then(function (newShortcut) {
	    	$scope.newTablinks = JSON.parse(localStorage.getItem('newTablinks'));
	    	$scope.newTablinks.push(newShortcut);
	    	localStorage.setItem('newTablinks', JSON.stringify($scope.newTablinks));
	    });
	}

});

newTab.controller('addShortCutModalCtrl', function($scope,  $modalInstance) {
	$scope.name = "";
	$scope.url = "";
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