var HEIGHT =  350;
/**
 * Photo service to perform all REST actions on photos, including uploading photos
 */
app.factory('Photo', function ($resource, Upload) {

    var Photo = $resource("/photos/:id");

    /**
     * Uploads a photo to the server
     * @param file actual file object
     * @param text caption
     * @param teachers teachers in photo
     * @param success
     * @param error
     */
    Photo.upload = function (file, text, teachers, success, error) {
        Upload.imageDimensions(file).then(
            function(dimensions){
                var scale = dimensions.height / HEIGHT;
                Upload.resize(file, {
                    width: dimensions.width / scale,
                    height: dimensions.height / scale
                }).then(
                    function(resizedFile){
                        Upload.upload({
                            url: 'photos',
                            arrayKey: '',
                            headers: {'Content-Type': 'multipart/form-data'},
                            data: {
                                photo: resizedFile,
                                text: text,
                                teachers: JSON.stringify(teachers)
                            }
                        }).then(function (resp) {
                            success(resp);
                        }, function (resp) {
                            error(resp);
                        });
                    });
            });
    };




    return Photo;
});

