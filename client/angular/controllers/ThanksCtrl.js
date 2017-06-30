/**
 * Represents the Thanks you notes controller
 */
app.controller('ThanksCtrl', function($scope, $routeParams, $timeout, ThankYouNote) {

    var vm = this;

    /**
     * Represents users next thanks you note
     */
    vm.note = {
        text: ""
    };

    vm.notes = ThankYouNote.query();

    /**
     * Sends a comment to the server
     */
    vm.sendNote = function() {
        if (vm.note.text === '') {
            return;
        }
        var note = new ThankYouNote({
            text: vm.note.text
        });
        note.$save();
        vm.notes = ThankYouNote.query();
        vm.note.text = "";
    };


    $scope.intervalFunction = function(){
        $timeout(function() {
              ThankYouNote.query(function(data) {
                  vm.notes = data;
              });
          $scope.intervalFunction();
        }, 10000)
      };
     $scope.intervalFunction();

});


