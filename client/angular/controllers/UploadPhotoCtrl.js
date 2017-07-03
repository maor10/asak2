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
        $uibModalInstance.close();
        swal("מעלה..", "התמונה עולה", "success");
        Photo.upload(vm.photo.file, vm.photo.text, vm.photo.teachers.map(function(teacher) {
            return teacher.id;
        }), function(resp) {
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

    
    vm.queryTeachers = function (query) {
        return vm.teachers.filter(function (teacher) {
           return teacher.name.indexOf(query) > -1 || query === "";
        });
    };

});