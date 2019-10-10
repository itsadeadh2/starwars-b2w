# B2W Star Wars API

[![CircleCI](https://circleci.com/gh/itsadeadh2/starwars-b2w.svg?style=svg)](https://circleci.com/gh/itsadeadh2/starwars-b2w)

API dos planetas de Star Wars para o teste da B2W.

## Como rodar

### Rodar a aplicação em modo desenvolvimento:

- Com o docker e docker compose instalados, rode a aplicação com o comando `docker-compose up --build`

### Rodar a aplicação em modo testes:
- Rode a aplicação em modo desenvolvimento, como descrito na seção anterior
- Defina a envvar `PORT` para uma porta livre no seu pc/servidor *ex*: `export PORT=5000`
- Defina a envvar `DATABASE` como a uri do mongo rodando no docker-compose *ex*: `export DATABASE=mongodb://localhost/star_wars_planets_test_db`
- Execute o comando `npm run test`

> PS: O motivo de ser necessário rodar a aplicação em modo desenvolvimento anteriormente é para que a mesma venha a subir o banco de dados mongo através do docker, facilitando assim o processo de teste da aplicação. Uma alternativa secundária poderia ser criar um segundo docker-compose e um segundo dockefile e subir outro stack api/mongo para executar os testes, no entanto não creio que seja vantajoso esperar a criação de mais dois containers apenas para rodar alguns testes.
