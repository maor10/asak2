/**
 * Comment service to perform all REST actions on messages
 */
app.factory('Comment', function ($resource) {
    return $resource("/comments/:id");
});