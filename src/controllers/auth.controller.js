import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import models from "./../database/models/index" // pongo index por tengo acceso a todos los modelos

export default {
    login : async (req, res) => {
        const {email, password} = req.body;

        let user = await models.User.findOne({
            where: {email: email}
        });

        if (!user) {
            return res.status(401).json({message: "Credenciales Incorrectas!"});
        } else {
            //verificar contrasenia
            const ok = await bcrypt.compare(password, user.password);
            if (ok) {
                // generamos token JWT
                const payload = {
                    id: user.id,
                    email: user.email,
                    time: new Date()
                };
                
                // llave secreta en variables de entorno
                const secret_key = process.env.JWT_SECRET || "MI_CODIGO_SECRETO_JWT";
                
                // tiempo de expiracion
                const expire_time = 60 * 60;

                const token = jwt.sign(payload, secret_key, {expiresIn : expire_time}) 

                return res.status(200).json({
                    access_token: token,
                    user: user,
                    error: false
                });
            }
            
            return res.status(401).json({message: "Credenciales Incorrectas!"});
        }
    },
    
    registro: async (req, res) => {
        // /api/user/           |   req.body
        // /api/user/:nombre    |   req.params.nombre
        // /api/user?q=juan     |   req.query.q
        // /api/user            |   req.headers

        const { email, password } = req.body;
        
        let user = await models.User.findOne({
            where: {email: email}
        });
        
        if (!user) { 
            //cifrar password
            const hashed_password = await bcrypt.hash(password, 12);
            // registrar al usuario
            user = await models.User.create({email, password: hashed_password});
            return res.status(201).json({mensaje: "Usuario registrado. ", data: user});
        } else {
            // 422: algo esta mal 
            return res.status(422).json({mensaje: "El correo ya existe."});
        }
    },
    
    perfil: (req, res) => {
        return res.send("Mi perfil.");
    },
    
    logout: (req, res) => {
        
    }
}

// const login = (req, res) => {}
// const registro = (req, res) => {}
// const perfil = (req, res) => {}
// const logout = (req, res) => {}
// export default {     login,      registro,      perfil,     logout, }