from rest_framework import serializers
from  .models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password

class RegisterSerializer(serializers.ModelSerializer):
    username = serializers.CharField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )

    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
    
    class Meta:
        model = User
        fields = ('password', 
                  'username', 'user_type')
        extra_kwargs = {
            'username': {'required': True},
            'user_type': {'required': True},
        }

    def validate(self, attrs):
        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            user_type=validated_data['user_type']
        )
        user.set_password(validated_data['password'])
        user.save()

        return user
       
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    user_type = serializers.CharField(source='user.user_type', read_only=True)
    username = serializers.CharField(source='user.username', read_only=True)

    def validate(self, attrs):
        data = super().validate(attrs)
        data['user_type'] = self.user.user_type
        data['username'] = self.user.username
        return data
