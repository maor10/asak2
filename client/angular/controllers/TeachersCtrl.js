/**
 * Represents the teachers controller
 */
app.controller('TeachersCtrl', function($scope, $location, Teacher) {

    var vm = this;

    vm.teacher = teacher;
    vm.teachers = Teacher.query();

    vm.onFilter = function (filteredTeachers) {
        vm.teachers = filteredTeachers;
    };

    vm.onSelectTeacher = function(teacher) {
        vm.teacher = teacher;
    };


});


