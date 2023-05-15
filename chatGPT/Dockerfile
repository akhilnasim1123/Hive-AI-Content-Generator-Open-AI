FROM python:3.10.7

ENV PYTHONUNBUFFERED 1

WORKDIR /app/chatGPT

COPY requirements.txt /app/chatGPT/

# RUN pip3 install -r requirements.txt
RUN pip install django django-cors-headers
RUN pip install --upgrade pip
RUN pip install gunicorn
RUN pip install django-dotenv
RUN  pip install -r requirements.txt 



COPY . /app/chatGPT/

# running migrations
# RUN python manage.py makemigrations
# RUN python manage.py migrate


CMD ["python","app.py","0.0.0.0:8001"]