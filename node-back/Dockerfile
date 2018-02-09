# Version: 1.0.0

FROM node:8

MAINTAINER Arseniy Anosov <ars.anosov@gmail.com>

ENV FTP_USER=undefined
ENV FTP_PASS=undefined

RUN git clone https://github.com/ars-anosov/replacer-react.git && \
  cd replacer-react/node-back && \
  npm install

WORKDIR /replacer-react/node-back

CMD node index.js $FTP_USER $FTP_PASS