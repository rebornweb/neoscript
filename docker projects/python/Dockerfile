FROM ubuntu
#Copy files from local to container
COPY . .

#PORT
EXPOSE 3000 80 8000

#Install Dependencies
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

#REF https://github.com/danjac/realworld