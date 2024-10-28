import { prismaClient } from "../database/PrismaClient.js"

export class ClienteController {

    async buscarClientes (request, response) {
        try {
            const clientes = await prismaClient.clientes.findMany();
            return response.status(200).json(clientes);
        } catch (error) {
            return response.status(500).json({ error: error.message });
        }
    }

    async buscarClientePorId (request, response) {
        const { id } = request.params;
        try {
            const cliente = await prismaClient.clientes.findMany({
                include: {
                    agendamentos: {
                        select:{
                            servico: true,
                            data: true,
                            hora: true
                        }
                    }
                },
                where: { id }
               
            })
            return response.status(200).json(cliente);
        } catch (error) {
            return response.status(500).json({ error: error.message });
        }
    }

    async salvarCliente (request, response) {
        const { nome, email, telefone } = request.body;
        try {
            const cliente = await prismaClient.clientes.create({
                data:{
                    nome, email, telefone
                }
            });
            return response.status(201).json(cliente);
        } catch (error) {
            return response.status(500).json({ error: error.message });
        }
    }


    async atualizarCliente (request, response) {
        const { id } = request.params;
        const { nome, email, telefone } = request.body;
        try {
            const cliente = await prismaClient.clientes.update({
                data: {
                    nome, email, telefone
                },
                where: { id }
            })
            return response.status(200).json(cliente);
        } catch (error) {
            return response.status(500).json({ error: error.message });
        }
    }


    async deletarCliente(request, response) {
        const { id } = request.params;
        try {
            await prismaClient.clientes.delete({
                where: { id }
            })
            return response.status(200).json({ message: 'Cliente excluído com sucesso' });
        } catch (error) {
            return response.status(500).json({ error: error.message });
        }
    }

}