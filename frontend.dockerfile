FROM       node:alpine

WORKDIR    /app


COPY       ./frontend/package*.json ./


RUN        npm install
RUN        npm install -g react-scripts

COPY       ./frontend/ .


EXPOSE     3000

CMD        [ "npm","start" ]