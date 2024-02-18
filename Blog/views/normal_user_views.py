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