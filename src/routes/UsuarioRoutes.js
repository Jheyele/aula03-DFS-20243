import { Router } from "express";
import { verificarAutenticação, verificarPermissao } from "../auth/authMiddleware.js";
import { UsuarioController } from "../controllers/UsuarioController.js";

const usuarioRoutes = Router();
const usuarioController = new UsuarioController();

usuarioRoutes.get('/', verificarAutenticação, usuarioController.buscarUsuarios);
usuarioRoutes.get('/:id', verificarPermissao(['ADMIN','FUNCIONARIO']), usuarioController.buscarUsuarioPorId);
usuarioRoutes.post('/', usuarioController.salvarUsuario);
usuarioRoutes.put('/:id', usuarioController.atualizarUsuario);
usuarioRoutes.delete('/:id', usuarioController.deletarUsuario);

export { usuarioRoutes }