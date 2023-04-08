from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from .serializers import UserCreateSerializer,UserSerializer
from rest_framework.permissions import IsAuthenticated
from .models import UserAccount
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny


class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        data = request.data
        serializer = UserCreateSerializer(data=data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        user = serializer.create(serializer.validated_data)
        user = UserSerializer(user)

        return Response(user.data, status=status.HTTP_201_CREATED)


class RetrieveUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        
        user = request.user
        all_user = UserAccount.objects.all()
        print(all_user)
        print(user)
        user_data = UserAccount.objects.get(email=user)
        print(user_data.is_superuser)
        user = UserSerializer(user)
        all_user = UserSerializer(all_user)
        return Response(user.data, status=status.HTTP_200_OK)


# Sherlock@11