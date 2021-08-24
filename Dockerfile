FROM nginx:alpine

ADD ./dist /usr/share/nginx/html/dist
COPY ./nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

