import models from "./../database/models/index" // pongo index por tengo acceso a todos los modelos

export default {
    login : (req, res) => {

    },
    
    registro:  (req, res) => {
        // /api/user/           |   req.body
        // /api/user/:nombre    |   req.params.nombre
        // /api/user?q=juan     |   req.query.q
        // /api/user            |   req.headers

        const { xemail, xpassword } = req.body;
        
        const user = models.User.findOne({
            where: {email: xemail}
        });

        if (!user) { // no existe, entonces lo registramos
            
        } else {
            return res.status(422).json({
                mensaje: "El correo ya existe."
            });
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