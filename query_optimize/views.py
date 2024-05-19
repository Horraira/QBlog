from django.shortcuts import render
from .models import Author, Post
# Create your views here.


def main_view(request):
    data = []

    # select related - get all authors and their posts

    # prefetch related - get authors of a post

    return render(request, 'query_app/main.html', {'data': data})
