import json
from sqlalchemy.ext.declarative import DeclarativeMeta
from models import *


class PhotoEncoder(json.JSONEncoder):

    def default(self, photo):
        return {
            "id": photo.id,
            "src": photo.imgsrc,
            "thumbnail": photo.thumbnail,
            "text": photo.text,
            "published": photo.published.ctime(),
            "teachers": [{
                "id": teacher.id,
                "name": teacher.name
            } for teacher in photo.teachers]
        }


class TeacherEncoder(json.JSONEncoder):

    def default(self, teacher):
        return {
            "id": teacher.id,
            "name": teacher.name,
            "track_name": teacher.track.name,
            "track_id": teacher.track.id,
            "photo_count": Teacher.query.join(Teacher.photos).filter(Teacher.id == teacher.id).count()
        }


class CommentEncoder(json.JSONEncoder):

    def default(self, comment):
        return {
            "id": comment.id,
            "poster": comment.poster,
            "text": comment.text,
            "published": comment.published.ctime(),
            "teacher_id": comment.teacher_id
        }


class TrackEncoder(json.JSONEncoder):

    def default(self, track):
        return {
            "id": track.id,
            "name": track.name
        }