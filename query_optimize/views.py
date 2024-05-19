from django.shortcuts import render
from .models import Author, Post
from django.db.models import Prefetch
# Create your views here.


def main_view(request):
    data = []

    # regular query
    # posts = Post.objects.all()
    # data = [post.author for post in posts]

    # select related - get all authors and their posts 
    # used for one to one and foreign key relationships
    # posts = Post.objects.select_related('author').all()
    # data = [post.author for post in posts]

    # prefetch related - get authors of a post
    # used for many to many relationships and reverse foreign key relationships
    # posts = Post.objects.prefetch_related('author').all()
    # for post in posts:
    #     data.append(post.author.all())

    # using prefetch class together with prefetch_related
    # - get posts of all the authors
    # used for foreign key relationships reverse query
    authors = Author.objects.all().prefetch_related(
        Prefetch('post_set', queryset=Post.objects.all())
    )

    for author in authors:
        data.append(author.post_set.all())

    return render(request, 'query_app/main.html', {'data': data})
