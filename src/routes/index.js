import { Router } from "express";
import { clienteRoutes } from "./ClienteRoutes.js";
import { agendamentoRoutes } from "./AgendamentoRoutes.js";

const router = Router()

router.use('/clientes', clienteRoutes);
router.use('/agendamentos', agendamentoRoutes);

export { router }