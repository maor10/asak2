/**
 * Represents the gallery controller
 */
app.controller('ProfileCtrl', function($scope, $routeParams, Photo, Teacher, Comment) {

    this.teacher = Teacher.get({teacherID: $routeParams.id});
    this.photos = Photo.query({teacher_id: $routeParams.id});
    this.comments = Comment.query({teacher_id: $routeParams.id});


    /**
     * Sends a comment to the server
     */
    this.sendComment = function() {
        comment = new Comment({
            poster: this.poster,

        })
    }

});


