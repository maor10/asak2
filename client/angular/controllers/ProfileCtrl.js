/**
 * Represents the gallery controller
 */
app.controller('ProfileCtrl', function($scope, $routeParams, Photo, Teacher, Comment) {
    this.teacher = Teacher.get($routeParams.id);
    this.photos = Photo.query({teacher_id: $routeParams.id});
    this.comments = Comment.query({teacher_id: $routeParams.id});


    /**
     * Sends a message to the server
     */
    this.sendMessage = function() {
        $("#uploadPhotoModal").modal("show");
    }

});


