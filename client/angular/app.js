
var app = angular.module("asak", ['ngRoute', 'ngResource', 'ngFileUpload', 'ngMaterial'])
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                controller: "GalleryCtrl as gallery",
                templateUrl: "/media/templates/gallery.html"
            })
            .when('/teacher/:id', {
                controller: "ProfileCtrl as profile",
                templateUrl: "/media/templates/teacher-profile.html"
            });
    }
);