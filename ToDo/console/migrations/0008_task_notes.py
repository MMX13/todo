# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('console', '0007_task_scheduled'),
    ]

    operations = [
        migrations.AddField(
            model_name='task',
            name='notes',
            field=models.TextField(null=True, blank=True),
            preserve_default=True,
        ),
    ]
