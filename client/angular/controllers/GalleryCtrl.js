/**
 * Represents the gallery controller
 */
app.controller('GalleryCtrl', function($scope, $http, Upload, Photo, Teacher) {

    this.photos = Photo.query();
    this.teachers = Teacher.query();

});


