from rest_framework.routers import DefaultRouter
from .views import JokeGenericViewSet

router = DefaultRouter()

router.register('', JokeGenericViewSet, basename="api")

urlpatterns = router.urls
