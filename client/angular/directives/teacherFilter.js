/**
 * Filter by teachers and tracks
 */
app.directive('teacherFilter', function() {
    return {
       restrict: 'E',
       controller: 'FilterTeachersCtrl',
       controllerAs: 'filter',
       scope: {
           teachers: "=",
           tracks: "=",
           onFilter: "&",
           onSelectTeacher: "&"
       },
       templateUrl: '/media/templates/teacher-filter.html'
   }
});