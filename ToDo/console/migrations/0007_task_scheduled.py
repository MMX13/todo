# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('console', '0006_auto_20150309_1629'),
    ]

    operations = [
        migrations.AddField(
            model_name='task',
            name='scheduled',
            field=models.BooleanField(default=True),
            preserve_default=True,
        ),
    ]
