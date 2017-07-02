/**
 * Photo controller
 */
app.controller('PhotoCtrl', function(photo, $uibModalInstance) {

    var vm = this;

    vm.$onInit = function () {
      vm.photo = photo;
    };

    /**
     * Dismiss modal
     */
    vm.cancel = function() {
        $uibModalInstance.dismiss();
    };

});