/**
 * Represents the gallery controller
 */
app.controller('GalleryCtrl', function($scope, Photo, Teacher) {

    this.photos = Photo.query();
    this.teachers = Teacher.query();

    /**
     * Opens modal allowing user to upload a photo
     */
    this.openUploadPhotoModal = function() {
        $("#uploadPhotoModal").modal("show");
    }

});


