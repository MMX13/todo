# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('console', '0003_auto_20150121_1237'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='scheduledDate',
            field=models.DateField(blank=True),
            preserve_default=True,
        ),
    ]
