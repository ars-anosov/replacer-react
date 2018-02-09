# replacer-react-front

## Обзор
Локальный web-сервер с живыми компонентами.

## Строим среду разработки

### Node:8
В Docker-контейнер будет прокинута директория "web-front": переходим в нее.
```
cd web-front
```

Сборщиком будет gulp
```
sudo docker run \
  --name replacer-react-front \
  -v $PWD:/web-front \
  -w /web-front \
  --publish=8009:8009 \
  -it \
  node:8 bash

# Дальше все действия внутри контейнера:

# npm Global
npm install -g gulp-cli

# npm devDependencies
# - gulp + plugins
# - browserify
# - babelify + babel-presets
# npm dependencies
# - react + react-dom
npm install
```

## [replacer-react-component](https://www.npmjs.com/package/replacer-react-component)
Пилим компоненты в директории [src/js/components](https://github.com/ars-anosov/replacer-react/tree/master/web-front/src/js/components)

Подтаскиваем необходимые зависимости
```
npm run install-components
```


### Build
Компилируем и запускаем live-reload web-сервер - [192.168.13.97:8009](http://192.168.13.97:8009/)

```
gulp
```
Выскочить из контейнера: Ctrl+P+Q


### npm publish
Прогоняем через Babel

```
cd src/js/components

gulp clean
gulp
```

Публикуем на npmjs.org
```
grep version package.json
sed -i -e 's/"version": "2.0.1"/"version": "2.0.2"/' package.json

npm login
npm publish
```