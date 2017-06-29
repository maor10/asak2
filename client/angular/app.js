
var app = angular.module("asak", ['ngRoute', 'ngResource', 'ngFileUpload'])
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                controller: "GalleryCtrl",
                templateUrl: "/media/templates/gallery.tpl.html"
            });
    }
);