(function(){
	var app = angular.module('accredibleApp', []);

	var API_KEY = 'none';

	// Create a service that exposes the CREDENTIAL ID

	// Generates a custom HTML snippet for embedding a credential
	app.controller('CustomiseController', function($scope, $sce) {
		$scope.url    = 'https://www.credential.net/10000005';
		$scope.img    = 'https://s3.amazonaws.com/staging_accredible_api_mails/10000005';
		$scope.width  = 640;
		$scope.height = 480;
		$scope.maintainProportion = true;
		$scope.showLogo = true;
		$scope.html = 'testing';
		// "Template" rendering
		$scope.$watchGroup(['width', 'height', 'showLogo'], function(){
			// Build a clean HTML fragment
			var html = '';
			html += '<p style="text-align: center;">';
			html += '\n  <a href="'+$scope.url+'" target="_blank"><img src="'+$scope.img+'" width="'+$scope.width+'" height="'+$scope.height+'"></a>';
			if($scope.showLogo){
				html += '\n  <br>';
				html += '\n  <a href="https://www.accredible.com/" target="_blank"> powered by <img src="https://www.accredible.com/images/accredible_logo_white.png" width="100" height="17" style="vertical-align: middle;"></a>';
			}
			html += '\n</p>';
			$scope.html = html;
		}, true);
		// Make sure the image is kept in proportion - via the initial width and height
		var proportions = $scope.width / $scope.height;
		$scope.proportionCheck = function(dimensionChanged){
			if($scope.maintainProportion){
				if(dimensionChanged == 'width'){
					$scope.height = Math.round($scope.width / proportions);
				} else {
					$scope.width = Math.round($scope.height * proportions);
				}
			}
		};
	});

	// Filter to allow the direct rendering of our "unsafe" HTML fragment
	app.filter('unsafe', function($sce) {
		return $sce.trustAsHtml;
	});

	/* The custom directive works visually, but dirties up the DOM with various angular classes and attributes
	app.directive('customHtml', function() {
		return {
			restrict: 'E',
			templateUrl: 'custom-html.html'
		};
	});
	*/

})();
