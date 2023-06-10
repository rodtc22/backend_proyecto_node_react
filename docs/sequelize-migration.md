### Tomar nota
1. El modelo va a estar en singular: user
2. La migracion va a estar en plural y minuscula : users

## Migraciones con sequelize
```bash
npx sequelize-cli model:generate --name User --attributes email:string,password:string,status:integer
```

```bash
npx  sequelize model:generate --name Categoria --attributes nombre:string,detalle:text
```
```bash
npx sequelize model:generate --name Cliente --attributes nombre_completo:string,nit:string,correo:string,ci_nit:string,telefono:string
```

```bash
npx  sequelize model:generate --name Producto --attributes nombre:string,precio:decimal,stock:integer,imagen:string,descripcion:text,estado:boolean,categoriaId:integer
```


```bash
npx sequelize model:generate --name Pedido --attributes fecha:date,estado:integer,observacion:text,clienteId:integer
```

```bash
npx sequelize model:generate --name PedidoProducto --attributes pedidoId:integer,productoId:integer,cantidad:integer
```

## Saber que archivos falta migrar
```bash
npx sequelize-cli db:migrate:status
```

## Lleva las migraciones a la Base de Datos generando tablas
```bash
npx sequelize-cli db:migrate
```
