#!/usr/bin/env python
# -*- coding: utf-8 -*-
from models import *


def load_initial_data():
    pass
    # if not Track.query.filter_by(name=u"Up And Enter").first():
    #     pass
    # up_enter = Track(name=u"Up And Enter")
    # up_enter.teachers = [Teacher(name=u"ליאור ב."), Teacher(name=u"ויאס מלך הוואסח"), Teacher(name=u"אבשלום"),
    #                      Teacher(name=u'יובל זיתים'), Teacher(name=u'דריזין'), Teacher(name=u'הליאור האשכנזי'),
    #                      Teacher(name=u"סופרבן")]
    #
    # xml_masters = Track(name=u"XML & TPY Masters")
    # xml_masters.teachers = [Teacher(name=u"איתי איש הגזר"), Teacher(name=u"ענבל"), Teacher(name=u"אל(ז)ה"),
    #                         Teacher(name=u"מיכל שינה המיספרית"), Teacher(name=u"אילאיל"), Teacher(name=u"אלינוע"),
    #                         Teacher(name=u"שלי הטייסת"), Teacher(name=u"אייברי")]
    #
    # code_monkeys = Track(name=u"Code Monkeys")
    # code_monkeys.teachers = [Teacher(name=u"אהוד התותח"), Teacher(name=u"שרון המלך"), Teacher(name=u"יונתן")
    #     ,Teacher(name=u"מור"), Teacher(name=u"נתי"), Teacher(name=u"נוציק"),  Teacher(name=u"אילנה"),
    #                          Teacher(name=u"אדם AKA papa devops"), Teacher(name=u"בר")]
    #
    # boring = Track(name=u"הבריסטות")
    # boring.teachers = [Teacher(name=u"שי"), Teacher(name=u"בן"), Teacher(name=u"גל"), Teacher(name=u"שחף")]
    #
    # eyals = Track(name=u"Amit Eyal And Sons")
    # eyals.teachers = [Teacher(name=u"קדם"), Teacher(name=u"סער"), Teacher(name=u"נועם"), Teacher(name=u"שולץ")]
    #
    # db.session.add(up_enter)
    # db.session.add(xml_masters)
    # db.session.add(code_monkeys)
    # db.session.add(boring)
    # db.session.add(eyals)
    # db.session.commit()

    for i in Track.query.filter(Track.id > 5).all():
        db.session.delete(i)

    db.session.commit()

