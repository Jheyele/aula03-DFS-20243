import { prismaClient } from "../database/PrismaClient.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export class LoginController {

    async login (request, response){
        const { email, senha } = request.body;

        try {
            const usuario = await prismaClient.usuarios.findFirst({
                where: { email }
            });

            if(!usuario){
                return response.status(404).json({error: "Usuario não encontrado"});
            }

            const senhaValida = bcrypt.compareSync(senha, usuario.senha);

            if(!senhaValida){
                return response.status(401).json({error: "Usuario invalido"});
            }

            const payload = {id: usuario.id, nome: usuario.nome, perfil: usuario.perfil}
            const token = jwt.sign(payload, process.env.SECRET_JWT, {expiresIn: '2h'})
            
            return response.status(200).json({data: payload, token: token})

        } catch(error){
            return response.status(500).json({ error: error.message });
        }
    }
}