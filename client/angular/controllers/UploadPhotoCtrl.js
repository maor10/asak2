/**
 * Upload photo controller
 */
app.controller('UploadPhotoCtrl', function($scope, $uibModalInstance, Teacher, Photo, teachers) {

    var vm = this;
    vm.filterSelected = true;
    vm.minLength = 0;

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
        if (vm.photo.hasOwnProperty("file") && vm.photo.hasOwnProperty("text") && vm.photo.hasOwnProperty("teachers")) {
            var photo = {
                file: vm.photo.file, text: vm.photo.text, teachers: vm.photo.teachers.map(function (teacher) {
                    return teacher.id;
                })
            };
            $uibModalInstance.close(photo);
        } else {
            swal("פסטן!!!", "יחנון, תמלא את כל השדות!", "error");
        }
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

    
    vm.queryTeachers = function (query) {
        return vm.teachers.filter(function (teacher) {
           return teacher.name.indexOf(query) > -1 || query === "";
        });
    };

});

