from rest_framework import serializers
from account.models import *
from .models import *

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username',)
        read_only = True

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class BlogSerializer(serializers.ModelSerializer):
    author = serializers.CharField(source='author.username', read_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True)
    banner_url = serializers.SerializerMethodField()
    class Meta:
        model = Blog
        fields = '__all__'
        read_only_fields = ('author',)

    def get_banner_url(self, obj):
        try:
            blog = Blog.objects.get(pk=obj.id)
            if blog.banner_url:
                return self.context['request'].build_absolute_uri(blog.banner_url.url)
            else:
                return None
        except Blog.DoesNotExist:
            return None
        
class BlogSearchSerializer(serializers.ModelSerializer):
    banner_url = serializers.SerializerMethodField()
    author = serializers.CharField(source='author.username')
    category = serializers.CharField(source='category.name')
    total_views = serializers.SerializerMethodField()
    class Meta:
        model = Blog
        fields = ('id', 'author', 'category', 'title', 'details', 'banner_url', 'total_views')
        read_only = True
    
    def get_banner_url(self, obj):
        try:
            blog = Blog.objects.get(pk=obj.id)
            if blog.banner_url:
                return self.context['request'].build_absolute_uri(blog.banner_url.url)
            else:
                return None
        except Blog.DoesNotExist:
            return None
        
    def get_total_views(self, obj):
        try:
            blog = Blog.objects.get(pk=obj.id)
            return blog.total_views
        except Blog.DoesNotExist:
            return 0
        
class BookmarksSerializer(serializers.ModelSerializer):
    blog = BlogSerializer()
    class Meta:
        model = Bookmars
        fields = '__all__'
        read_only_fields = ('user', 'blog')

        