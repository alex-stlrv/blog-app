from django.contrib import admin
from blog_post.models import Post


class PostAdmin(admin.ModelAdmin):
    pass

admin.site.register(Post, PostAdmin)
