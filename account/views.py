from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse
from .serializer import RegisterSerializer, CustomTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status, generics, response
from .models import User
from .permission import *


@csrf_exempt
@api_view(['POST'])
def createAccount(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse(status=status.HTTP_200_OK, data=serializer.data)
    else:
        return JsonResponse(status=status.HTTP_422_UNPROCESSABLE_ENTITY, data=serializer.errors)
    
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
    token_obtain_pair = TokenObtainPairView.as_view()
