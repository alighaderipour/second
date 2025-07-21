from rest_framework.generics import ListCreateAPIView
from rest_framework.permissions import AllowAny

from .models import Category
from .serializers import CategorySerializer

class CategoryListView(ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]