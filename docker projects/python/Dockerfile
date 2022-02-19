#Choose image
FROM python

#Copy files from local to image
COPY . .

#PORT
EXPOSE 3000 80 8000

#Install Dependencies
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

#REF https://github.com/danjac/realworld