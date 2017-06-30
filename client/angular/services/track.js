
app.factory('Track', function($resource) {
    return $resource('tracks/:id');
});

