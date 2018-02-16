# replacer


## Обзор
Меняет DOM-элементы сайта. Использует движок [cheerio](https://github.com/cheeriojs/cheerio).


## Установка / Использование

### Окружение
Работал в седующем окружении:
- **192.168.13.97** - Docker-контейнер с Node8. Backend **OpenAPI**
- **192.168.28.18** - Машина с хостингом тестового сайта. Доступ по **SSH Path**: /docker_vol/nginx-html/domolain/test/
- **192.168.16.12** - Сайт на который воздействуем. Доступен по **HTTP URL**: http://192.168.16.12/domolain/test/

### 1. Backend
1. OpenAPI-сервер обрабатывает REST-запросы от Frontend
2. Взаимодействует с хостингом "живого" сайта по SFTP

Правим: [node-back/api/replacer-api.yaml](https://github.com/ars-anosov/replacer-react/blob/master/node-back/api/replacer-api.yaml)
``` yaml
host: '192.168.13.97:8008'
```

Выполняем:
```
sudo docker build -t 'replacer-reactor-node:latest' github.com/ars-anosov/replacer-react#:node-back

sudo docker run \
  --name replacer-reactor-node \
  --publish=8008:8008 \
  --env="HTTP_URL=http://192.168.16.12/domolain/test" \
  --env="SFTP_HOST=192.168.28.18" \
  --env="SFTP_PATH=/docker_vol/nginx-html/domolain/test" \
  --env="SFTP_USER=INSERT_HERE_USERNAME" \
  --env="SFTP_PASS=INSERT_HERE_PASSWORD" \
  -it \
  replacer-reactor-node:latest
```
Выскочить из контейнера : Ctrl+P+Q

- WEB-интерфейс для тестовых запросов через Swagger-UI: [192.168.13.97:8008/spec-ui/](http://192.168.13.97:8008/spec-ui/)
- OpenAPI-Spec файл доступен: [192.168.13.97:8008/spec/swagger.json](http://192.168.13.97:8008/spec/swagger.json)
- API для REST-запросов: [192.168.13.97:8008/v2api](http://192.168.13.97:8008/v2api/)

#### 1.1 Если ssh-авторизация по файлу ключа
В контейнере ключи лежат в /root/.ssh/id_rsa. Для своего проекта вписать правильные пути.

Правим [node-back/index.js](https://github.com/ars-anosov/replacer-react/blob/master/node-back/index.js)
``` js
sftp.privateKey = fs.readFileSync('/root/.ssh/id_rsa')
```

Выполняем:
```
# содержимое id_rsa.pub вписываем на удаленной машине в authorized_keys
ssh-keygen
scp /root/.ssh/id_rsa.pub ars@192.168.28.18:~/
ssh -t ars@192.168.28.18 'cat id_rsa.pub >> ~/.ssh/authorized_keys'

# Строчка запуска API-сервера меняется
# с
node index.js $HTTP_URL $SFTP_HOST $SFTP_PATH $SFTP_USER $SFTP_PASS
# на
node index.js $HTTP_URL $SFTP_HOST $SFTP_PATH $SFTP_USER
```

### 2. Frontend

Готовый [build](https://github.com/ars-anosov/replacer-react/blob/master/web-front/build/)

Правим [web-front/build/index.html](https://github.com/ars-anosov/replacer-react/blob/master/web-front/build/index.html):
``` js
window.localStorage.setItem('liveUrl', 'http://192.168.16.12/domolain/test/')
window.localStorage.setItem('specUrl', 'http://192.168.13.97:8008/spec/swagger.json')
```