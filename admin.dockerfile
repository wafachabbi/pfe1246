FROM       node:alpine


WORKDIR    /app


COPY       Admin/package*.json ./


RUN        npm install


COPY       ./Admin .


EXPOSE     5173

CMD        ["npm", "run", "dev"]