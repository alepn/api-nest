## Descrição

  

API desenvolvida utilizando [NestJS](https://github.com/nestjs/nest).

  

## Instalação

  

```bash

$ npm install

```
  

## Executando a aplicação

  

```bash

# development

$ npm run start

  

# watch mode

$ npm run start:dev

```

## MySQL

Caso precisar, altere as configurações de conexão com o MySQL, em "src/app.module.ts".

## Insomnia

Importe o arquivo "insmonia_collection.json" (que se encontra na raiz do projeto) no [Insmonia](https://insomnia.rest), para testar os endpoints.

## E-mail

Caso precisar, utilize o [Ethereal](https://ethereal.email) (para criar um serviço SMTP falso) e edite as informações de transporte em "src/mail/mail.module.ts".