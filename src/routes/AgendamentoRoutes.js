import { Router } from "express";
import { AgendamentoController } from "../controllers/AgendamentoController.js";

const agendamentoRoutes = Router();
const agendamentoController = new AgendamentoController();

agendamentoRoutes.get('/', agendamentoController.buscarAgendamentos);
agendamentoRoutes.post('/', agendamentoController.salvarAgendamento);
agendamentoRoutes.put('/:id', agendamentoController.atualizarAgendamento);

export { agendamentoRoutes }