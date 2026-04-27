from django.test import TestCase
from .models import ContactMessage, Service, CaseStudy, BlogPost


class ContactMessageTest(TestCase):
    def setUp(self):
        self.contact = ContactMessage.objects.create(
            name='John Doe',
            email='john@example.com',
            company='Test Company',
            service_type='enterprise',
            message='Test message'
        )

    def test_contact_creation(self):
        self.assertEqual(self.contact.name, 'John Doe')
        self.assertFalse(self.contact.read)


class ServiceTest(TestCase):
    def setUp(self):
        self.service = Service.objects.create(
            title='Test Service',
            category='enterprise_esd',
            description='Test description',
            short_description='Short',
            icon='📊'
        )

    def test_service_creation(self):
        self.assertEqual(self.service.title, 'Test Service')
