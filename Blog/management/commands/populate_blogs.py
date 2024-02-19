import random
from django.core.management.base import BaseCommand
from account.models import User
from Blog.models import Blog, Category
from faker import Faker
from datetime import datetime, timedelta

class Command(BaseCommand):
    help = 'Populate Blog model with dummy data'

    def handle(self, *args, **options):
        fake = Faker()

        # Create categories if not exists
        categories = ['Technology', 'Travel', 'Food', 'Fashion', 'Sports']
        for category_name in categories:
            Category.objects.get_or_create(name=category_name)

        # Get or create a default user
        user, _ = User.objects.get_or_create(username='dummy_user',
                                             user_type='normal')

        for _ in range(50):
            title = fake.sentence(nb_words=6)
            category = random.choice(categories)
            banner_url = None  # Adjust as needed
            details = fake.paragraph(nb_sentences=10)
            total_views = random.randint(0, 1000)
            created_at = fake.date_time_this_year()
            updated_at = created_at + timedelta(days=random.randint(1, 30))

            # Create the blog record
            Blog.objects.create(
                author=user,
                category=Category.objects.get(name=category),
                title=title,
                banner_url=banner_url,
                details=details,
                total_views=total_views,
                created_at=created_at,
                updated_at=updated_at
            )

        self.stdout.write(self.style.SUCCESS('Successfully populated Blog model with 50 dummy data'))
