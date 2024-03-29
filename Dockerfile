FROM node:14.19.1-bullseye

LABEL author="Lv Wenchao"
LABEL date="2022-05-11"

WORKDIR /cssd-web

COPY . .
RUN npm install 

EXPOSE 8080

CMD ["npm", "run", "dev"]

