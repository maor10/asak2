
var app = angular.module("asak", ['ngRoute', 'ngResource', 'ngFileUpload'])
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                controller: "GalleryCtrl as gallery",
                templateUrl: "/media/templates/gallery.tpl.html"
            });
    }
);