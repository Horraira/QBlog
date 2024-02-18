from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from silk import urls as silk_urls
from django.urls import path, include
from rest_framework_simplejwt import views as jwt_views

from Blog.views import blogPercentage, blogList

from drf_yasg.views import get_schema_view
from drf_yasg import openapi
schema_view = get_schema_view(
    openapi.Info(
        title="Blog System API",
        default_version='v1',
    ),
    public=True,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('account/', include('account.urls')),
    path('', include('Blog.urls')),
    path('', blogPercentage, name='blog-percentage'),
    path('blogList/', blogList, name='blog-list'),

    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),

    path('silk/', include(silk_urls)),

    #Authentication
    path('api/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
