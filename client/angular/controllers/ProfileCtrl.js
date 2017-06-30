/**
 * Represents the gallery controller
 */
app.controller('ProfileCtrl', function($scope, $routeParams, $timeout, Photo, Teacher, Comment) {

    var vm = this;

    vm.teachers = Teacher.query();

    if ($routeParams.hasOwnProperty("id")) {
        loadTeacher($routeParams.id);
    }

    vm.comments = Comment.query({teacher_id: $routeParams.id});


    /**
     * Represents users next comment
     */
    vm.comment = {
        text: "",
        poster: ""
    };

    /**
     * Sends a comment to the server
     */
    vm.sendComment = function() {
        if (vm.comment.text === '')
            return;
        var comment = new Comment({
            text: vm.comment.text,
            poster: vm.comment.poster,
            teacher_id: vm.teacher.id
        });
        comment.$save();
        vm.comments = Comment.query({teacher_id: $routeParams.id});
        vm.comment.text = "";
    };


    this.onSelectTeacher = function (teacher) {
        vm.teacher = teacher;
        vm.photos = Photo.query({teacher_id: teacher.id});
    };


    /**
     * Loads a teacher from an id
     * @param teacher_id
     */
    function loadTeacher(teacher_id) {
        vm.teacher = Teacher.get({teacherID: teacher_id});
        vm.photos = Photo.query({teacher_id: teacher_id});
    }

    $scope.intervalFunction = function(){
        $timeout(function() {
          if (vm.teacher !== undefined) {
              Comment.query({teacher_id: vm.teacher.id}, function(data) {
                  vm.comments = data;
              });
          }
          $scope.intervalFunction();
        }, 10000)
      };
     $scope.intervalFunction();

});


