/**
 * Filters teachers
 */
app.controller('FilterTeachersCtrl', function($scope) {

    var vm = this;

    vm.tracks = $scope.tracks;
    vm.teachers = $scope.teachers;

    /**
     * Teachers filtered
     */
    vm.filteredTeachers = vm.teachers;

    /**
     * Gets matching teachers by teacher name
     */
    vm.getMatchingTeachers = function() {
        return vm.filterTeachers();
    };

    /**
     * Filters teachers, and returns result
     */
    this.filterTeachers = function() {
        vm.filteredTeachers = vm.teachers.filter(function (teacher) {
            return teacherInSelectedTrack(teacher, vm.selectedTrackID)
                && teacherNameMatchesFilter(teacher, vm.searchText)
        });
        $scope.onFilter({filteredTeachers: vm.filteredTeachers});
        vm.filteredTeachers.unshift({name: "כולם"});
        return vm.filteredTeachers;
    };

    /**
     * Returns whether teacher is in the selected track
     * @returns {boolean}
     */
    function teacherInSelectedTrack(teacher, trackID) {
        return (vm.selectedTrackID === undefined
                    || vm.selectedTrackID === -1
                    || teacher.track_id === trackID);
    }

    /**
     * Returns whether teacher's name matches search text
     * @returns {boolean}
     */
    function teacherNameMatchesFilter(teacher, searchText) {
        return (teacher.name.indexOf(searchText) > -1 || searchText === "" || searchText  === "כולם") ;
    }


    this.selectTeacher = function(teacher) {
        $scope.onSelectTeacher({teacher: teacher});
        this.filterTeachers();
    };
});


