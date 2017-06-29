/**
 * Represents the teachers controller
 */
app.controller('TeachersCtrl', function($scope, $http, Upload, Photo, Teacher) {

    this.photos = Photo.query();
    this.teachers = Teacher.query();

});


