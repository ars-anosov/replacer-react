# Version: 1.0.0

FROM node:8

MAINTAINER Arseniy Anosov <ars.anosov@gmail.com>

ENV SFTP_HOST=undefined
ENV SFTP_USER=undefined
ENV SFTP_PASS=undefined
ENV SFTP_PATH=undefined
ENV HTTP_URL=undefined

RUN git clone https://github.com/ars-anosov/replacer-react.git && \
  cd replacer-react/node-back && \
  npm install

WORKDIR /replacer-react/node-back

CMD node index.js $SFTP_HOST $SFTP_USER $SFTP_PASS $SFTP_PATH $HTTP_URL