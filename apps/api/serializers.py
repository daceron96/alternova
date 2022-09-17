from rest_framework import serializers

class JokeSerializer(serializers.Serializer):
    id = serializers.CharField()
    created_at = serializers.CharField()
    id_joke = serializers.CharField()
    value = serializers.CharField()