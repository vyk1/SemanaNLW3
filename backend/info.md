### TSC:
#### em vez de npm run tsc --init => tsc.cmd --init

#### driver nativo=> permite exec queries sem abstração (escrita no mesmo formato que no comando) (SELET * from USERS ...)
#### querybuilder=>knex escreve query com js (knex('users').select(*) ... )
#### orm => maior nível de abstração, uma classe que simboliza uma tabela do BD (typeof users -> User), como o nome diz relaciona obj com tabelas