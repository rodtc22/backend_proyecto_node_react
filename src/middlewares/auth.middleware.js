// funcion : guardian que captura y verifica el token

import jwt from "jsonwebtoken";

const auth  = (req, res, next) => { // next: deja o no dejara pasar
    let token = '';
    if (req.headers.authorization) {
        token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
        return res.status(401).json({message: "El token no se proporciono el token de seguridad"});
    }

    jwt.verify(token, process.env.JWT_SECRET || "MI_CODIGO_SECRETO_JWT", (error, decode) => {
        if (error) {
            return res.status(401).json({message : "El token ingresado es incorrecto o ha expirado."});
        }
    });
    
    next();
};

export default auth;