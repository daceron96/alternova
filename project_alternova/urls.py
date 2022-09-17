from django.contrib import admin
from django.urls import path, include
#from apps.core.urls import core_patterns
from apps.jokes.urls import jokes_patterns
from apps.users.urls import user_patterns
from apps.api.router import urlpatterns

urlpatterns = [
    #path('', include(core_patterns)),
    path('admin/', admin.site.urls),
    path('jokes/', include(jokes_patterns)),
    path('', include(user_patterns)),
    path('api/', include(urlpatterns)),

]
