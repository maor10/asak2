import json
import os

from PIL import Image, ImageOps
from flask import Flask, send_from_directory, request, session, abort
from flask_uploads import configure_uploads, UploadNotAllowed

import config
from encoders import PhotoEncoder, TeacherEncoder
from load_initial_data import load_initial_data
from models import *

THUMBNAIL_SIZE = (300, 200)
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['UPLOADS_DEFAULT_DEST'] = config.PHOTOS_PATH
db.init_app(app)
configure_uploads(app, uploaded_photos)


def create_thumbnail(photo_path, file_name, size=config.THUMBNAIL_SIZE):
    """
    Creates a thumbnail for the given photo with the given size.
    :param photo_path: The full photo path to open the image from.
    :param file_name: the name of the original photo, for nice naming.
    :param size: (width, height)
    :return thumb name
    """
    im = Image.open(photo_path)
    thumb = ImageOps.fit(im, size, Image.ANTIALIAS)
    thumb_name = "{0}_{1}X{2}.jpg".format(file_name, *size)
    thumbnail_path = os.path.join(config.THUMBNAILS_PATH, thumb_name)
    thumb.save(thumbnail_path, format='JPEG')
    return thumb_name


def get_url_for_thumb(thumb_name):
    url_for_thumb = os.path.join(config.THUMBNAILS_URL, "{0}".format(thumb_name))
    return url_for_thumb

@app.route('/uploads/photos/<path:photo>')
def send_photo(photo):
    return send_from_directory(directory=config.PHOTOS_PATH, filename=photo)


@app.route("/media/<path:file>")
def send_media(file):
    return send_from_directory(directory=config.MEDIA_PATH, filename=file)


@app.route("/css/<path:file>")
def send_css(file):
    return send_from_directory(directory=config.CSS_PATH, filename=file)


@app.route("/js/<path:file>")
def send_js(file):
    return send_from_directory(directory=config.JS_PATH, filename=file)


@app.route("/images/<path:file>")
def send_images(file):
    return send_from_directory(directory=config.IMAGES_PATH, filename=file)


@app.route('/')
def landing_page():
    return _send_template("landing_page.html")


@app.route('/asak')
def asak():
    return _send_template("index.html")


@app.route('/photos', methods=['GET'])
def photos():
    args = request.args
    if 'teacher_id' in args:
        return json.dumps(Teacher.query.get(int(args['teacher_id'])), cls=PhotoEncoder)
    elif 'track_id' in args:
        teachers = Teacher.query.filter_by(track_id=int(args['track_id']).all())
        photos = reduce(lambda x, y: x + y, [teacher.photos for teacher in teachers])
        return json.dumps(photos, cls=PhotoEncoder)
    return json.dumps(Photo.query.all(), cls=PhotoEncoder)


@app.route('/photos', methods=['POST'])
def create_photo():
    print request.files
    if request.method == 'POST':
        form = request.form
        photo = request.files['photo']
        text = form['text']
        teachers = map(int, json.loads(form['teachers']))
        try:
            ext = photo.filename.split('.')[-1]
            file_name = uploaded_photos.save(photo, name='photo.{0}'.format(ext))
        except UploadNotAllowed:
            abort(401, 'The selected file type is not allowed')
        else:
            thumb_name = create_thumbnail(uploaded_photos.path(file_name), file_name)
            photo = Photo(file_name=file_name, text=text, thumbnail=get_url_for_thumb(thumb_name))
            teachers = [Teacher.query.get(id) for id in teachers]
            for teacher in teachers:
                teacher.photos.append(photo)
            db.session.add(photo)
            db.session.commit()
    return json.dumps(True)


@app.route('/teachers', methods=['GET'])
def teachers():
    return json.dumps(Teacher.query.all(), cls=TeacherEncoder)


@app.route('/teachers/<id>', methods=['GET'])
def get_teacher(id):
    return json.dumps(Teacher.query.get(id), cls=TeacherEncoder)


@app.route("/teachers", methods=['POST'])
def create_teacher():
    if request.method == 'POST':
        form = request.form
        teacher_name = form['teacher_name']
        if not Teacher.query.filter_by(name=teacher_name).first():
            teacher = Teacher(teacher_name)
            db.session.add(teacher)
            db.session.commit()
            return json.dump(True)
        else:
            # A teacher with the given name already exists
            return json.dumps(False)
    return json.dump(False)


@app.route('/comments', methods=['POST'])
def create_comment():
    if request.method == 'POST':
        form = request.form
        teacher_id = int(form['teacher_id'])
        comment_poster = form['poster']
        comment_text = form['text']
        if Teacher.query.get(teacher_id):
            comment = Comment(teacher_id=teacher_id, poster=comment_poster, text=comment_text)
            db.session.add(comment)
            db.session.commit()
        else:
            abort(401, 'Teacher not found')
    return "success"


@app.route('/comments', methods=['GET'])
def comments_for_teacher():
    try:
        teacher_id = request.args["teacher_id"]
    except KeyError:
        abort(500, "You must have a teacher id")
    teacher = Teacher.query.get(teacher_id)
    return json.dumps(teacher.comments)


@app.route("/login", methods=['POST'])
def login():
    if request.method == 'POST':
        form = request.form
        username = form['username']
        password = form['password']
        if User.validate_login(username, password):
            session['username'] = username
            return json.dumps(True)
    return json.dumps(False)


@app.route('/logout', methods=['POST'])
def logout():
    session.pop('username', None)
    return json.dumps(True)


def _send_template(file):
    return send_from_directory(directory=config.TEMPLATES_PATH, filename=file)


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        load_initial_data()
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5000)), debug=True)
