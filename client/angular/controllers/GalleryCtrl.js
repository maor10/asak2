/**
 * Represents the gallery controller
 */
app.controller('GalleryCtrl', function($scope, $http, Upload, Photo) {

    this.photos = Photo.query();

});


