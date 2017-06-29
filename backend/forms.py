from flask_wtf import FlaskForm, RecaptchaField
from flask_wtf.file import FileField, FileRequired
from wtforms import (StringField, validators, PasswordField)
from wtforms import (SelectMultipleField, widgets)
from models import db, Teacher


class MultiCheckboxField(SelectMultipleField):
    widget = widgets.ListWidget(prefix_label=False)
    option_widget = widgets.CheckboxInput()


# FORMS
class SegelField(MultiCheckboxField):

    def __init__(self, *args, **kwargs):
        super(SegelField, self).__init__(*args, **kwargs)
        self.choices = db.session.query(Teacher.id, Teacher.name).order_by(Teacher.name).all()
        self.choices = map(lambda x : (str(x[0]), x[1]), self.choices)


class PhotoUploadForm(FlaskForm):
    segel = SegelField()
    photo = FileField(u'Image File', validators=[FileRequired()])
    caption = StringField('Caption', validators=[validators.Length(min=0, max=255)])
    recaptcha = RecaptchaField()