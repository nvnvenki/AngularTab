var newTab = angular.module('newTab', ['ui.bootstrap']);
newTab.config(['$modalProvider', function($modalProvider)  {
  $modalProvider.options.animation = true;
}]);
// Initialize tooltip
 $('[data-toggle="tooltip"]').tooltip()
// Initialize bootstrap material
$.material.init();