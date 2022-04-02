import json
from django.forms.models  import model_to_dict
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.shortcuts import render, redirect
from django.views import View

from .forms import PostForm
from .models import Post

def generate_csrf(request):
    return JsonResponse({'csrf_token': get_token(request)}, status=200)

class BlogView(View):
    def get(self, request):
        if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
            blogs = list(Post.objects.values())
            return JsonResponse(blogs, safe=False, status=200)
        else:
            return render(request, 'blog_post/blogs.html')

    def post(self, request): 
        blog = json.loads(request.body)
        bound_form = PostForm(blog)
        print(blog)

        if bound_form.is_valid():
            new_blog = bound_form.save()
            print(new_blog)
            return JsonResponse({'blog': model_to_dict(new_blog)}, status=200)
        else:
            return redirect('blog_list_url')

    def delete(self, request):
        response = json.loads(request.body)
        blog = Post.objects.get(id=response.get('id'))
        blog.delete()
        return JsonResponse({'result': 'Ok'})

