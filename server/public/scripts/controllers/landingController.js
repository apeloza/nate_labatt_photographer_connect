app.controller('LandingController', ['$scope', '$http', '$location', '$mdDialog', function ($scope, $http, $location, $mdDialog) {
    $scope.arrayData = [
  { src: "../assets/images/homephotos/1.jpg" },
  // { src: "../assets/images/homephotos/2.jpg" },
  { src: "../assets/images/homephotos/3.jpg" },
  { src: "../assets/images/homephotos/4.jpg" },
  { src: "../assets/images/homephotos/6.jpg" },
  { src: "../assets/images/homephotos/7.jpg" }
];

  $scope.closeContactUsModal = function() {
      $scope.showContactUsModal = false;
  };

  $scope.status = '';
  $scope.showAlert = function(ev) {
    $mdDialog.show({
      controller: DialogController,
      contentElement: '#contactInfo',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true
    });
  };

  function DialogController($scope, $mdDialog) {
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };
}

}]);
