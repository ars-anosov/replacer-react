# replacer-reactor-node

## Обзор
- Nodejs сервер собран при помощи [swagger-codegen](https://github.com/swagger-api/swagger-codegen).

## Строим среду разработки

### Node:8
В Docker-контейнер будет прокинута директория "node-back": переходим в нее.
```
cd node-back
```

Проверяем поле "host" в [api/replacer-api.yaml](https://github.com/ars-anosov/replacer-react/blob/master/node-back/api/replacer-api.yaml)

Использую машину 192.168.13.97:8008
```yaml
host: '192.168.13.97:8008'
```

Запускаем "replacer-reactor-node"
```
sudo docker run \
  --name replacer-reactor-node \
  -v $PWD:/replacer-reactor-node \
  -w /replacer-reactor-node \
  --publish=8008:8008 \
  --env="HTTP_URL=http://192.168.16.12/domolain" \
  --env="SFTP_HOST=192.168.28.18" \
  --env="SFTP_PATH=/docker_vol/nginx-html/domolain" \
  --env="SFTP_USER=INSERT_HERE_USERNAME" \
  --env="SFTP_PASS=INSERT_HERE_PASSWORD" \
  -it \
  node:8 bash
```
Дальше все действия внутри контейнера.

```
npm install
node index.js $HTTP_URL $SFTP_HOST $SFTP_PATH $SFTP_USER $SFTP_PASS
```
Выскочить из контейнера : Ctrl+P+Q
