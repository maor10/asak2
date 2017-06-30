/**
 * Represents the gallery controller
 */
app.controller('ProfileCtrl', function($scope, $routeParams, Photo, Teacher, Comment) {

    this.teacher = Teacher.get({teacherID: $routeParams.id});
    this.photos = Photo.query({teacher_id: $routeParams.id});
    this.comments = Comment.query({teacher_id: $routeParams.id});

    /**
     * Represents users next comment
     */
    this.comment = {
        text: "",
        poster: ""
    };

    /**
     * Sends a comment to the server
     */
    this.sendComment = function() {
        var comment = new Comment({
            text: this.comment.text,
            poster: this.comment.poster,
            teacher_id: this.teacher.id
        });
        comment.$save();
        this.comments = Comment.query({teacher_id: $routeParams.id});
        this.comment.text = "";
    }

});


