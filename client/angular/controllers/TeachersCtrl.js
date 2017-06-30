/**
 * Represents the teachers controller
 */
app.controller('TeachersCtrl', function($scope, Track, Teacher) {

    this.tracks = Track.query();
    this.teachers = Teacher.query();

    /**
     * Select a track to filter by
     */
    this.selectTrack = function () {
        this.teachers = this.teachers.filter(function (teacher) {
            return teacher.track_id = this.selectedTrackID;
        });
    };

    /**
     * Gets matching teachers by teacher name
     */
    this.getMatchingTeachers = function(searchText) {
        console.log("searhing for " + searchText + " in " + JSON.stringify(this.teachers));
        return this.teachers.filter(function (teacher) {
            return teacher.name.indexOf(searchText) > -1;
        });
    };
});


