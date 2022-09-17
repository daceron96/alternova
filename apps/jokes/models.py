from hashlib import blake2b
from django.db import models

class JokeModel(models.Model):

    id_joke = models.CharField(max_length=100,blank=False, null = False)
    value = models.CharField(max_length= 200, blank=False, null=False)
    created_at = models.CharField(max_length=50,blank=False,null=False)
    url = models.CharField(max_length=100,blank=False,null=False)

    def __str__(self):
        return self.id_joke
