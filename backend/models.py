from flask_sqlalchemy import SQLAlchemy
from hashlib import sha256
from datetime import datetime
from flask_uploads import (UploadSet, IMAGES)

db = SQLAlchemy()
uploaded_photos = UploadSet('full', IMAGES)


class User(db.Model):
    PASSWORD_SALT = 'AsakIsFreakingAwesome'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True)
    _password_hash = db.Column(db.String(256))

    def get_id(self):
        return unicode(self.id)

    def __init__(self, username, password):
        self.username = username
        self._password_hash = self._hash(password)

    def _hash(self, password):
        data = password + self.PASSWORD_SALT
        return sha256(data).hexdigest()

    def validate_password(self, password):
        return self._hash(password) == self._password_hash

    @classmethod
    def validate_login(self, username, password):
        user = User.query.filter_by(username=username).first()
        if user:
            return user.validate_password(password)
        return False

    def __repr__(self):
        return '<User %r>' % self.username


photos_teachers = db.Table('photos_teachers',
    db.Column('photo_id', db.Integer, db.ForeignKey('photo.id')),
    db.Column('teacher_id', db.Integer, db.ForeignKey('teacher.id'))
)


class Teacher(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True)
    track_id = db.Column(db.Integer, db.ForeignKey('track.id'))
    comments = db.relationship('Comment', backref="teacher")

    def __init__(self, name):
        self.name = name

    def __repr__(self):
        return '<Teacher %r>' % self.name


class Photo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    file_name = db.Column(db.String(1024))
    thumbnail = db.Column(db.String(1024))
    text = db.Column(db.Text(1024))
    published = db.Column(db.Date(), default=datetime.now)
    teachers = db.relationship(
        "Teacher",
        secondary=photos_teachers,
        backref=db.backref("photos", lazy="select"), lazy="select")

    @property
    def imgsrc(self):
        return uploaded_photos.url(self.file_name)

    @property
    def path(self):
        return uploaded_photos.path(self.file_name)


class Track(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(256))
    teachers = db.relationship('Teacher', backref='track')


class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    poster = db.Column(db.String(256))
    text = db.Column(db.Text(1024))
    published = db.Column(db.Date(), default=datetime.now)
    teacher_id = db.Column(db.Integer, db.ForeignKey('teacher.id'))
