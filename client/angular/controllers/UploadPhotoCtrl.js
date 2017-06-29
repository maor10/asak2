/**
 * Upload photo controller
 */
app.controller('UploadPhotoCtrl', function($scope, Upload, Photo, Teacher) {

    $scope.data = {
        /**
         * Photo object being created
         */
        photo: {},
        teachers: []
    };

    /**
     * Load teachers from server
     */
    _.forEach(Teacher.getTeachers(), function(value) {
        $scope.data.teachers[value] = false;
    });


    /**
     * Uploads a photo to the server
     */
    $scope.uploadPhoto = function() {
        $("#uploadPhotoModal").modal("hide");

        Photo.upload($scope.data.photo.file, $scope.data.photo.text, getSelectedTeachers(), function(resp) {
            //todo: update photos
            swal("Uploaded!", "Photo uploaded successfully!", "success");
        }, function (resp) {
            console.log('Error status: ' + resp.status);
            swal("Error!", resp, "error");
        });

    };

    /**
     * Gets selected teachers
     */
    function getSelectedTeachers() {
        return _.keys($scope.data.teachers).filter(function (teacher) {
            return $scope.data.teachers[teacher];
        });
    }
});