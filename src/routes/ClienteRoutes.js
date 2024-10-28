import { Router } from "express";
import { ClienteController } from "../controllers/ClienteController.js";

const clienteRoutes = Router()
const clienteController = new ClienteController();

clienteRoutes.get('/', clienteController.buscarClientes);
clienteRoutes.get('/:id', clienteController.buscarClientePorId);
clienteRoutes.post('/', clienteController.salvarCliente);
clienteRoutes.put('/:id', clienteController.atualizarCliente);
clienteRoutes.delete('/:id', clienteController.deletarCliente);

export { clienteRoutes }