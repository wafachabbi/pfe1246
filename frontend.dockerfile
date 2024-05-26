FROM       node:alpine

WORKDIR    /app


COPY       ./Frontend/package*.json ./


RUN        npm install
RUN        npm install -g react-scripts

COPY       ./Frontend/ .


EXPOSE     3000

CMD        [ "npm","start" ]