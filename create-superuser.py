# scripts/create_superuser.py
import sys
import os
import django
from django.contrib.auth import get_user_model
from django.core.management import execute_from_command_line

def create_superuser():
    User = get_user_model()
    
    # Credenciales del superusuario
    SUPER_USER_EMAIL = 'admin@netfixhub.com'
    SUPER_USER_PASSWORD = 'NetFix2024!@#'
    
    try:
        superuser = User.objects.create_superuser(
            email=SUPER_USER_EMAIL,
            password=SUPER_USER_PASSWORD,
            company_name='Net-Fix Hub Admin',
            role='superadmin'
        )
        print(f"""
        Superusuario creado exitosamente:
        Email: {SUPER_USER_EMAIL}
        Password: {SUPER_USER_PASSWORD}
        
        ¡IMPORTANTE! Guarda estas credenciales en un lugar seguro y 
        cambia la contraseña inmediatamente después del primer inicio de sesión.
        """)
    except Exception as e:
        print(f"Error al crear superusuario: {e}")

if __name__ == "__main__":
    create_superuser()
