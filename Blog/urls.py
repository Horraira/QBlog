from django.urls import path, include
from Blog import views
from rest_framework.routers import DefaultRouter

blogItem = DefaultRouter()

blogItem.register('blog', views.BlogView)
blogItem.register('category', views.CategoryView)

urlpatterns = [
    path('api/', include(blogItem.urls)),
    path('search/<str:query>/', views.SearchBlog.as_view()),

    path('visitor/blogs/', views.blog_list),
    path('visitor/blog/<int:pk>/', views.blog_detail),
]

