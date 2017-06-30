#!/usr/bin/env python
# -*- coding: utf-8 -*-
from models import *
import os


def load_initial_data():
    if os.environ.get("WERKZEUG_RUN_MAIN") == "true":
        track1 = Track(name=u"למעלה ואנטר")
        teacher = Teacher(name=u"ליאור ב.")
        teacher.track = track1


        track2 = Track(name="Up and Enter")
        teacher2 = Teacher(name="Itai")
        teacher2.track = track2

        db.session.add(teacher2)
        db.session.add(teacher)
        db.session.commit()
