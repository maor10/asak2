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

        modalInstance.result.then(function () {
            Photo.query(function (data) {
                vm.photos = data;
                vm.filteredPhotos = vm.photos;
            });
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


