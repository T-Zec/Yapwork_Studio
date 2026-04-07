from django.test import TestCase

class BasicTestCase(TestCase):
    def test_basic(self):
        self.assertEqual(1 + 1, 2)
    def test_health(self):
        self.assertTrue(True)