/**
 * Photo service to perform all REST actions on photos, including uploading photos
 */
app.factory('Photo', function($resource, Photo) {

    var Photo = $resource("/photos/:id");

    Photo.prototype.upload =
    var photos = [];

    return {

        /**
         * Loads photos from server
         */
        loadPhotos: function (success, error) {
            $http.get("/photos").then(function (result) {
                photos = result;
                success(photos);
            }, error);
        },

        /**
         * @returns {Array} cached photos
         */
        getPhotos: function () {
            return photos;
        },

        /**
         * Uploads a photo to the server
         * @param file actual file object
         * @param text caption
         * @param teachers teachers in photo
         * @param success
         * @param error
         */
        upload: function (file, text, teachers, success, error) {
            Upload.upload({
                url: 'photos',
                arrayKey: '',
                headers: {'Content-Type': 'multipart/form-data'},
                data: {
                    photo: file,
                    text: text,
                    teachers: teachers
                }
            }).then(function (resp) {
                success(resp);
            }, function (resp) {
                error(resp);
            });
        }

    };
});
