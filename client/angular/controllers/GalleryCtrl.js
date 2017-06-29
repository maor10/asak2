/**
 * Represents the gallery controller
 */
app.controller('GalleryCtrl', function($scope, $http, Upload, Photo, Teacher) {

    $scope.photos = Photo.query();
    $scope.teachers = Teacher.query();

});


