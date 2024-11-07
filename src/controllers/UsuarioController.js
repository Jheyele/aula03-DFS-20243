import { prismaClient } from "../database/PrismaClient.js"
import bcrypt from "bcryptjs"
import Joi from 'joi'

const usuarioSchema = Joi.object({
    nome: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    senha: Joi.string().min(8).required(),
    telefone: Joi.string().min(8).required(),
    perfil: Joi.string().valid('ADMIN','CLIENTE','FUNCIONARIO')
})

export class UsuarioController {

    async buscarUsuarios (request, response) {
        try {
            const usuarios = await prismaClient.usuarios.findMany({
                select: {
                    id: true,
                    nome: true,
                    email: true,
                    telefone: true,
                    perfil: true
                }
            });
            return response.status(200).json(usuarios);
        } catch (error) {
            return response.status(500).json({ error: error.message });
        }
    }

    async buscarUsuarioPorId (request, response) {
        const { id } = request.params;
        try {
            const usuario = await prismaClient.usuarios.findMany({
                where: { id },
                select: {
                    id: true,
                    nome: true,
                    email: true,
                    telefone: true,
                    perfil: true,
                    agendamentos: {
                        select: {
                            servico: true,
                            data: true,
                            hora: true
                        }
                    }
                }              
            })
            return response.status(200).json(usuario);
        } catch (error) {
            return response.status(500).json({ error: error.message });
        }
    }

    async salvarUsuario (request, response) {
        const { nome, email, telefone, senha, perfil } = request.body;

        try {
            const { error } = usuarioSchema.validate({nome, email, telefone, senha, perfil});
            if (error){
                return response.status(400).json({error: error.details})
            }
            const senhaHash = bcrypt.hashSync(senha, 10)
            const usuario = await prismaClient.usuarios.create({
                data:{
                    nome, email, telefone, senha: senhaHash, perfil
                },
                select: {
                    id: true,
                    nome: true,
                    email: true,
                    telefone: true,
                    perfil: true
                }
            });
            return response.status(201).json(usuario);
        } catch (error) {
            return response.status(500).json({ error: error.message });
        }
    }

    async atualizarUsuario (request, response) {
        const { id } = request.params;
        const { nome, email, telefone, senha, perfil } = request.body;
        try {
            const senhaHash = bcrypt.hashSync(senha, 10)
            const usuario = await prismaClient.usuarios.update({
                data: {
                    nome, email, telefone, senha: senhaHash, perfil
                },
                where: { id },
                select: {
                    id: true, nome: true, email: true, telefone: true, perfil: true
                }
            })
            return response.status(200).json(usuario);
        } catch (error) {
            return response.status(500).json({ error: error.message });
        }
    }

    async deletarUsuario(request, response) {
        const { id } = request.params;
        try {
            await prismaClient.usuarios.delete({
                where: { id }
            })
            return response.status(200).json({ message: 'Usuario excluído com sucesso' });
        } catch (error) {
            return response.status(500).json({ error: error.message });
        }
    }

}