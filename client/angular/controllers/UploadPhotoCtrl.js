/**
 * Upload photo controller
 */
app.controller('UploadPhotoCtrl', function($scope, $uibModalInstance, Teacher, Photo, teachers) {

    var vm = this;

    vm.$onInit = function () {
      vm.teachers = teachers;
    };

    /**
     * Photo object being created
     */
    vm.photo = {
        text: "",
        teachers: []
    };


    /**
     * Uploads a photo to the server
     */
    vm.uploadPhoto = function() {
        $uibModalInstance.close();
        Photo.upload(vm.photo.file, vm.photo.text, vm.photo.teachers, function(resp) {
            swal("הושלם!", "ארני גאה בך!", "success");
        }, function (resp) {
            console.log('Error status: ' + resp.status);
            swal("כושלה!", "יכשלון... כמה האתר כבר קשה לשימוש?!", "error");
        });
    };

    /**
     * Dismiss modal
     */
    vm.cancel = function() {
        $uibModalInstance.dismiss();
    };

    /**
     * Toggle teacher in photo.teachers
     * @param teacherID
     */
    vm.toggleTeacher = function(teacherID) {
        if (_.includes(vm.photo.teachers, teacherID)) {
            vm.photo.teachers.splice(vm.photo.teachers.indexOf(teacherID), 1);
        } else {
            vm.photo.teachers.push(teacherID);
        }
    };


    // ----------------FROM HERE IS FOR CHIPS --------------//
    /**
     * Return the proper object when the append is called.
     */
    vm.transformChip = function transformChip(chip) {
      // If it is an object, it's already a known chip
        return chip.id;
      };

    vm.autocompleteRequireMatch = true;
    vm.selectedItem = null;
    vm.searchText = null;

    /**
     * Search for teachers.
     */
    vm.QuerySearchTeachers = function querySearch (query) {
      var results = query ? vm.teachers.filter(vm.CreateFilterForTeacher(query)) : [];
      return results;
    };

    /**
     * Create filter function for a query string
     */
    vm.CreateFilterForTeacher = function createFilterFor(query) {
      return function filterFn(teacher) {
        return (teacher.name.indexOf(query) !== -1);
      };

    };

});