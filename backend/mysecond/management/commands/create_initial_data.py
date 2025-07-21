from django.core.management.base import BaseCommand
from mysecond.models import Category

class Command(BaseCommand):
    help = 'Create initial categories'

    def handle(self, *args, **options):
        categories = ['کامپیوتر', 'لپ‌تاپ', 'پرینتر', 'اسکنر', 'شبکه', 'لوازم جانبی']
        for name in categories:
            obj, created = Category.objects.get_or_create(name=name)
            if created:
                self.stdout.write(self.style.SUCCESS(f'Category "{name}" created'))
            else:
                self.stdout.write(self.style.WARNING(f'Category "{name}" already exists'))

        self.stdout.write(self.style.SUCCESS('Initial categories created successfully!'))
