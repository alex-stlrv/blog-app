from django.db import models

from django.db import models
from django.utils import timezone

class Post(models.Model):
    title = models.CharField(max_length=128)
    content = models.TextField(max_length=2048)
    posted_by = models.CharField(max_length=50, default="root")
    posted_at = models.DateTimeField(default=timezone.now())

    class Meta: 
        ordering = ['-posted_at']

    def __repr__(self):
        return [self.title, self.content, self.posted_at, self.posted_by]

