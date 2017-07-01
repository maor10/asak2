#!/usr/bin/env python
# -*- coding: utf-8 -*-
from models import *
import os


def load_initial_data():
    if os.environ.get("WERKZEUG_RUN_MAIN") == "true" and not Track.query.filter_by(name=u"Up And Enter").first():
        up_enter = Track(name=u"Up And Enter")
        up_enter.teachers = [Teacher(name=u"ליאור ב."), Teacher(name=u"ויאס מלך הוואסח"), Teacher(name=u"אבשלום"),
                             Teacher(name=u'יובל זיתים'), Teacher(name=u'דריזין'), Teacher(name=u'הליאור האשכנזי')]

        xml_masters = Track(name=u"XML Masters")
        xml_masters.teachers = [Teacher(name=u"איתי AKA carrot man")]

        code_monkeys = Track(name=u"Code Monkeys")
        code_monkeys.teachers = [Teacher(name=u"אהוד התותח"), Teacher(name=u"שרון"), Teacher(name=u"יונתן")
            ,Teacher(name=u"מור")]

        boring = Track(name=u"תרגיל המשעמם בייקום")
        boring.teachers = [Teacher(name=u"שי")]

        eyals = Track(name=u"Amit Eyal And Sons")
        eyals.teachers = []

        db.session.add(up_enter)
        db.session.add(xml_masters)
        db.session.add(code_monkeys)
        db.session.add(boring)
        db.session.add(eyals)
        db.session.commit()
    pass

