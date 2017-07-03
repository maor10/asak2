/**
 * Represents the gallery controller
 */
app.controller('GalleryCtrl', function($scope, $uibModal, Photo, Teacher, Track) {

    var vm = this;

    vm.photos = Photo.query();
    vm.filteredPhotos = vm.photos;

    vm.teachers = Teacher.query();
    vm.tracks = Track.query();

    /**
     * Opens modal allowing user to upload a photo
     */
    vm.openUploadPhotoModal = function() {

        var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: '/media/templates/upload-photo-modal.html',
            size: 'lg',
            controller: 'UploadPhotoCtrl',
            controllerAs: 'upc',
            resolve: {
                teachers: function() {
                    return vm.teachers;
                }
            }
        });

        modalInstance.result.then(function (photo) {
            swal("מעלה..", "התמונה עולה", "success");
                Photo.upload(photo.file, photo.text, photo.teachers, function(resp) {
                    vm.photos.push(resp.data);
                    swal("הושלם!", "ארני גאה בך!", "success");
                }, function (resp) {
                    console.log('Error status: ' + resp.status);
                    swal("כושלה!", "יכשלון... כמה האתר כבר קשה לשימוש?!", "error");
                });
        });


    };


    vm.openPhotoModal = function(photo) {
        $uibModal.open({
            animation: true,
            ariaDescribedBy: 'modal-body',
            templateUrl: '/media/templates/photo-modal.html',
            size: 'lg',
            controller: 'PhotoCtrl',
            controllerAs: 'photo',
            resolve: {
                photo: function() {
                    return photo;
                }
            }
        });
    };


    vm.onFilter = function(filteredTeachers) {
        vm.filteredPhotos = vm.photos.filter(function(photo) {
            return _.intersection(
                filteredTeachers.map(function (filteredTeacher) {
                    return filteredTeacher.id;
                }), photo.teachers.map(function (teacher) {
                    return teacher.id;
                } )).length > 0;
        });
    }

});


