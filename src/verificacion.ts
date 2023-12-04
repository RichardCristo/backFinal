import jwt from "jsonwebtoken";


const claveSecreta = "diego86"

export function generarClave(_usuario: String): string{
    let sign = {
        "usuario": _usuario
    }
    let firma = jwt.sign(sign, claveSecreta);

    return firma;
}

export function verificarClave(req: any, res: any, next: any){
    const clave = req.headers.authorization;
    console.log(clave)
    if (!clave) {
        return res.status(401).send('Unauthorized: No token provided.');
    }

    try {
        jwt.verify(clave, claveSecreta);
        console.log("Verificación exitosa");
        next();
    }
    catch (err) {
        return res.status(401).send('Unauthorized: Invalid token.');
    }
}