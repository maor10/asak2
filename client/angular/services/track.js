
app.factory('Track', function($resource) {
    return $resource('tracks/:id', {
        get: {
            method: 'GET',
            url: 'tracks/:id',
            isArray: false
        }
    });
});

