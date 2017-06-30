/**
 * Controls navbar
 */
app.controller('NavbarCtrl', function($scope, $route, $location) {
    this.$route = $route;

    this.isNavCollapsed = true;


    this.goToGallery = function() {
        this.isNavCollapsed = true;
        $location.url("/");
    };

    this.goToTeachers = function() {
        this.isNavCollapsed = true;
        $location.url("/teachers");
    };
});


