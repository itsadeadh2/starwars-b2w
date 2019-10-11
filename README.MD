

# B2W Star Wars API

[![CircleCI](https://circleci.com/gh/itsadeadh2/starwars-b2w.svg?style=svg)](https://circleci.com/gh/itsadeadh2/starwars-b2w)
[![codecov](https://codecov.io/gh/itsadeadh2/starwars-b2w/branch/master/graph/badge.svg)](https://codecov.io/gh/itsadeadh2/starwars-b2w)

API dos planetas de Star Wars para o teste da B2W.

<hr>

## Índice
- [Como rodar](#como-rodar)
- [Como utilizar](#como-utilizar)
- [Lista de Serviços](#lista-de-servicos)



# Como rodar

### Rodar a aplicação em modo desenvolvimento:

- Com o docker e docker compose instalados, rode a aplicação com o comando `docker-compose up --build`

### Rodar a aplicação em modo testes:
- Rode a aplicação em modo desenvolvimento, como descrito na seção anterior
- Defina a envvar `PORT` para uma porta livre no seu pc/servidor *ex*: `export PORT=5000`
- Defina a envvar `DATABASE` como a uri do mongo rodando no docker-compose *ex*: `export DATABASE=mongodb://localhost/star_wars_planets_test_db`
- Defina a envvar `JWTPRIVATEKEY` com o valor de sua chave privada para criação dos tokens jwt *ex*: `export JWTPRIVATEKEY=frasesaleatoriastendemasermaissegurasquecharsrandomicos`
- Execute o comando `npm run test`

> PS: O motivo de ser necessário rodar a aplicação em modo desenvolvimento anteriormente é para que a mesma venha a subir o banco de dados mongo através do docker, facilitando assim o processo de teste da aplicação. Uma alternativa secundária poderia ser criar um segundo docker-compose e um segundo dockefile e subir outro stack api/mongo para executar os testes, no entanto não creio que seja vantajoso esperar a criação de mais dois containers apenas para rodar alguns testes.

# Como utilizar
Voce pode utilizar a **SWAPI** no endereço http://www.itsadeadh2.com/projects/swapi/ ou localmente seguindo o passo a passo de [como rodá-la em seu ambiente](#como-rodar).

# Lista de Servicos
## Index

|Caminho|Método|Status Code|Descricao|
|:---|:----:|:---------:|:----------|
|`/`|`GET`|200|Retorna informações sobre a api|

## Planets

|Caminho|Método|Status Code|Descricao|
|:---|:----:|:---------:|:----------|
|`/planets`|`GET`|200|Lista todos os planetas|
|`/planets/:id`|`GET`|200|Retorna um planeta específico por id|
|`/planets`|`POST`|201|Cria um planeta|
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

## Users

|Caminho|Método|Status Code|Descricao|
|:---|:----:|:---------:|:----------|
|`/users`|`POST`|200|Registra um usuario|

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

