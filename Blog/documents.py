from django_elasticsearch_dsl import Document, fields
from django_elasticsearch_dsl.registries import registry
from .models import Blog

@registry.register_document
class BlogDocument(Document):
    author = fields.ObjectField(
        properties={
            "username": fields.TextField()
        }
    )

    category = fields.ObjectField(
        properties={
            "name": fields.TextField()
        }
    )

    class Index:
        name = 'blog_index'

    class Django:
        model = Blog

        fields = [
            'id',
            'title',
            'details',
        ]
