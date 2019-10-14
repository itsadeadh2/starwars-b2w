

# B2W Star Wars API

[![CircleCI](https://circleci.com/gh/itsadeadh2/starwars-b2w.svg?style=svg)](https://circleci.com/gh/itsadeadh2/starwars-b2w)
[![codecov](https://codecov.io/gh/itsadeadh2/starwars-b2w/branch/master/graph/badge.svg)](https://codecov.io/gh/itsadeadh2/starwars-b2w)

API dos planetas de Star Wars para o teste da B2W.

<hr>

## Índice
- [Como utilizar](#como-utilizar)
- [Tecnologias](#tecnologias)
- [Rodar com o Docker](#rodar-com-docker)
- [Rodar Testes](#rodar-testes)
- [Lista de Serviços](#lista-de-servicos)

# Como utilizar
Voce pode utilizar a **SWAPI** no endereço http://www.itsadeadh2.com/projects/swapi/ ou localmente seguindo o passo a passo de [como rodá-la em seu ambiente](#como-rodar).

# Tecnologias
- [ES6](https://www.w3schools.com/Js/js_es6.asp "ES6")
- [NodeJS](https://nodejs.org/en/ "NodeJS")
- [Express](https://www.npmjs.com/package/express "Express")
- [MongoDB](https://www.mongodb.com/ "MongoDB")
- [Mongoose](https://www.npmjs.com/package/mongoose "Mongoose")
- [Mocha](https://www.npmjs.com/package/mocha "Mocha")
- [Supertest](https://www.npmjs.com/package/supertest "Supertest")
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken "jsonwebtoken")
- [bcrypt](https://www.npmjs.com/package/bcrypt "bcrypt")
- [winston](https://www.npmjs.com/package/winston)

# Rodar com docker

- Com o [docker](https://docs.docker.com/install/ "docker") e [docker compose](https://docs.docker.com/compose/install/ "docker compose") instalados, rode a aplicação com o comando `docker-compose up --build`

# Rodar testes

- Rode a aplicação com o docker-compose, [como descrito na seção anterior](#rodar-com-docker)
- Rode os testes com o comando `docker-compose exec -e NODE_ENV=test api npm run test`

> PS: O motivo de ser necessário rodar a aplicação em modo desenvolvimento anteriormente é para que a mesma venha a subir o banco de dados mongo através do docker, facilitando assim o processo de teste da aplicação.

# Lista de Servicos
## Index

|Caminho|Método|Status Code|Descricao|
|:---|:----:|:---------:|:----------|
|`/`|`GET`|200|Retorna informações sobre a api|

## Planets

|Caminho|Método|Status Code|Descricao|
|:---|:----:|:---------:|:----------|
|`/planets`|`POST`|201|Cria um planeta|
|`/planets`|`GET`|200|Lista todos os planetas|
|`/planets/:id`|`GET`|200|Retorna um planeta específico por id|
|`/planets/:id`|`DELETE`|204|Apaga um planeta|

#### Criar um planeta
```shell
curl -X POST \
  http://www.itsadeadh2.com/projects/swapi/planets \
  -H 'Content-Type: application/json' \
  -H 'x-auth-token: seuauthtoken' \
  -d '{
	"nome": "Yav",
	"clima": "árido",
	"terreno": "rochoso"
}'
```
Retorna
```json
{
    "_id": "5da0c33fa194590468fac938",
    "nome": "Yavin IV",
    "clima": "árido",
    "terreno": "rochoso",
    "qtdeAparicoes": 1,
    "__v": 0
}
```
> Sim, se o usuario faz um request cujo nome esteja "[proximo o suficiente](src/services/swapi.service.js)" de algum planeta da SWAPI, a API automaticamente selecionará este planeta para ele, evitando tentativas desnecessárias.

#### Listar todos os planetas
```shell
curl -X GET \
  http://www.itsadeadh2.com/projects/swapi/planets' \
  -H 'Content-Type: application/json' \
  -H 'x-auth-token: seuauthtoken'
```
Retorna
```json
[
    {
        "_id": "5da0c33fa194590468fac938",
        "nome": "Yavin IV",
        "clima": "árido",
        "terreno": "rochoso",
        "qtdeAparicoes": 1,
        "__v": 0
    },
    {
        "_id": "5da0c5bb4c147f048f12a388",
        "nome": "Coruscant",
        "clima": "Quente",
        "terreno": "rochoso",
        "qtdeAparicoes": 4,
        "__v": 0
    },
    {
        "_id": "5da0c5eb4c147f048f12a389",
        "nome": "Alderaan",
        "clima": "Tropical?",
        "terreno": "plano",
        "qtdeAparicoes": 2,
        "__v": 0
    }
]
```
#### Buscar planeta por id
```shell
curl -X GET \
  http://www.itsadeadh2.com/projects/swapi/planets/5da0c5bb4c147f048f12a388 \
  -H 'Content-Type: application/json' \
  -H 'x-auth-token: seuauthtoken'
```
Retorna
```json
{
    "_id": "5da0c5bb4c147f048f12a388",
    "nome": "Coruscant",
    "clima": "Quente",
    "terreno": "rochoso",
    "qtdeAparicoes": 4,
    "__v": 0
}
```
#### Remover um planeta
```shell
curl -X DELETE \
  http://www.itsadeadh2.com/projects/swapi/planets/5da0c5bb4c147f048f12a388 \
  -H 'Content-Type: application/json' \
  -H 'x-auth-token: seuauthtoken'
```
Retorna
```json
{
    "_id": "5da0c5bb4c147f048f12a388",
    "nome": "Coruscant",
    "clima": "Quente",
    "terreno": "rochoso",
    "qtdeAparicoes": 4,
    "__v": 0
}
```

### Pesquisar planetas
>Você pode pesquisar os planetas pelo nome utilizando o parametro name como descrito abaixo
```shell
curl -X GET \
  'http://www.itsadeadh2.com/projects/swapi/planets?nome=alderaan' \
  -H 'Content-Type: application/json' \
  -H 'x-auth-token: seuauthtoken'
```
Que te retornaria
```json
[
    {
        "_id": "5da0ea80e0ba28001c989638",
        "nome": "Alderaan",
        "clima": "árido",
        "terreno": "rochoso",
        "qtdeAparicoes": 2,
        "__v": 0
    }
]
```
### Pesquisar planetas com paginacao
>Você também pode paginar os resultados de sua pesquisa com os parametros **page** e **perPage**, que seriam **a página que você quer** e a **quantidade de resultados por página** respectivamente
```shell
curl -X GET \
  'http://www.itsadeadh2.com/projects/swapi/planets?page=1&perPage=1' \
  -H 'Content-Type: application/json' \
  -H 'x-auth-token: seuauthtoken'
```
Que te retornaria
```json
[
    {
        "_id": "5da0ea80e0ba28001c989638",
        "nome": "Alderaan",
        "clima": "árido",
        "terreno": "rochoso",
        "qtdeAparicoes": 2,
        "__v": 0
    }
]
```

## Users

|Caminho|Método|Status Code|Descricao|
|:---|:----:|:---------:|:----------|
|`/users`|`POST`|201|Registra um usuario|

#### Criar um usuario
```shell
curl -X POST \
  http://www.itsadeadh2.com/projects/swapi/users \
  -H 'Content-Type: application/json' \
  -d '{
	"email": "lukinhoskydellas@alliance.gov",
	"senha": "echo3echo7"
}'
```
Retorna
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGEwY2E2NzRjMTQ3ZjA0OGYxMmEzOGEiLCJlbWFpbCI6Imx1a2luaG9za3lkZWxsYXNAYWxsaWFuY2UuZ292IiwiaWF0IjoxNTcwODE4NjYzfQ.6q52371IOzBt-Rg8cRRLkTkxmNVN7pgqPCCznFnlhNc"
}
```

## Auth

|Caminho|Método|Status Code|Descricao|
|:---|:----:|:---------:|:----------|
|`/auth`|`POST`|200|Retorna token de acesso a um determinado usuario|

```shell
curl -X POST \
  http://www.itsadeadh2.com/projects/swapi/auth \
  -H 'Content-Type: application/json' \
  -d '{
	"email": "lukinhoskydellas@alliance.gov",
	"senha": "echo3echo7"
}'
```
Retorna
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGEwY2E2NzRjMTQ3ZjA0OGYxMmEzOGEiLCJlbWFpbCI6Imx1a2luaG9za3lkZWxsYXNAYWxsaWFuY2UuZ292IiwiaWF0IjoxNTcwODE4ODMyfQ.tefFCYnFx31LVhV0Ql0TCFdVxJ2xyMWhVucHyMzohe8"
}
```

