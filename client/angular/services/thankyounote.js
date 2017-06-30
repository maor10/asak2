/**
 * Comment service to perform all REST actions on messages
 */
app.factory('ThankYouNote', function ($resource) {
    return $resource("/thanks");
});