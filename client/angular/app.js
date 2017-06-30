
var app = angular.module("asak", ['ngRoute', 'ngResource', 'ngFileUpload', 'ngMaterial', 'ui.bootstrap'])
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                controller: "GalleryCtrl as gallery",
                templateUrl: "/media/templates/gallery.html",
                activeTab: "gallery"
            })
            .when('/teachers', {
                controller: "ProfileCtrl as profile",
                templateUrl: "/media/templates/teacher-profile.html",
                activeTab: "teachers"
            })
            .when('/teachers/:id', {
                controller: "ProfileCtrl as profile",
                templateUrl: "/media/templates/teacher-profile.html",
                activeTab: "teachers"
            })
            .when('/thanks', {
                controller: "ThanksCtrl as thanks",
                templateUrl: "/media/templates/thanks.html",
                activeTab: "thanks"
            });
    }
);