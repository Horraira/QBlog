from django.urls import path
from .views  import *   

urlpatterns = [
    path('register', createAccount, name='createAccount'),
    path('login', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
]