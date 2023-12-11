# Cantina da Confiança Pormade

## Rotas

### POST /canteen

Cadastro de cantina.

- Corpo:`{name: string, email: string, password: string, rootPassword: string}`

### POST /canteen/admin

Receber token de acesso de usuário administrador.

- Corpo: `{email: string, password: string}`
- Retorno: `{adminToken: string}`

### POST /canteen/customer

Receber token de acesso de usuário consumidor.

- Cabeçalho: `Authorization: Bearer <adminToken>`
- Retorno: `{customerToken: string}`

### GET /customer/cpf=:cpf

Encontrar um consumidor pelo CPF.

- Cabeçalho: `Authorization: Bearer <token>`
- Parâmetro: `cpf: string`
- Retorno: `{customer: {id: number, name: string, badge: number}}`

### POST /purchase

Registrar uma compra.

- Cabeçalho: `Authorization: Bearer <customerToken>`
- Corpo: `{customerCpf: string, value: number}`

### GET /purchases

Listar todas as compras já feitas pela cantina.

- Cabeçalho: `Authorization: Bearer <adminToken>`
- Retorno: `{purchase: {id: number, value: number, customerName: string, customerCpf: string, canteenEmail: string, date: Date}}`

### GET /purchases/month=:month/year=:year

Listar todas as compras feitas em certo mês na cantina.

- Cabeçalho: `Authorization: Bearer <adminToken>`
- Parâmetros: `month: number, year: number`
- Retorno: `{purchases: [{id: number, value: number, customerName: string, customerCpf: string, canteenEmail: string, date: Date}, ...]}`

## Variáveis de Ambiente

Arquivo .env:

```sh
APP_HOST = 'localhost'
APP_PORT = 3001
APP_ROOT_PASSWORD = 'root'

DB_HOST = 'localhost'
DB_PORT = 3002
DB_NAME = 'canteen'
DB_USER = 'canteenuser'
DB_PASSWORD = 'merenda'
DB_VOLUME = '/database/postgres:/canteen'

ORM_SYNC = 'true'

JWT_SECRET = 'ultimate secret'
JWT_EXPIRES_IN = '192h'
```
