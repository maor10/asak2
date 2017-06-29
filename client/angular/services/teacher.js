/**
 * Teacher service to perform all REST actions on teachers
 */
app.factory('Teacher', function($http) {

    var teachers = [];

    return {

        /**
         * Loads teachers from server
         */
        loadTeachers: function (success, error) {
            $http.get("/teachers").then(function (result) {
                teachers = result;
                success(photos);
            }, error);
        },

        /**
         * @returns {Array} cached teachers
         */
        getTeachers: function () {
            return teachers;
        }

    };
});
