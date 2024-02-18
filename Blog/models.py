from django.db import models
from PIL import Image
import io
from io import BytesIO
from django.core.files.uploadedfile import InMemoryUploadedFile
from account.models import User

# Create your models here.

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

class Blog(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, db_index=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, db_index=True)
    title = models.CharField(max_length=200)
    banner_url = models.ImageField(upload_to='blog/banner/', null=True, blank=True, max_length=500)
    details = models.TextField()
    total_views = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.category} - {self.title} by {self.author}'
    
    def update_total_views(self):
        self.total_views += 1
        self.save(update_fields=['total_views'])

    def save(self, *args, **kwargs):
        if self.banner_url:
            img = Image.open(self.banner_url)
            output = BytesIO()
            img.save(output, format='JPEG', quality=70)  # Adjust quality as needed
            output.seek(0)
            
            file_name = self.banner_url.name.split('/')[-1]
            image_file = InMemoryUploadedFile(
                output,  
                None,  
                file_name, 
                'image/jpeg',  
                output.tell(), 
                None 
            )

            self.banner_url.save('compressed.jpg', image_file, save=False)

        super().save(*args, **kwargs)
    

    
