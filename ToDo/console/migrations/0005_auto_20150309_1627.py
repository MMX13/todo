# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('console', '0004_auto_20150121_1514'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='scheduledDate',
            field=models.DateField(null=True),
            preserve_default=True,
        ),
    ]
