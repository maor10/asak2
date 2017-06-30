/**
 * Represents the gallery controller
 */
app.controller('ProfileCtrl', function($scope, $routeParams, Teacher, Comment) {

    this.teacher = Teacher.get($routeParams.id);
    this.comments = Comment.query({teacher_id: $routeParams.id});
    this.items = ['Hello', "true", "nigga"];


    /**
     * Sends a message to the server
     */
    this.sendMessage = function() {
        $("#uploadPhotoModal").modal("show");
    }

});


