import { prismaClient } from "../database/PrismaClient.js"

export class AgendamentoController {

    async buscarAgendamentos (request, response) {
        try {
            const agendamentos = await prismaClient.agendamentos.findMany();
            return response.status(200).json(agendamentos);
        } catch (error) {
            return response.status(500).json({ error: error.message });
        }
    }

    async salvarAgendamento (request, response) {
        const { servico, data, hora, usuarioId } = request.body;
        try {
            const dataHora = new Date(`${data}T${hora}Z`);
            const agendamento = await prismaClient.agendamentos.create({
                data:{
                    servico, data: dataHora, hora: dataHora, usuario_id: usuarioId
                }
            });
            return response.status(200).json(agendamento);
        } catch (error) {
            return response.status(500).json({ error: error.message });
        }
    }

    async atualizarAgendamento(request, response) {
        const { id } = request.params;
        const { servico, data, hora } = request.body;
        try {
            const dataHora = new Date(`${data}T${hora}Z`)
            const agendamento = await prismaClient.agendamentos.update({
                data: {
                    servico,
                    data: dataHora,
                    hora: dataHora
                },
                where: { id }
            })
            return response.status(201).json(agendamento);
        } catch (error) {
            return response.status(500).json({ error: error.message });
        }
    }

    async buscarAgendamentosPorPeriodo(request, response) {
        const { dataInicio, dataFim } = request.query;
        try {
            const agendamentos = await prismaClient.agendamentos.findMany({
                where: {
                    data: {
                        gte: dataInicio ? new Date(dataInicio) : undefined,
                        lte: dataFim ?  new Date(dataFim) : undefined,
                    },
                },
            });
            return response.status(200).json(agendamentos);
        } catch (error) {
            return response.status(500).json({ error: error.message });
        }
    }
}