var Site = angular.module('Site', []);

Site.config(function ($routeProvider) {
  $routeProvider
    .when('/page/:slug', {templateUrl: 'partials/page.html', controller: 'RouteController'})
    .otherwise({redirectTo: '/page/home'});
});

function AppController ($scope, $rootScope, $http) {
  // Load pages on startup
  $http.get('data/pages.json').success(function (data) {
    $rootScope.pages = data;
  });

  // Set the slug for menu active class
  $scope.$on('routeLoaded', function (event, args) {
    $scope.slug = args.slug;
  });
}

function RouteController ($scope, $rootScope, $routeParams) {
  // Getting the slug from $routeParams
  var slug = $routeParams.slug;
  
  $scope.$emit('routeLoaded', {slug: slug});
  $scope.page = $rootScope.pages[slug];
}