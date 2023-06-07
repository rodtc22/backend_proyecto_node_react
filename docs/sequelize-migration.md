### Tomar nota
1. El modelo va a estar en singular: user
2. La migracion va a estar en plural y minuscula : users

## Migraciones con sequelize
```bash
npx sequelize-cli model:generate --name User --attributes email:string,password:string,status:integer
```

## Lleva las migraciones a la Base de Datos generando tablas
```bash
npx sequelize-cli db:migrate
```
