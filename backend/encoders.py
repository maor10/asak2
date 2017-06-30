import json
from sqlalchemy.ext.declarative import DeclarativeMeta


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
            "name": teacher.name
        }