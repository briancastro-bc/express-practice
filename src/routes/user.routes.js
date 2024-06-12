// Paso 1. Crear el router
import { Router } from 'express';

import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/user.controller.js';

const userRouter = Router();

// Paso 2. Definir rutas
// Ruta para leer datos
userRouter.get('/', getUsers);

// Ruta para crear datos
userRouter.post('/', createUser);

// Ruta para actualizar usuarios
userRouter.put('/:id', updateUser);

// Ruta para eliminar usuarios
userRouter.delete('/:id', deleteUser);

export default userRouter;