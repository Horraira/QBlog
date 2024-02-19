from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from silk.profiling.profiler import silk_profile
from rest_framework.pagination import PageNumberPagination

from Blog.serializer import *
from account.permission import *
from Blog import utils

@silk_profile(name='blog_list')
@api_view(['GET'])
def blog_list(request):
    paginator = PageNumberPagination()
    paginator.page_size = 10 

    blogs = Blog.objects.all()
    result_page = paginator.paginate_queryset(blogs, request)
    serializer = BlogSearchSerializer(result_page, many=True, context={'request': request})
    return paginator.get_paginated_response(serializer.data)

@silk_profile(name='blog_detail')
@api_view(['GET'])
def blog_detail(request, pk):
    try:
        blog = Blog.objects.get(pk=pk)
        blog.update_total_views()
    except Blog.DoesNotExist:
        return Response({"message": "Blog not found"}, status=status.HTTP_404_NOT_FOUND)

    serializer = BlogSerializer(blog, context={'request': request})
    return Response(serializer.data)

@silk_profile(name='bookmark_add')
@api_view(['POST'])
def bookmark_add(request, pk):
    try:
        blog = Blog.objects.get(pk=pk)
    except Blog.DoesNotExist:
        return Response({"message": "Blog not found"}, status=status.HTTP_404_NOT_FOUND)

    if Bookmars.objects.filter(user=request.user, blog=blog).exists():
        return Response({"message": "Already bookmarked"}, status=status.HTTP_400_BAD_REQUEST)
    else:
        try:
            bookmark = Bookmars(user=request.user, blog=blog)
            bookmark.save()
            return Response({"message": "Bookmarked"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"message": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@silk_profile(name='bookmark_list')
@api_view(['GET'])
def bookmarks_list(request):
    if request.method == 'GET':
        bookmarks = Bookmars.objects.filter(user=request.user)
        serializer = BookmarksSerializer(bookmarks, many=True)
        return Response(serializer.data)
    else:
        return Response({"message": "Method not allowed"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)