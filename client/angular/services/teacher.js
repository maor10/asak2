
app.factory('Teacher', function($resource) {
    return $resource('teachers/:id', {id: "@teacherID"},  {
        get: {
            method: 'GET',
            url: 'tracks/:id',
            isArray: false
        }
    });
});

