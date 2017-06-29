import json
import os

from PIL import Image
from flask import Flask, send_from_directory, request, session
from flask_uploads import configure_uploads, UploadNotAllowed

import config
from encoders import PhotoEncoder, TeacherEncoder
from load_initial_data import load_initial_data
from models import *

THUMBNAIL_SIZE = (300, 200)
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['UPLOADS_DEFAULT_DEST'] = config.PHOTOS_PATH
db.init_app(app)
configure_uploads(app, uploaded_photos)


def create_thumbnail(photo_path, size):
    im = Image.open(photo_path)
    im.thumbnail(size)
    im.save(photo_path + "_{0}X{1}".format(*size), Image.ANTIALIAS)


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
    print config.TEMPLATES_PATH
    return _send_template("index.html")


@app.route('/photos', methods=['GET'])
def photos():
    return json.dumps(Photo.query.all(), cls=PhotoEncoder)


@app.route('/photos', methods=['POST'])
def create_photo():
    if request.method == 'POST':
        form = request.form
        photo = request.files['photo']
        text = form['text']
        teachers = map(int, json.loads(form['teachers']))
        try:
            file_name = uploaded_photos.save(photo)
        except UploadNotAllowed:
            return json.dumps(False)
        else:
            photo = Photo(file_name=file_name, text=text)
            teachers = [Teacher.query.get(id) for id in teachers]
            for teacher in teachers:
                teacher.photos.append(photo)
            db.session.add(photo)
            db.session.commit()
    return json.dumps(True)


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


@app.route('/teachers')
def teachers():
    return json.dumps(Teacher.query.all(), cls=TeacherEncoder)


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
    return True




def _send_template(file):
    return send_from_directory(directory=config.TEMPLATES_PATH, filename=file)


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        load_initial_data()
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5000)), debug=True)
