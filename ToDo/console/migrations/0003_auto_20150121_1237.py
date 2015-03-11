# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('console', '0002_auto_20150121_1237'),
    ]

    operations = [
        migrations.RenameField(
            model_name='task',
            old_name='scheduledDates',
            new_name='scheduledDate',
        ),
    ]
