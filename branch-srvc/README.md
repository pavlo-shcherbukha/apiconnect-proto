# branch-srvc - Модель Branch API

## Ціль


### Корисні документи

 - [Cloudant API FOR Node.js](https://cloud.ibm.com/apidocs/cloudant)


## Ідея моделі




## Конфігурація

В корені потрібно створити .env  файл з такими параметрами:


```text
#env var


```



Номер порта сервера вказується в файлі   ./server/config/local.js


## Запуск локально


- зробити клон з git репозиторію

```bash
     git clone <url repo> -b <branch name>
```

- встановити залежності

```bash
     npm install

```

- запустити додаток


```bash

     npm start

```

## Робота з IBM CloudShell  в хмарі IBM

```bash

ibmcloud target -r eu-de -g default

ibmcloud ce project select -n ce-project-79

ibmcloud ce project select -n ce-project-79

ibmcloud ce application logs --application application-f9 --follow


```