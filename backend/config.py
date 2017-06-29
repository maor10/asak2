import os

DEBUG = True

MEDIA_PATH = os.path.join(os.path.dirname(__file__), "..", "client")

JS_PATH = os.path.join(MEDIA_PATH, "js")

CSS_PATH = os.path.join(MEDIA_PATH, "css")

IMAGES_PATH = os.path.join(MEDIA_PATH, "images")

TEMPLATES_PATH = os.path.join(MEDIA_PATH, "templates")

PHOTOS_PATH = os.path.join(os.path.dirname(__file__), "..", "uploads", "photos")

THUMBNAILS_PATH = os.path.join(os.path.dirname(__file__), "..", "uploads", "photos", "thumbs")

THUMBNAIL_SIZE = (300, 300)