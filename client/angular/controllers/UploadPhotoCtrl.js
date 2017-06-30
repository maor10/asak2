/**
 * Upload photo controller
 */
app.controller('UploadPhotoCtrl', function($scope, Photo) {


    /**
     * Photo object being created
     */
    this.photo = {
        text: "",
        teachers: []
    };

    /**
     * Uploads a photo to the server
     */
    this.uploadPhoto = function() {
        $("#uploadPhotoModal").modal("hide");

        Photo.upload(this.photo.file, this.photo.text, this.photo.teachers, function(resp) {
            swal("Uploaded!", "Photo uploaded successfully!", "success");
        }, function (resp) {
            console.log('Error status: ' + resp.status);
            swal("Error!", resp, "error");
        });

    };

    /**
     * Toggle teacher in photo.teachers
     * @param teacherID
     */
    this.toggleTeacher = function(teacherID) {
        if (_.includes(this.photo.teachers, teacherID)) {
            this.photo.teachers.splice(this.photos.indexOf(teacherID), 1);
        } else {
            this.photo.teachers.push(teacherID);
        }
    };

});