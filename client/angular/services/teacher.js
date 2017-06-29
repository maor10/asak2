
app.factory('Teacher', function($resource) {
    return $resource('teachers/:id');
});

