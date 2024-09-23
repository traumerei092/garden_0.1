from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import Shop, ShopType, ShopConcept, ShopLayout, ShopPhoto
from .serializers import ShopSerializer, ShopTypeSerializer, ShopConceptSerializer, ShopLayoutSerializer, ShopPhotoSerializer
import logging

logger = logging.getLogger(__name__)

class ShopViewSet(viewsets.ModelViewSet):
    queryset = Shop.objects.all()
    serializer_class = ShopSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]# AllowAny から変更

    def perform_create(self, serializer):
        shop = serializer.save()
        shop.geocode_address()
        shop.save()

    def create(self, request, *args, **kwargs):
        logger.info(f"Received data: {request.data}")
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            logger.error(f"Serializer errors: {serializer.errors}")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return super().create(request, *args, **kwargs)

class ShopTypeViewSet(viewsets.ModelViewSet):
    queryset = ShopType.objects.all()
    serializer_class = ShopTypeSerializer
    permission_classes = [AllowAny]

class ShopConceptViewSet(viewsets.ModelViewSet):
    queryset = ShopConcept.objects.all()
    serializer_class = ShopConceptSerializer
    permission_classes = [AllowAny]

class ShopLayoutViewSet(viewsets.ModelViewSet):
    queryset = ShopLayout.objects.all()
    serializer_class = ShopLayoutSerializer
    permission_classes = [AllowAny]

class ShopPhotoViewSet(viewsets.ModelViewSet):
    queryset = ShopPhoto.objects.all()
    serializer_class = ShopPhotoSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        serializer.save(uploaded_by=self.request.user)