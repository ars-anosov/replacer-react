# replacer


## Обзор
Стягивает HTML-код с сайта, меняет содержимое DOM-элементов.


## Установка / Использование
Работал в Docker-контейнерах на машине с IP 192.168.13.97.
Для своего проекта - заменить IP в этих местах:
- [node-back/api/replacer-api.yaml](https://github.com/ars-anosov/replacer-react/blob/master/node-back/api/replacer-api.yaml)
- [node-back/index.js](https://github.com/ars-anosov/replacer-react/blob/master/node-back/index.js)
- [web-front/build/index.html](https://github.com/ars-anosov/replacer-react/blob/master/web-front/build/index.html)

### 1. Backend
- OpenAPI-сервер обрабатывает REST-запросы от Frontend
- Взаимодействует с хостингом "живого" сайта по FTP

```
sudo docker build -t 'replacer-reactor-node:latest' github.com/ars-anosov/replacer-react#:node-back

sudo docker run \
  --name replacer-reactor-node \
  --publish=8008:8008 \
  --env="FTP_USER=INSERT_HERE_USERNAME" \
  --env="FTP_PASS=INSERT_HERE_PASSWORD" \
  -it \
  replacer-reactor-node:latest
```
Выскочить из контейнера : Ctrl+P+Q

- WEB-интерфейс для тестовых запросов через Swagger-UI: [192.168.13.97:8008/spec-ui/](http://192.168.13.97:8008/spec-ui/)
- OpenAPI-Spec файл доступен: [192.168.13.97:8008/spec/swagger.json](http://192.168.13.97:8008/spec/swagger.json)
- API для REST-запросов: [192.168.13.97:8008/v2api](http://192.168.13.97:8008/v2api/)

### 2. Frontend

Качаем, используем готовый [Build](https://github.com/ars-anosov/replacer-react/blob/master/web-front/build/)