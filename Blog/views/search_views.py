from Blog.serializer import BlogSearchSerializer
from Blog.documents import BlogDocument
from rest_framework.views import APIView
from rest_framework.pagination import LimitOffsetPagination
from django.http import HttpResponse
from elasticsearch_dsl import Q
from silk.profiling.profiler import silk_profile

class SearchBlog(APIView, LimitOffsetPagination):
    blog_serializer = BlogSearchSerializer
    search_document = BlogDocument

    @silk_profile(name='BlogSearch_get')
    def get(self, request, query):
        try:
            queryset = Q(
                'multi_match',
                query=query,
                fields=['title', 'author.username', 'category.name', 'details'], 
                fuzziness='auto') 

            search = self.search_document.search().query(queryset)
            response = search.execute()

            results = self.paginate_queryset(response, request, view=self)
            serializer = self.blog_serializer(results, many=True, context={'request': request})
            return self.get_paginated_response(serializer.data)

        except Exception as e:
            return HttpResponse(e, status=500)