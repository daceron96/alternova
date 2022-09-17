from django.urls import path

from .views import LoginUserView#, CreateUserView
user_patterns = ([
        
    path('',LoginUserView.as_view(), name = 'login'),
    # path('register/',CreateUserView.as_view(), name = 'register'),

],'user')