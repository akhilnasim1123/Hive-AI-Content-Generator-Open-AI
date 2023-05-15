FROM python:3.10.7


ENV PYTHONUNBUFFERED 1
# ENV PYTHONDONTWRITEBYTECODE 1

WORKDIR /app/backend

COPY requirements.txt /app/backend/

# RUN pip3 install -r requirements.txt
RUN apt-get update && apt-get install -y pkg-config
RUN apt-get update && apt-get install -y libpq-dev
RUN pip install django django-cors-headers
RUN pip install --upgrade pip
RUN pip install gunicorn
RUN pip install django-dotenv
RUN  pip install -r requirements.txt 

COPY . /api/backend/



CMD [ "python", "manage.py", "runserver", "0.0.0.0:8000" ]