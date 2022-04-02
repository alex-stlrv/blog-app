The World's Most Private Collection of True and Imaginary Stories' USER GUIDE:

    1. Make sure that you have Django installed
    2. In the top 'blog' folder (at the same level as this README.md file), create a text file named 'secret_key.txt', then enter a Django secret key.
    You can use one of the generators online. Here's one: https://djecrety.ir/
    3. Run python manage.py makemigrations
    4. Run python manage.py migrate
    5. Run python manage.py runserver
    6. Go to the development server at http://127.0.0.1:8000/blogs