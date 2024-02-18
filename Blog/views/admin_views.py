from Blog.models import Blog
from django.shortcuts import render
from django.db.models import Count
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

def blogPercentage(request):
    labels = []
    data = []
    
    blogs_num_per_category = Blog.objects.values('category__name').annotate(count=Count('category__name'))
    
    for item in blogs_num_per_category:
        labels.append(item['category__name'])
        data.append(item['count'])

    return render(request, 'admin/dashboard.html', {
        'labels': labels,
        'data': data,
    })


def blogList(request):
    blogs = Blog.objects.all()

    # Apply category filter
    category = request.GET.get('category')
    if category:
        blogs = blogs.filter(category__name=category)

    # Apply author search
    author = request.GET.get('author')
    if author:
        blogs = blogs.filter(author__username__icontains=author)

    # Pagination
    paginator = Paginator(blogs, 10) 
    page_number = request.GET.get('page')
    try:
        blogs = paginator.page(page_number)
    except PageNotAnInteger:
        blogs = paginator.page(1)
    except EmptyPage:
        blogs = paginator.page(paginator.num_pages)

    # Get distinct categories for filtering
    categories = Blog.objects.values_list('category__name', flat=True).distinct()

    return render(request, 'admin/blogList.html', {
        'blogs': blogs,
        'categories': categories,
        'is_paginated': True,
        'page_obj': blogs,
    })

