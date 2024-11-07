import { Router } from "express";
import { usuarioRoutes } from "./UsuarioRoutes.js";
import { agendamentoRoutes } from "./AgendamentoRoutes.js";
import { LoginController } from "../controllers/LoginController.js";

const loginController = new LoginController();
const router = Router();

router.use('/api/v1/usuarios', usuarioRoutes);
router.use('/api/v1/agendamentos', agendamentoRoutes);
router.post('/api/v1/login', loginController.login)

export { router }