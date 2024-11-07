import jwt from "jsonwebtoken"

export function verificarAutenticação(request, response, next) {
    const { authorization } = request.headers;

    if (!authorization){
        return response.status(401).json("Token ausente");
    }

    const token = authorization.replace('Bearer ','').trim();

    try {
        const { id } = jwt.verify(token, process.env.SECRET_JWT);

        if (!id){
            return response.status(401).json("Não autorizado");
        }
        next();
    } catch(error){
        return response.status(500).json({ error: "Token invalido" });
    }
}

export function verificarPermissao(perfisPermitidos){
    return (request, response, next) => {
        const { authorization } = request.headers;

        if (!authorization){
            return response.status(401).json("Token ausente");
        }

        const token = authorization.replace('Bearer ','').trim();

        try {
            const { perfil } = jwt.verify(token, process.env.SECRET_JWT);

            if (!perfisPermitidos.includes(perfil)){
                return response.status(403).json("Não autorizado");
            }
            next();
        } catch(error){
            return response.status(500).json({ error: "Token invalido" });
        }
    }
}