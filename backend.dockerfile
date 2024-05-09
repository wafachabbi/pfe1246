FROM       node:alpine


WORKDIR    /app


COPY       Backend/package*.json ./


RUN        npm install


COPY       ./Backend .


EXPOSE     4000

CMD        ["node", "index.js"]