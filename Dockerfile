FROM nginx:alpine

LABEL author="Lv Wenchao"
LABEL date="2022-05-11"

COPY ./dist /usr/share/nginx/html/dist
COPY ./nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

