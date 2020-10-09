# API de Games
Está API foi criada como forma de praticar meus conhecimentos, por tanto seus dados são limitados.
## EndPoints
### GET /games
Esse endpoint é responsável por retornar a listagem de todos os games cadastrados no banco de dados.
#### Parametros
Nenhum.
#### Respostas
##### OK! 200
Caso essa resposta aconteça você vai receber a listagem de todos os games.

Exemplo de resposta:
```
[
  {
    "id": 23,
    "title": "Call of Duty MW",
    "year": 2019,
    "price": 60
  },
  {
    "id": 65,
    "title": "Sea of thieves",
    "year": 2018,
    "price": 40
  },
  {
    "id": 2,
    "title": "Minecraft",
    "year": 2009,
    "price": 20
  }
]

```
##### Falha na autenticação! 401
Caso essa resposta aconteça, isso significa que aconteceu alguma falha durante o processo de autenticação da requisição. Motivos: Token inválido, Token expirado.

Exemplo de respota:
```
{
  "err": "Token inválido!"
}

```

### POST /auth
Esse endpoint é responsável por fazer o processo de login.
#### Parametros
Email: E-email do usuário cadastrado no sistema.

Password: Senha do usuário cadastrado no sistema, com aquele determinado e-mail

Exemplo:
```
{
	"email": "teste@teste.com",
	"password": "nodejs<3"
}

```
#### Respostas

##### OK! 200
Caso essa resposta aconteça você vai receber o token JWT para conseguir acessar endpoints protegidos na API.

Exemplo de resposta:
```
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJmZWxpcGVAdGVzdGUuY29tIiwiaWF0IjoxNjAyMjYxODg5LCJleHAiOjE2MDIyNjU0ODl9.4wfuo0OT7RBwOEZViQ5t4IqB63s511Jtq3kEjMkttKI"
}
```

##### Falha na autenticação! 401
Caso essa resposta aconteça, isso significa que aconteceu alguma falha durante o processo de autenticação da requisição. Motivos: Senha ou e-mail incorretos.

Exemplo de respota:
```
{ err: "Credenciais inválidas" }

```
