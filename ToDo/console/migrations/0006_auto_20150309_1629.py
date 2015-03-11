# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('console', '0005_auto_20150309_1627'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='scheduledDate',
            field=models.DateField(null=True, blank=True),
            preserve_default=True,
        ),
    ]
