from multiprocessing import context
from django.views.generic.base import TemplateView
from django.shortcuts import render
import requests

class HomePageView(TemplateView):
    template_name = 'core/base.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['prueba'] = (requests.get('https://api.chucknorris.io/jokes/random')).json()
        return context
