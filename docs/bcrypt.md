### Encriptar password
npm install bcrypt

Mientras mas alto el numero de saltos, mejor.
Ademas, va a tardar en hashear y por eso ponemos await

```bash
const hash = await bcrypt.hash(text_a_hashear, nro_saltos);
```