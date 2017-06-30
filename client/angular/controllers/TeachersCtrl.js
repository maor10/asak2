/**
 * Represents the teachers controller
 */
app.controller('TeachersCtrl', function($scope, $location, Track, Teacher) {

    this.tracks = Track.query();
    this.teachers = Teacher.query();

    /**
     * Teachers displayed
     */
    this.filteredTeachers = this.teachers;


    /**
     * Select a track to filter by
     */
    this.selectTrack = function () {
        this.filteredTeachers = this.filteredTeachers.filter(function (teacher) {
            return teacher.track_id = this.selectedTrackID;
        });
    };

    /**
     * Gets matching teachers by teacher name
     */
    this.getMatchingTeachers = function(searchText) {
        return this.filteredTeachers.filter(function (teacher) {
            return teacher.name.indexOf(searchText) > -1;
        });
    };

    function filterTeachers() {
        /*this.filteredTeachers = this.teachers.filter(function (teacher) {
            if (this.selectedTrackID > 0 && teacher.track_id !== this.selectedTrackID) {
                 return false;
            } else {
                return this.
            }
        });*/
    };

});


