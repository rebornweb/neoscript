<<<<<<< HEAD
FROM ubuntu
#Copy files from local to container
=======
#Choose image
FROM python

#Copy files from local to image
>>>>>>> c74920f933b3da867091e3e6fc680ce22c07aef2
COPY . .

#PORT
EXPOSE 3000 80 8000

#Install Dependencies
<<<<<<< HEAD
RUN apt update -y && apt install -y git && apt install -y python3.8-venv python3-pip

#Install App/Run server
RUN mkdir /home/app && cd /home/app && \
    git clone https://github.com/danjac/realworld/ && cd realworld && python3 -m venv venv && \
    source venv/bin/activate && pip install -r requirements.txt && \
    ./manage.py migrate && ./manage.py runserver


#Set working directory
WORKDIR /home/app

#Commands to run cli
# docker build -t neo:latest .
# docker run -it -d -p 80:8000 neo:latest 
=======
#RUN apt update -y && apt install -y git && apt install -y python3.8-venv python3-pip

#Download
RUN mkdir /home/app && cd /home/app && \
    git clone https://github.com/danjac/realworld/ && cd realworld 

#Set working directory
WORKDIR /home/app/realworld


RUN python3 -m venv venv  && \
    pip install -r requirements.txt && \
    ./manage.py migrate 

#Run this if you want to run server manually
#RUN ./manage.py runserver

#Comment this out if you don't want server to run automatically
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

#Go to 127.0.0.1:8000 in browser

#Commands to run cli to build image and container
# docker build -t neo:latest .
# docker run -it -d -p 8000:8000 neo:latest 
# docker exec -it container bash
>>>>>>> c74920f933b3da867091e3e6fc680ce22c07aef2

#REF https://github.com/danjac/realworld